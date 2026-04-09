import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import PriceRadar from '../components/PriceRadar';
import { jsPDF } from "jspdf";

const Landing = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const dropdownRef = useRef(null);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeModal, setActiveModal] = useState(null); 
  const [uploadStatus, setUploadStatus] = useState('idle'); 
  const [selectedFile, setSelectedFile] = useState(null);
  
  const [slangIndex, setSlangIndex] = useState(0);
  const slangs = [
    { main: "Sasti Dawai,", sub: "Asli Kamai.", accent: "text-[#F4A522]" },
    { main: "Paisa Vasool,", sub: "Swasthya Cool.", accent: "text-emerald-400" },
    { main: "Loot Band,", sub: "Health Grand.", accent: "text-[#F4A522]" },
    { main: "Smart Switch,", sub: "Save Huge.", accent: "text-emerald-400" },
    { main: "Dawai Wahi,", sub: "Daam Sahi.", accent: "text-[#F4A522]" }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setSlangIndex(prev => (prev + 1) % slangs.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const ALL_MEDICINES = [
    'Dolo 650', 'Augmentin 625 Duo', 'Allegra 120mg', 'Combiflam', 'Pantop 40', 
    'Telma 40', 'Shelcal 500', 'Thyronorm', 'Glycomet GP', 'Azithral 500'
  ];

  const filteredSuggestions = ALL_MEDICINES.filter(m => m.toLowerCase().includes(searchQuery.toLowerCase()));

  const handleSearchSubmit = (e, q = searchQuery) => {
    if (e) e.preventDefault();
    if (q.trim()) navigate(`/search?q=${q}`);
  };

  const onFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setUploadStatus('uploading');
      setTimeout(() => {
        setUploadStatus('done');
        setTimeout(() => { setActiveModal(null); setUploadStatus('idle'); setSelectedFile(null); }, 2000);
      }, 3000);
    }
  };

  return (
    <div className="min-h-screen bg-[#fbfbfb] selection:bg-[#F4A522] selection:text-[#15342C]">
      <Navbar />

      <section className="relative pt-32 pb-40 overflow-hidden bg-[#15342C]">
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-[#F4A522]/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center lg:text-left">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="animate-fade-in-up">
              <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full mb-8">
                <span className="w-2 h-2 bg-[#F4A522] rounded-full animate-ping"></span>
                <span className="text-white font-black text-[10px] uppercase tracking-widest font-['Outfit']">Direct Savings Hub</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-black text-white font-['Outfit'] leading-tight mb-8 tracking-tighter h-[2.5em]">
                <div key={slangIndex} className="animate-fade-in-up">
                   {slangs[slangIndex].main}<br/>
                   <span className={slangs[slangIndex].accent}>{slangs[slangIndex].sub}</span>
                </div>
              </h1>
              
              <div className="relative mb-12 max-w-2xl mx-auto lg:mx-0" ref={dropdownRef}>
                <form onSubmit={handleSearchSubmit} className="relative z-50 flex bg-white rounded-2xl shadow-3xl overflow-hidden">
                   <input
                      type="text" value={searchQuery}
                      onFocus={() => setShowSuggestions(true)}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search medicine (e.g. Dolo)..."
                      className="w-full py-5 px-8 text-lg font-bold text-[#15342C] focus:outline-none"
                    />
                    <button type="submit" className="bg-[#15342C] text-[#F4A522] px-10 font-black uppercase text-xs">Search</button>
                </form>
                {showSuggestions && (
                  <div className="absolute top-[110%] left-0 right-0 bg-white rounded-3xl shadow-3xl border border-slate-100 overflow-hidden z-[60] text-left">
                    <div className="p-4 bg-slate-50 border-b border-slate-100 text-[10px] font-black text-slate-400 uppercase tracking-widest">Trending Molecules</div>
                    {filteredSuggestions.map((med, i) => (
                      <div key={i} onClick={() => handleSearchSubmit(null, med)} className="px-8 py-4 hover:bg-slate-50 cursor-pointer flex items-center gap-4 group">
                         <span className="opacity-30 group-hover:opacity-100">💊</span>
                         <h5 className="font-bold text-[#15342C] group-hover:text-[#F4A522]">{med}</h5>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <p className="text-emerald-100/70 text-lg font-['Inter'] leading-relaxed max-w-lg mb-4 mx-auto lg:mx-0">Join 50k+ families saving 70% on healthcare.</p>
            </div>
            <div className="relative hidden lg:block"><img src="https://images.unsplash.com/photo-1576089172869-4f5f6f315620?auto=format&fit=crop&q=80&w=1000" alt="Hero" className="w-full h-auto drop-shadow-3xl rounded-[3rem] grayscale" /></div>
          </div>
        </div>
      </section>

      <section className="py-32 px-6 bg-white overflow-visible">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <span className="text-[#F4A522] font-black uppercase tracking-[0.3em] text-[10px] mb-6 block">Care Portal</span>
              <h2 className="text-5xl md:text-6xl font-black text-[#15342C] font-['Outfit'] mb-12">Real Help. <br/><span className="text-emerald-500">Zero Wait.</span></h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { icon: '📤', title: 'Smart Upload', desc: 'Scan Your Prescription', type: 'upload' },
                  { icon: '👨‍⚕️', title: 'Live Consult', desc: 'Chat with Specialist', type: 'consult' },
                  { icon: '📋', title: 'Digital Rx', desc: 'Your Medical Vault', type: 'rx' },
                  { icon: '✅', title: 'Auto Verify', desc: 'Check Rx Authenticity', type: 'verify' },
                ].map((item, i) => (
                  <div key={i} onClick={() => setActiveModal(item.type)} className="p-10 bg-slate-50 border border-slate-100 rounded-[3rem] hover:bg-[#15342C] hover:text-white transition-all cursor-pointer group shadow-sm hover:shadow-2xl">
                     <div className="text-4xl mb-6 group-hover:scale-110 transition-transform">{item.icon}</div>
                     <h4 className="font-black font-['Outfit'] text-xl mb-2">{item.title}</h4>
                     <p className="text-[#F4A522] text-[10px] font-black uppercase tracking-widest">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative"><PriceRadar /></div>
          </div>
        </div>
      </section>

      {/* 🚀 ARTICLES SECTION (With Images & Links) */}
      <section className="py-32 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
            <div>
               <span className="text-[#F4A522] font-black uppercase tracking-widest text-[10px] mb-4 block">Medical Insights</span>
               <h2 className="text-5xl font-black text-[#15342C] font-['Outfit']">Knowledge Hub.</h2>
            </div>
            <button className="text-xs font-black text-[#15342C] uppercase tracking-widest border-b-2 border-slate-300 pb-1">Archive 2024</button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
             {[
               { id: 'generics-vs-brands', title: "Generics vs Brands", desc: "Why paying 5x more for the same molecule is a myth.", tag: "Economics", img: "/article_generics_1775724505007.png" },
               { id: 'salt-scandal', title: "The Salt Scandal", desc: "How to read medicine salts and save like a pro.", tag: "Chemistry", img: "https://images.unsplash.com/photo-1628771065518-0d82f1938462?auto=format&fit=crop&q=80&w=1000" },
               { id: 'ai-in-pharma', title: "AI in Pharma", desc: "How we track global drug compositions in real-time.", tag: "Technology", img: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=1000" }
             ].map((art, i) => (
               <div key={i} onClick={() => navigate(`/blog/${art.id}`)} className="bg-white rounded-[3.5rem] border border-slate-100 hover:shadow-3xl transition-all group cursor-pointer overflow-hidden p-4">
                  <div className="aspect-square rounded-[2.5rem] overflow-hidden mb-8">
                     <img src={art.img} alt={art.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700" />
                  </div>
                  <div className="px-6 pb-6 text-left">
                     <span className="text-[9px] font-black text-[#F4A522] uppercase tracking-[0.2em] mb-3 block">{art.tag}</span>
                     <h4 className="text-2xl font-black text-[#15342C] font-['Outfit'] mb-3 leading-tight group-hover:text-emerald-500 transition-colors">{art.title}</h4>
                     <p className="text-slate-400 text-sm font-medium mb-8 leading-relaxed line-clamp-2">{art.desc}</p>
                     <div className="flex items-center gap-2 text-[10px] font-black uppercase text-[#15342C] tracking-widest group-hover:gap-4 transition-all">
                        Deep Dive <span className="text-emerald-500">→</span>
                     </div>
                  </div>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* MODALS Logic */}
      {activeModal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 backdrop-blur-2xl bg-[#15342C]/40">
           {/* Detailed Modal logic with proper upload handling */}
           <div className="bg-white rounded-[4rem] w-full max-w-2xl p-12 shadow-3xl animate-fade-in-up">
              <div className="flex justify-between items-center mb-10">
                 <h3 className="text-2xl font-black text-[#15342C] font-['Outfit'] uppercase">Care Portal Activity</h3>
                 <button onClick={() => setActiveModal(null)} className="text-slate-300 hover:text-rose-500 text-2xl font-black">✕</button>
              </div>
              <div className="text-center py-10">
                 <p className="text-slate-400 font-bold mb-6">Redirecting to Secure {activeModal} Workspace...</p>
                 <div className="w-12 h-12 border-4 border-[#F4A522] border-t-transparent animate-spin rounded-full mx-auto"></div>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default Landing;
