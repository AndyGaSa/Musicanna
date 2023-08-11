import { render, screen, fireEvent } from '@testing-library/react';
import Header from '../components/Header';
import { useRouter } from 'next/router';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

// setup a new mocking function for push method
const pushMock = jest.fn();

// mock a return value on useRouter
useRouter.mockReturnValue({
  query: {},
  // return mock for push method
  push: pushMock,
  // add mock for asPath attribute
  asPath: '/',
  // ... add the props or methods you need
});

describe('Header component', () => {
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
    const homeLink = screen.getByText('Home');
    const categoryLinks = mockCategories.map((category) =>
      screen.getByText(category.subtitle)
    );
    const contactLink = screen.getByText('Contact');

    expect(homeLink).toBeInTheDocument();
    categoryLinks.forEach((link) => expect(link).toBeInTheDocument());
    expect(contactLink).toBeInTheDocument();
  });

  it('renders the language dropdown', () => {
    render(<Header categories={[]} contact={[]} />);
    const languageButton = screen.getByLabelText('Toggle Menu');
    const catFlag = screen.getByAltText('catFlag');
    const esFlag = screen.getByAltText('es flag');
    const engFlag = screen.getByAltText('eng flag');
    const frFlag = screen.getByAltText('fr flag'); // Make sure the alt text matches the actual image

    expect(languageButton).toBeInTheDocument();
    expect(catFlag).toBeInTheDocument();
    expect(esFlag).toBeInTheDocument();
    expect(engFlag).toBeInTheDocument();
    expect(frFlag).toBeInTheDocument();
  });

  it('toggles the menu when the menu button is clicked', () => {
    render(<Header categories={[]} contact={[]} />);
    const menuButton = screen.getByLabelText('Toggle Menu');

    // Click on the menu button
    fireEvent.click(menuButton);

    // Check that the menu is open
    expect(screen.getByLabelText('menu')).toBeInTheDocument();

    // Click on the menu button again
    fireEvent.click(menuButton);

    // Check that the menu is closed
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });

  it('changes the language when a language option is clicked', () => {
    render(<Header categories={[]} contact={[]} />);

    // Open the language dropdown
    fireEvent.click(screen.getByLabelText('Toggle Menu'));

    // Click on the first language option
    fireEvent.click(screen.getAllByRole('img', { name: 'es flag' })[0]);

    // Check that the router navigated to the correct page with the new locale
    expect(pushMock).toHaveBeenCalledWith(
      expect.anything(),
      '/',
      expect.objectContaining({ locale: 'es' })
    );
  });
});
