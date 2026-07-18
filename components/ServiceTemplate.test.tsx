import { describe, it, expect } from 'vitest';
import { renderWithProviders, BookingProbe, screen, fireEvent } from '../test/test-utils';
import { ServiceTemplate } from './ServiceTemplate';

const baseProps = {
  title: 'Airport Transportation',
  subtitle: 'Denver International Airport',
  description: 'Stress free airport pickups.',
  image: '/airport.jpg',
  features: ['Flight tracking', 'Meet and greet', 'Luggage help'],
};

const setup = (props = {}) =>
  renderWithProviders(
    <>
      <ServiceTemplate {...baseProps} {...props} />
      <BookingProbe />
    </>,
  );

describe('ServiceTemplate', () => {
  it('renders title, subtitle, description and features', () => {
    setup();
    expect(screen.getByRole('heading', { name: 'Airport Transportation' })).toBeInTheDocument();
    expect(screen.getByText('Denver International Airport')).toBeInTheDocument();
    expect(screen.getByText('Stress free airport pickups.')).toBeInTheDocument();
    baseProps.features.forEach((f) => expect(screen.getByText(f)).toBeInTheDocument());
  });

  it('opens booking seeded with the service type when provided', () => {
    setup({ serviceType: 'airport' });
    fireEvent.click(screen.getByRole('button', { name: /book this service/i }));
    const probe = screen.getByTestId('booking-probe');
    expect(probe).toHaveAttribute('data-open', 'true');
    expect(probe).toHaveAttribute('data-service-type', 'airport');
  });

  it('opens a generic booking when no service type is given', () => {
    setup();
    fireEvent.click(screen.getByRole('button', { name: /book this service/i }));
    const probe = screen.getByTestId('booking-probe');
    expect(probe).toHaveAttribute('data-open', 'true');
    expect(probe).toHaveAttribute('data-service-type', '');
  });
});
