import React from 'react';

const TermsOfService = () => {
  return (
    <div className="min-h-screen px-4 py-12 font-sans bg-gray-50 sm:px-6 lg:px-8">
      <div className="max-w-3xl p-8 mx-auto bg-white border border-gray-100 shadow-sm rounded-2xl">
        <h1 className="mb-6 text-3xl font-bold text-gray-900">Terms of Service</h1>
        <p className="mb-8 text-sm text-gray-500">Last updated: January 25, 2026</p>

        <div className="space-y-6 leading-relaxed text-gray-700">
          <section>
            <h2 className="mb-3 text-xl font-semibold text-gray-800">1. Acceptance of Terms</h2>
            <p>
              By accessing and using the Lk Supply Chain platform, you accept and agree to be bound by the terms and provision of this agreement.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-gray-800">2. User Responsibilities</h2>
            <p>
              You are responsible for maintaining the confidentiality of your account and password. You agree to accept responsibility for all activities that occur under your account.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-gray-800">3. Accuracy of Data</h2>
            <p>
              Farmers and Managers must ensure that all stock data, pricing, and quantities entered into the system are accurate to the best of their knowledge.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-gray-800">4. Termination</h2>
            <p>
              We reserve the right to terminate or suspend access to our service immediately, without prior notice, for any breach of these Terms.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;