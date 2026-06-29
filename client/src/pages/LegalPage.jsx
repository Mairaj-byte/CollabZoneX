import React, { useState } from 'react';
import { Shield, FileText, Lock, Eye, Scale, HelpCircle, ChevronRight, Mail } from 'lucide-react';

export const LegalPage = () => {
  const [activeTab, setActiveTab] = useState('privacy');

  const TabButton = ({ id, label, icon: Icon }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`flex items-center gap-3 px-6 py-4 text-sm font-bold transition-all border-b-2 ${
        activeTab === id
          ? 'border-blue-600 text-blue-600 bg-blue-50/50'
          : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
      }`}
    >
      <Icon size={18} />
      {label}
    </button>
  );

  return (
    <div className="pt-24 pb-16 bg-white min-h-screen">
      
      <section className="px-6 lg:px-12 py-12 max-w-7xl mx-auto text-center">
        <h2 className="text-blue-600 font-bold tracking-wide uppercase text-sm mb-3">Legal Center</h2>
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
          Trust & <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Transparency.</span>
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          We believe in clear, simple, and honest communication. Below you'll find everything you need to know about how we handle your data and our platform rules.
        </p>
      </section>

     
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex border-b border-gray-100 mb-12">
          <TabButton id="privacy" label="Privacy Policy" icon={Shield} />
          <TabButton id="terms" label="Terms of Service" icon={Scale} />
        </div>

        <div className="grid lg:grid-cols-4 gap-12">
          
          <aside className="hidden lg:block space-y-6">
            <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100">
              <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <HelpCircle size={18} className="text-blue-600" /> Need Help?
              </h4>
              <p className="text-sm text-gray-600 mb-4">
                Have questions about our legal terms? Our team is here to help.
              </p>
              <a href="mailto:legal@influexa.com" className="flex items-center gap-2 text-blue-600 font-semibold text-sm hover:underline">
                <Mail size={16} /> Contact Legal Team
              </a>
            </div>
          </aside>

          
          <div className="lg:col-span-3 prose prose-blue max-w-none text-gray-600">
            {activeTab === 'privacy' ? (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Data Collection</h2>
                  <p>
                    At Influexa, we collect information to provide better services to all our users. This includes:
                  </p>
                  <ul className="list-disc pl-5 mt-4 space-y-2">
                    <li><strong>Account Information:</strong> Name, email, and social media handles.</li>
                    <li><strong>Creator Data:</strong> Engagement metrics, audience demographics, and content history.</li>
                    <li><strong>Payment Data:</strong> Billing details processed securely via our payment partners.</li>
                  </ul>
                </section>

                <section className="p-6 bg-blue-50 rounded-2xl border border-blue-100">
                  <h3 className="text-blue-900 font-bold mb-2 flex items-center gap-2">
                    <Lock size={20} /> Your Privacy First
                  </h3>
                  <p className="text-blue-800/80 text-sm">
                    We never sell your personal data to third parties. Your information is used strictly for facilitating brand-creator collaborations.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">2. How We Use Data</h2>
                  <p>We use the information we collect to:</p>
                  <div className="grid md:grid-cols-2 gap-4 mt-4">
                    {[
                      'Match brands with relevant creators',
                      'Process secure escrow payments',
                      'Generate real-time ROI reports',
                      'Prevent fraudulent activity'
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-2 p-3 bg-white border border-gray-100 rounded-lg shadow-sm">
                        <ChevronRight size={16} className="text-blue-600" />
                        <span className="text-sm font-medium">{item}</span>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            ) : (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Platform Usage</h2>
                  <p>
                    By using Influexa, you agree to provide accurate information and maintain the security of your account credentials.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Payment & Escrow</h2>
                  <p>
                    All campaign funds are held in a secure escrow account. Funds are released to the Creator only after the Brand approves the deliverables or the dispute period expires.
                  </p>
                </section>

                <div className="p-8 bg-gradient-to-br from-gray-900 to-blue-900 rounded-2xl text-white">
                  <h3 className="text-xl font-bold mb-4">Content Standards</h3>
                  <p className="text-blue-100/80 mb-4 text-sm leading-relaxed">
                    Creators must disclose "Paid Partnerships" in accordance with FTC guidelines. Any fraudulent engagement (bots, fake likes) will result in immediate account termination.
                  </p>
                  <button className="text-sm font-bold bg-white text-blue-900 px-4 py-2 rounded-lg">
                    Read Full Guidelines
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

     
      <section className="px-6 lg:px-12 max-w-7xl mx-auto mt-20">
        <div className="bg-gray-50 border border-gray-100 rounded-3xl p-8 md:p-12 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Still have questions?</h3>
          <p className="text-gray-600 mb-8 max-w-lg mx-auto">
            Our support team is available 24/7 to help you understand our terms and how we protect your brand.
          </p>
          <button className="px-8 py-3 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition-all">
            Get in Touch
          </button>
        </div>
      </section>
    </div>
  );
};