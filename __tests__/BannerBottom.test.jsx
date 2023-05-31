import { render, screen } from '@testing-library/react';
import BannerBottom from '../components/BannerBottom';

describe('BannerBottom', () => {
  test('renders the banner bottom component', () => {
    render(<BannerBottom />);

    // Assert
    const titleElement = screen.getByText(/musicanna/i);
    const subtitleElement = screen.getByText(
      /cançoncs, contes verticals i contacontes per a nens i nenes de 0 a 6 anys/i
    );
    const descriptionElement = screen.getByText(
      /un món d'imaginació, creativitat, contes i cançons/i
    );

    expect(titleElement).toBeInTheDocument();
    expect(subtitleElement).toBeInTheDocument();
    expect(descriptionElement).toBeInTheDocument();
  });
});
