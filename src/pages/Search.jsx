import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Search = () => {
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [results, setResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const ALL_MEDICINE_NAMES = [
    'Tamoxifen 20mg', 'Pantocid 40', 'Atorva 10', 'Voveran SR 100', 'Augmentin 625 Duo', 
    'Metformin 500', 'Januvia 100', 'Zincovit', 'Neurobion Forte', 'Shelcal 500', 
    'Nexito 10', 'Clotrimazole Cream', 'Cystone', 'Dytor 10', 'Istamet 50/500',
    'Aspirin 75', 'Digene Gel', 'Ticagrelor 90', 'Erlotinib 150', 'Ultracet'
  ];

  const mockMedicines = [
    { 
      id: 'm-diabetes', 
      name: 'Metformin 500mg', 
      genericName: 'Metformin Hydrochloride', 
      use: 'First-line medication for the treatment of type 2 diabetes, particularly in overweight people.',
      saltAnalysis: 'Biguanide antihyperglycemic agent that improves glucose tolerance and lowers basal plasma glucose.',
      requiresPrescription: true,
      platforms: [
        { name: 'PharmEasy', price: 15, discount: '10%', delivery: '2 hrs' },
        { name: 'Tata 1mg', price: 18, discount: '5%', delivery: 'Today' }
      ],
      substitutes: [{ name: 'Metformin (Generic)', price: 7, saving: '53% Less' }, { name: 'Glycomet 500', price: 14, saving: '10% Less' }]
    },
    { 
      id: 'm-neuro', 
      name: 'Neurobion Forte', 
      genericName: 'Vitamin B-Complex', 
      use: 'Used to treat Vitamin B deficiency and help in maintaining healthy nerves and red blood cells.',
      saltAnalysis: 'Combination of B1, B6, and B12 vitamins essential for neural metabolism.',
      requiresPrescription: false,
      platforms: [
        { name: 'Apollo', price: 34, discount: '0%', delivery: '1 hr' },
        { name: 'Blinkit', price: 38, discount: '0%', delivery: '10 mins' }
      ],
      substitutes: [{ name: 'Vitamin B-Complex (Generic)', price: 8, saving: '76% Less' }]
    },
    { 
      id: 'm-skin', 
      name: 'Clotrimazole Cream', 
      genericName: 'Clotrimazole 1%', 
      use: 'Used to treat fungal skin infections like athlete\'s foot, ringworm, and fungal sweat rash.',
      saltAnalysis: 'Imidazole antifungal agent that inhibits the growth of pathogenic dermatophytes.',
      requiresPrescription: false,
      platforms: [
        { name: 'Netmeds', price: 75, discount: '12%', delivery: 'Tomorrow' },
        { name: 'Tata 1mg', price: 82, discount: '5%', delivery: 'Today' }
      ],
      substitutes: [{ name: 'Clotrimazole (Generic)', price: 22, saving: '73% Less' }, { name: 'Candid Cream', price: 68, saving: '15% Less' }]
    },
    { 
      id: 'm-kidney', 
      name: 'Cystone Tablet', 
      genericName: 'Herbal/Ayurvedic Extract', 
      use: 'Used for the treatment of kidney stones and preventing recurrence. Supports urinary tract health.',
      saltAnalysis: 'Contains Pasanabheda and Shilapushpa which help in disintegrating stones.',
      requiresPrescription: false,
      platforms: [
        { name: 'Himalaya Store', price: 145, discount: '5%', delivery: 'Today' },
        { name: 'PharmEasy', price: 138, discount: '10%', delivery: 'Tomorrow' }
      ],
      substitutes: [{ name: 'Punarnava Extract', price: 85, saving: '40% Less' }]
    },
    { 
      id: 'm-mental', 
      name: 'Nexito 10mg', 
      genericName: 'Escitalopram', 
      use: 'Used to treat depression and anxiety disorders. Helps in restoring serotonin balance in the brain.',
      saltAnalysis: 'Selective Serotonin Reuptake Inhibitor (SSRI) with high affinity for the primary binding site.',
      requiresPrescription: true,
      platforms: [
        { name: 'Tata 1mg', price: 98, discount: '10%', delivery: 'Today' },
        { name: 'Netmeds', price: 92, discount: '15%', delivery: 'Tomorrow' }
      ],
      substitutes: [{ name: 'Escitalopram (Generic)', price: 32, saving: '67% Less' }, { name: 'Cilentra 10', price: 85, saving: '12% Less' }]
    },
    { 
        id: 'm-heart', 
        name: 'Atorva 10mg', 
        genericName: 'Atorvastatin', 
        use: 'Used to lower "bad" cholesterol and reduce heart attack risk.',
        saltAnalysis: 'Statins class of drugs that block the enzyme needed for cholesterol production.',
        requiresPrescription: true,
        platforms: [{ name: 'PharmEasy', price: 92, discount: '20%', delivery: '2 hrs' }, { name: 'Apollo', price: 105, discount: '10%', delivery: '3 hrs' }],
        substitutes: [{ name: 'Atorvastatin (Generic)', price: 34, saving: '63% Less' }]
    },
    { 
        id: 'm-cancer', 
        name: 'Tamoxifen 20mg', 
        genericName: 'Tamoxifen Citrate', 
        use: 'Used primarily to treat breast cancer.',
        saltAnalysis: 'Estrogen receptor modulator.',
        requiresPrescription: true,
        platforms: [{ name: 'Netmeds', price: 1380, discount: '15%', delivery: 'Tomorrow' }],
        substitutes: [{ name: 'Tamoxifen (Generic)', price: 420, saving: '70% Less' }]
    },
    {
        id: 'm-acidity',
        name: 'Pantocid 40',
        genericName: 'Pantoprazole',
        use: 'Treats acidity and heartburn.',
        saltAnalysis: 'Proton Pump Inhibitor.',
        requiresPrescription: false,
        platforms: [{ name: 'Blinkit', price: 145, discount: '5%', delivery: '15 mins' }],
        substitutes: [{ name: 'Pantoprazole (Generic)', price: 42, saving: '71% Less' }]
    }
  ];

  useEffect(() => {
    if (searchParams.get('q')) {
      handleSearch(null, searchParams.get('q'));
    }
  }, [searchParams]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setShowSuggestions(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e, q = query) => {
    if (e) e.preventDefault();
    if (!q.trim()) return;
    setSearching(true);
    setShowSuggestions(false);
    setResults([]);
    setTimeout(() => {
      const filtered = mockMedicines.filter(m => 
        m.name.toLowerCase().includes(q.toLowerCase()) || 
        m.genericName.toLowerCase().includes(q.toLowerCase()) ||
        m.id.includes(q.toLowerCase())
      );
      setResults(filtered.length > 0 ? filtered : [mockMedicines[0]]);
      setSearching(false);
    }, 1000);
  };

  const addToCart = (med, platform) => {
    const cart = JSON.parse(localStorage.getItem('pharmazone_cart') || '[]');
    cart.push({ id: med.id, name: med.name, genericName: med.genericName, requiresPrescription: med.requiresPrescription, price: platform.price, platform: platform.name, quantity: 1 });
    localStorage.setItem('pharmazone_cart', JSON.stringify(cart));
    window.dispatchEvent(new Event('cartUpdated'));
    alert(`${med.name} via ${platform.name} added!`);
  };

  const filteredSuggestions = ALL_MEDICINE_NAMES.filter(m => m.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="min-h-screen bg-[#fbfbfb] selection:bg-[#F4A522] selection:text-[#15342C]">
      
      <section className="bg-[#15342C] pt-40 pb-20 px-6">
        <div className="max-w-7xl mx-auto px-4 md:px-10 overflow-visible relative" ref={dropdownRef}>
           <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-black text-white font-['Outfit'] mb-8 tracking-tighter">Universal Medicine <span className="text-[#F4A522]">Search.</span></h1>
              <form onSubmit={handleSearch} className="relative z-50 flex bg-white rounded-2xl overflow-hidden shadow-3xl">
                 <input 
                   type="text" value={query} onFocus={() => setShowSuggestions(true)}
                   onChange={(e) => setQuery(e.target.value)}
                   placeholder="Search (e.g. Diabetes, Skin, Neuro, Kidney)..."
                   className="w-full py-6 px-10 text-xl font-bold text-[#15342C] focus:outline-none"
                 />
                 <button className="bg-[#15342C] text-[#F4A522] px-12 font-black uppercase text-sm">Analyze</button>
              </form>
              {showSuggestions && (
                <div className="absolute top-[105%] left-0 right-0 max-w-2xl mx-auto bg-white rounded-3xl shadow-3xl border border-slate-100 overflow-hidden z-[60] text-left animate-fade-in-up">
                   <div className="p-4 bg-slate-50 border-b border-slate-100 text-[10px] font-black text-slate-400 uppercase tracking-widest">Global Pharma Data</div>
                   {filteredSuggestions.map((m, i) => (
                     <div key={i} onClick={() => {setQuery(m); handleSearch(null, m);}} className="px-10 py-5 hover:bg-slate-50 cursor-pointer font-bold text-[#15342C] flex items-center gap-4 group">
                       <span className="opacity-30 group-hover:opacity-100">💊</span> {m}
                     </div>
                   ))}
                </div>
              )}
           </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-20">
         {searching ? (
           <div className="flex flex-col items-center py-20"><div className="w-12 h-12 border-4 border-[#15342C] border-t-[#F4A522] rounded-full animate-spin mb-4"></div><p className="text-[#15342C] font-black uppercase tracking-widest text-[10px]">Scanning Global Gene Database...</p></div>
         ) : results.length > 0 ? (
           <div className="space-y-24">
              {results.map((med) => {
                const cheapest = [...med.platforms].sort((a,b) => a.price - b.price)[0];
                return (
                  <div key={med.id} className="animate-fade-in-up">
                    <div className="bg-white rounded-[4rem] p-12 shadow-2xl border border-slate-100 mb-8 overflow-hidden">
                       <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                          <div className="lg:col-span-8">
                             <div className="flex flex-wrap items-center gap-4 mb-4">
                               {med.requiresPrescription && <span className="bg-rose-500 text-white text-[9px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest">Rx Required</span>}
                               <span className="bg-emerald-500/10 text-emerald-600 text-[9px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest">Molecule Verified</span>
                             </div>
                             <h3 className="text-5xl font-black text-[#15342C] font-['Outfit'] mb-3 tracking-tight">{med.name}</h3>
                             <p className="text-slate-400 font-bold uppercase text-[10px] tracking-[0.3em] mb-10">{med.genericName}</p>
                             
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100 h-full">
                                   <div className="flex items-center gap-3 mb-4"><span className="text-2xl">⚡</span> <h5 className="font-black text-[#15342C] text-[10px] uppercase tracking-widest">Description & Usage</h5></div>
                                   <p className="text-slate-500 text-sm font-medium leading-relaxed">{med.use}</p>
                                </div>
                                <div className="bg-indigo-50/30 p-8 rounded-[2.5rem] border border-indigo-100/50 text-indigo-900/60 h-full">
                                   <div className="flex items-center gap-3 mb-4"><span className="text-2xl">🧪</span> <h5 className="font-black text-indigo-800 text-[10px] uppercase tracking-widest">Salt Combination</h5></div>
                                   <p className="text-sm font-medium leading-relaxed italic leading-relaxed">{med.saltAnalysis}</p>
                                </div>
                             </div>
                          </div>
                          
                          <div className="lg:col-span-4 self-stretch flex">
                             <div className="w-full bg-[#15342C] p-12 rounded-[3.5rem] flex flex-col items-center justify-center text-center text-white relative overflow-hidden shadow-[0_30px_60px_rgba(21,52,44,0.3)]">
                                <div className="absolute top-0 right-0 w-40 h-40 bg-[#F4A522]/10 rounded-full blur-3xl"></div>
                                <p className="text-[#F4A522] text-[10px] font-black uppercase tracking-[0.3em] mb-4">Best Market Price</p>
                                <p className="text-7xl font-black font-['Outfit'] mb-3 tracking-tighter">₹{cheapest.price}</p>
                                <p className="text-white/40 text-[11px] font-black uppercase tracking-widest">via {cheapest.name}</p>
                                <div className="flex flex-wrap items-center gap-4 mt-6 pt-6 border-t border-slate-100">
                                  <button 
                                    onClick={() => {
                                      const text = `PharmaZone Report: ${med.name} (${med.genericName}) is cheapest on ${cheapest.name} at ₹${cheapest.price}. Check generic substitutes to save more!`;
                                      window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
                                    }}
                                    className="flex items-center gap-2 text-emerald-600 font-black text-[10px] uppercase tracking-widest hover:text-[#15342C] transition-colors"
                                  >
                                    <span className="text-lg">💬</span> Share Comparison
                                  </button>
                               </div>
                             </div>
                          </div>
                       </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                       <div className="lg:col-span-7 bg-white rounded-[3rem] shadow-xl border border-slate-100 overflow-hidden">
                          <div className="p-8 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
                             <h6 className="font-black text-[#15342C] uppercase text-xs tracking-widest italic">Live Platform Comparison</h6>
                             <div className="flex items-center gap-2"><span className="text-emerald-500 text-[9px] font-black uppercase">Live</span><span className="bg-emerald-500 w-1.5 h-1.5 rounded-full animate-ping"></span></div>
                          </div>
                          <div className="divide-y divide-slate-50">
                             {med.platforms.map((p, i) => (
                               <div key={i} className={`p-8 grid grid-cols-12 items-center gap-4 hover:bg-slate-50/50 transition-colors ${p.price === cheapest.price ? 'bg-emerald-50/30' : ''}`}>
                                  <div className="col-span-4"><h6 className="font-black text-[#15342C] text-lg">{p.name}</h6><p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{p.delivery}</p></div>
                                  <div className="col-span-3 text-3xl font-black text-[#15342C] font-['Outfit'] tracking-tight">₹{p.price}</div>
                                  <div className="col-span-5 text-right"><button onClick={() => addToCart(med, p)} className={`px-10 py-4 rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] transition-all ${p.price === cheapest.price ? 'bg-[#15342C] text-[#F4A522] shadow-2xl hover:scale-105' : 'bg-slate-100 text-slate-400'}`}>{p.price === cheapest.price ? 'Loot Deal' : 'Select'}</button></div>
                               </div>
                             ))}
                          </div>
                       </div>
                       
                       <div className="lg:col-span-5 bg-[#fff8ef] rounded-[3rem] shadow-xl border border-[#F4A522]/20 p-10">
                          <div className="flex items-center gap-3 mb-10"><span className="text-3xl">🌩️</span> <h5 className="font-black text-[#15342C] uppercase text-xs tracking-widest">SmartSwitch™ Generic Match</h5></div>
                          <div className="space-y-4">
                             {med.substitutes.map((s, i) => (
                               <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-[#F4A522]/10 flex justify-between items-center group shadow-sm hover:shadow-2xl transition-all">
                                  <div className="flex-1"><h6 className="font-black text-[#15342C] text-xl tracking-tight">{s.name}</h6><p className="bg-emerald-50 text-emerald-600 font-black text-[10px] uppercase tracking-widest px-3 py-1 rounded-full w-fit mt-3">{s.saving} Saved</p></div>
                                  <div className="text-right"><p className="text-4xl font-black text-[#15342C] font-['Outfit'] tracking-tight">₹{s.price}</p><button onClick={() => {setQuery(s.name); handleSearch(null, s.name);}} className="mt-2 text-[11px] font-black uppercase text-[#F4A522] tracking-widest">Compare →</button></div>
                               </div>
                             ))}
                          </div>
                       </div>
                    </div>
                  </div>
                );
              })}
           </div>
         ) : (
           <div className="text-center py-20 opacity-30 font-black uppercase tracking-[0.4em] text-sm italic">Universal Scan Online. Type to start.</div>
         )}
      </section>
    </div>
  );
};

export default Search;
