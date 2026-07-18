import { describe, it, expect } from 'vitest';
import { renderWithProviders, screen } from '../test/test-utils';
import { Home } from './Home';
import { AboutPage } from './AboutPage';
import { FleetPage } from './FleetPage';
import { ServicesPage } from './ServicesPage';

describe('composite page smoke tests', () => {
  it('Home renders its main sections', () => {
    renderWithProviders(<Home />);
    expect(screen.getByText(/Luxury Rides\./i)).toBeInTheDocument();
    expect(screen.getByText('Our Fleet')).toBeInTheDocument();
    expect(screen.getByText('Trusted Partnerships')).toBeInTheDocument();
  });

  it('AboutPage renders the about content', () => {
    renderWithProviders(<AboutPage />);
    expect(screen.getAllByText('About Lux Motion Rides').length).toBeGreaterThan(0);
    expect(screen.getByText('Why Choose Lux Motion')).toBeInTheDocument();
  });

  it('FleetPage renders the fleet heading and vehicles', () => {
    renderWithProviders(<FleetPage />);
    expect(screen.getByRole('heading', { name: 'Our Fleet' })).toBeInTheDocument();
    expect(screen.getByText('GMC Yukon XL Denali')).toBeInTheDocument();
  });

  it('ServicesPage lists the services with learn-more links', () => {
    renderWithProviders(<ServicesPage />);
    expect(screen.getByRole('heading', { name: 'Our Services' })).toBeInTheDocument();
    expect(screen.getAllByRole('link', { name: /learn more/i }).length).toBe(6);
  });
});
