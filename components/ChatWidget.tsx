import React, { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

export const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([{ text: "Hello! How can we help you today?", isBot: true }]);
  const [input, setInput] = useState("");

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    setMessages([...messages, { text: input, isBot: false }]);
    setInput("");
    
    setTimeout(() => {
      setMessages(prev => [...prev, { text: "Thank you! We'll get back to you shortly.", isBot: true }]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="absolute bottom-20 right-0 w-80 sm:w-96 bg-white border border-gray-200 rounded-2xl shadow-xl overflow-hidden flex flex-col"
          >
            <div className="bg-[#FA0000] p-4 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-white font-medium">Customer Care</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="h-80 p-4 overflow-y-auto flex flex-col gap-3 bg-gray-50">
              {messages.map((msg, i) => (
                <div key={i} className={`max-w-[85%] p-3 rounded-2xl text-sm ${msg.isBot ? 'bg-gray-100 text-gray-700 self-start rounded-tl-none' : 'bg-[#FA0000] text-white self-end rounded-tr-none'}`}>
                  {msg.text}
                </div>
              ))}
            </div>
            
            <form onSubmit={handleSend} className="p-3 bg-white border-t border-gray-200 flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-[#FA0000]"
              />
              <button type="submit" className="w-10 h-10 bg-[#FA0000] rounded-full flex items-center justify-center text-white hover:bg-[#FF3333] shrink-0">
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
      
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-[#FA0000] rounded-full flex items-center justify-center text-white shadow-lg hover:bg-[#FF3333] transition-colors"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </button>
    </div>
  );
};