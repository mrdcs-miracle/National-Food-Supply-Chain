import React, { useState, useEffect } from 'react';
import StockFormModal from './StockFormModal';
import api from '../api/axios';

// 🇱🇰 Categories (Must match Modal)
const CATEGORIES = {
  Rice: ["Keeri Samba", "Samba", "Nadu", "Red Raw", "White Raw", "Basmati", "Suwandel"],
  Vegetables: ["Carrots", "Leeks", "Cabbage", "Beans", "Pumpkin", "Brinjal", "Bitter Gourd", "Big Onions", "Red Onions", "Potatoes"],
  Spices: ["Chilli Powder", "Curry Powder", "Turmeric", "Pepper", "Cinnamon", "Cardamom", "Cloves"],
  Essentials: ["White Sugar", "Brown Sugar", "Table Salt", "Crystal Salt", "Coconut Oil", "Dhal (Mysore)", "Milk Powder"]
};

const StockManagement = ({ user }) => {
  
  const [stocks, setStocks] = useState([]); 
  const [loading, setLoading] = useState(true);

  // Permissions
  const isAdmin = user && (user.role === 'ADMIN' || user.role === 'MANAGER');

  const [filter, setFilter] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStock, setEditingStock] = useState(null);
  const [feedback, setFeedback] = useState({ type: '', message: '' });

  const fetchStocks = async () => {
    try {
        const response = await api.get('/stocks');
        setStocks(response.data);
        setLoading(false);
    } catch (error) {
        console.error("Failed to fetch stocks", error);
        setLoading(false);
    }
  };

  useEffect(() => {
    let ignore = false;
    const loadStocks = async () => {
      try {
        const response = await api.get('/stocks');
        if (!ignore) {
          setStocks(response.data);
          setLoading(false);
        }
      } catch (error) {
        console.error("Failed to fetch stocks", error);
        if (!ignore) {
          setLoading(false);
        }
      }
    };
    loadStocks();
    return () => { ignore = true; };
  }, []);

  const handleSave = async (stockData) => {
    try {
      if (stockData.id) {
        await api.put(`/stocks/${stockData.id}`, stockData);
        showFeedback('success', 'Stock updated successfully!');
      } else {
        await api.post('/stocks', stockData);
        showFeedback('success', 'New stock added successfully!');
      }
      fetchStocks();
      setIsModalOpen(false);
      setEditingStock(null);
    } catch {
      showFeedback('error', 'Failed to save data.');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this stock?")) {
      try {
          await api.delete(`/stocks/${id}`);
          showFeedback('success', 'Stock deleted successfully.');
          fetchStocks();
      } catch {
          showFeedback('error', 'Delete failed.');
      }
    }
  };

  const showFeedback = (type, message) => {
    setFeedback({ type, message });
    setTimeout(() => setFeedback({ type: '', message: '' }), 3000);
  };

  // 🟢 ACTION HANDLERS
  const handleEditClick = (stock) => { 
    setEditingStock(stock); 
    setIsModalOpen(true); 
  };
  
  const handleAddNewClick = () => { 
    setEditingStock(null); 
    setIsModalOpen(true); 
  };
  
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingStock(null); // Clear state on close
  };

  // Filter Logic
  const filteredStocks = filter === 'All' 
    ? stocks 
    : stocks.filter(s => {
        return s.category === filter || (CATEGORIES[filter] && CATEGORIES[filter].includes(s.category));
    });

  const getStatusColor = (status) => {
    if (status === 'Good') return 'bg-green-100 text-green-700';
    if (status === 'Low') return 'bg-yellow-100 text-yellow-700';
    return 'bg-red-100 text-red-700';
  };

  const getMainCategoryName = (subCategory) => {
    const main = Object.keys(CATEGORIES).find(key => CATEGORIES[key].includes(subCategory));
    return main || subCategory; 
  };

  return (
    <div className="relative space-y-6">
      {feedback.message && (
        <div className={`fixed top-4 right-4 z-50 px-6 py-3 rounded-xl text-white font-bold ${feedback.type === 'error' ? 'bg-red-500' : 'bg-green-600'}`}>
          {feedback.message}
        </div>
      )}

      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div><h2 className="text-2xl font-bold text-gray-800">Stock Management</h2></div>
        {isAdmin && <button onClick={handleAddNewClick} className="px-6 py-2 text-white transition-colors bg-green-600 rounded-lg shadow-lg hover:bg-green-700">+ Add New Stock</button>}
      </div>

      <div className="flex flex-wrap gap-2 p-1 bg-gray-100 rounded-xl w-fit">
        {['All', 'Rice', 'Vegetables', 'Spices', 'Essentials'].map((cat) => (
          <button 
            key={cat} 
            onClick={() => setFilter(cat)} 
            className={`px-5 py-2 text-sm font-bold rounded-lg transition-all ${filter === cat ? 'bg-white text-green-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="overflow-hidden bg-white border border-gray-100 shadow-sm rounded-2xl">
        <table className="w-full text-left border-collapse">
          <thead className="border-b border-gray-100 bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-sm font-bold text-gray-600">Item Name</th>
              <th className="px-6 py-4 text-sm font-bold text-gray-600">Location</th>
              <th className="px-6 py-4 text-sm font-bold text-gray-600">Category</th>
              <th className="px-6 py-4 text-sm font-bold text-gray-600">Variety</th>
              <th className="px-6 py-4 text-sm font-bold text-gray-600">Price (1KG)</th>
              <th className="px-6 py-4 text-sm font-bold text-gray-600">Qty</th>
              <th className="px-6 py-4 text-sm font-bold text-gray-600">Status</th>
              {isAdmin && <th className="px-6 py-4 text-sm font-bold text-right text-gray-600">Actions</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {loading ? <tr><td colSpan="8" className="p-6 text-center text-gray-500">Loading Data...</td></tr> : 
             filteredStocks.length === 0 ? <tr><td colSpan="8" className="p-6 text-center text-gray-400">No stocks found.</td></tr> :
             filteredStocks.map((row) => (
              <tr key={row.id} className="transition-colors hover:bg-gray-50">
                <td className="px-6 py-4 font-bold text-gray-800">{row.itemName}</td>
                <td className="px-6 py-4 text-gray-600">{row.location}</td>
                <td className="px-6 py-4">
                    <span className="px-2 py-1 text-xs font-bold text-gray-600 uppercase bg-gray-100 border border-gray-200 rounded">
                        {getMainCategoryName(row.category)}
                    </span>
                </td>
                <td className="px-6 py-4 font-medium text-gray-700">{row.category}</td>
                <td className="px-6 py-4 font-bold text-blue-600">Rs. {row.price}</td>
                <td className="px-6 py-4 font-bold">{row.quantity}</td>
                <td className="px-6 py-4"><span className={`px-3 py-1 text-xs font-bold rounded-full ${getStatusColor(row.status)}`}>{row.status}</span></td>
                
                {isAdmin && (
                    <td className="px-6 py-4 text-right">
                        <button onClick={() => handleEditClick(row)} className="mr-3 font-medium text-blue-600 hover:text-blue-800">Edit</button>
                        <button onClick={() => handleDelete(row.id)} className="font-medium text-red-500 hover:text-red-700">Delete</button>
                    </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 🟢 CRITICAL FIX: The 'key' prop forces React to completely rebuild the modal when data changes */}
      <StockFormModal 
        key={editingStock ? editingStock.id : 'new-stock-modal'} 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        onSubmit={handleSave} 
        initialData={editingStock} 
      />
    </div>
  );
};

export default StockManagement;