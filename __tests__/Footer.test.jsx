import { render, screen, waitFor } from '@testing-library/react';
import Footer from '../components/Footer';

describe('Footer', () => {
  test('renders the footer component', async () => {
    render(<Footer />);

    // Assert
    await waitFor(() => {
      const logoElement = screen.getByAltText('logo');
      const textElement = screen.getByText(
        'Andy Garcia || all rights reserved'
      );
      const youtubeIcon = screen.getByTestId(/youtube/i);
      const facebookIcon = screen.getByTestId(/facebook/i);
      const githubIcon = screen.getByTestId(/github/i);
      const linkedinIcon = screen.getByTestId(/linkedin/i);
      const twitterIcon = screen.getByTestId(/twitter/i);

      expect(logoElement).toBeInTheDocument();
      expect(textElement).toBeInTheDocument();
      expect(youtubeIcon).toBeInTheDocument();
      expect(facebookIcon).toBeInTheDocument();
      expect(githubIcon).toBeInTheDocument();
      expect(linkedinIcon).toBeInTheDocument();
      expect(twitterIcon).toBeInTheDocument();
    });
  });
});
