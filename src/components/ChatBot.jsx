import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [botState, setBotState] = useState('normal'); // 'normal', 'happy', 'joke', 'thinking'
  const [messages, setMessages] = useState([
    { text: "Hey! I'm PharaFriend, your hyper-smart health buddy. I speak English, Hindi, Telugu, and Punjabi! How can I save your money today? 💸", type: 'bot' }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const pharmaJokes = [
    "Why did the medicine go to school? Because it wanted to be a 'smart pill'! 😂",
    "Paitent: Doctor, will this cough medicine work? \nDoctor: Of course, look at the price, even the virus will get scared! 💸😂",
    "Pharmacy joke: I'm reading a book on anti-gravity... it's impossible to put down! Just like our prices! 💊✨",
  ];

  const siteInfo = {
    radar: "Our Live Price Radar scans 1mg, Apollo, PharmEasy, and more in real-time! | हमारा राडार लाइव कीमतें ट्रैक करता है।",
    rx: "Need a prescription? Talk to our doctors in the Health Portal and get a digital Rx. | डॉक्टर से बात करें और डिजिटल पर्चा पाएं।",
    generic: "Switch to Generics to save up to 80% on the same salt molecule. | जेनेरिक दवाएं अपनाएं और 80% बचत करें।",
    track: "Track your orders in the Patient Portal easily. | अपने ऑर्डर्स यहाँ ट्रैक करें।"
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = { text: input, type: 'user' };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);
    setBotState('thinking');

    // Enhanced AI Logic
    setTimeout(() => {
      const q = input.toLowerCase();
      let response = { text: "", type: 'bot', link: null, linkText: "" };

      // Language Greetings
      if (q.includes('hi') || q.includes('hello') || q.includes('hey')) {
        response.text = "Hello! | नमस्ते! | నమస్కారం (Telugu) | ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ (Punjabi)! What’s on your mind?";
        setBotState('happy');
      } 
      // JOKE
      else if (q.includes('joke') || q.includes('hasao') || q.includes('majaak')) {
        response.text = pharmaJokes[Math.floor(Math.random() * pharmaJokes.length)];
        setBotState('joke');
      }
      // PRICE / RADAR
      else if (q.includes('price') || q.includes('radar') || q.includes('daam') || q.includes('kimat') || q.includes('dharalu')) {
        response.text = `Scan prices from 5+ platforms instantly! | 5+ प्लेटफॉर्मों से कीमतें चेक करें। | మీరు ఇక్కడ ధరలను పోల్చవచ్చు (Telugu).`;
        response.link = '/search';
        response.linkText = "Open Price Radar 📡";
        setBotState('happy');
      }
      // DOCTOR / RX
      else if (q.includes('doctor') || q.includes('rx') || q.includes('prescription') || q.includes('parcha')) {
        response.text = "Consult verified doctors and get your Digital Rx now. | डॉक्टर से मिलें और डिजिटल पर्चा लें। | ఆన్‌లైన్ డాక్టర్ సంప్రదింపులు (Telugu).";
        response.link = '/orders';
        response.linkText = "Talk to Doctor 👨‍⚕️";
      }
      // GENERIC
      else if (q.includes('generic') || q.includes('sasta') || q.includes('alternate')) {
        response.text = "Save up to 80% by switching to high-quality generics. | जेनेरिक दवाओं पर 80% बचत करें। | జెనరిక్ మందులు చౌకగా ఉంటాయి (Telugu).";
        response.link = '/blog/generics-vs-brands';
        response.linkText = "See Savings 💰";
      }
      // TRACK / ORDER
      else if (q.includes('track') || q.includes('order') || q.includes('kaha') || q.includes('status')) {
        response.text = "Track your active orders in your portal. | अपने ऑर्डर्स यहाँ देखें। | మీ ఆర్డర్‌లను ఇక్కడ ట్రాక్ చేయండి (Telugu) | ਆਪਣੇ ਆਰਡਰ ਟ੍ਰੈਕ ਕਰੋ (Punjabi).";
        response.link = '/orders';
        response.linkText = "My Orders 📦";
      }
      else {
        response.text = "I'm your PharaFriend! Ask me about Prices, Doctors, or Generics. I also know jokes! | मैं आपका फार्माफ्रेंड हूँ! कीमतों या डॉक्टरों के बारे में पूछें।";
        setBotState('normal');
      }

      setMessages(prev => [...prev, response]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <div className="fixed bottom-8 right-8 z-[100] font-['Inter']">
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-20 h-20 rounded-full shadow-[0_20px_50px_rgba(244,165,34,0.4)] flex items-center justify-center transition-all duration-500 border-4 border-white ${isOpen ? 'bg-rose-500 rotate-[135deg]' : 'bg-[#15342C] hover:scale-110 active:scale-95'}`}
      >
        {isOpen ? (
          <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" /></svg>
        ) : (
          <div className="relative">
             <span className="absolute -top-1 -right-1 w-5 h-5 bg-rose-500 rounded-full border-2 border-white flex items-center justify-center text-[10px] text-white font-black animate-bounce">!</span>
             <span className="text-4xl">🤖</span>
          </div>
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="absolute bottom-24 right-0 w-[380px] h-[600px] bg-white rounded-[3.5rem] shadow-[0_40px_100px_rgba(0,0,0,0.25)] flex flex-col overflow-hidden border border-slate-100 animate-fade-in-up">
          {/* Header */}
          <div className="bg-gradient-to-br from-[#15342C] to-[#0D221D] p-8 flex items-center gap-5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#F4A522]/10 rounded-full blur-3xl"></div>
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-4xl shadow-2xl transition-all duration-300 ${botState === 'happy' ? 'bg-emerald-500 scale-110' : botState === 'joke' ? 'bg-[#F4A522] rotate-12' : 'bg-slate-800'}`}>
               {botState === 'thinking' ? '🤔' : botState === 'happy' ? '😊' : botState === 'joke' ? '🤣' : '🤖'}
            </div>
            <div>
              <h3 className="text-white font-black font-['Outfit'] text-xl leading-none mb-2">PharaFriend AI</h3>
              <p className="text-[#F4A522] text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2">
                <span className="w-2 h-2 bg-emerald-400 rounded-full animate-ping"></span> Multilingual Pro
              </p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-8 space-y-6 bg-slate-50/50">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-5 rounded-3xl text-[13px] font-semibold leading-relaxed shadow-sm ${msg.type === 'user' ? 'bg-[#15342C] text-white rounded-tr-none' : 'bg-white text-slate-800 rounded-tl-none border border-slate-100'}`}>
                  {msg.text}
                  {msg.link && (
                    <button
                      onClick={() => navigate(msg.link)}
                      className="mt-4 block w-full bg-[#F4A522] text-[#15342C] font-black py-3 rounded-2xl text-center shadow-lg hover:shadow-[#F4A522]/20 transition-all uppercase tracking-widest text-[10px]"
                    >
                      {msg.linkText}
                    </button>
                  )}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white p-4 rounded-3xl border border-slate-100 flex gap-1">
                   {[1,2,3].map(d => <div key={d} className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce" style={{animationDelay: `${d*0.1}s`}}></div>)}
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Actions */}
          <div className="px-8 flex gap-2 overflow-x-auto pb-4 scrollbar-hide">
             {['Price Radar', 'Doctor', 'Joke', 'Tracking'].map(tag => (
               <button 
                 key={tag}
                 onClick={() => setInput(tag)}
                 className="flex-shrink-0 bg-white border border-slate-200 px-4 py-1.5 rounded-full text-[10px] font-black text-slate-500 hover:border-[#F4A522] hover:text-[#F4A522] transition-all"
               >
                 {tag}
               </button>
             ))}
          </div>

          {/* Input */}
          <form onSubmit={handleSend} className="p-6 bg-white border-t border-slate-100">
            <div className="relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask in Hindi, Telugu or Punjabi..."
                className="w-full bg-slate-100 border-none rounded-2xl py-4 pl-5 pr-14 text-sm font-medium focus:ring-2 focus:ring-[#F4A522] transition-all"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-[#15342C] text-[#F4A522] rounded-xl flex items-center justify-center hover:scale-110 active:scale-95 transition-transform"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ChatBot;
