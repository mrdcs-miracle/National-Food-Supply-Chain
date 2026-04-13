import React, { useState, useMemo } from 'react';

// 🇱🇰 Categories
const CATEGORIES = {
  Rice: ["Keeri Samba", "Samba", "Nadu", "Red Raw", "White Raw", "Basmati", "Suwandel"],
  Vegetables: ["Carrots", "Leeks", "Cabbage", "Beans", "Pumpkin", "Brinjal", "Bitter Gourd", "Big Onions", "Red Onions", "Potatoes"],
  Spices: ["Chilli Powder", "Curry Powder", "Turmeric", "Pepper", "Cinnamon", "Cardamom", "Cloves"],
  Essentials: ["White Sugar", "Brown Sugar", "Table Salt", "Crystal Salt", "Coconut Oil", "Dhal (Mysore)", "Milk Powder"]
};

const StockFormModal = ({ isOpen, onClose, onSubmit, initialData }) => {
  const derivedMainCategory = useMemo(() => {
    if (initialData) {
      const found = Object.keys(CATEGORIES).find(key => CATEGORIES[key].includes(initialData.category));
      return found || 'Rice';
    }
    return 'Rice';
  }, [initialData]);

  const derivedFormData = useMemo(() => {
    if (initialData) {
      const foundMain = Object.keys(CATEGORIES).find(key => CATEGORIES[key].includes(initialData.category)) || 'Rice';
      return {
        id: initialData.id,
        itemName: initialData.itemName || '',
        location: initialData.location || '',
        qty: initialData.quantity || '',
        price: initialData.price || '',
        category: initialData.category || CATEGORIES[foundMain][0],
        status: initialData.status || 'Good'
      };
    }
    return { id: null, itemName: '', location: '', qty: '', price: '', category: 'Keeri Samba', status: 'Good' };
  }, [initialData]);

  const [mainCategory, setMainCategory] = useState(derivedMainCategory);
  
  const [formData, setFormData] = useState(derivedFormData);

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: null });
  };

  const handleMainCatChange = (e) => {
    const newMain = e.target.value;
    setMainCategory(newMain);
    setFormData({ ...formData, category: CATEGORIES[newMain][0] });
  };

  const validate = () => {
    let tempErrors = {};
    if (!formData.itemName.trim()) tempErrors.itemName = "Item name is required.";
    if (!formData.location.trim()) tempErrors.location = "Location is required.";
    if (!formData.qty.toString().match(/^[0-9]+$/)) tempErrors.qty = "Valid number required.";
    if (!formData.price) tempErrors.price = "Price is required.";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const payload = {
        id: formData.id,
        itemName: formData.itemName,
        location: formData.location,
        quantity: parseInt(formData.qty),
        price: parseFloat(formData.price),
        category: formData.category, 
        status: formData.status
      };
      onSubmit(payload);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-lg p-6 bg-white shadow-2xl rounded-2xl animate-fade-in-up">
        
        <div className="flex items-center justify-between pb-4 mb-6 border-b">
            <div>
                <h3 className="text-xl font-bold text-gray-800">{initialData ? 'Edit Stock' : 'Add New Stock'}</h3>
                <p className="text-xs text-gray-500">Inventory Management System</p>
            </div>
            <button onClick={onClose} className="p-2 transition-colors bg-gray-100 rounded-full hover:bg-red-50 hover:text-red-500">&times;</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          
          <div className="p-4 space-y-4 border border-gray-100 bg-gray-50 rounded-xl">
              <h4 className="text-xs font-bold tracking-wider text-gray-400 uppercase">Classification</h4>
              <div className="flex gap-4">
                <div className="flex-1">
                    <label className="block mb-1 text-xs font-bold text-gray-700">Main Category</label>
                    <select value={mainCategory} onChange={handleMainCatChange} className="w-full p-2.5 bg-white border border-gray-300 rounded-lg outline-none">
                        {Object.keys(CATEGORIES).map(cat => <option key={cat} value={cat}>{cat}</option>)}
                    </select>
                </div>
                <div className="flex-1">
                    <label className="block mb-1 text-xs font-bold text-gray-700">Variety</label>
                    <select name="category" value={formData.category} onChange={handleChange} className="w-full p-2.5 bg-white border border-gray-300 rounded-lg outline-none">
                        {CATEGORIES[mainCategory].map(item => <option key={item} value={item}>{item}</option>)}
                    </select>
                </div>
              </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
                <label className="block mb-1 text-xs font-bold text-gray-700">Item Display Name</label>
                <input name="itemName" value={formData.itemName} onChange={handleChange} className="w-full p-2.5 border border-gray-300 rounded-lg outline-none" placeholder="e.g. Keeri Samba Grade A" />
                {errors.itemName && <p className="mt-1 text-xs text-red-500">{errors.itemName}</p>}
            </div>

            <div>
                <label className="block mb-1 text-xs font-bold text-gray-700">Warehouse Location</label>
                <input name="location" value={formData.location} onChange={handleChange} className="w-full p-2.5 border border-gray-300 rounded-lg outline-none" placeholder="e.g. Polonnaruwa" />
            </div>

            <div>
                <label className="block mb-1 text-xs font-bold text-gray-700">Price (1KG)</label>
                <input name="price" value={formData.price} onChange={handleChange} className="w-full p-2.5 border border-gray-300 rounded-lg outline-none" placeholder="220" />
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
                <label className="block mb-1 text-xs font-bold text-gray-700">Stock Quantity (kg)</label>
                <input name="qty" value={formData.qty} onChange={handleChange} className="w-full p-2.5 border border-gray-300 rounded-lg outline-none" placeholder="1000" />
            </div>
            <div className="flex-1">
                <label className="block mb-1 text-xs font-bold text-gray-700">Status</label>
                <select name="status" value={formData.status} onChange={handleChange} className="w-full p-2.5 bg-white border border-gray-300 rounded-lg outline-none">
                    <option value="Good">🟢 Good</option>
                    <option value="Low">🟡 Low</option>
                    <option value="Critical">🔴 Critical</option>
                </select>
            </div>
          </div>

          <div className="flex gap-3 pt-6 mt-4 border-t">
            <button type="button" onClick={onClose} className="flex-1 py-3 font-bold text-gray-600 bg-gray-100 rounded-xl hover:bg-gray-200">Cancel</button>
            <button type="submit" className="flex-1 py-3 font-bold text-white bg-green-600 shadow-lg rounded-xl hover:bg-green-700 shadow-green-600/30">
                {initialData ? 'Update Stock' : 'Save Stock'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StockFormModal;