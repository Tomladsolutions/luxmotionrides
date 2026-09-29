import React from 'react';
import { describe, it, expect } from 'vitest';
import { renderWithProviders, BookingProbe, screen, fireEvent } from '../test/test-utils';
import { DIAPage } from './DIAPage';
import { CorporatePage } from './CorporatePage';
import { SpecialEventPage } from './SpecialEventPage';
import { PrivateRidesPage } from './PrivateRidesPage';
import { MountainPage } from './MountainPage';
import { CollegePage } from './CollegePage';
import { ConcertPage } from './ConcertPage';

const pages: Array<[string, React.ComponentType, string]> = [
  ['DIAPage', DIAPage, 'Airport Transportation'],
  ['CorporatePage', CorporatePage, 'Corporate Transportation'],
  ['SpecialEventPage', SpecialEventPage, 'Special Event Transportation'],
  ['PrivateRidesPage', PrivateRidesPage, 'Private Rides'],
  ['MountainPage', MountainPage, 'Mountain Transportation'],
  ['CollegePage', CollegePage, 'College Transportation'],
  ['ConcertPage', ConcertPage, 'Concert Transportation'],
];

describe('service template pages', () => {
  it.each(pages)('%s renders its title and a working booking CTA', (_name, Page, title) => {
    renderWithProviders(
      <>
        <Page />
        <BookingProbe />
      </>,
    );
    expect(screen.getByRole('heading', { name: title })).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /book this service/i }));
    expect(screen.getByTestId('booking-probe')).toHaveAttribute('data-open', 'true');
  });
});
