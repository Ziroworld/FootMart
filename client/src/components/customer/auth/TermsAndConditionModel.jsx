import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../../assets/logo.png';

export default function TermsAndConditionModel({ onClose }) {
  const navigate = useNavigate();

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 transition"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div
        className="relative bg-white w-full max-w-lg sm:max-w-2xl md:max-w-3xl lg:max-w-4xl rounded-2xl shadow-2xl overflow-hidden max-h-[85vh] flex flex-col transition-all"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-200 bg-white px-4 py-3 md:px-6 md:py-4">
          <div className="flex items-center gap-3 md:gap-4">
            <img
              src={logo}
              alt="FootMart Logo"
              className="h-8 w-8 md:h-10 md:w-10 cursor-pointer"
              onClick={() => navigate('/home')}
            />
            <h2 className="text-xl md:text-2xl font-bold text-[#006241]">Terms &amp; Conditions</h2>
          </div>
          <button
            onClick={onClose}
            className="text-2xl md:text-3xl leading-none text-gray-600 hover:text-gray-900 rounded-full w-9 h-9 flex items-center justify-center transition"
            aria-label="Close terms modal"
            tabIndex={0}
          >
            &times;
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto px-3 py-6 md:px-6 md:py-8 text-base md:text-lg text-gray-700 leading-relaxed space-y-10 md:space-y-12">
          <section>
            <h3 className="text-lg md:text-xl font-semibold text-gray-800">1. Acceptance of Terms</h3>
            <p className="mt-3 md:mt-4">
              By accessing or using FootMart's website and services, you agree to be bound by these Terms &amp; Conditions.
              These terms govern your use of our platform and outline the rights and responsibilities of both you and FootMart.
              If you do not agree with any part of these terms, please do not use our services.
            </p>
          </section>
          <section>
            <h3 className="text-lg md:text-xl font-semibold text-gray-800">2. Changes to Terms</h3>
            <p className="mt-3 md:mt-4">
              FootMart reserves the right to modify, update, or replace these Terms at any time without prior notice.
              Changes become effective immediately upon posting to the website. Your continued use of the platform after revisions
              will constitute your acceptance of the updated terms.
            </p>
          </section>
          <section>
            <h3 className="text-lg md:text-xl font-semibold text-gray-800">3. Account Responsibility</h3>
            <p className="mt-3 md:mt-4">
              You are responsible for maintaining the confidentiality of your account credentials, including username, email,
              and password. You agree to accept responsibility for all activities that occur under your account. Please notify us
              immediately of any unauthorized use.
            </p>
          </section>
          <section>
            <h3 className="text-lg md:text-xl font-semibold text-gray-800">4. Use of Services</h3>
            <p className="mt-3 md:mt-4">
              Our services are provided for your personal, non-commercial use only. You agree not to use the platform for any
              illegal or unauthorized purpose. You must comply with all applicable laws, regulations, and FootMart's policies
              when using our services.
            </p>
          </section>
          <section>
            <h3 className="text-lg md:text-xl font-semibold text-gray-800">5. Orders and Payments</h3>
            <p className="mt-3 md:mt-4">
              All orders placed through FootMart are subject to acceptance and availability. Prices, promotions, and offers
              may change without notice. Payment must be made in full at the time of purchase. We accept various payment
              methods, and you agree to provide accurate billing information.
            </p>
          </section>
          <section>
            <h3 className="text-lg md:text-xl font-semibold text-gray-800">6. Shipping and Delivery</h3>
            <p className="mt-3 md:mt-4">
              Shipping times are estimates and may vary due to factors beyond our control. FootMart is not liable for delays
              caused by natural disasters, carrier issues, or customs clearance. Risk of loss passes to you upon delivery
              to the carrier.
            </p>
          </section>
          <section>
            <h3 className="text-lg md:text-xl font-semibold text-gray-800">7. Returns and Refunds</h3>
            <p className="mt-3 md:mt-4">
              Returns are accepted within 7 days of delivery for unused and undamaged items. Refunds are processed after we
              receive and inspect the returned goods. Shipping costs for returns are the responsibility of the customer
              unless the return is due to our error.
            </p>
          </section>
          <section>
            <h3 className="text-lg md:text-xl font-semibold text-gray-800">8. Intellectual Property</h3>
            <p className="mt-3 md:mt-4">
              All content, trademarks, logos, and intellectual property displayed on FootMart, including text, graphics,
              and software, are the property of FootMart or its licensors. No part of this site may be reproduced without
              prior written permission.
            </p>
          </section>
          <section>
            <h3 className="text-lg md:text-xl font-semibold text-gray-800">9. Limitation of Liability</h3>
            <p className="mt-3 md:mt-4">
              To the fullest extent permitted by law, FootMart shall not be liable for any direct, indirect, incidental,
              special, or consequential damages resulting from your use of our services or inability to use the platform.
            </p>
          </section>
          <section>
            <h3 className="text-lg md:text-xl font-semibold text-gray-800">10. Indemnification</h3>
            <p className="mt-3 md:mt-4">
              You agree to indemnify and hold harmless FootMart, its affiliates, officers, and employees from any claim
              or demand arising out of your violation of these Terms or infringement of any third-party rights.
            </p>
          </section>
          <section>
            <h3 className="text-lg md:text-xl font-semibold text-gray-800">11. Governing Law</h3>
            <p className="mt-3 md:mt-4">
              These Terms shall be governed by and construed in accordance with the laws of Nepal, without regard to its
              conflict of law provisions. Any dispute arising under these Terms shall be resolved in the courts located
              in Kathmandu.
            </p>
          </section>
          <section>
            <h3 className="text-lg md:text-xl font-semibold text-gray-800">12. Contact Information</h3>
            <p className="mt-3 md:mt-4">
              For questions or concerns regarding these Terms, please contact our customer support at{' '}
              <a href="mailto:support@footmart.com" className="underline">support@footmart.com</a> or call us at{' '}
              <span className="ml-1">+977-1-1234567</span>. Our team is available Monday to Friday, 9:00 AM–6:00 PM NST.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
