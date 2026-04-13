import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen px-4 py-12 font-sans bg-gray-50 sm:px-6 lg:px-8">
      <div className="max-w-3xl p-8 mx-auto bg-white border border-gray-100 shadow-sm rounded-2xl">
        <h1 className="mb-6 text-3xl font-bold text-gray-900">Privacy Policy</h1>
        <p className="mb-8 text-sm text-gray-500">Last updated: January 25, 2026</p>

        <div className="space-y-6 leading-relaxed text-gray-700">
          <section>
            <h2 className="mb-3 text-xl font-semibold text-gray-800">1. Information We Collect</h2>
            <p>
              We collect information you provide directly to us, such as when you create an account, update your profile, or use our supply chain management tools. This includes your name, email address, phone number, and agricultural data.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-gray-800">2. How We Use Your Data</h2>
            <p>
              We use your data to facilitate the food supply chain process, provide real-time analytics, and improve our platform. We do not sell your personal data to third-party advertisers.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-gray-800">3. Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-gray-800">4. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at <span className="font-medium text-green-600">privacy@lksupply.com</span>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;