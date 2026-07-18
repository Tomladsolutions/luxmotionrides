import { describe, it, expect } from 'vitest';
import { renderWithProviders, screen } from '../test/test-utils';
import { Services } from './Services';

describe('Services', () => {
  it('renders all six services with links to their pages', () => {
    renderWithProviders(<Services />);
    const expected: Array<[string, string]> = [
      ['Airport Transportation', '/dia-transportation'],
      ['Corporate Transportation', '/corporate-transportation'],
      ['Special Event Transportation', '/special-event-transportation'],
      ['Private Rides', '/private-rides'],
      ['Mountain Transportation', '/vail-transportation'],
      ['Concert Rides', '/coors-field'],
    ];
    for (const [title, href] of expected) {
      const heading = screen.getByText(title);
      expect(heading).toBeInTheDocument();
      expect(heading.closest('a')).toHaveAttribute('href', href);
    }
  });
});
