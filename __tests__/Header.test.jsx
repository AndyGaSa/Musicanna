import { render, screen } from '@testing-library/react';
import Header from '../components/Header.tsx';

describe('Header component', () => {
  it('renders the logo', () => {
    render(<Header />);
    const logo = screen.getByAltText('logoDark');
    expect(logo).toBeInTheDocument();
  });

  it('renders the navigation items', () => {
    render(<Header />);
    const homeLink = screen.getByText('Home');
    const postsLink = screen.getByText('Posts');
    const pagesLink = screen.getByText('Pages');
    const featuresLink = screen.getByText('Features');
    const contactLink = screen.getByText('Contact');

    expect(homeLink).toBeInTheDocument();
    expect(postsLink).toBeInTheDocument();
    expect(pagesLink).toBeInTheDocument();
    expect(featuresLink).toBeInTheDocument();
    expect(contactLink).toBeInTheDocument();
  });

  it('renders the user information', () => {
    render(<Header />);
    const userAvatar = screen.getByAltText('logo');
    const greetingText = screen.getByText('Hello Stranger!');

    expect(userAvatar).toBeInTheDocument();
    expect(greetingText).toBeInTheDocument();
  });

  it('renders the sign-in button', () => {
    render(<Header />);
    const signInButton = screen.getByText('Sign In');

    expect(signInButton).toBeInTheDocument();
  });
});
