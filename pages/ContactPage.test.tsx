import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderWithProviders, screen, fireEvent, waitFor } from '../test/test-utils';
import { ContactPage } from './ContactPage';

const fillForm = () => {
  fireEvent.change(screen.getByPlaceholderText('First Name'), { target: { value: 'Jane' } });
  fireEvent.change(screen.getByPlaceholderText('Last Name'), { target: { value: 'Doe' } });
  fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'jane@example.com' } });
  fireEvent.change(screen.getByPlaceholderText('Message'), { target: { value: 'Need a ride' } });
};

describe('ContactPage', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('renders contact details and the form', () => {
    renderWithProviders(<ContactPage />);
    expect(screen.getByRole('heading', { name: 'Contact Us' })).toBeInTheDocument();
    expect(screen.getByPlaceholderText('First Name')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Send Message' })).toBeInTheDocument();
  });

  it('submits the form data and shows the success state', async () => {
    const fetchMock = vi
      .spyOn(globalThis, 'fetch')
      .mockResolvedValue(new Response(JSON.stringify({ success: true })));
    renderWithProviders(<ContactPage />);
    fillForm();
    fireEvent.click(screen.getByRole('button', { name: 'Send Message' }));

    await waitFor(() => expect(screen.getByText('Message Sent!')).toBeInTheDocument());

    expect(fetchMock).toHaveBeenCalledWith('/submit-contact.php', expect.objectContaining({ method: 'POST' }));
    const body = fetchMock.mock.calls[0][1]?.body as FormData;
    expect(body.get('firstName')).toBe('Jane');
    expect(body.get('email')).toBe('jane@example.com');
    expect(body.get('message')).toBe('Need a ride');
  });

  it('alerts the user when the API reports failure', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response(JSON.stringify({ success: false })),
    );
    const alertMock = vi.spyOn(window, 'alert').mockImplementation(() => {});
    renderWithProviders(<ContactPage />);
    fillForm();
    fireEvent.click(screen.getByRole('button', { name: 'Send Message' }));

    await waitFor(() => expect(alertMock).toHaveBeenCalledWith(expect.stringContaining('Failed to send message')));
    expect(screen.queryByText('Message Sent!')).not.toBeInTheDocument();
  });

  it('alerts the user on a network error', async () => {
    vi.spyOn(globalThis, 'fetch').mockRejectedValue(new Error('offline'));
    const alertMock = vi.spyOn(window, 'alert').mockImplementation(() => {});
    renderWithProviders(<ContactPage />);
    fillForm();
    fireEvent.click(screen.getByRole('button', { name: 'Send Message' }));

    await waitFor(() => expect(alertMock).toHaveBeenCalledWith(expect.stringContaining('Network error')));
  });
});
