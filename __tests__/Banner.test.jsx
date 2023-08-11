import { render, screen } from '@testing-library/react';
import Banner from '../components/Banner';

describe('Banner', () => {
  it('renders the banner component', () => {
    // Mock the images prop with correctly formatted _ref values
    const images = [
      {
        _id: '1',
        image: {
          asset: { _ref: 'image-Tb9Ew8CXIwaY6R1kjMvI0uRR-2000x3000-jpg' },
        },
      },
      {
        _id: '2',
        image: {
          asset: { _ref: 'image-Tb9Ew8CXIwaY6R1kjMvI0uRR-2000x3000-jpg' },
        },
      },
      {
        _id: '3',
        image: {
          asset: { _ref: 'image-Tb9Ew8CXIwaY6R1kjMvI0uRR-2000x3000-jpg' },
        },
      },
    ];

    // Render the Banner component with the mocked images prop
    render(<Banner images={images} />);

    // Assert that the banner images are rendered
    const bannerImages = screen.getAllByTestId('bannerImg');
    expect(bannerImages.length).toBe(3);
  });
});
