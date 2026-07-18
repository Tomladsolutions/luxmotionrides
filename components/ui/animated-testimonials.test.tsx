import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { AnimatedTestimonials } from './animated-testimonials';

const testimonials = [
  { quote: 'First quote', name: 'Alice', designation: 'CEO', src: '/a.jpg' },
  { quote: 'Second quote', name: 'Bob', designation: 'CTO', src: '/b.jpg' },
];

describe('AnimatedTestimonials', () => {
  it('renders the first testimonial by default', () => {
    render(<AnimatedTestimonials testimonials={testimonials} />);
    expect(screen.getByRole('heading', { name: 'Alice' })).toBeInTheDocument();
    expect(screen.getByText('CEO')).toBeInTheDocument();
  });

  it('advances to the next testimonial', () => {
    render(<AnimatedTestimonials testimonials={testimonials} />);
    const [prev, next] = screen.getAllByRole('button');
    void prev;
    fireEvent.click(next);
    expect(screen.getByRole('heading', { name: 'Bob' })).toBeInTheDocument();
  });

  it('wraps around to the last testimonial when going back from the first', () => {
    render(<AnimatedTestimonials testimonials={testimonials} />);
    const [prev] = screen.getAllByRole('button');
    fireEvent.click(prev);
    expect(screen.getByRole('heading', { name: 'Bob' })).toBeInTheDocument();
  });

  it('renders each word of the active quote', () => {
    render(<AnimatedTestimonials testimonials={testimonials} />);
    // The quote is split per-word; assert the words are present.
    expect(screen.getByText('First')).toBeInTheDocument();
    expect(screen.getByText('quote')).toBeInTheDocument();
  });
});
