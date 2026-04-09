import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMedicineById, findSubstitutes, getSortedPlatformPrices, getCheapestPlatform } from '../services/medicinesDB';
import api from '../services/api';

const PLATFORM_COLORS = {
  'PharmEasy':       { bg: 'bg-orange-50', text: 'text-orange-600', border: 'border-orange-200', dot: 'bg-orange-500' },
  'Tata 1mg':        { bg: 'bg-rose-50',   text: 'text-rose-600',   border: 'border-rose-200',   dot: 'bg-rose-500' },
  'Apollo Pharmacy': { bg: 'bg-sky-50',    text: 'text-sky-600',    border: 'border-sky-200',    dot: 'bg-sky-500' },
  'Netmeds':         { bg: 'bg-violet-50', text: 'text-violet-600', border: 'border-violet-200', dot: 'bg-violet-500' },
  'Blinkit':         { bg: 'bg-yellow-50', text: 'text-yellow-700', border: 'border-yellow-200', dot: 'bg-yellow-500' },
};

const MedicineDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [medicine, setMedicine] = useState(null);
  const [substitutes, setSubstitutes] = useState([]);
  const [platformPrices, setPlatformPrices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addedToCart, setAddedToCart] = useState(false);

  useEffect(() => {
    setLoading(true);
    // Try backend first, fallback to local DB
    api.get(`/api/medicines/${id}`)
      .then(res => {
        setMedicine(res.data);
        return api.get(`/api/medicines/${id}/compare-prices`).catch(() => null);
      })
      .then(pricesRes => {
        if (pricesRes?.data?.length > 0) setPlatformPrices(pricesRes.data);
      })
      .catch(() => {
        // Use local smart DB
        const med = getMedicineById(id);
        if (med) {
          setMedicine(med);
          setPlatformPrices(getSortedPlatformPrices(med));
        }
      })
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    if (medicine) {
      // AI Substitute Finder
      try {
        api.get(`/api/medicines/${id}/substitutes`)
          .then(res => setSubstitutes(res.data?.length > 0 ? res.data : findSubstitutes(medicine)))
          .catch(() => setSubstitutes(findSubstitutes(medicine)));
      } catch {
        setSubstitutes(findSubstitutes(medicine));
      }
    }
  }, [medicine]);

  const addToCart = (med, priceObj = null) => {
    let cart = [];
    try { cart = JSON.parse(localStorage.getItem('pharmazone_cart')) || []; } catch { cart = []; }
    if (!Array.isArray(cart)) cart = [];

    const price = priceObj ? priceObj.price : (getCheapestPlatform(med)?.price || med.price);
    const platform = priceObj ? priceObj.platformName : (getCheapestPlatform(med)?.platformName || 'PharmaZone Direct');

    const existing = cart.findIndex(i => i.id === med.id && i.platform === platform);
    if (existing > -1) cart[existing].quantity += 1;
    else cart.push({ id: med.id, name: med.name, genericName: med.genericName, price, platform, quantity: 1, requiresPrescription: med.requiresPrescription });

    localStorage.setItem('pharmazone_cart', JSON.stringify(cart));
    window.dispatchEvent(new Event('cartUpdated'));
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  if (loading) return (
    <div className="min-h-[70vh] flex flex-col justify-center items-center bg-[#fbfbfb]">
      <svg className="animate-spin h-14 w-14 text-[#F4A522] mb-4" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
      <p className="font-bold text-[#15342C] font-['Outfit'] text-lg animate-pulse">Scanning cross-platform prices & AI alternatives...</p>
    </div>
  );

  if (!medicine) return (
    <div className="min-h-[70vh] flex items-center justify-center bg-[#fbfbfb] p-6">
      <div className="bg-white p-10 rounded-3xl shadow-xl max-w-md w-full text-center border-t-4 border-rose-500">
        <h2 className="text-2xl font-black font-['Outfit'] text-[#15342C] mb-4">Medicine Not Found</h2>
        <button onClick={() => navigate('/search')} className="btn-accent w-full">Back to Search</button>
      </div>
    </div>
  );

  const cheapest = getCheapestPlatform(medicine);
  const savings = cheapest ? Math.round(((medicine.price - cheapest.price) / medicine.price) * 100) : 0;

  return (
    <div className="min-h-screen bg-[#fbfbfb] pb-24">

      {/* ═══ HERO HEADER ════════════════════════════════════════════════ */}
      <section className="bg-[#15342C] pt-32 pb-48 px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#F4A522]/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-20 left-10 w-64 h-64 bg-emerald-700/20 rounded-full blur-[80px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto relative z-10 text-white">
          {/* Breadcrumb */}
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-white/50 hover:text-white text-sm font-bold mb-8 transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            Back to Search
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              {/* Tags */}
              <div className="flex flex-wrap gap-3 mb-6">
                {medicine.requiresPrescription
                  ? <span className="bg-rose-500/20 text-rose-300 border border-rose-500/30 px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase">Rx Required</span>
                  : <span className="bg-teal-500/20 text-teal-300 border border-teal-500/30 px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase">OTC</span>
                }
                <span className="bg-white/10 text-white/80 border border-white/20 px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase">{medicine.category}</span>
                <span className="bg-white/10 text-white/80 border border-white/20 px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase">{medicine.manufacturer}</span>
              </div>

              <h1 className="text-5xl md:text-6xl font-black font-['Outfit'] mb-3 leading-tight">{medicine.name}</h1>
              <p className="text-[#F4A522] text-xl font-bold mb-2">{medicine.salt}</p>
              <p className="text-emerald-100/60 text-sm font-medium mb-8 font-['Inter']"><span className="font-bold text-white/80">Uses:</span> {medicine.uses}</p>

              {/* Price Block */}
              <div className="flex items-end gap-6 mb-8">
                <div>
                  <p className="text-white/40 text-xs font-bold uppercase tracking-widest mb-1">MRP</p>
                  <p className="text-3xl font-black font-['Outfit'] line-through text-white/40">₹{medicine.price}</p>
                </div>
                {cheapest && (
                  <div>
                    <p className="text-[#F4A522] text-xs font-bold uppercase tracking-widest mb-1">Best Price on {cheapest.platformName}</p>
                    <p className="text-6xl font-black font-['Outfit'] text-white">₹{cheapest.price}</p>
                  </div>
                )}
                {savings > 0 && (
                  <div className="bg-[#F4A522] text-[#15342C] px-4 py-2 rounded-2xl font-black text-lg mb-1">
                    Save {savings}%
                  </div>
                )}
              </div>

              <div className="flex gap-4 flex-wrap">
                <button
                  onClick={() => addToCart(medicine)}
                  className={`flex items-center gap-3 px-8 py-4 rounded-full font-black transition-all duration-300 font-['Outfit'] uppercase tracking-wide shadow-lg ${addedToCart ? 'bg-emerald-500 text-white scale-105' : 'bg-[#F4A522] text-[#15342C] hover:bg-[#F39C12] hover:-translate-y-1 shadow-[#F4A522]/30'}`}
                >
                  {addedToCart ? (
                    <><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg> Added!</>
                  ) : (
                    <><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg> Add to Cart (₹{cheapest?.price || medicine.price})</>
                  )}
                </button>
                <button onClick={() => navigate('/search')} className="border-2 border-white/20 text-white hover:border-[#F4A522] hover:text-[#F4A522] px-6 py-4 rounded-full font-bold transition-all font-['Outfit']">
                  Search More
                </button>
              </div>
            </div>

            {/* Right: Salt Info Card */}
            <div className="hidden lg:block">
              <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur">
                <h3 className="text-xs font-black uppercase tracking-widest text-[#F4A522] mb-6">Salt Composition</h3>
                <div className="space-y-4">
                  {medicine.salt?.split('+').map((s, i) => (
                    <div key={i} className="flex items-center gap-4 bg-white/5 rounded-2xl p-4 border border-white/10">
                      <div className="w-10 h-10 rounded-xl bg-[#F4A522]/20 text-[#F4A522] flex items-center justify-center font-black text-lg">{i + 1}</div>
                      <div>
                        <p className="font-bold text-white font-['Outfit']">{s.trim()}</p>
                        <p className="text-white/40 text-xs font-medium">Active Ingredient</p>
                      </div>
                    </div>
                  ))}
                </div>
                {medicine.sideEffects && (
                  <div className="mt-6 pt-6 border-t border-white/10">
                    <p className="text-xs font-black uppercase tracking-widest text-rose-400 mb-2">Side Effects</p>
                    <p className="text-white/60 text-sm font-medium leading-relaxed">{medicine.sideEffects}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 w-full left-0 translate-y-[1px]">
          <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
            <path d="M0 0C360 80 1080 80 1440 0V100H0V0Z" fill="#fbfbfb"/>
          </svg>
        </div>
      </section>

      {/* ═══ LIVE PRICE RADAR ══════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-6 -mt-20 relative z-20 mb-16">
        <div className="bg-white rounded-[2rem] shadow-[0_20px_60px_rgba(0,0,0,0.06)] border border-slate-100 p-8 md:p-12">
          <div className="flex items-center gap-4 mb-10 border-b border-slate-100 pb-6">
            <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
            </div>
            <div>
              <h2 className="text-3xl font-black text-[#15342C] font-['Outfit']">Live Price Radar</h2>
              <p className="text-slate-400 text-sm font-medium">Sorted cheapest first · Updated daily</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
            {platformPrices.map((p, idx) => {
              const colors = PLATFORM_COLORS[p.platformName] || { bg: 'bg-slate-50', text: 'text-slate-600', border: 'border-slate-200', dot: 'bg-slate-500' };
              const discount = p.mrp ? Math.round(((p.mrp - p.price) / p.mrp) * 100) : 0;
              return (
                <div key={idx} className={`relative rounded-2xl border-2 p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer group ${p.isCheapest ? 'border-[#F4A522] shadow-[0_8px_30px_rgba(244,165,34,0.2)]' : `border-slate-100 hover:${colors.border}`}`}
                  onClick={() => addToCart(medicine, p)}>
                  {p.isCheapest && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#F4A522] text-[#15342C] text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-md whitespace-nowrap">
                      🏆 Best Price
                    </div>
                  )}

                  <div>
                    <div className={`w-10 h-10 rounded-xl ${colors.bg} flex items-center justify-center mb-4`}>
                      <span className={`font-black text-sm ${colors.text}`}>{p.platformName.substring(0, 2).toUpperCase()}</span>
                    </div>
                    <p className="font-bold text-[#15342C] text-sm font-['Outfit'] mb-1">{p.platformName}</p>
                    {discount > 0 && (
                      <span className={`text-[10px] font-black ${colors.text} uppercase tracking-widest`}>{discount}% off MRP</span>
                    )}
                    <div className="flex items-end gap-2 mt-3 mb-4">
                      <span className={`text-3xl font-black font-['Outfit'] ${p.isCheapest ? 'text-[#F4A522]' : 'text-[#15342C]'}`}>₹{p.price}</span>
                      {p.mrp && <span className="text-xs text-slate-400 line-through mb-1 font-bold">₹{p.mrp}</span>}
                    </div>
                  </div>

                  <button className={`w-full py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-colors ${p.isCheapest ? 'bg-[#15342C] text-white group-hover:bg-[#F4A522] group-hover:text-[#15342C]' : 'bg-slate-100 text-slate-600 group-hover:bg-slate-200'}`}>
                    Add from here
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══ AI SUBSTITUTES ════════════════════════════════════════════ */}
      {substitutes.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 mb-16">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-xl bg-teal-50 flex items-center justify-center text-teal-600">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
            </div>
            <div>
              <h2 className="text-3xl font-black text-[#15342C] font-['Outfit']">AI Generic Alternatives</h2>
              <p className="text-slate-400 font-medium text-sm">Same active salt · Clinically identical · Sorted by lowest price</p>
            </div>
            <div className="ml-auto bg-teal-50 border border-teal-200 text-teal-700 text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-widest">
              {substitutes.length} Found
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {substitutes.map((sub, idx) => (
              <div
                key={idx}
                onClick={() => navigate(`/medicine/${sub.id}`)}
                className="bg-white rounded-2xl p-6 border-2 border-slate-100 hover:border-teal-400 hover:shadow-[0_15px_40px_rgba(20,184,166,0.15)] transition-all duration-300 hover:-translate-y-2 cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start mb-4">
                    {sub.savings > 0
                      ? <span className="bg-teal-500 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">Save {sub.savings}%</span>
                      : <span className="bg-slate-100 text-slate-500 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">Same Salt</span>
                    }
                    {sub.cheapestPlatform && (
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{sub.cheapestPlatform}</span>
                    )}
                  </div>

                  <h3 className="text-lg font-black text-[#15342C] font-['Outfit'] mb-1">{sub.name}</h3>
                  <p className="text-xs text-slate-400 font-bold mb-1 uppercase tracking-wide">{sub.salt}</p>
                  <p className="text-xs text-slate-400 mb-5">{sub.manufacturer}</p>

                  <div className="flex items-end gap-2">
                    <span className="text-3xl font-black text-[#15342C] font-['Outfit']">₹{sub.cheapestPrice}</span>
                    {sub.savings > 0 && (
                      <span className="text-sm text-slate-400 line-through mb-1 font-bold">₹{medicine.price}</span>
                    )}
                  </div>
                </div>

                <button className="mt-5 w-full py-2.5 rounded-xl bg-slate-50 group-hover:bg-teal-500 group-hover:text-white text-slate-600 text-xs font-black uppercase tracking-widest transition-all duration-300 border border-slate-100 group-hover:border-teal-500">
                  View Details →
                </button>
              </div>
            ))}
          </div>
        </section>
      )}

    </div>
  );
};

export default MedicineDetail;
