import React from 'react';
import { Target, Users, Zap, ShieldCheck, BarChart3, Globe } from 'lucide-react';
import Footer from '../components/Footer';

export const AboutUs = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white overflow-hidden">
      
     
      <div className="flex-grow pt-24 pb-16">
        
        <section className="relative px-6 lg:px-12 py-16 lg:py-24 max-w-7xl mx-auto">
          <div className="text-center">
            <h2 className="text-blue-600 font-bold tracking-wide uppercase text-sm mb-3">Our Mission</h2>
            <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
              Bridging the gap between <br />
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Brands and Creators.
              </span>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Influexa is a premier influencer marketing platform designed to foster authentic 
              partnerships. We empower brands to scale through storytelling and help creators 
              monetize their influence with transparency and ease.
            </p>
          </div>
        </section>

       
        <section className="bg-gray-50 py-16 border-y border-gray-100">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <p className="text-4xl font-bold text-blue-600">50K+</p>
                <p className="text-gray-500 font-medium">Vetted Creators</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-blue-600">1.2k</p>
                <p className="text-gray-500 font-medium">Global Brands</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-blue-600">15M</p>
                <p className="text-gray-500 font-medium">Total Reach</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-blue-600">$5M+</p>
                <p className="text-gray-500 font-medium">Campaign Payouts</p>
              </div>
            </div>
          </div>
        </section>

      
        <section className="px-6 lg:px-12 py-20 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div className="max-w-xl">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Driven by Data, Fueled by Creativity</h2>
              <p className="text-gray-600">We don’t just match names; we match values. Our platform uses advanced analytics to ensure every collaboration hits the target audience.</p>
            </div>
            <button className="mt-6 md:mt-0 px-8 py-3 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition-all shadow-md">
              Join the Movement
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="p-8 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-xl transition-shadow group">
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600 mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <Zap size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">Fast Execution</h3>
              <p className="text-gray-600 leading-relaxed">Launch campaigns in minutes, not weeks. Our streamlined workflow handles everything from discovery to payment.</p>
            </div>

            {/* Card 2 */}
            <div className="p-8 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-xl transition-shadow group">
              <div className="w-12 h-12 bg-indigo-50 rounded-lg flex items-center justify-center text-indigo-600 mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                <ShieldCheck size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">Secure Payments</h3>
              <p className="text-gray-600 leading-relaxed">Escrow-protected payments ensure creators get paid on time and brands get the content they paid for.</p>
            </div>

            {/* Card 3 */}
            <div className="p-8 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-xl transition-shadow group">
              <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center text-purple-600 mb-6 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                <BarChart3 size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">Real-time ROI</h3>
              <p className="text-gray-600 leading-relaxed">Track engagement, clicks, and conversions through our integrated dashboard with precision accuracy.</p>
            </div>
          </div>
        </section>

        
        <section className="px-6 lg:px-12 max-w-7xl mx-auto mb-12">
          <div className="bg-gradient-to-br from-blue-700 to-indigo-900 rounded-3xl p-8 md:p-16 text-center text-white relative overflow-hidden">
          
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/3 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
            
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to scale your influence?</h2>
            <p className="text-blue-100 text-lg mb-10 max-w-xl mx-auto">
              Whether you are a global brand looking for authentic reach or a creator looking to grow, Influexa is your new home.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="px-10 py-4 bg-white text-blue-700 rounded-full font-bold hover:bg-blue-50 transition-colors">
                Brands: Hire Talent
              </button>
              <button className="px-10 py-4 bg-transparent border-2 border-white/50 text-white rounded-full font-bold hover:bg-white/10 transition-colors">
                Creators: Join Us
              </button>
            </div>
          </div>
        </section>
      </div>

      
      <Footer />
      
    </div>
  );
};