import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './Layout';

const renderLayout = () =>
  render(
    <MemoryRouter initialEntries={['/']}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<div>Child route content</div>} />
        </Route>
      </Routes>
    </MemoryRouter>,
  );

describe('Layout', () => {
  it('renders the navbar, footer and the routed child via Outlet', () => {
    renderLayout();
    expect(screen.getByText('Child route content')).toBeInTheDocument();
    // Navbar CTA
    expect(screen.getByRole('button', { name: /book now/i })).toBeInTheDocument();
    // Footer copyright
    expect(
      screen.getByText(new RegExp(`${new Date().getFullYear()} Lux Motion Rides`)),
    ).toBeInTheDocument();
  });
});
