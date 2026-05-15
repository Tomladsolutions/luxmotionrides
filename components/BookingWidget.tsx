import React from 'react';
import { MapPin, Calendar, Clock, Users, ArrowRight } from 'lucide-react';

export const BookingWidget = () => {
  return (
    <div className="w-full max-w-4xl mx-auto mt-12 glass-panel p-8 rounded-3xl shadow-lg relative z-20 border border-gray-200">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <div className="col-span-1 md:col-span-2 relative">
          <label className="text-xs text-gray-600 uppercase tracking-widest font-medium mb-2 block">Pickup Location</label>
          <div className="relative">
            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gold w-4 h-4" />
            <input 
              type="text" 
              placeholder="Airport, Hotel, Address..." 
              className="w-full glass-input rounded-xl py-3.5 pl-12 pr-4 text-sm placeholder-gray-500 focus:ring-1 focus:ring-gold/50"
            />
          </div>
        </div>

        <div className="col-span-1 md:col-span-2 relative">
          <label className="text-xs text-gray-600 uppercase tracking-widest font-medium mb-2 block">Dropoff Location</label>
          <div className="relative">
            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input 
              type="text" 
              placeholder="Destination..." 
              className="w-full glass-input rounded-xl py-3.5 pl-12 pr-4 text-sm placeholder-gray-500 focus:ring-1 focus:ring-gold/50"
            />
          </div>
        </div>

        <div className="col-span-1 md:col-span-1 relative">
          <label className="text-xs text-gray-600 uppercase tracking-widest font-medium mb-2 block">Passengers</label>
          <div className="relative">
            <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <select className="w-full glass-input rounded-xl py-3.5 pl-12 pr-4 text-sm text-gray-700 appearance-none bg-transparent focus:ring-1 focus:ring-gold/50">
              <option value="1" className="bg-black text-white">1 Pass</option>
              <option value="2" className="bg-black text-white">2 Pass</option>
              <option value="3" className="bg-black text-white">3 Pass</option>
              <option value="4" className="bg-black text-white">4+ Pass</option>
            </select>
          </div>
        </div>

        <div className="col-span-1 md:col-span-2 relative">
          <label className="text-xs text-gray-600 uppercase tracking-widest font-medium mb-2 block">Date</label>
          <div className="relative">
            <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input 
              type="date" 
              className="w-full glass-input rounded-xl py-3.5 pl-12 pr-4 text-sm text-gray-700 focus:ring-1 focus:ring-gold/50"
            />
          </div>
        </div>

        <div className="col-span-1 md:col-span-2 relative">
          <label className="text-xs text-gray-600 uppercase tracking-widest font-medium mb-2 block">Time</label>
          <div className="relative">
            <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input 
              type="time" 
              className="w-full glass-input rounded-xl py-3.5 pl-12 pr-4 text-sm text-gray-700 focus:ring-1 focus:ring-gold/50"
            />
          </div>
        </div>

        <div className="col-span-1 md:col-span-1 flex items-end">
          <button className="w-full bg-white hover:bg-gray-200 text-black font-semibold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_20px_rgba(212,175,55,0.2)]">
            Book <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
