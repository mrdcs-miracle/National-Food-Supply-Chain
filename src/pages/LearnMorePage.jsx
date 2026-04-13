import React from 'react';
import { Link } from 'react-router-dom'
import Nextgen from '../assets/Nextgen_Agri.avif';
import Stock from '../assets/stock.avif';
import Export from '../assets/Export_Quality.avif';

const LearnMorePage = ({ topic }) => {

  // 1. Content Database
  const content = {
    'modern-farming': {
      title: "Modern Sustainable Farming",
      image: "https://images.unsplash.com/photo-1625246333195-58197bd47d26?auto=format&fit=crop&q=80&w=1920",
      intro: "We empower Sri Lankan farmers with the latest sustainable techniques to maximize yield while protecting our soil.",
      points: [
        "Precision Agriculture: Using sensors to monitor soil moisture.",
        "Organic Fertilizers: Reducing chemical dependency by 40%.",
        "Drip Irrigation: Saving water in dry zones like Anuradhapura.",
        "Crop Rotation: Maintaining soil health naturally."
      ]
    },
    'supply-chain': {
      title: "Transparent Supply Chain",
      image: Stock,
      intro: "Our blockchain-enabled supply chain ensures that every rupee you spend goes directly to the hardworking farmer.",
      points: [
        "Middleman Elimination: Direct Farmer-to-Consumer platform.",
        "Real-Time Tracking: See exactly where your vegetables are.",
        "Fair Pricing: Farmers set their own prices based on market data.",
        "Cold Chain Logistics: Reducing post-harvest waste by 25%."
      ]
    },
    'export-quality': {
      title: "Export Quality Standards",
      image: Export,
      intro: "We bring international quality standards to the local market. Only the best produce makes it to your table.",
      points: [
        "GAP Certified: Good Agricultural Practices certification.",
        "Lab Tested: Regular checks for pesticide residues.",
        "Premium Packaging: Biodegradable materials that keep food fresh.",
        "Global Reach: Currently exporting to UAE, UK, and Singapore."
      ]
    },
    'agri-tech': {
      title: "Next-Gen Agri-Tech",
      image: Nextgen,
      intro: "Leveraging AI and IoT to revolutionize how Sri Lanka farms, predicts weather, and manages inventory.",
      points: [
        "AI Pest Detection: Identifying diseases before they spread.",
        "Drone Spraying: Efficient and safe fertilizer application.",
        "Smart Warehousing: Automated temperature control.",
        "Data Analytics: Predicting market demand to prevent oversupply."
      ]
    }
  };

  const data = content[topic];

  if (!data) return <div className="p-20 text-center">Topic not found</div>;

  return (
    <div className="min-h-screen bg-white">

      {/* Hero Header */}
      <div className="relative overflow-hidden h-80 lg:h-96">
        <img src={data.image} alt={data.title} className="object-cover w-full h-full" />
        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
          <h1 className="px-4 text-4xl font-bold text-center text-white lg:text-5xl">{data.title}</h1>
        </div>
      </div>

      {/* Content Section */}
      <div className="container max-w-4xl px-4 py-16 mx-auto">
        <p className="pl-6 mb-10 text-xl leading-relaxed text-gray-700 border-l-4 border-green-600">
          {data.intro}
        </p>

        <h2 className="mb-6 text-2xl font-bold text-gray-800">Key Highlights</h2>
        <div className="grid grid-cols-1 gap-6 mb-12 md:grid-cols-2">
          {data.points.map((point, index) => (
            <div key={index} className="flex items-start gap-4 p-4 bg-green-50 rounded-xl">
              <div className="flex items-center justify-center w-8 h-8 font-bold text-green-700 bg-green-200 rounded-full shrink-0">
                {index + 1}
              </div>
              <p className="font-medium text-gray-700">{point}</p>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="p-8 text-center text-white bg-gray-900 rounded-2xl">
          <h3 className="mb-4 text-2xl font-bold">Want to be part of this revolution?</h3>
          <p className="mb-6 text-gray-300">Join us as a partner, farmer, or customer today.</p>
          <div className="flex justify-center gap-4">
            <Link to="/contact" className="px-6 py-3 font-bold transition-all bg-green-600 rounded-lg hover:bg-green-700">
              Contact Us
            </Link>
            <Link to="/" className="px-6 py-3 font-bold transition-all bg-gray-700 rounded-lg hover:bg-gray-600">
              Back Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearnMorePage;