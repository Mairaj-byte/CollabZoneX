import React from "react";
import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import hero from '../assets/hero_img.png';
import { Link, NavLink } from 'react-router-dom'
import { useNavigate } from "react-router-dom";






const LandingPage = () => {

  const navigate = useNavigate();
  const { token, identity, logout } = useContext(ShopContext);

  const handleGetStarted = () => {
  if (!token) {
    navigate("/signinpage");
    return;
  }

  if (identity === "brand") {
    navigate("/influlist");
  } else if (identity === "creator") {
    navigate("/brandlist");
  }
};


  



  return (

    <div className="top-0 bg-gray-50 text-gray-900">
      

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-8 py-20 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-5xl black leading-tight">
            Connect Brands with <span className="text-blue-600">Influencers</span> That Convert
          </h2>
          <p className="mt-6 text-lg text-gray-600">
            Discover creators, manage campaigns, and track ROI — all in one
            influencer marketing platform.
          </p>
          <div className="mt-8 flex gap-4">
            <button onClick={handleGetStarted} className="bg-blue-600 text-white px-5 py-2 rounded-xl text-lg hover:bg-blue-700">
              For Brands
            </button>
            <button onClick={handleGetStarted} className="border border-gray-300 px-5 py-2 rounded-xl text-lg hover:border-blue-600 hover:text-blue-600">
              For Creators
            </button>
          </div>
        </div>

        {/* Hero Visual */}
        <div className="rounded-3xl h-96 flex items-center justify-center text-blue-600 text-2xl font-bold">
          <img src={hero} alt="hero image" />
        </div>
      </section>

      {/* Features */}
      <section className="bg-gray-50 py-24">
        <div className="max-w-7xl mx-auto px-8 text-center">
          <h3 className="text-4xl font-bold">Why Influexa?</h3>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Built for performance-driven influencer marketing.
          </p>

          <div className="mt-16 grid md:grid-cols-3 gap-10">
            {[
              {
                title: "Smart Matching",
                desc: "AI-powered creator discovery tailored to your brand niche.",
              },
              {
                title: "Campaign Management",
                desc: "Chat, contracts, payments, and approvals in one dashboard.",
              },
              {
                title: "Real-Time Analytics",
                desc: "Track engagement, conversions, and ROI instantly.",
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="bg-white p-8 rounded-2xl shadow hover:shadow-lg transition"
              >
                <h4 className="text-xl font-semibold mb-4">
                  {feature.title}
                </h4>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 max-w-7xl mx-auto px-8">
        <h3 className="text-4xl font-bold text-center">How It Works</h3>

        <div className="mt-16 grid md:grid-cols-3 gap-12 text-center">
          <div>
            <div className="text-blue-600 text-4xl font-bold mb-4">1</div>
            <h4 className="text-xl font-semibold">Create a Campaign</h4>
            <p className="text-gray-600 mt-2">
              Define goals, budget, and audience.
            </p>
          </div>

          <div>
            <div className="text-blue-600 text-4xl font-bold mb-4">2</div>
            <h4 className="text-xl font-semibold">Collaborate</h4>
            <p className="text-gray-600 mt-2">
              Match and communicate with top creators.
            </p>
          </div>

          <div>
            <div className="text-blue-600 text-4xl font-bold mb-4">3</div>
            <h4 className="text-xl font-semibold">Measure Results</h4>
            <p className="text-gray-600 mt-2">
              Track performance and scale winners.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-blue-600 py-24 text-center text-white">
        <h3 className="text-4xl font-bold">
          Ready to Scale with Influencer Marketing?
        </h3>
        <p className="mt-4 text-lg opacity-90">
          Join brands and creators growing together on Influexa.
        </p>
        <button className="mt-8 bg-white text-blue-600 px-10 py-4 rounded-xl text-lg font-semibold hover:bg-gray-100">
          Start Free Today
        </button>
      </section>

      
    </div>
  );
};

export default LandingPage;


