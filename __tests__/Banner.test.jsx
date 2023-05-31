import { render, screen } from '@testing-library/react';
import Banner from '../components/Banner';

describe('Banner', () => {
  test('renders the banner component', () => {
    render(<Banner />);

    // Assert

    const bannerImgOne = screen.queryAllByTestId(/bannerImgOne/i);
    const bannerImgTwo = screen.queryAllByTestId(/bannerImgTwo/i);
    const bannerImgThree = screen.queryAllByTestId(/bannerImgThree/i);
    const bannerImgFour = screen.queryAllByTestId(/bannerImgFour/i);

    expect(bannerImgOne.length).toBeGreaterThanOrEqual(1);
    expect(bannerImgTwo.length).toBeGreaterThanOrEqual(1);
    expect(bannerImgThree.length).toBeGreaterThanOrEqual(1);
    expect(bannerImgFour.length).toBeGreaterThanOrEqual(1);
  });
});
