import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import SideDrawer from './SideDrawer';

describe('SideDrawer', () => {
  it('renders nothing when closed', () => {
    const { container } = render(
      <SideDrawer isOpen={false} onClose={() => {}} title="Menu" />,
    );
    expect(container).toBeEmptyDOMElement();
  });

  it('renders title and children when open', () => {
    render(
      <SideDrawer isOpen onClose={() => {}} title="Menu">
        <p>Drawer body content</p>
      </SideDrawer>,
    );
    expect(screen.getByRole('heading', { name: 'Menu' })).toBeInTheDocument();
    expect(screen.getByText('Drawer body content')).toBeInTheDocument();
  });

  it('calls onClose when the overlay is clicked', () => {
    const onClose = vi.fn();
    const { container } = render(<SideDrawer isOpen onClose={onClose} title="Menu" />);
    fireEvent.click(container.querySelector('.drawer-overlay')!);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when the close button is clicked', () => {
    const onClose = vi.fn();
    render(<SideDrawer isOpen onClose={onClose} title="Menu" />);
    fireEvent.click(screen.getByRole('button'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('does not close when the content area is clicked (stopPropagation)', () => {
    const onClose = vi.fn();
    const { container } = render(
      <SideDrawer isOpen onClose={onClose} title="Menu">
        <span>inside</span>
      </SideDrawer>,
    );
    fireEvent.click(container.querySelector('.drawer-content')!);
    expect(onClose).not.toHaveBeenCalled();
  });
});
