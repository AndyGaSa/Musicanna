// Now, import useRouter and define mockUseRouter
import { render, screen, fireEvent } from '@testing-library/react';
import Header from '../components/Header';
import { useRouter } from 'next/router';

// Mocking useRouter here before mockUseRouter is defined
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

const mockUseRouter = useRouter;

// Setup a new mocking function for push method
const pushMock = jest.fn();

describe('Header component', () => {
  beforeEach(() => {
    // Before each test, clear all instances and calls to constructor and all methods:
    jest.clearAllMocks();

    // Then setup useRouter mock return value before each test run
    mockUseRouter.mockReturnValue({
      query: {},
      push: pushMock,
      asPath: '/',
      events: {
        on: jest.fn(),
        off: jest.fn(),
      },
    });
  });

  it('renders the logo', () => {
    render(<Header categories={[]} contact={[]} />);
    const logo = screen.getByAltText('logoDark');
    expect(logo).toBeInTheDocument();
  });

  it('renders the navigation items', () => {
    const mockCategories = [
      { subtitle: 'Category 1' },
      { subtitle: 'Category 2' },
    ];

    render(
      <Header categories={mockCategories} contact={[{ subtitle: 'Contact' }]} />
    );
    // ... rest of your test
  });

  it('renders the language dropdown', () => {
    render(<Header categories={[]} contact={[]} />);
    // Note: Make sure the alt text or labels actually exist in your component
    // ... rest of your test
  });

  it('toggles the menu when the menu button is clicked', () => {
    render(<Header categories={[]} contact={[]} />);
    // Note: Make sure the label "Toggle Menu" actually exists in your component
    // ... rest of your test
  });

  it('changes the language when a language option is clicked', () => {
    render(<Header categories={[]} contact={[]} />);
    // ... rest of your test
  });
});
