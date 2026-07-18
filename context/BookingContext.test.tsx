import React from 'react';
import { describe, it, expect } from 'vitest';
import { act, renderHook } from '@testing-library/react';
import { BookingProvider, useBooking } from './BookingContext';

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <BookingProvider>{children}</BookingProvider>
);

const renderBooking = () => renderHook(() => useBooking(), { wrapper });

describe('BookingContext', () => {
  it('provides the expected default state', () => {
    const { result } = renderBooking();

    expect(result.current.isOpen).toBe(false);
    expect(result.current.currentStep).toBe(1);
    expect(result.current.bookingData).toMatchObject({
      bookingType: 'book',
      serviceType: undefined,
      firstName: '',
      lastName: '',
      passengers: '1',
      luggageCount: '0',
      selectedVehicle: undefined,
    });
  });

  it('openBooking opens the modal and resets to step 1', () => {
    const { result } = renderBooking();

    act(() => result.current.setCurrentStep(3));
    act(() => result.current.openBooking());

    expect(result.current.isOpen).toBe(true);
    expect(result.current.currentStep).toBe(1);
    expect(result.current.bookingData.serviceType).toBeUndefined();
  });

  it('openBooking merges initial data over the defaults', () => {
    const { result } = renderBooking();

    act(() =>
      result.current.openBooking({
        serviceType: 'airport',
        firstName: 'Ada',
        passengers: '4',
      }),
    );

    expect(result.current.isOpen).toBe(true);
    expect(result.current.bookingData.serviceType).toBe('airport');
    expect(result.current.bookingData.firstName).toBe('Ada');
    expect(result.current.bookingData.passengers).toBe('4');
    // untouched fields keep their defaults
    expect(result.current.bookingData.lastName).toBe('');
    expect(result.current.bookingData.luggageCount).toBe('0');
  });

  it('openBooking with no argument uses a clean default state', () => {
    const { result } = renderBooking();

    act(() => result.current.openBooking({ firstName: 'Grace' }));
    act(() => result.current.closeBooking());
    act(() => result.current.openBooking());

    expect(result.current.bookingData.firstName).toBe('');
  });

  it('updateBookingData performs a partial merge without clobbering other fields', () => {
    const { result } = renderBooking();

    act(() => result.current.updateBookingData({ email: 'a@b.com' }));
    act(() => result.current.updateBookingData({ phone: '555-0100' }));

    expect(result.current.bookingData.email).toBe('a@b.com');
    expect(result.current.bookingData.phone).toBe('555-0100');
    expect(result.current.bookingData.firstName).toBe('');
  });

  it('closeBooking closes the modal and clears entered data', () => {
    const { result } = renderBooking();

    act(() => result.current.openBooking({ firstName: 'Alan' }));
    act(() => result.current.setCurrentStep(2));
    act(() => result.current.closeBooking());

    expect(result.current.isOpen).toBe(false);
    expect(result.current.currentStep).toBe(1);
    expect(result.current.bookingData.firstName).toBe('');
  });

  it('resetBookingData restores defaults and step without touching isOpen', () => {
    const { result } = renderBooking();

    act(() => result.current.openBooking({ firstName: 'Edsger' }));
    act(() => result.current.setCurrentStep(3));
    act(() => result.current.resetBookingData());

    expect(result.current.isOpen).toBe(true);
    expect(result.current.currentStep).toBe(1);
    expect(result.current.bookingData.firstName).toBe('');
  });

  it('setCurrentStep updates the current step', () => {
    const { result } = renderBooking();

    act(() => result.current.setCurrentStep(2));
    expect(result.current.currentStep).toBe(2);
  });
});
