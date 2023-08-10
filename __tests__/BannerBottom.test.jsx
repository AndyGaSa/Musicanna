import { render, screen } from '@testing-library/react';
import BannerBottom from '../components/BannerBottom';

const mockBannerBottomProps = {
  homeText: [
    {
      title: 'Musicanna',
      subtitle:
        'Cançoncs, contes verticals i contacontes per a nens i nenes de 0 a 6 anys',
    },
  ],
};

describe('BannerBottom', () => {
  test('renders the banner bottom component', () => {
    render(<BannerBottom {...mockBannerBottomProps} />);

    // Assert
    const titleElement = screen.getByText(/musicanna/i);
    const subtitleElement = screen.getByText(
      /cançoncs, contes verticals i contacontes per a nens i nenes de 0 a 6 anys/i
    );

    expect(titleElement).toBeInTheDocument();
    expect(subtitleElement).toBeInTheDocument();
  });
});
