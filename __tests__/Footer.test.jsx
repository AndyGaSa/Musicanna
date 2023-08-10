import { render, screen, waitFor } from '@testing-library/react';
import Footer from '../components/Footer';

describe('Footer', () => {
  test.only('renders the footer component', async () => {
    render(<Footer />);

    // Assert
    await waitFor(() => {
      const logoElement = screen.getByAltText('logo');
      const textElement = screen.getByText(
        'Andy Garcia || all rights reserved'
      );
      const youtubeIcon = screen.getByTestId(/youtube/i);
      const facebookIcon = screen.getByTestId(/facebook/i);
      const whatsappIcon = screen.getByTestId(/whatsapp/i);
      const mailIcon = screen.getByTestId(/mail/i);

      expect(logoElement).toBeInTheDocument();
      expect(textElement).toBeInTheDocument();
      expect(youtubeIcon).toBeInTheDocument();
      expect(facebookIcon).toBeInTheDocument();
      expect(whatsappIcon).toBeInTheDocument();
      expect(mailIcon).toBeInTheDocument();
    });
  });
});
