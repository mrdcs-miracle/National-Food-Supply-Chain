import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import { ShoppingBag, Plus, Edit2, Trash2, X, Upload } from 'lucide-react';

const Marketplace = ({ addToCart, user }) => { 
  
  const [products, setProducts] = useState([]); 
  const [category, setCategory] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  
  // 🟢 Form State
  const [formData, setFormData] = useState({
      name: '', price: '', type: 'seeds', description: ''
  });
  // 🟢 File State
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const isPowerUser = user && (user.role === 'MANAGER' || user.role === 'ADMIN');

  const fetchItems = async () => {
    try {
        const res = await api.get('/marketplace');
        setProducts(res.data);
    } catch(e) { console.error("Fetch Error", e); }
  };

  useEffect(() => {
    (async () => {
      await fetchItems();
    })();
  }, []);

  const handleInputChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🟢 Handle File Selection
  const handleFileChange = (e) => {
      const file = e.target.files[0];
      if (file) {
          setSelectedFile(file);
          setPreviewUrl(URL.createObjectURL(file)); // Show preview immediately
      }
  };

  const openAddModal = () => { 
      setEditingProduct(null);
      setFormData({ name: '', price: '', type: 'seeds', description: '' });
      setSelectedFile(null);
      setPreviewUrl(null);
      setIsModalOpen(true); 
  };

  const openEditModal = (product) => {
      setEditingProduct(product);
      setFormData({
          name: product.name,
          price: product.price,
          type: product.type.toLowerCase(),
          description: product.description
      });
      setSelectedFile(null);
      setPreviewUrl(product.imageUrl); // Show existing image
      setIsModalOpen(true);
  };
  
  // 🟢 Save with File Upload (FormData)
  const handleSave = async (e) => {
    e.preventDefault();
    
    const data = new FormData();
    data.append("name", formData.name);
    data.append("price", formData.price);
    data.append("type", formData.type);
    data.append("description", formData.description);
    
    if (selectedFile) {
        data.append("file", selectedFile);
    }

    try {
        if (editingProduct) {
            await api.put(`/marketplace/${editingProduct.id}`, data, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            alert("Product Updated!");
        } else {
            await api.post('/marketplace', data, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            alert("Product Added!");
        }
        fetchItems();
        setIsModalOpen(false);
    } catch (error) {
        console.error(error);
        alert("Upload Failed!");
    }
  };

  const handleDelete = async (id) => {
      if(confirm("Delete this product?")) {
          await api.delete(`/marketplace/${id}`);
          fetchItems();
      }
  }

  const getProductImage = (product) => {
    if (product.imageUrl) return product.imageUrl;
    
    const name = product.name.toLowerCase();
    // Specific Product Images
    if (name.includes('tomato')) return 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&h=400&fit=crop';
    if (name.includes('fertilizer') || name.includes('urea') || name.includes('npk')) return 'https://images.unsplash.com/photo-1628352081506-83c43123ed6d?w=600&h=400&fit=crop';
    if (name.includes('mango')) return 'https://images.unsplash.com/photo-1553272725-086100aecf5e?w=600&h=400&fit=crop';
    if (name.includes('chilli')) return 'https://images.unsplash.com/photo-1588123190131-1c3fac394f4b?w=600&h=400&fit=crop';
    if (name.includes('banana')) return 'https://images.unsplash.com/photo-1571508601891-ca5e7a713859?w=600&h=400&fit=crop';
    if (name.includes('carrot')) return 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=600&h=400&fit=crop';
    if (name.includes('coconut')) return 'https://images.unsplash.com/photo-1526362870197-285642b90302?w=600&h=400&fit=crop';
    if (name.includes('papaya')) return 'https://images.unsplash.com/photo-1617112848923-cc223439408b?w=600&h=400&fit=crop';
    if (name.includes('cinnamon')) return 'https://images.unsplash.com/photo-1608885898957-a559228e8749?w=600&h=400&fit=crop';
    if (name.includes('seaweed')) return 'https://images.unsplash.com/photo-1533550383188-4e12e2f3dce0?w=600&h=400&fit=crop';
    
    // Category Fallbacks
    if (product.type.toLowerCase() === 'seeds') return 'https://images.unsplash.com/photo-1593453303868-d0556eee2e97?w=600&h=400&fit=crop';
    if (product.type.toLowerCase() === 'plants') return 'https://images.unsplash.com/photo-1416879598056-cb6bed028913?w=600&h=400&fit=crop';
    if (product.type.toLowerCase() === 'fertilizer') return 'https://images.unsplash.com/photo-1628352081506-83c43123ed6d?w=600&h=400&fit=crop';
    
    // Generic Farming Fallback
    return 'https://images.unsplash.com/photo-1595841696677-6489ff3f8cd1?w=600&h=400&fit=crop'; 
  };

  const filteredProducts = category === 'all' 
    ? products 
    : products.filter(p => p.type.toLowerCase() === category.toLowerCase());

  return (
    <div className="min-h-screen pb-20 bg-gray-50">
        
        {/* HERO */}
        <div className="relative py-16 text-center text-white bg-green-700 shadow-xl">
            <h1 className="mb-2 text-4xl font-bold">Sri Lankan Agriculture Marketplace</h1>
            <p className="max-w-2xl mx-auto mb-6 text-green-100">Certified government supplies.</p>
            {isPowerUser && (
                <button onClick={openAddModal} className="flex items-center gap-2 px-6 py-2 mx-auto font-bold text-green-700 bg-white rounded-full hover:bg-green-50">
                    <Plus size={18} /> Add New Product
                </button>
            )}
        </div>

        {/* Categories */}
        <div className="container relative z-10 px-4 mx-auto mb-12 -mt-8">
            <div className="flex flex-wrap justify-center gap-4 p-4 bg-white shadow-lg rounded-xl">
            {['all', 'seeds', 'fertilizer', 'plants'].map((cat) => (
                <button key={cat} onClick={() => setCategory(cat)} className={`px-6 py-2 rounded-full font-bold capitalize transition-colors ${category === cat ? 'bg-green-600 text-white shadow-md' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>{cat}</button>
            ))}
            </div>
        </div>

        {/* Products */}
        <div className="container px-4 mx-auto mt-8">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filteredProducts.map((product) => (
                    <div key={product.id} className="overflow-hidden transition-all bg-white border border-gray-100 shadow-sm rounded-2xl flex flex-col group hover:shadow-xl hover:-translate-y-1">
                        <div className="relative h-56 bg-gray-100 overflow-hidden">
                            <img src={getProductImage(product)} alt={product.name} className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110" />
                            <span className="absolute px-3 py-1 text-[10px] uppercase tracking-wider font-bold text-white rounded-full top-4 right-4 bg-black/60 shadow-md backdrop-blur-sm">{product.type}</span>
                        </div>
                        <div className="p-6">
                            <div className="flex items-start justify-between mb-2">
                                <h3 className="text-xl font-bold text-gray-900">{product.name}</h3>
                                <span className="text-lg font-bold text-green-700">{product.price}</span>
                            </div>
                            <p className="mb-4 text-sm text-gray-500 line-clamp-2">{product.description}</p>
                            
                            <button onClick={() => addToCart(product)} className="w-full py-3 mb-3 font-bold text-white bg-gray-900 rounded-xl hover:bg-green-600">Add to Cart</button>

                            {isPowerUser && (
                                <div className="flex gap-2 pt-3 border-t border-gray-100">
                                    <button onClick={() => openEditModal(product)} className="flex justify-center flex-1 gap-2 py-2 text-sm font-bold text-blue-600 rounded-lg bg-blue-50 hover:bg-blue-100"><Edit2 size={16} /> Edit</button>
                                    <button onClick={() => handleDelete(product.id)} className="flex justify-center flex-1 gap-2 py-2 text-sm font-bold text-red-600 rounded-lg bg-red-50 hover:bg-red-100"><Trash2 size={16} /> Delete</button>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>

        {/* MODAL */}
        {isModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
               <div className="w-full max-w-lg overflow-hidden bg-white shadow-2xl rounded-2xl animate-fade-in-up">
                   <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gray-50">
                       <h2 className="text-xl font-bold text-gray-800">{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>
                       <button onClick={() => setIsModalOpen(false)}><X size={20} className="text-gray-400 hover:text-red-500" /></button>
                   </div>
                   <form onSubmit={handleSave} className="p-6 space-y-5">
                       <div><label className="text-xs font-bold text-gray-500 uppercase">Name</label><input name="name" value={formData.name} onChange={handleInputChange} className="w-full p-3 border rounded-xl" required /></div>
                       <div className="flex gap-4">
                            <div className="flex-1"><label className="text-xs font-bold text-gray-500 uppercase">Price</label><input name="price" value={formData.price} onChange={handleInputChange} className="w-full p-3 border rounded-xl" required /></div>
                            <div className="flex-1"><label className="text-xs font-bold text-gray-500 uppercase">Category</label>
                                <select name="type" value={formData.type} onChange={handleInputChange} className="w-full p-3 bg-white border rounded-xl">
                                    <option value="seeds">Seeds</option><option value="fertilizer">Fertilizer</option><option value="plants">Plants</option>
                                </select>
                            </div>
                       </div>
                       <div><label className="text-xs font-bold text-gray-500 uppercase">Description</label><textarea name="description" value={formData.description} onChange={handleInputChange} className="w-full h-20 p-3 border rounded-xl"></textarea></div>
                       
                       {/* 🟢 FILE UPLOAD INPUT */}
                       <div>
                            <label className="text-xs font-bold text-gray-500 uppercase">Product Image</label>
                            <div className="relative p-4 text-center transition-colors border-2 border-gray-300 border-dashed cursor-pointer rounded-xl hover:bg-gray-50">
                                <input type="file" onChange={handleFileChange} className="absolute inset-0 opacity-0 cursor-pointer" accept="image/*" />
                                <Upload className="mx-auto mb-2 text-gray-400" />
                                <p className="text-sm text-gray-500">Click to upload photo</p>
                            </div>
                            {previewUrl && (
                                <img src={previewUrl} alt="Preview" className="object-cover w-full h-32 mt-3 border rounded-lg" />
                            )}
                       </div>

                       <button type="submit" className="w-full py-3 font-bold text-white bg-green-600 shadow-lg rounded-xl hover:bg-green-700">{editingProduct ? 'Update Product' : 'Save Product'}</button>
                   </form>
               </div>
            </div>
        )}
    </div>
  );
};

export default Marketplace;