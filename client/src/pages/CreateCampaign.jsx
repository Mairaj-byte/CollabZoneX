import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const CreateCampaign = () => {
  const { id } = useParams();

  const initialState = {
    influencerId: id,
    title: "",
    description: "",
    platform: "Instagram",
    totalBudget: "",
    advanceAmount: "",
    finalAmount: "",
  };

  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (
      Number(form.advanceAmount) + Number(form.finalAmount) !==
      Number(form.totalBudget)
    ) {
      setErrorMessage(" Advance + Final Amount must equal the Total Budget");
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:4000/api/campaign/create",
        {
          influencerId: id,
          title: form.title,
          description: form.description,
          platform: form.platform,
          totalBudget: Number(form.totalBudget),
          advanceAmount: Number(form.advanceAmount),
          finalAmount: Number(form.finalAmount),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSuccessMessage("Campaign Created Successfully!");
      setForm(initialState);
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 sm:p-6 md:p-10 mt-20">
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 p-6 sm:p-8 md:p-10 transition-all duration-300">
        
        
        <div className="mb-8 text-center sm:text-left">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            Create Campaign
          </h2>
          <p className="text-slate-500 mt-1.5 text-sm sm:text-base">
            Fill in the key parameters to launch your next influencer collaboration.
          </p>
        </div>

      
        {errorMessage && (
          <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-100 text-rose-700 text-sm font-medium animate-fade-in">
            {errorMessage}
          </div>
        )}
        {successMessage && (
          <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-700 text-sm font-medium animate-fade-in">
            {successMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {}
            <div className="flex flex-col space-y-1.5">
              <label className="text-xs font-semibold tracking-wider text-slate-700 uppercase">
                Campaign Title
              </label>
              <input
                type="text"
                name="title"
                required
                value={form.title}
                onChange={handleChange}
                placeholder="e.g. Summer Collection Launch"
                className="w-full px-4 py-3 text-sm rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 focus:outline-none transition-all placeholder:text-slate-400 bg-slate-50/50"
              />
            </div>

            {}
            <div className="flex flex-col space-y-1.5">
              <label className="text-xs font-semibold tracking-wider text-slate-700 uppercase">
                Target Platform
              </label>
              <div className="relative">
                <select
                  name="platform"
                  value={form.platform}
                  onChange={handleChange}
                  className="w-full appearance-none px-4 py-3 text-sm rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 focus:outline-none transition-all bg-slate-50/50 pr-10 text-slate-800"
                >
                  <option value="Instagram">Instagram</option>
                  <option value="YouTube">YouTube</option>
                  <option value="TikTok">TikTok</option>
                  <option value="Twitter/X">Twitter/X</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                </div>
              </div>
            </div>

            
            <div className="md:col-span-2 flex flex-col space-y-1.5">
              <label className="text-xs font-semibold tracking-wider text-slate-700 uppercase">
                Campaign Deliverables & Description
              </label>
              <textarea
                name="description"
                required
                rows="4"
                value={form.description}
                onChange={handleChange}
                placeholder="Detail the scope of work, content types, usage rights, and performance goals..."
                className="w-full px-4 py-3 text-sm rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 focus:outline-none transition-all resize-none placeholder:text-slate-400 bg-slate-50/50"
              />
            </div>
          </div>

         
          <div className="relative py-2">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div className="w-full border-t border-slate-100"></div>
            </div>
            <div className="relative flex justify-start">
              <span className="bg-white pr-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
                Budget Allocation
              </span>
            </div>
          </div>

         
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
           
            <div className="flex flex-col space-y-1.5">
              <label className="text-xs font-semibold tracking-wider text-slate-700 uppercase">
                Total Budget
              </label>
              <div className="relative rounded-xl shadow-sm">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                  <span className="text-slate-400 text-sm">₹</span>
                </div>
                <input
                  type="number"
                  name="totalBudget"
                  required
                  min="0"
                  value={form.totalBudget}
                  onChange={handleChange}
                  placeholder="0.00"
                  className="w-full pl-8 pr-4 py-3 text-sm rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 focus:outline-none transition-all bg-slate-50/50 font-medium"
                />
              </div>
            </div>

            
            <div className="flex flex-col space-y-1.5">
              <label className="text-xs font-semibold tracking-wider text-slate-700 uppercase">
                Advance Amount
              </label>
              <div className="relative rounded-xl shadow-sm">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                  <span className="text-slate-400 text-sm">₹</span>
                </div>
                <input
                  type="number"
                  name="advanceAmount"
                  required
                  min="0"
                  value={form.advanceAmount}
                  onChange={handleChange}
                  placeholder="0.00"
                  className="w-full pl-8 pr-4 py-3 text-sm rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 focus:outline-none transition-all bg-slate-50/50 font-medium"
                />
              </div>
            </div>

           
            <div className="flex flex-col space-y-1.5 sm:col-span-1">
              <label className="text-xs font-semibold tracking-wider text-slate-700 uppercase">
                Final Amount
              </label>
              <div className="relative rounded-xl shadow-sm">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                  <span className="text-slate-400 text-sm">₹</span>
                </div>
                <input
                  type="number"
                  name="finalAmount"
                  required
                  min="0"
                  value={form.finalAmount}
                  onChange={handleChange}
                  placeholder="0.00"
                  className="w-full pl-8 pr-4 py-3 text-sm rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 focus:outline-none transition-all bg-slate-50/50 font-medium"
                />
              </div>
            </div>
          </div>

          
          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-medium text-sm py-3.5 px-4 rounded-xl shadow-lg shadow-indigo-600/10 hover:shadow-indigo-600/20 transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Processing...</span>
                </>
              ) : (
                <span>Launch Campaign</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCampaign;