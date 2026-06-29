import React, { useState } from 'react';
import { Check, Zap, Crown, Rocket } from 'lucide-react';

export const Pricing = () => {
  const [isAnnual, setIsAnnual] = useState(true);

  const plans = [
    {
      name: "Starter",
      icon: <Zap className="text-blue-500" size={24} />,
      price: isAnnual ? "29" : "39",
      description: "Perfect for small brands starting their influencer journey.",
      features: ["Up to 10 Influencer Matches", "Basic Analytics", "Direct Messaging", "Email Support"],
      buttonText: "Start Free Trial",
      highlight: false
    },
    {
      name: "Pro",
      icon: <Rocket className="text-indigo-600" size={24} />,
      price: isAnnual ? "79" : "99",
      description: "Advanced tools for brands looking to scale rapidly.",
      features: ["Unlimited Matches", "Deep Audience Insights", "Automated Campaign Briefs", "Priority Support", "ROI Tracking Dashboard"],
      buttonText: "Get Started",
      highlight: true
    },
    {
      name: "Enterprise",
      icon: <Crown className="text-purple-600" size={24} />,
      price: "Custom",
      description: "Tailored solutions for global agencies and large teams.",
      features: ["Dedicated Account Manager", "White-label Reports", "API Access", "Custom Contract Terms", "Multi-user Access"],
      buttonText: "Contact Sales",
      highlight: false
    }
  ];

  return (
    <div className="pt-24 pb-20 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 ">
        
       
        <div className="text-center mb-16 mt-8">
          <h2 className="text-blue-600 font-bold uppercase tracking-widest text-sm mb-3">Pricing Plans</h2>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
            Ready to grow your <span className="text-blue-600">influence?</span>
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Choose the plan that works best for your business. No hidden fees. 
            Creators can join for free!
          </p>

          <div className="mt-10 flex items-center justify-center gap-4">
            <span className={`text-sm font-medium ${!isAnnual ? 'text-gray-900' : 'text-gray-500'}`}>Monthly</span>
            <button 
              onClick={() => setIsAnnual(!isAnnual)}
              className="relative w-14 h-7 bg-blue-600 rounded-full transition-colors focus:outline-none"
            >
              <div className={`absolute top-1 left-1 bg-white w-5 h-5 rounded-full transition-transform duration-200 shadow-sm ${isAnnual ? 'translate-x-7' : 'translate-x-0'}`} />
            </button>
            <span className={`text-sm font-medium ${isAnnual ? 'text-gray-900' : 'text-gray-500'}`}>
              Yearly <span className="text-green-500 text-xs ml-1 bg-green-100 px-2 py-0.5 rounded-full">Save 20%</span>
            </span>
          </div>
        </div>

        
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div 
              key={index}
              className={`relative p-8 rounded-3xl bg-white transition-all duration-300 hover:-translate-y-2 ${
                plan.highlight 
                ? "border-2 border-blue-600 shadow-xl scale-105 z-10" 
                : "border border-gray-200 shadow-sm"
              }`}
            >
              {plan.highlight && (
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-bold uppercase tracking-tighter">
                  Most Popular
                </span>
              )}

              <div className="mb-6 flex items-center gap-3">
                {plan.icon}
                <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
              </div>

              <div className="mb-6">
                <span className="text-5xl font-bold text-gray-900">
                  {plan.price === "Custom" ? "" : "$"}
                  {plan.price}
                </span>
                {plan.price !== "Custom" && <span className="text-gray-500 ml-2">/mo</span>}
              </div>

              <p className="text-gray-600 mb-8 min-h-[50px]">{plan.description}</p>

              <ul className="space-y-4 mb-10">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-gray-700">
                    <div className="mt-1 bg-blue-100 rounded-full p-0.5">
                      <Check size={14} className="text-blue-600" />
                    </div>
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <button className={`w-full py-4 rounded-xl font-bold transition-all ${
                plan.highlight 
                ? "bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-200" 
                : "bg-gray-100 text-gray-800 hover:bg-gray-200"
              }`}>
                {plan.buttonText}
              </button>
            </div>
          ))}
        </div>

        {/* --- Creator Note --- */}
        <div className="mt-20 p-8 bg-blue-50 rounded-2xl border border-blue-100 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <h4 className="text-xl font-bold text-blue-900">Are you a Content Creator?</h4>
            <p className="text-blue-700 mt-1">Join our network for free and start getting brand deals today.</p>
          </div>
          <button className="px-8 py-3 bg-white text-blue-600 border border-blue-200 rounded-full font-bold hover:shadow-md transition-all">
            Apply as Creator
          </button>
        </div>

      </div>
    </div>
  );
};