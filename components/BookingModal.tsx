import React, { useState, useEffect, useRef } from 'react';
import { X, CheckCircle, Calendar, MapPin, Users, Loader2, ChevronRight, ChevronLeft, Send, Plane, ExternalLink, Search, AlertCircle } from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { useGooglePlacesAutocomplete } from '../hooks/useGooglePlacesAutocomplete';
import { useFlightTracking, FlightData } from '../hooks/useFlightTracking';

interface Event {
  id: string;
  name: string;
  venue: string;
  date: string;
  time: string;
  category: 'concert' | 'sports' | 'wedding' | 'corporate';
  link?: string;
}

interface FlightInfo {
  flightNumber: string;
  airline: string;
  status: 'on-time' | 'delayed' | 'boarding' | 'arrived' | 'departed';
  scheduledTime: string;
  gate?: string;
  terminal?: string;
}

const mockEvents: Event[] = [
  { id: '1', name: 'Red Rocks Amphitheatre Concert', venue: 'Red Rocks Park', date: '2026-03-15', time: '7:00 PM', category: 'concert', link: 'https://www.redrocksonline.com/' },
  { id: '2', name: 'Colorado Rockies Game', venue: 'Coors Field', date: '2026-03-20', time: '6:40 PM', category: 'sports', link: 'https://www.mlb.com/rockies/' },
  { id: '3', name: 'Denver Nuggets Game', venue: 'Ball Arena', date: '2026-03-22', time: '7:00 PM', category: 'sports', link: 'https://www.nba.com/nuggets/' },
  { id: '4', name: 'Corporate Gala Dinner', venue: 'Colorado Convention Center', date: '2026-03-25', time: '6:00 PM', category: 'corporate', link: 'https://www.denverconvention.com/' },
  { id: '5', name: 'Mountain Wedding', venue: 'Keystone Resort', date: '2026-04-01', time: '3:00 PM', category: 'wedding', link: 'https://www.keystoneresort.com/' },
  { id: '6', name: 'Taylor Swift Concert', venue: 'Empower Field', date: '2026-04-05', time: '6:30 PM', category: 'concert', link: 'https://www.empowerfield.com/' },
];

const mockFlights: FlightInfo[] = [
  { flightNumber: 'UA 1234', airline: 'United Airlines', status: 'on-time', scheduledTime: '14:30', gate: 'B32', terminal: 'A' },
  { flightNumber: 'DL 567', airline: 'Delta', status: 'delayed', scheduledTime: '16:15', gate: 'C18', terminal: 'B' },
  { flightNumber: 'AA 890', airline: 'American', status: 'boarding', scheduledTime: '15:30', gate: 'A12', terminal: 'A' },
  { flightNumber: 'SW 234', airline: 'Southwest', status: 'arrived', scheduledTime: '13:55', gate: 'B45', terminal: 'B' },
];

const airports = [
  { code: 'DIA', name: 'Denver International Airport', city: 'Denver' },
  { code: 'APA', name: 'Centennial Airport', city: 'Denver' },
  { code: 'BJC', name: 'Rocky Mountain Metropolitan Airport', city: 'Broomfield' },
  { code: 'COS', name: 'Colorado Springs Airport', city: 'Colorado Springs' },
  { code: 'ASE', name: 'Aspen-Pitkin County Airport', city: 'Aspen' },
  { code: 'EGE', name: 'Eagle County Regional Airport', city: 'Eagle' },
  { code: 'GUC', name: 'Gunnison-Crested Butte Regional Airport', city: 'Gunnison' },
  { code: 'MTJ', name: 'Montrose Regional Airport', city: 'Montrose' },
  { code: 'DEN', name: 'Denver International Airport', city: 'Denver' },
];

const serviceAreas = [
  'Denver Downtown',
  'Boulder',
  'Aurora',
  'Lakewood',
  'Littleton',
  'Centennial',
  'Colorado Springs',
  'Vail',
  'Aspen',
  'Keystone',
  'Breckenridge'
];

const vehicles = [
  { id: 'gmc', name: 'GMC Yukon XL Denali', seats: '1-6', price: 'From $150' },
  { id: 'suburban', name: 'Chevrolet Suburban XL', seats: '1-7', price: 'From $140' },
  { id: 'transit', name: 'Ford Transit (10 Seater)', seats: '1-10', price: 'From $200' },
  { id: 'sprinter', name: 'Mercedes Sprinter (14 Seater)', seats: '1-14', price: 'From $280' },
];

export const BookingModal = () => {
  const { isOpen, closeBooking, bookingData, updateBookingData, currentStep, setCurrentStep } = useBooking();
  const [isBooked, setIsBooked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showEvents, setShowEvents] = useState(false);
  const [showFlights, setShowFlights] = useState(false);
  const [selectedService, setSelectedService] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const pickupAutocomplete = useGooglePlacesAutocomplete((address) => {
    updateBookingData({ pickupLocation: address });
  });

  const dropoffAutocomplete = useGooglePlacesAutocomplete((address) => {
    updateBookingData({ dropoffLocation: address });
  });

  const { flightData, isLoading: isFlightLoading, error: flightError, searchFlight, clearFlight } = useFlightTracking();

  useEffect(() => {
    if (!isOpen) {
      setSelectedService(false);
      setAgreedToTerms(false);
    } else if (bookingData.serviceType) {
      setSelectedService(true);
    }
  }, [isOpen]);

  useEffect(() => {
    if (currentStep === 1) {
      setSelectedService(false);
    }
  }, [currentStep]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    const formData = new FormData();
    formData.append('firstName', bookingData.firstName);
    formData.append('lastName', bookingData.lastName);
    formData.append('email', bookingData.email);
    formData.append('phone', bookingData.phone);
    formData.append('serviceType', bookingData.serviceType || '');
    formData.append('bookingType', bookingData.bookingType);
    formData.append('pickupLocation', bookingData.pickupLocation);
    formData.append('dropoffLocation', bookingData.dropoffLocation);
    formData.append('pickupDate', bookingData.pickupDate);
    formData.append('pickupTime', bookingData.pickupTime);
    formData.append('passengers', bookingData.passengers);
    formData.append('flightNumber', bookingData.flightNumber || '');
    formData.append('luggageCount', bookingData.luggageCount || '0');
    formData.append('notes', bookingData.notes || '');

    try {
      const response = await fetch('/submit-booking.php', {
        method: 'POST',
        body: formData
      });
      
      const result = await response.json();
      
      if (!result.success) {
        console.error('Booking error:', result.message);
      }
    } catch (error) {
      console.error('Network error:', error);
    }
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
    setIsBooked(true);
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        if (!selectedService) return false;
        return bookingData.bookingType && bookingData.serviceType;
      case 2:
        return bookingData.firstName && bookingData.lastName && bookingData.email && 
               bookingData.phone && bookingData.pickupLocation && bookingData.dropoffLocation &&
               bookingData.pickupDate && bookingData.pickupTime;
      case 3:
        return true;
      default:
        return true;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white border border-gray-200 rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden relative shadow-xl">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h2 className="text-xl font-bold text-gray-900">Book Your Ride</h2>
          <button onClick={closeBooking} className="p-2 rounded-full text-gray-500 hover:bg-gray-100">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6">
          
          {/* Step 1: Service Type */}
          {currentStep === 1 && (
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Tell us about your trip</h3>
              <p className="text-gray-500 mb-6">Choose a service type</p>

              {/* Service Selection - Show first */}
              {!selectedService ? (
                <div className="space-y-3">
                  <h4 className="text-sm text-gray-400 uppercase tracking-widest">What type of service do you need?</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        updateBookingData({ serviceType: 'airport' });
                        setSelectedService(true);
                      }}
                      className="p-4 rounded-xl border-2 border-black/10 hover:border-burgundy/50 bg-white/5 transition-all text-left"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-white/10">
                          <Plane className="w-5 h-5 text-burgundy" />
                        </div>
                        <div>
                          <h5 className="text-black font-medium">Airport Transportation</h5>
                          <p className="text-gray-400 text-xs">DIA & Colorado airports</p>
                        </div>
                      </div>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        updateBookingData({ serviceType: 'city' });
                        setSelectedService(true);
                      }}
                      className="p-4 rounded-xl border-2 border-black/10 hover:border-burgundy/50 bg-white/5 transition-all text-left"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-white/10">
                          <MapPin className="w-5 h-5 text-burgundy" />
                        </div>
                        <div>
                          <h5 className="text-black font-medium">City Ride</h5>
                          <p className="text-gray-400 text-xs">Denver metro area</p>
                        </div>
                      </div>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        updateBookingData({ serviceType: 'intercity' });
                        setSelectedService(true);
                      }}
                      className="p-4 rounded-xl border-2 border-black/10 hover:border-burgundy/50 bg-white/5 transition-all text-left"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-white/10">
                          <MapPin className="w-5 h-5 text-burgundy" />
                        </div>
                        <div>
                          <h5 className="text-black font-medium">Mountain Transportation</h5>
                          <p className="text-gray-400 text-xs">Vail, Aspen, Keystone & more</p>
                        </div>
                      </div>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        updateBookingData({ serviceType: 'corporate' });
                        setSelectedService(true);
                      }}
                      className="p-4 rounded-xl border-2 border-black/10 hover:border-burgundy/50 bg-white/5 transition-all text-left"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-white/10">
                          <Calendar className="w-5 h-5 text-burgundy" />
                        </div>
                        <div>
                          <h5 className="text-black font-medium">Corporate Travel</h5>
                          <p className="text-gray-400 text-xs">Business & executive</p>
                        </div>
                      </div>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        updateBookingData({ serviceType: 'special' });
                        setSelectedService(true);
                      }}
                      className="p-4 rounded-xl border-2 border-black/10 hover:border-burgundy/50 bg-white/5 transition-all text-left"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-white/10">
                          <Calendar className="w-5 h-5 text-burgundy" />
                        </div>
                        <div>
                          <h5 className="text-black font-medium">Special Event</h5>
                          <p className="text-gray-400 text-xs">Concerts, weddings & more</p>
                        </div>
                      </div>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        updateBookingData({ serviceType: 'private' });
                        setSelectedService(true);
                      }}
                      className="p-4 rounded-xl border-2 border-black/10 hover:border-burgundy/50 bg-white/5 transition-all text-left"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-white/10">
                          <Users className="w-5 h-5 text-burgundy" />
                        </div>
                        <div>
                          <h5 className="text-black font-medium">Private Ride</h5>
                          <p className="text-gray-400 text-xs">Hourly & personal</p>
                        </div>
                      </div>
                    </button>
                  </div>
                </div>
              ) : (
                /* After selecting service, show booking type */
                <div className="space-y-3">
                  <button
                    type="button"
                    onClick={() => setSelectedService(false)}
                    className="text-burgundy text-sm hover:underline mb-2"
                  >
                    ← Change service
                  </button>
                  <h4 className="text-black font-medium">
                    {bookingData.serviceType === 'airport' && 'Airport Transportation'}
                    {bookingData.serviceType === 'city' && 'City Ride'}
                    {bookingData.serviceType === 'intercity' && 'Mountain Transportation'}
                    {bookingData.serviceType === 'corporate' && 'Corporate Travel'}
                    {bookingData.serviceType === 'special' && 'Special Event'}
                    {bookingData.serviceType === 'private' && 'Private Ride'}
                  </h4>
                  
                  <h4 className="text-sm text-gray-400 uppercase tracking-widest mt-4">Would you like to:</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => updateBookingData({ bookingType: 'book' })}
                      className={`p-5 rounded-xl border-2 transition-all text-left ${
                        bookingData.bookingType === 'book' 
                          ? 'border-burgundy bg-burgundy/10' 
                          : 'border-black/10 hover:border-black/30 bg-white/5'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                          bookingData.bookingType === 'book' ? 'bg-burgundy/20' : 'bg-white/10'
                        }`}>
                          <Calendar className={`w-6 h-6 ${bookingData.bookingType === 'book' ? 'text-burgundy' : 'text-gray-400'}`} />
                        </div>
                        <div>
                          <h5 className="text-black font-semibold text-lg">Book a Ride</h5>
                          <p className="text-gray-400 text-sm">Reserve now</p>
                        </div>
                      </div>
                    </button>
                    <button
                      type="button"
                      onClick={() => updateBookingData({ bookingType: 'quote' })}
                      className={`p-5 rounded-xl border-2 transition-all text-left ${
                        bookingData.bookingType === 'quote' 
                          ? 'border-burgundy bg-burgundy/10' 
                          : 'border-black/10 hover:border-black/30 bg-white/5'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                          bookingData.bookingType === 'quote' ? 'bg-burgundy/20' : 'bg-white/10'
                        }`}>
                          <MapPin className={`w-6 h-6 ${bookingData.bookingType === 'quote' ? 'text-burgundy' : 'text-gray-400'}`} />
                        </div>
                        <div>
                          <h5 className="text-black font-semibold text-lg">Get a Quote</h5>
                          <p className="text-gray-400 text-sm">Request pricing</p>
                        </div>
                      </div>
                    </button>
                  </div>
                </div>
              )}

              {/* Flight Tracking - Only shown when airport service selected */}
              {bookingData.serviceType === 'airport' && selectedService && (
                <div className="bg-gray-100 rounded-xl p-4 border border-black/5 mb-4">
                  <button 
                    type="button"
                    onClick={() => setShowFlights(!showFlights)}
                    className="flex items-center gap-2 text-burgundy font-medium mb-2"
                  >
                    <Plane className="w-5 h-5" />
                    {showFlights ? 'Hide' : 'Track'} Flight
                  </button>
                  {showFlights && (
                    <div className="space-y-2">
                      {mockFlights.slice(0, 3).map((flight, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => updateBookingData({ 
                            pickupLocation: 'Denver International Airport (DIA)',
                            flightNumber: flight.flightNumber,
                            notes: `Flight: ${flight.flightNumber} - ${flight.airline}`
                          })}
                          className="w-full flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 border border-black/5 text-left"
                        >
                          <span className="text-black font-medium">{flight.flightNumber}</span>
                          <span className="text-gray-400 text-sm">{flight.airline}</span>
                          <span className={`text-xs px-2 py-1 rounded ${
                            flight.status === 'on-time' ? 'bg-green-500/20 text-green-400' :
                            flight.status === 'delayed' ? 'bg-red-500/20 text-red-400' :
                            'bg-yellow-500/20 text-yellow-400'
                          }`}>{flight.status}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Events */}
              <div className="bg-gray-100 rounded-xl p-4 border border-black/5">
                <button 
                  type="button"
                  onClick={() => setShowEvents(!showEvents)}
                  className="flex items-center gap-2 text-burgundy font-medium mb-2"
                >
                  <Calendar className="w-5 h-5" />
                  {showEvents ? 'Hide' : 'Browse'} Events
                </button>
                {showEvents && (
                  <div className="space-y-2">
                    {mockEvents.slice(0, 3).map((event) => (
                      <div key={event.id} className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 border border-black/5">
                        <button
                          type="button"
                          onClick={() => {
                            updateBookingData({
                              eventName: event.name,
                              eventVenue: event.venue,
                              pickupDate: event.date,
                              dropoffLocation: event.venue
                            });
                          }}
                          className="text-left flex-1"
                        >
                          <p className="text-black font-medium text-sm">{event.name}</p>
                          <p className="text-gray-400 text-xs">{event.date}</p>
                        </button>
                        {event.link && (
                          <a 
                            href={event.link} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="p-2 text-gray-400 hover:text-burgundy"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Step 2: Travel Details */}
          {currentStep === 2 && (
            <div>
              <h3 className="text-2xl font-bold text-black mb-2">Travel Details</h3>
              <p className="text-gray-400 mb-6">Enter your information and trip details.</p>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">First Name *</label>
                    <input 
                      required 
                      type="text" 
                      value={bookingData.firstName}
                      onChange={(e) => updateBookingData({ firstName: e.target.value })}
                      className="w-full bg-white/5 border border-black/10 rounded-lg px-4 py-3 text-black focus:border-burgundy focus:outline-none" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Last Name *</label>
                    <input 
                      required 
                      type="text" 
                      value={bookingData.lastName}
                      onChange={(e) => updateBookingData({ lastName: e.target.value })}
                      className="w-full bg-white/5 border border-black/10 rounded-lg px-4 py-3 text-black focus:border-burgundy focus:outline-none" 
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-1">Phone Number *</label>
                  <input 
                    required 
                    type="tel" 
                    value={bookingData.phone}
                    onChange={(e) => updateBookingData({ phone: e.target.value })}
                    className="w-full bg-white/5 border border-black/10 rounded-lg px-4 py-3 text-black focus:border-burgundy focus:outline-none" 
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-1">Email Address *</label>
                  <input 
                    required 
                    type="email" 
                    value={bookingData.email}
                    onChange={(e) => updateBookingData({ email: e.target.value })}
                    className="w-full bg-white/5 border border-black/10 rounded-lg px-4 py-3 text-black focus:border-burgundy focus:outline-none" 
                  />
                </div>

                {/* Address fields - Allow user input for pickup */}
                <div>
                  <label className="block text-sm text-gray-400 mb-1">
                    {bookingData.serviceType === 'airport' ? 'Pickup Location *' : 'Pickup Location *'}
                  </label>
                  <div className="relative">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                        {bookingData.serviceType === 'airport' ? <Plane className="w-4 h-4" /> : <MapPin className="w-4 h-4" />}
                      </div>
                      <input 
                        required 
                        type="text" 
                        value={bookingData.pickupLocation}
                        onChange={(e) => {
                          updateBookingData({ pickupLocation: e.target.value });
                          pickupAutocomplete.fetchSuggestions(e.target.value);
                        }}
                        onBlur={() => {
                          setTimeout(() => pickupAutocomplete.clearSuggestions(), 200);
                        }}
                        placeholder={bookingData.serviceType === 'airport' ? "Enter pickup address or airport..." : "Start typing address..."}
                        className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-10 pr-4 py-3 text-gray-900 focus:border-[#FA0000] focus:outline-none" 
                      />
                      {(pickupAutocomplete.suggestions.length > 0 || pickupAutocomplete.isLoading) && (
                        <div className="absolute left-0 right-0 top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 overflow-hidden max-h-60 overflow-y-auto">
                          {pickupAutocomplete.isLoading ? (
                            <div className="px-4 py-3 text-gray-400 text-sm flex items-center gap-2">
                              <Loader2 className="w-4 h-4 animate-spin" />
                              Searching...
                            </div>
                          ) : (
                            pickupAutocomplete.suggestions.map((suggestion) => (
                              <button
                                key={suggestion.place_id}
                                type="button"
                                onClick={() => {
                                  pickupAutocomplete.selectPlace(suggestion);
                                  updateBookingData({ pickupLocation: suggestion.display_name });
                                }}
                                className="w-full px-4 py-3 text-left text-gray-900 hover:bg-gray-50 text-sm border-b border-gray-100 last:border-0"
                              >
                                {suggestion.display_name}
                              </button>
                            ))
                          )}
                        </div>
                      )}
                    </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-1">Destination *</label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <input 
                      required 
                      type="text" 
                      value={bookingData.dropoffLocation}
                      onChange={(e) => {
                        updateBookingData({ dropoffLocation: e.target.value });
                        dropoffAutocomplete.fetchSuggestions(e.target.value);
                      }}
                      onBlur={() => setTimeout(() => dropoffAutocomplete.clearSuggestions(), 200)}
                      placeholder="Start typing destination address..."
                      className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-10 pr-4 py-3 text-gray-900 focus:border-[#FA0000] focus:outline-none" 
                    />
                    {(dropoffAutocomplete.suggestions.length > 0 || dropoffAutocomplete.isLoading) && (
                      <div className="absolute left-0 right-0 top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 overflow-hidden max-h-60 overflow-y-auto">
                        {dropoffAutocomplete.isLoading ? (
                          <div className="px-4 py-3 text-gray-400 text-sm flex items-center gap-2">
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Searching...
                          </div>
                        ) : (
                          dropoffAutocomplete.suggestions.map((suggestion) => (
                            <button
                              key={suggestion.place_id}
                              type="button"
                              onClick={() => {
                                dropoffAutocomplete.selectPlace(suggestion);
                                updateBookingData({ dropoffLocation: suggestion.display_name });
                              }}
                              className="w-full px-4 py-3 text-left text-gray-900 hover:bg-gray-50 text-sm border-b border-gray-100 last:border-0"
                            >
                              {suggestion.display_name}
                            </button>
                          ))
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Airport-specific fields */}
                {bookingData.serviceType === 'airport' && (
                  <>
                    <div>
                      <label className="block text-sm text-gray-400 mb-1">Flight Number</label>
                      <div className="relative">
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                          <Plane className="w-4 h-4" />
                        </div>
                        <input 
                          type="text" 
                          value={bookingData.flightNumber || ''}
                          onChange={(e) => updateBookingData({ flightNumber: e.target.value })}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              searchFlight(bookingData.flightNumber || '');
                            }
                          }}
                          placeholder="e.g., UA1234"
                          className="w-full bg-white/5 border border-black/10 rounded-lg pl-10 pr-24 py-3 text-black focus:border-burgundy focus:outline-none" 
                        />
                        <button
                          type="button"
                          onClick={() => searchFlight(bookingData.flightNumber || '')}
                          disabled={!bookingData.flightNumber || isFlightLoading}
                          className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-[#FA0000] text-white text-xs font-medium rounded hover:bg-burgundy-light disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
                        >
                          {isFlightLoading ? (
                            <Loader2 className="w-3 h-3 animate-spin" />
                          ) : (
                            <Search className="w-3 h-3" />
                          )}
                          Track
                        </button>
                      </div>
                      {flightError && (
                        <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {flightError}
                        </p>
                      )}
                      {flightData && (
                        <div className="mt-3 p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                          <div className="flex items-center justify-between mb-3">
                            <div>
                              <span className="text-black font-semibold text-lg">{flightData.airline_name}</span>
                              <span className="text-gray-400 ml-2">{flightData.flight_iata}</span>
                            </div>
                            <span className={`text-xs px-3 py-1.5 rounded font-medium ${
                              flightData.status === 'active' ? 'bg-green-500/20 text-green-400' :
                              flightData.status === 'delayed' ? 'bg-red-500/20 text-red-400' :
                              flightData.status === 'landed' ? 'bg-blue-500/20 text-blue-400' :
                              flightData.status === 'cancelled' ? 'bg-red-500/50 text-red-300' :
                              'bg-yellow-500/20 text-yellow-400'
                            }`}>
                              {flightData.status.charAt(0).toUpperCase() + flightData.status.slice(1)}
                            </span>
                          </div>
                          
                          {/* Route */}
                          <div className="flex items-center justify-between mb-4 pb-3 border-b border-black/10">
                            <div className="text-center">
                              <p className="text-black font-bold text-xl">{flightData.dep_iata}</p>
                              <p className="text-gray-400 text-xs">{flightData.dep_airport?.split(',')[0]}</p>
                            </div>
                            <div className="flex-1 px-4 flex items-center justify-center">
                              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gold to-transparent"></div>
                              <Plane className="w-5 h-5 text-burgundy mx-2" />
                              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gold to-transparent"></div>
                            </div>
                            <div className="text-center">
                              <p className="text-black font-bold text-xl">{flightData.arr_iata}</p>
                              <p className="text-gray-400 text-xs">{flightData.arr_airport?.split(',')[0]}</p>
                            </div>
                          </div>

                          {/* Departure & Arrival Details */}
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            {/* Departure */}
                            <div className="space-y-2">
                              <p className="text-burgundy font-medium text-xs uppercase">Departure</p>
                              <div className="space-y-1">
                                <div className="flex justify-between">
                                  <span className="text-gray-400">Scheduled:</span>
                                  <span className="text-black">{flightData.dep_scheduled ? new Date(flightData.dep_scheduled).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) : 'N/A'}</span>
                                </div>
                                {flightData.dep_estimated && (
                                  <div className="flex justify-between">
                                    <span className="text-gray-400">Estimated:</span>
                                    <span className="text-black">{new Date(flightData.dep_estimated).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</span>
                                  </div>
                                )}
                                {flightData.dep_delay !== null && flightData.dep_delay > 0 && (
                                  <div className="flex justify-between">
                                    <span className="text-gray-400">Delay:</span>
                                    <span className="text-red-400">+{flightData.dep_delay} min</span>
                                  </div>
                                )}
                                {flightData.dep_terminal && (
                                  <div className="flex justify-between">
                                    <span className="text-gray-400">Terminal:</span>
                                    <span className="text-black">{flightData.dep_terminal}</span>
                                  </div>
                                )}
                                {flightData.dep_gate && (
                                  <div className="flex justify-between">
                                    <span className="text-gray-400">Gate:</span>
                                    <span className="text-black">{flightData.dep_gate}</span>
                                  </div>
                                )}
                              </div>
                            </div>

                            {/* Arrival */}
                            <div className="space-y-2">
                              <p className="text-burgundy font-medium text-xs uppercase">Arrival</p>
                              <div className="space-y-1">
                                <div className="flex justify-between">
                                  <span className="text-gray-400">Scheduled:</span>
                                  <span className="text-black">{flightData.arr_scheduled ? new Date(flightData.arr_scheduled).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) : 'N/A'}</span>
                                </div>
                                {flightData.arr_estimated && (
                                  <div className="flex justify-between">
                                    <span className="text-gray-400">Estimated:</span>
                                    <span className="text-black">{new Date(flightData.arr_estimated).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</span>
                                  </div>
                                )}
                                {flightData.arr_delay !== null && flightData.arr_delay > 0 && (
                                  <div className="flex justify-between">
                                    <span className="text-gray-400">Delay:</span>
                                    <span className="text-red-400">+{flightData.arr_delay} min</span>
                                  </div>
                                )}
                                {flightData.arr_terminal && (
                                  <div className="flex justify-between">
                                    <span className="text-gray-400">Terminal:</span>
                                    <span className="text-black">{flightData.arr_terminal}</span>
                                  </div>
                                )}
                                {flightData.arr_gate && (
                                  <div className="flex justify-between">
                                    <span className="text-gray-400">Gate:</span>
                                    <span className="text-black">{flightData.arr_gate}</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>

                          {/* Aircraft */}
                          {flightData.aircraft && (
                            <div className="mt-3 pt-3 border-t border-black/10">
                              <span className="text-gray-400 text-xs">Aircraft: </span>
                              <span className="text-black text-xs">{flightData.aircraft}</span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-gray-400 mb-1">Luggage Count</label>
                        <select 
                          value={bookingData.luggageCount || '0'}
                          onChange={(e) => updateBookingData({ luggageCount: e.target.value })}
                          className="w-full bg-white/5 border border-black/10 rounded-lg px-4 py-3 text-black focus:border-burgundy focus:outline-none"
                        >
                          {[0,1,2,3,4,5,6,7,8].map(n => (
                            <option key={n} value={n}>{n} {n === 1 ? 'Bag' : 'Bags'}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm text-gray-400 mb-1">Passengers *</label>
                        <select 
                          required
                          value={bookingData.passengers}
                          onChange={(e) => updateBookingData({ passengers: e.target.value })}
                          className="w-full bg-white/5 border border-black/10 rounded-lg px-4 py-3 text-black focus:border-burgundy focus:outline-none"
                        >
                          {[1,2,3,4,5,6,7,8,9,10,11,12,13,14].map(n => (
                            <option key={n} value={n}>{n} {n === 1 ? 'Passenger' : 'Passengers'}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </>
                )}

                {/* City/Intercity/Corporate fields */}
                {bookingData.serviceType !== 'airport' && (
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Number of Passengers</label>
                    <select 
                      value={bookingData.passengers}
                      onChange={(e) => updateBookingData({ passengers: e.target.value })}
                      className="w-full bg-white/5 border border-black/10 rounded-lg px-4 py-3 text-black focus:border-burgundy focus:outline-none"
                    >
                      {[1,2,3,4,5,6,7,8,9,10,11,12,13,14].map(n => (
                        <option key={n} value={n}>{n} {n === 1 ? 'Passenger' : 'Passengers'}</option>
                      ))}
                    </select>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Pickup Date *</label>
                    <input 
                      required 
                      type="date" 
                      value={bookingData.pickupDate}
                      onChange={(e) => updateBookingData({ pickupDate: e.target.value })}
                      className="w-full bg-white/5 border border-black/10 rounded-lg px-4 py-3 text-black focus:border-burgundy focus:outline-none [color-scheme:dark]" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Pickup Time *</label>
                    <select 
                      required 
                      value={bookingData.pickupTime}
                      onChange={(e) => updateBookingData({ pickupTime: e.target.value })}
                      className="w-full bg-white/5 border border-black/10 rounded-lg px-4 py-3 text-black focus:border-burgundy focus:outline-none"
                    >
                      <option value="">Select time</option>
                      {['06:00 AM', '06:30 AM', '07:00 AM', '07:30 AM', '08:00 AM', '08:30 AM', '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM', '01:00 PM', '01:30 PM', '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM', '05:00 PM', '05:30 PM', '06:00 PM', '06:30 PM', '07:00 PM', '07:30 PM', '08:00 PM', '08:30 PM', '09:00 PM', '09:30 PM', '10:00 PM'].map(t => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-1">Optional Notes</label>
                  <textarea 
                    value={bookingData.notes}
                    onChange={(e) => updateBookingData({ notes: e.target.value })}
                    rows={2}
                    className="w-full bg-white/5 border border-black/10 rounded-lg px-4 py-3 text-black focus:border-burgundy focus:outline-none resize-none"
                    placeholder="Special requests..."
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Review */}
          {currentStep === 3 && (
            <div>
              <h3 className="text-2xl font-bold text-black mb-2">Review Your Information</h3>
              <p className="text-gray-400 mb-6">Confirm your booking details.</p>

              <div className="bg-gray-100 rounded-xl p-5 border border-black/5 space-y-3">
                <div className="flex justify-between py-2 border-b border-black/5">
                  <span className="text-gray-400">Service Type</span>
                  <span className="text-black capitalize">{bookingData.serviceType}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-black/5">
                  <span className="text-gray-400">Name</span>
                  <span className="text-black">{bookingData.firstName} {bookingData.lastName}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-black/5">
                  <span className="text-gray-400">Phone</span>
                  <span className="text-black">{bookingData.phone}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-black/5">
                  <span className="text-gray-400">Email</span>
                  <span className="text-black">{bookingData.email}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-black/5">
                  <span className="text-gray-400">Pickup</span>
                  <span className="text-black text-right">{bookingData.pickupLocation}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-black/5">
                  <span className="text-gray-400">Destination</span>
                  <span className="text-black text-right">{bookingData.dropoffLocation}</span>
                </div>
                {bookingData.serviceType === 'airport' && bookingData.flightNumber && (
                  <div className="flex justify-between py-2 border-b border-black/5">
                    <span className="text-gray-400">Flight Number</span>
                    <span className="text-black">{bookingData.flightNumber}</span>
                  </div>
                )}
                <div className="flex justify-between py-2 border-b border-black/5">
                  <span className="text-gray-400">Date & Time</span>
                  <span className="text-black">{bookingData.pickupDate} at {bookingData.pickupTime}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-black/5">
                  <span className="text-gray-400">Passengers</span>
                  <span className="text-black">{bookingData.passengers}</span>
                </div>
                {bookingData.serviceType === 'airport' && (
                  <div className="flex justify-between py-2 border-b border-black/5">
                    <span className="text-gray-400">Luggage</span>
                    <span className="text-black">{bookingData.luggageCount || 0} {bookingData.luggageCount === '1' ? 'bag' : 'bags'}</span>
                  </div>
                )}
                {bookingData.notes && (
                  <div className="py-2">
                    <span className="text-gray-400">Notes:</span>
                    <p className="text-black text-sm mt-1">{bookingData.notes}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Step 4: Confirm */}
          {currentStep === 4 && (
            <div className="text-center py-8">
              <div className="w-20 h-20 bg-burgundy/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Calendar className="w-10 h-10 text-burgundy" />
              </div>
              <h3 className="text-2xl font-bold text-black mb-2">Ready to Submit</h3>
              <p className="text-gray-400 mb-6">
                {bookingData.bookingType === 'book' 
                  ? 'Click below to confirm your booking.' 
                  : 'Click below to request your quote.'}
              </p>

              <div className="bg-gray-100 rounded-xl p-4 border border-black/5 text-left mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-burgundy/10 rounded-lg flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-burgundy" />
                  </div>
                  <div>
                    <p className="text-black font-medium">{bookingData.bookingType === 'book' ? 'Booking Request' : 'Quote Request'}</p>
                    <p className="text-gray-400 text-sm">{bookingData.pickupDate} at {bookingData.pickupTime}</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-100 rounded-xl p-4 border border-black/5 text-left mb-6">
                <p className="text-gray-400 text-sm mb-4">
                  By submitting this booking request, you agree to our terms of service and privacy policy. 
                  You consent to receive booking confirmations and service updates via email and phone. 
                  Our team will contact you within 2 hours to confirm availability and finalize your booking. 
                  Payment will be collected at the time of service unless other arrangements are made.
                </p>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={agreedToTerms}
                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                    className="mt-1 w-5 h-5 rounded border-black/20 bg-white/5 text-burgundy focus:ring-gold focus:ring-offset-0"
                  />
                  <span className="text-black text-sm">
                    I agree to the terms of service and privacy policy
                  </span>
                </label>
              </div>

              <button 
                type="submit"
                disabled={isLoading || !agreedToTerms}
                className="w-full bg-[#FA0000] text-white font-bold py-4 rounded-xl hover:bg-burgundy-light transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    {bookingData.bookingType === 'book' ? 'Confirm Booking' : 'Request Quote'}
                    <Send className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>
          )}
        </form>

        {/* Confirmation Success */}
        {isBooked && (
          <div className="absolute inset-0 bg-charcoal flex flex-col items-center justify-center p-8 text-center z-10">
            <CheckCircle className="w-20 h-20 text-green-500 mb-6" />
            <h2 className="text-3xl font-bold text-black mb-4">Thank You!</h2>
            <p className="text-gray-400 text-lg mb-2">We have received your request.</p>
            <p className="text-gray-500 text-sm mb-6">
              A member of our team will contact you shortly to confirm your ride.
            </p>
            <p className="text-gray-500 text-sm mb-8">
              If urgent, call us at <span className="text-burgundy font-semibold">+1 (720) 935-1912</span>
            </p>
            <button 
              onClick={() => { closeBooking(); setIsBooked(false); }} 
              className="px-8 py-3 bg-[#FA0000] text-white font-semibold rounded-full hover:bg-burgundy-light"
            >
              Done
            </button>
          </div>
        )}

        {/* Navigation */}
        {!isBooked && currentStep < 4 && (
          <div className="flex justify-between p-4 border-t border-black/10 bg-black/30">
            <button
              type="button"
              onClick={() => setCurrentStep(currentStep - 1)}
              disabled={currentStep === 1}
              className="flex items-center gap-1 px-4 py-2 text-gray-400 hover:text-black disabled:opacity-30"
            >
              <ChevronLeft className="w-4 h-4" />
              Back
            </button>
            <button
              type="button"
              onClick={() => setCurrentStep(currentStep + 1)}
              disabled={!canProceed()}
              className="flex items-center gap-2 px-6 py-2 bg-white text-black font-semibold rounded-full hover:bg-gray-200 disabled:opacity-30"
            >
              Continue
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
