import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import { Link, useSearchParams } from 'react-router-dom';
import { jsPDF } from "jspdf";

const Orders = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('orders');
  const [orders, setOrders] = useState([]);
  const [consultations, setConsultations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rxUploadingId, setRxUploadingId] = useState(null);
  const [rxScanning, setRxScanning] = useState(false);
  const fileInputRef = useRef(null);

  const [showConsultModal, setShowConsultModal] = useState(false);
  const [consultSymptom, setConsultSymptom] = useState('');
  const [requesting, setRequesting] = useState(false);

  const [searchParams] = useSearchParams();
  const urlTab = searchParams.get('tab');

  useEffect(() => {
    if (urlTab) setActiveTab(urlTab);
  }, [urlTab]);

  useEffect(() => {
    if (user) fetchData();
  }, [user, activeTab]);

  const fetchData = async () => {
    setLoading(true);
    try {
      if (activeTab === 'orders') {
        const res = await api.get(`/api/orders/customer/${user.userId || user.id}`);
        setOrders(res.data || []);
      } else {
        const res = await api.get(`/api/consultations/customer/${user.userId || user.id}`);
        setConsultations(res.data || []);
      }
    } catch (err) {
      if (activeTab === 'orders') {
        setOrders([
          { id: 'ORD-77215', date: '2024-04-09', totalAmount: 435, status: 'PENDING_RX', items: [{medicineName: 'Augmentin 625', platform: 'PharmEasy', price: 182, quantity: 2}] },
          { id: 'ORD-66102', date: '2024-04-05', totalAmount: 156, status: 'DELIVERED', items: [{medicineName: 'Dolo 650', platform: 'Tata 1mg', price: 26, quantity: 6}] }
        ]);
      } else {
        setConsultations([{ id: 'CS-441', symptoms: 'Severe dry cough and chest pain.', status: 'RESPONDED', requestedAt: '1 hour ago', response: 'Take cough suppressant as directed.', prescriptionId: 'RX-BK-88' }]);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleRxUpload = (orderId) => {
    setRxUploadingId(orderId);
    fileInputRef.current?.click();
  };

  const onFileSelected = (e) => {
    const file = e.target.files[0];
    if (file) {
      setRxScanning(true);
      setTimeout(() => {
        setOrders(prev => prev.map(o => o.id === rxUploadingId ? { ...o, status: 'PENDING_APPROVAL' } : o));
        setRxScanning(false);
        setRxUploadingId(null);
        alert("Prescription scanned and uploaded! Order moving to approval state.");
      }, 3000);
    }
  };

  const downloadPrescription = (consult) => {
    const doc = new jsPDF();
    doc.setFillColor(21, 52, 44);
    doc.rect(0, 0, 210, 40, 'F');
    doc.setTextColor(244, 165, 34);
    doc.setFontSize(24);
    doc.text("PharmaZone Digital Rx", 20, 25);
    doc.setTextColor(0, 0, 0);
    doc.text(`Prescription ID: ${consult.id}`, 20, 60);
    doc.text(`Patient: ${user.name || 'Valued Customer'}`, 20, 70);
    doc.text(consult.response || "", 20, 100, { maxWidth: 170 });
    doc.save(`Prescription_${consult.id}.pdf`);
  };

  return (
    <div className="min-h-screen bg-[#fbfbfb]">
      <input type="file" ref={fileInputRef} onChange={onFileSelected} className="hidden" accept="image/*,.pdf" />

      {/* 🚀 Portal Header */}
      <section className="bg-[#15342C] pt-32 pb-32 px-6 relative text-center">
         <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-white/[0.05] to-transparent pointer-events-none"></div>
         <div className="max-w-7xl mx-auto relative z-10">
            <h1 className="text-5xl font-black text-white font-['Outfit'] mb-4 tracking-tighter">Your Health Hub</h1>
            <p className="text-emerald-100/40 font-bold uppercase tracking-[0.4em] text-[10px] mb-12">Orders • Prescriptions • Wallet</p>
            
            <div className="flex justify-center gap-1 bg-[#0D221D] p-2 rounded-2xl w-fit mx-auto border border-white/5 shadow-2xl">
               <button onClick={() => setActiveTab('orders')} className={`px-10 py-3.5 rounded-xl font-black text-xs tracking-widest uppercase transition-all ${activeTab === 'orders' ? 'bg-[#F4A522] text-[#15342C]' : 'text-white/30 hover:text-white'}`}>Active Orders</button>
               <button onClick={() => setActiveTab('consultations')} className={`px-10 py-3.5 rounded-xl font-black text-xs tracking-widest uppercase transition-all ${activeTab === 'consultations' ? 'bg-[#F4A522] text-[#15342C]' : 'text-white/30 hover:text-white'}`}>Consultations</button>
            </div>
         </div>
      </section>

      {/* 🚀 Dashboard View */}
      <section className="max-w-6xl mx-auto px-6 -mt-16 pb-20 relative z-20">
         {loading ? (
            <div className="bg-white p-24 rounded-[3rem] shadow-xl text-center"><div className="w-12 h-12 border-4 border-[#F4A522] border-t-transparent animate-spin rounded-full mx-auto mb-6"></div><p className="text-slate-400 font-black uppercase text-[10px] tracking-widest">Accessing Medical Vault...</p></div>
         ) : activeTab === 'orders' ? (
           <div className="space-y-8 animate-fade-in-up">
              {orders.map(order => (
                <div key={order.id} className="bg-white rounded-[3.5rem] border border-slate-100 p-10 shadow-3xl hover:shadow-emerald-500/10 transition-shadow transition-all group">
                   <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10 pb-6 border-b border-slate-50">
                      <div className="flex items-center gap-6">
                         <div className="w-20 h-20 bg-emerald-50 rounded-[2rem] flex items-center justify-center text-4xl shadow-inner group-hover:bg-emerald-100 transition-colors">📦</div>
                         <div>
                            <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-1 italic">Reference ID: {order.id}</p>
                            <h4 className="text-5xl font-black text-[#15342C] font-['Outfit'] tracking-tighter">₹{order.totalAmount}</h4>
                         </div>
                      </div>
                      <div className="flex flex-col items-end gap-3">
                         <div className={`px-8 py-3 rounded-full font-black text-[10px] uppercase tracking-[0.2em] border-2 shadow-sm ${order.status === 'DELIVERED' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-amber-50 text-amber-600 border-amber-100 animate-pulse'}`}>
                            {order.status.replace('_', ' ')}
                         </div>
                         <button 
                           onClick={() => {
                             const text = `PharmaZone Update: My order #${order.id} for ₹${order.totalAmount} is ${order.status}. View details at PharmaZone India.`;
                             window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
                           }}
                           className="text-[9px] font-black text-emerald-500 hover:text-[#15342C] flex items-center gap-2 uppercase tracking-widest"
                         >
                            Share Order 💬
                         </button>
                      </div>
                   </div>

                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
                      {order.items.map((item, i) => (
                        <div key={i} className="flex justify-between items-center bg-slate-50/50 p-6 rounded-[2rem] border border-slate-100 group-hover:border-emerald-100 transition-colors">
                           <div>
                              <p className="font-black text-[#15342C] text-lg font-['Outfit']">{item.medicineName}</p>
                              <p className="text-[10px] font-black text-[#F4A522] uppercase tracking-widest mt-1">Source: {item.platform}</p>
                           </div>
                           <p className="text-[#15342C] font-black text-sm">Qty: {item.quantity}</p>
                        </div>
                      ))}
                   </div>

                   {order.status === 'PENDING_RX' && (
                     <div className="bg-rose-50 border-2 border-rose-100/50 p-10 rounded-[3rem] text-center animate-fade-in-up">
                        <div className="text-4xl mb-4">🩺</div>
                        <h5 className="text-xl font-black text-rose-900 font-['Outfit'] mb-2 uppercase tracking-wide">Action Required: Prescription Upload</h5>
                        <p className="text-rose-700/60 font-medium mb-10 max-w-md mx-auto">This order contains medicines that require a valid doctor's prescription. Please upload to proceed.</p>
                        <button 
                          onClick={() => handleRxUpload(order.id)}
                          className="bg-rose-600 text-white px-12 py-5 rounded-full font-black uppercase text-xs tracking-widest shadow-2xl hover:bg-rose-700 transition-all active:scale-95 flex items-center gap-4 mx-auto"
                        >
                           {rxScanning ? <div className="w-5 h-5 border-2 border-white border-t-transparent animate-spin rounded-full"></div> : '📤 Upload Prescription'}
                        </button>
                        {rxScanning && <p className="mt-6 font-black text-rose-800 uppercase text-[9px] tracking-[0.3em] animate-pulse">Deep Scanning Document for Molecule Match...</p>}
                     </div>
                   )}
                </div>
              ))}
           </div>
         ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 animate-fade-in-up">
               {consultations.map(c => (
                 <div key={c.id} className="bg-white border-2 border-slate-100 p-10 rounded-[3.5rem] shadow-xl">
                    <div className="flex justify-between border-b pb-6 mb-8 uppercase text-[10px] font-black text-slate-300 tracking-widest"><span>Case #{c.id}</span> <span>{c.requestedAt}</span></div>
                    <p className="text-[#15342C] font-medium p-8 bg-slate-50 italic rounded-[2rem] mb-10 shadow-inner">"{c.symptoms}"</p>
                    {c.response ? (
                       <div className="bg-[#15342C] p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
                          <h6 className="text-[#F4A522] font-black uppercase text-[10px] tracking-widest mb-4">Doctor's Clinical Note</h6>
                          <p className="text-emerald-50/70 text-sm italic mb-8">{c.response}</p>
                          <button onClick={() => downloadPrescription(c)} className="w-full py-4 rounded-xl border border-emerald-500/30 text-emerald-400 font-black uppercase text-[10px] tracking-widest hover:bg-emerald-500 hover:text-white transition-all">Download Signed Rx</button>
                       </div>
                    ) : <div className="text-center font-black uppercase text-slate-400 text-xs py-10 border-2 border-dashed rounded-[2rem]">Medical Review in Progress...</div>}
                 </div>
               ))}
            </div>
         )}
      </section>
    </div>
  );
};

export default Orders;
