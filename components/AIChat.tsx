import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, ChevronDown, Phone, Calendar, Car, MapPin, Clock, Star, ShieldCheck, Award } from 'lucide-react';
import { useBooking } from '../context/BookingContext';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

const quickReplies = [
  { label: 'Book a Ride', action: 'book' },
  { label: 'Get Quote', action: 'quote' },
  { label: 'Our Services', action: 'services' },
  { label: 'Service Areas', action: 'areas' },
  { label: 'Our Fleet', action: 'fleet' },
  { label: 'Pricing', action: 'pricing' },
  { label: 'Contact', action: 'contact' },
];

const knowledgeBase = {
  // Company Information
  company: `Lux Motion Rides is Colorado's premier luxury black car service. Founded with a mission to provide reliable, professional, and comfortable transportation that doesn't feel out of reach. We serve Denver and surrounding areas with a commitment to exceptional service, punctuality, and customer satisfaction. Our team of professional chauffeurs is dedicated to delivering a smooth travel experience every time.`,
  
  about: `About Lux Motion Rides:
We were created to provide transportation that is reliable, professional, and comfortable without feeling out of reach. Our team is dedicated to delivering a smooth travel experience with professional chauffeurs, well-maintained vehicles, and dependable scheduling.

Whether you're heading to the airport, traveling for business, or attending a special event, our focus is simple: provide a comfortable ride you can rely on every time.`,
  
  whyChoose: `Why Choose Lux Motion Rides:

1. Professional Chauffeurs - Experienced, background-checked drivers with years of luxury driving experience.

2. Premium Fleet - Late-model black luxury SUVs and vans, meticulously maintained for your comfort.

3. On-Time Service - Real-time flight monitoring and precise scheduling ensures you never wait.

4. Easy Booking - Book online in minutes or call our 24/7 team for personalized service.

5. Safe & Secure - Fully licensed, insured, and vetted transportation for your peace of mind.

6. Any Destination - From airport runs to mountain resorts, we go wherever you need to go.`,
  
  // Services
  services: `Our Transportation Services:

🚗 Airport Transportation
Reliable transportation to and from the airport. We monitor flights in real-time to ensure your chauffeur arrives on time, even if your flight is delayed. Includes meet-and-greet service and luggage assistance.

🏢 Corporate Transportation
Professional rides for meetings, conferences, and executive travel. Perfect for business professionals who need reliable, comfortable transportation for work.

🎉 Special Event Transportation
Arrive in style for weddings, concerts, pro sports games, and special occasions. Group rates available for weddings and large events.

🚙 Private Transportation
Flexible rides for city travel, errands, or hourly service. Whether you need a personal driver for the day or a quick ride across town.`,
  
  // Fleet
  fleet: `Our Luxury Fleet:

🚙 GMC Yukon XL Denali (1-6 passengers)
Luxury SUV with spacious seating and ample luggage space. Perfect for families or small groups.

🚙 Chevrolet Suburban XL (1-7 passengers)
Premium SUV with generous seating and cargo room. Great for families or business groups.

🚐 Ford Transit Passenger Van (1-10 passengers)
Comfortable group transportation with dedicated luggage space. Ideal for groups up to 10.

🚐 Mercedes-Benz Sprinter Van (1-14 passengers)
Executive group travel with luxury seating and high-capacity luggage storage. Perfect for large groups or corporate events.`,
  
  // Pricing
  pricing: `Pricing Information:

• GMC Yukon XL Denali: From $150
• Chevrolet Suburban XL: From $140
• Ford Transit (10 Seater): From $200
• Mercedes Sprinter (14 Seater): From $280

Note: Prices may vary based on:
- Distance of your trip
- Time of day
- Vehicle availability
- Special events or peak seasons

Request a quote for accurate pricing!`,
  
  // Service Areas
  areas: `We Service Throughout Colorado:

📍 Denver Metro Area
Denver Downtown, Aurora, Lakewood, Littleton, Centennial

📍 Boulder Area
Boulder, Louisville, Lafayette, Broomfield

📍 Colorado Springs
Professional transportation to/from Colorado Springs

📍 Mountain Resorts
Vail, Aspen, Keystone, Breckenridge, Beaver Creek, Winter Park

📍 Airports
Denver International Airport (DIA) - We provide full airport service

We also accommodate requests outside these areas. Contact us to check availability!`,
  
  // Airport
  airport: `Airport Transportation Services:

We provide reliable airport transfers throughout Colorado, with a focus on Denver International Airport (DIA).

Our Airport Service Includes:
• Real-time flight tracking
• Curbside pickup
• Luggage assistance
• Meet and greet (upon request)
• 24/7 availability

Whether you're arriving or departing, we ensure you get to your destination on time. Our chauffeurs monitor your flight and adjust pickup times accordingly.`,
  
  // Corporate
  corporate: `Corporate Transportation:

Lux Motion Rides provides professional transportation for business travelers and corporate clients.

Services Include:
• Executive airport transfers
• Meeting and conference transportation
• Corporate events
• Team building events
• Client entertainment
• Hourly/charter services

Benefits:
• Professional, discreet chauffeurs
• Wi-Fi enabled vehicles (upon availability)
• Flexible scheduling
• Corporate accounts available
• Receipts provided for expensing

Contact us for corporate account pricing!`,
  
  // Events
  events: `Special Event Transportation:

Make a lasting impression at your next special event.

We service:
• Weddings
• Concert & festivals (Red Rocks, Empower Field)
• Sports events (Ball Arena, Coors Field)
• Gala dinners
• Prom & homecoming
• Anniversary celebrations
• Birthday parties

Group packages available! Our 14-passenger Sprinter van is perfect for wedding parties and large groups.`,
  
  // Private Rides
  private: `Private Rides:

Flexible transportation for any occasion.

Options Include:
• Hourly service (minimum 2 hours)
• Point-to-point transfers
• City tours
• Shopping trips
• Restaurant transportation
• Medical appointments
• Errand running

Our professional drivers provide a comfortable, safe experience whether you need transportation for a few hours or the entire day.`,
  
  // Hours
  hours: `We're Available 24/7, 365 Days a Year:

• Airport transfers - All hours, including early mornings and late nights
• Corporate travel - Business hours and after-hours
• Special events - Evening and weekend availability
• Emergency rides - We try to accommodate urgent requests

Book online anytime or call us at +1 720-935-1912 for immediate assistance.`,
  
  // Booking
  booking: `How to Book:

1. Click "Book a Ride" on the website
2. Choose "Book a Ride" or "Request a Quote"
3. Enter your travel details:
   - Pickup location
   - Drop-off destination
   - Date and time
   - Number of passengers
   - Vehicle preference
4. Review and confirm
5. Receive confirmation

You can also call us at +1 720-935-1912 for phone bookings.`,
  
  // Contact
  contact: `Contact Lux Motion Rides:

📞 Phone: +1 720-935-1912 (24/7)
✉️ Email: booking@luxmotionrides.com

📍 Service Area: Denver, Colorado and surrounding areas

We typically respond to online inquiries within 24 hours. For urgent requests, please call us directly.`,
  
  // FAQ
  faq: `Frequently Asked Questions:

Q: How far in advance should I book?
A: We recommend booking at least 24-48 hours in advance for standard service. For airport transfers, 3-5 days advance is recommended. For special events, 1-2 weeks advance is best.

Q: Do you offer hourly service?
A: Yes! We offer hourly/charter service. Minimum 2-hour booking for private rides.

Q: Is gratuity included?
A: Gratuity is not included. Tips are appreciated but optional. You can add gratuity at the time of booking or pay directly to your chauffeur.

Q: What if my flight is delayed?
A: We monitor flights in real-time. Your chauffeur will adjust pickup time based on actual arrival. No extra charges for flight delays.

Q: Do you provide child seats?
A: We can arrange child seats with advance notice. Please mention this in your booking notes.

Q: Can I make multiple stops?
A: Yes! Additional stops can be arranged. Please provide details in your booking or discuss with your chauffeur.`,
  
  // Policies
  policies: `Our Policies:

⏰ Cancellation Policy:
- Free cancellation up to 24 hours before pickup
- 50% charge for cancellations within 24 hours
- No refund for no-shows

💳 Payment:
- We accept major credit cards
- Payment due at time of service
- Corporate accounts available with approval

🛄 Luggage:
- Each passenger allowed 2 bags
- Additional luggage may require larger vehicle
- We accommodate ski/snowboard equipment

🚫 No Smoking:
- All vehicles are non-smoking
- Cleaning fees apply for violations

🐾 Pets:
- Service animals welcome
- Small pets in carriers may be accommodated`,
};

const getResponse = (message: string): string => {
  const lowerMessage = message.toLowerCase();
  
  // Direct matches first
  if (lowerMessage.includes('about') || lowerMessage.includes('who are you') || lowerMessage.includes('company') || lowerMessage.includes('tell me about')) {
    return knowledgeBase.about;
  }
  
  if (lowerMessage.includes('why choose') || lowerMessage.includes('why should') || lowerMessage.includes('benefits') || lowerMessage.includes('advantage')) {
    return knowledgeBase.whyChoose;
  }
  
  if ((lowerMessage.includes('service') || lowerMessage.includes('services')) && !lowerMessage.includes('area')) {
    return knowledgeBase.services;
  }
  
  if (lowerMessage.includes('fleet') || lowerMessage.includes('vehicle') || lowerMessage.includes('car') || lowerMessage.includes('van') || lowerMessage.includes('suv') || lowerMessage.includes('yukon') || lowerMessage.includes('suburban') || lowerMessage.includes('sprinter') || lowerMessage.includes('transit')) {
    return knowledgeBase.fleet;
  }
  
  if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('rate') || lowerMessage.includes('how much') || lowerMessage.includes('fee') || lowerMessage.includes('charge')) {
    return knowledgeBase.pricing;
  }
  
  if (lowerMessage.includes('area') || lowerMessage.includes('where') || lowerMessage.includes('location') || lowerMessage.includes('denver') || lowerMessage.includes('colorado') || lowerMessage.includes('boulder') || lowerMessage.includes('vail') || lowerMessage.includes('aspen') || lowerMessage.includes('service')) {
    return knowledgeBase.areas;
  }
  
  if (lowerMessage.includes('airport') || lowerMessage.includes('dia') || lowerMessage.includes('fly') || lowerMessage.includes('flight') || lowerMessage.includes('pickup') || lowerMessage.includes('dropoff')) {
    return knowledgeBase.airport;
  }
  
  if (lowerMessage.includes('corporate') || lowerMessage.includes('business') || lowerMessage.includes('executive') || lowerMessage.includes('meeting') || lowerMessage.includes('conference')) {
    return knowledgeBase.corporate;
  }
  
  if (lowerMessage.includes('wedding') || lowerMessage.includes('event') || lowerMessage.includes('concert') || lowerMessage.includes('party') || lowerMessage.includes('celebration') || lowerMessage.includes('special occasion')) {
    return knowledgeBase.events;
  }
  
  if (lowerMessage.includes('private') || lowerMessage.includes('personal') || lowerMessage.includes('hourly') || lowerMessage.includes('charter') || lowerMessage.includes('errand')) {
    return knowledgeBase.private;
  }
  
  if (lowerMessage.includes('hour') || lowerMessage.includes('time') || lowerMessage.includes('open') || lowerMessage.includes('24/7') || lowerMessage.includes('available')) {
    return knowledgeBase.hours;
  }
  
  if (lowerMessage.includes('book') || lowerMessage.includes('reserve') || lowerMessage.includes('schedule') || lowerMessage.includes('how to book') || lowerMessage.includes('request')) {
    return knowledgeBase.booking;
  }
  
  if (lowerMessage.includes('contact') || lowerMessage.includes('phone') || lowerMessage.includes('email') || lowerMessage.includes('call') || lowerMessage.includes('reach')) {
    return knowledgeBase.contact;
  }
  
  if (lowerMessage.includes('faq') || lowerMessage.includes('question') || lowerMessage.includes('frequently') || lowerMessage.includes('help') || lowerMessage.includes('policy') || lowerMessage.includes('cancellation') || lowerMessage.includes('payment')) {
    return knowledgeBase.faq + '\n\n' + knowledgeBase.policies;
  }
  
  if (lowerMessage.includes('greeting') || lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey') || lowerMessage.includes('start')) {
    return "Hello! Welcome to Lux Motion Rides! I'm here to help you with booking rides, information about our services, fleet, pricing, service areas, and more. How can I assist you today?";
  }
  
  if (lowerMessage.includes('thank')) {
    return "You're welcome! Is there anything else I can help you with? Feel free to ask about our services, fleet, pricing, or book a ride!";
  }
  
  if (lowerMessage.includes('bye') || lowerMessage.includes('goodbye') || lowerMessage.includes('see you')) {
    return "Thank you for chatting with Lux Motion Rides! We look forward to serving you. Have a wonderful day!";
  }
  
  // Default response with company info
  return `I'm here to help with all your transportation needs! Here are some things I can assist you with:

🚗 Book a Ride - Reserve your luxury vehicle
💰 Get a Quote - Get pricing for your trip
🏢 Our Services - Airport, corporate, events, private rides
🚐 Our Fleet - View our luxury vehicles
📍 Service Areas - Where we operate
💵 Pricing - Starting prices
📞 Contact Us - Phone and email info

What would you like to know more about?`;
};

export const AIChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', role: 'assistant', content: "Hello! Welcome to Lux Motion Rides! I'm your AI assistant, and I know everything about our premium black car service in Colorado. I can help you with:\n\n🚗 Booking rides\n💰 Getting quotes\n🏢 Information about our services\n🚐 Details about our luxury fleet\n📍 Service areas and coverage\n💵 Pricing information\n📞 Contact details\n\nHow can I assist you today?" }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { openBooking } = useBooking();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const response = getResponse(input);
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response
      }]);
      setIsTyping(false);
    }, 600 + Math.random() * 400);
  };

  const handleQuickReply = (action: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: action
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    setTimeout(() => {
      let response = '';
      switch (action) {
        case 'book':
          setIsOpen(false);
          openBooking();
          return;
        case 'quote':
          setIsOpen(false);
          openBooking({ bookingType: 'quote' });
          return;
        case 'services':
          response = knowledgeBase.services;
          break;
        case 'areas':
          response = knowledgeBase.areas;
          break;
        case 'fleet':
          response = knowledgeBase.fleet;
          break;
        case 'pricing':
          response = knowledgeBase.pricing;
          break;
        case 'contact':
          response = knowledgeBase.contact;
          break;
        default:
          response = knowledgeBase.about;
      }
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response
      }]);
      setIsTyping(false);
    }, 500);
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#FA0000] rounded-full flex items-center justify-center shadow-lg hover:bg-[#FF3333] transition-colors"
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <MessageCircle className="w-6 h-6 text-white" />
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-[380px] max-w-[calc(100vw-48px)] h-[550px] bg-white rounded-2xl shadow-xl border border-gray-200 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-[#FA0000] px-4 py-3 border-b border-gray-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <Car className="w-5 h-5 text-[#FA0000]" />
              </div>
              <div>
                <h3 className="text-white font-semibold text-sm">Lux Motion AI</h3>
                <p className="text-white/80 text-xs flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                  Online
                </p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white">
              <ChevronDown className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[90%] px-4 py-3 rounded-2xl text-sm ${
                    message.role === 'user'
                      ? 'bg-[#FA0000] text-white rounded-br-md'
                      : 'bg-gray-100 text-gray-700 rounded-bl-md whitespace-pre-line'
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 px-4 py-3 rounded-2xl rounded-bl-md">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Replies */}
          <div className="px-3 py-2 border-t border-gray-100 flex flex-wrap gap-2">
            {quickReplies.map((reply) => (
              <button
                key={reply.label}
                onClick={() => handleQuickReply(reply.action)}
                className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 border border-gray-200 rounded-full text-xs text-gray-600 hover:text-gray-900 transition-colors"
              >
                {reply.label}
              </button>
            ))}
          </div>

          {/* Input */}
          <div className="p-3 border-t border-gray-200">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask me anything..."
                className="flex-1 border border-gray-300 rounded-full px-4 py-2.5 text-sm focus:border-[#FA0000] focus:outline-none"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim()}
                className="w-11 h-11 bg-[#FA0000] rounded-full flex items-center justify-center text-white hover:bg-[#FF3333] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
