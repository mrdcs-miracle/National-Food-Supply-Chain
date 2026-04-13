import React, { useState } from 'react';
import api from '../api/axios';

const Settings = ({ user }) => {
  const [passwords, setPasswords] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });

    if (passwords.newPassword !== passwords.confirmPassword) {
      setMessage({ type: 'error', text: "New passwords do not match!" });
      return;
    }

    if (passwords.newPassword.length < 6) {
        setMessage({ type: 'error', text: "Password must be at least 6 characters." });
        return;
    }

    try {
      await api.put('/auth/password', {
        username: user.username, // Send current username
        oldPassword: passwords.oldPassword,
        newPassword: passwords.newPassword
      });
      setMessage({ type: 'success', text: "Password updated successfully!" });
      setPasswords({ oldPassword: '', newPassword: '', confirmPassword: '' }); // Clear form
    } catch (error) {
      setMessage({ type: 'error', text: error.response?.data || "Failed to update password." });
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-8 bg-white rounded-2xl shadow-lg border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Security Settings</h2>
      
      {message.text && (
        <div className={`p-4 mb-6 rounded-lg text-sm font-bold ${message.type === 'error' ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Current Password</label>
          <input 
            type="password" 
            name="oldPassword" 
            value={passwords.oldPassword} 
            onChange={handleChange} 
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
            placeholder="••••••••"
            required 
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
            <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">New Password</label>
                <input 
                    type="password" 
                    name="newPassword" 
                    value={passwords.newPassword} 
                    onChange={handleChange} 
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
                    placeholder="••••••••"
                    required 
                />
            </div>
            <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Confirm New</label>
                <input 
                    type="password" 
                    name="confirmPassword" 
                    value={passwords.confirmPassword} 
                    onChange={handleChange} 
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
                    placeholder="••••••••"
                    required 
                />
            </div>
        </div>

        <button type="submit" className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-500/30">
          Update Password
        </button>
      </form>
    </div>
  );
};

export default Settings;