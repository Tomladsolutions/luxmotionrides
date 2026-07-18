import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { ScrollToTop } from './ScrollToTop';

describe('ScrollToTop', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'scrollY', { value: 0, writable: true, configurable: true });
  });

  it('is hidden until the user scrolls past the threshold', () => {
    render(<ScrollToTop />);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('appears after scrolling more than 500px', () => {
    render(<ScrollToTop />);

    act(() => {
      (window as unknown as { scrollY: number }).scrollY = 600;
      window.dispatchEvent(new Event('scroll'));
    });

    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('scrolls to the top when clicked', () => {
    const scrollToSpy = vi.spyOn(window, 'scrollTo');
    render(<ScrollToTop />);

    act(() => {
      (window as unknown as { scrollY: number }).scrollY = 600;
      window.dispatchEvent(new Event('scroll'));
    });

    fireEvent.click(screen.getByRole('button'));
    expect(scrollToSpy).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
  });
});
