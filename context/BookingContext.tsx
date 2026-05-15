import React, { createContext, useState, useContext } from 'react';

export type ServiceType = 'airport' | 'city' | 'intercity' | 'corporate' | 'special' | 'private';

export interface BookingData {
  // Step 1
  bookingType: 'book' | 'quote';
  serviceType?: ServiceType;
  // Step 2
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  pickupLocation: string;
  dropoffLocation: string;
  pickupDate: string;
  pickupTime: string;
  passengers: string;
  notes: string;
  // Airport specific fields
  flightNumber?: string;
  luggageCount?: string;
  // Event info (optional)
  eventName?: string;
  eventVenue?: string;
  // Vehicle selection
  selectedVehicle?: string;
}

interface BookingContextType {
  isOpen: boolean;
  openBooking: (initialData?: Partial<BookingData>) => void;
  closeBooking: () => void;
  bookingData: BookingData;
  updateBookingData: (data: Partial<BookingData>) => void;
  resetBookingData: () => void;
  currentStep: number;
  setCurrentStep: (step: number) => void;
}

const initialBookingData: BookingData = {
  bookingType: 'book',
  serviceType: undefined,
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  pickupLocation: '',
  dropoffLocation: '',
  pickupDate: '',
  pickupTime: '',
  passengers: '1',
  notes: '',
  flightNumber: '',
  luggageCount: '0',
  selectedVehicle: undefined
};

export const BookingContext = createContext<BookingContextType>({
  isOpen: false,
  openBooking: () => {},
  closeBooking: () => {},
  bookingData: initialBookingData,
  updateBookingData: () => {},
  resetBookingData: () => {},
  currentStep: 1,
  setCurrentStep: () => {}
});

export const BookingProvider = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [bookingData, setBookingData] = useState<BookingData>(initialBookingData);
  const [currentStep, setCurrentStep] = useState(1);

  const openBooking = (initialData?: Partial<BookingData>) => {
    if (initialData) {
      setBookingData({ ...initialBookingData, ...initialData });
    } else {
      setBookingData(initialBookingData);
    }
    setCurrentStep(1);
    setIsOpen(true);
  };

  const closeBooking = () => {
    setIsOpen(false);
    setBookingData(initialBookingData);
    setCurrentStep(1);
  };

  const updateBookingData = (data: Partial<BookingData>) => {
    setBookingData(prev => ({ ...prev, ...data }));
  };

  const resetBookingData = () => {
    setBookingData(initialBookingData);
    setCurrentStep(1);
  };

  return (
    <BookingContext.Provider value={{ 
      isOpen, 
      openBooking, 
      closeBooking, 
      bookingData, 
      updateBookingData, 
      resetBookingData,
      currentStep,
      setCurrentStep 
    }}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => useContext(BookingContext);
