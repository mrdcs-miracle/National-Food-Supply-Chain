import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { FileText, Download, Calendar } from 'lucide-react';

const Reports = () => {
  const [stocks, setStocks] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filterType, setFilterType] = useState('All'); // 'Daily', 'Weekly', 'Yearly'
  const [loading, setLoading] = useState(true);

  // 1. Fetch Data
  const fetchData = async () => {
    try {
      const response = await api.get('/stocks');
      // Adding a mock "date" for demonstration (Since your current backend might not have createdDate on stocks)
      // In a real app, you would use: new Date(item.createdAt)
      const dataWithDates = response.data.map(item => ({
        ...item,
        date: new Date() // Simulating today's date for all items for now
      }));
      setStocks(dataWithDates);
      setFilteredData(dataWithDates);
      setLoading(false);
    } catch (error) {
      console.error("Fetch failed", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      await fetchData();
    })();
  }, []);

  // 2. Filter Logic
  const handleFilter = (type) => {
    setFilterType(type);
    const now = new Date();
    let filtered = stocks;

    if (type === 'Daily') {
      filtered = stocks.filter(item => item.date.toDateString() === now.toDateString());
    } else if (type === 'Weekly') {
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(now.getDate() - 7);
      filtered = stocks.filter(item => item.date >= oneWeekAgo);
    } else if (type === 'Yearly') {
      filtered = stocks.filter(item => item.date.getFullYear() === now.getFullYear());
    }
    setFilteredData(filtered);
  };

  // 3. PDF Generation Logic 📄
  const generatePDF = () => {
    const doc = new jsPDF();

    // -- Title & Header --
    doc.setFontSize(18);
    doc.setTextColor(22, 163, 74); // Green Color
    doc.text("LK Supply - Government Inventory Report", 14, 20);

    doc.setFontSize(12);
    doc.setTextColor(100);
    doc.text(`Report Type: ${filterType} Stock Summary`, 14, 30);
    doc.text(`Generated On: ${new Date().toLocaleString()}`, 14, 36);

    // -- Table Columns --
    const tableColumn = ["Item Name", "Category", "Location", "Price (Rs)", "Qty (kg)", "Status"];
    const tableRows = [];

    // -- Table Data --
    filteredData.forEach(item => {
      const stockData = [
        item.itemName,
        item.category,
        item.location,
        item.price,
        item.quantity,
        item.status
      ];
      tableRows.push(stockData);
    });

    // -- Draw Table --
    autoTable(doc, {
      startY: 45,
      head: [tableColumn],
      body: tableRows,
      theme: 'grid',
      headStyles: { fillColor: [22, 163, 74] }, // Green Header
      styles: { fontSize: 10 },
    });

    // -- Save File --
    doc.save(`lk-supply-report-${filterType.toLowerCase()}.pdf`);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col items-center justify-between p-6 bg-white border border-gray-100 shadow-sm md:flex-row rounded-2xl">
        <div>
          <h2 className="flex items-center gap-2 text-2xl font-bold text-gray-800">
            <FileText className="text-green-600" /> System Reports
          </h2>
          <p className="mt-1 text-sm text-gray-500">Generate and download official inventory documents.</p>
        </div>
        <button 
          onClick={generatePDF}
          className="flex items-center gap-2 px-6 py-3 font-bold text-white transition-all bg-red-600 shadow-lg rounded-xl hover:bg-red-700 shadow-red-500/30"
        >
          <Download size={20} /> Download PDF
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-2 p-1 bg-gray-100 rounded-xl w-fit">
        {['All', 'Daily', 'Weekly', 'Yearly'].map((type) => (
          <button
            key={type}
            onClick={() => handleFilter(type)}
            className={`px-6 py-2 text-sm font-bold rounded-lg transition-all ${
              filterType === type 
              ? 'bg-white text-green-700 shadow-sm' 
              : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Preview Table */}
      <div className="overflow-hidden bg-white border border-gray-100 shadow-sm rounded-2xl">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <h3 className="font-bold text-gray-700">Preview Data</h3>
            <span className="text-xs font-bold tracking-wider text-gray-400 uppercase">{filteredData.length} Records found</span>
        </div>
        <table className="w-full text-left">
          <thead className="text-sm font-bold text-gray-600 bg-gray-50">
            <tr>
              <th className="px-6 py-4">Item Name</th>
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4">Location</th>
              <th className="px-6 py-4">Price</th>
              <th className="px-6 py-4">Qty</th>
              <th className="px-6 py-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {loading ? (
                <tr><td colSpan="6" className="p-6 text-center text-gray-400">Loading records...</td></tr>
            ) : filteredData.length === 0 ? (
                <tr><td colSpan="6" className="p-6 text-center text-gray-400">No records found for this period.</td></tr>
            ) : (
                filteredData.map((row, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 font-bold text-gray-800">{row.itemName}</td>
                        <td className="px-6 py-4 text-sm text-gray-500">{row.category}</td>
                        <td className="px-6 py-4 text-sm text-gray-500">{row.location}</td>
                        <td className="px-6 py-4 font-bold text-blue-600">Rs. {row.price}</td>
                        <td className="px-6 py-4 font-bold">{row.quantity}</td>
                        <td className="px-6 py-4">
                            <span className={`px-2 py-1 rounded text-xs font-bold ${
                                row.status === 'Critical' ? 'bg-red-100 text-red-600' : 
                                row.status === 'Low' ? 'bg-orange-100 text-orange-600' : 'bg-green-100 text-green-600'
                            }`}>
                                {row.status}
                            </span>
                        </td>
                    </tr>
                ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Reports;