import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, waitFor } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { SEO } from './SEO';

const renderSEO = (props: React.ComponentProps<typeof SEO>) =>
  render(
    <HelmetProvider>
      <SEO {...props} />
    </HelmetProvider>,
  );

describe('SEO', () => {
  it('sets the document title with the site suffix', async () => {
    renderSEO({ title: 'Contact', description: 'desc' });
    await waitFor(() => expect(document.title).toBe('Contact | Lux Motion Rides'));
  });

  it('renders the description meta tag', async () => {
    renderSEO({ title: 'Home', description: 'A great ride service' });
    await waitFor(() =>
      expect(document.querySelector('meta[name="description"]')?.getAttribute('content')).toBe(
        'A great ride service',
      ),
    );
  });

  it('falls back to the default description when none is provided', async () => {
    renderSEO({ title: 'Home', description: '' });
    await waitFor(() =>
      expect(document.querySelector('meta[name="description"]')?.getAttribute('content')).toContain(
        'Colorado premier luxury black car service',
      ),
    );
  });

  it('renders a canonical link when canonical is provided', async () => {
    renderSEO({ title: 'FAQ', description: 'd', canonical: '/faq' });
    await waitFor(() =>
      expect(document.querySelector('link[rel="canonical"]')?.getAttribute('href')).toBe(
        'https://luxmotionrides.com/faq',
      ),
    );
  });

  it('renders keywords meta only when keywords are provided', async () => {
    const { rerender } = renderSEO({ title: 'A', description: 'd' });
    await waitFor(() => expect(document.title).toBe('A | Lux Motion Rides'));
    expect(document.querySelector('meta[name="keywords"]')).toBeNull();

    rerender(
      <HelmetProvider>
        <SEO title="A" description="d" keywords="limo, denver" />
      </HelmetProvider>,
    );
    await waitFor(() =>
      expect(document.querySelector('meta[name="keywords"]')?.getAttribute('content')).toBe(
        'limo, denver',
      ),
    );
  });
});
