import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import DottedGlowBackground from './DottedGlowBackground';

describe('DottedGlowBackground', () => {
  it('renders a canvas inside the container', () => {
    const { container } = render(<DottedGlowBackground className="bg" />);
    expect(container.querySelector('canvas')).toBeInTheDocument();
  });

  it('applies the provided className to the container', () => {
    const { container } = render(<DottedGlowBackground className="my-bg" />);
    expect(container.querySelector('.my-bg')).toBeInTheDocument();
  });
});
