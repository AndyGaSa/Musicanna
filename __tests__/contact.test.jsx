import React from 'react';
import { render, screen, within } from '@testing-library/react';
import Contact from '../pages/contact';
import { useRouter } from 'next/router';
import { getStaticProps } from '../pages/contact';
import '@testing-library/jest-dom/extend-expect'; // for the "toBeInTheDocument"

jest.mock('../components/Header', () => {
  return function DummyHeader() {
    return <div data-testid="header">Header</div>;
  };
});

jest.mock('next/image', () => {
  const MockedImage = () => <img alt="mocked image" />;
  MockedImage.displayName = 'MockedImage';
  return MockedImage;
});

jest.mock('../components/Footer', () => {
  return function DummyFooter() {
    return <div data-testid="footer">Footer</div>;
  };
});

jest.mock('../sanity', () => ({
  sanityClient: {
    fetch: jest.fn().mockResolvedValue({
      categories: [
        { title: 'Test Category', subtitle: 'Test Category Subtitle' },
      ],
      contact: [
        {
          title: 'Test Contact',
          subtitle: 'Test Contact Subtitle',
          body: [
            {
              _type: 'block',
              children: [
                {
                  _type: 'span',
                  text: 'Test Body Text',
                },
              ],
            },
          ],
        },
      ],
    }),
  },
}));

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('Contact page', () => {
  beforeEach(() => {
    useRouter.mockImplementation(() => ({ asPath: '/test-path' }));
  });

  it('renders the contact page correctly', async () => {
    // Fetch the props for the Contact component
    const { props } = await getStaticProps({ locale: 'en' });

    // Render the Contact component with the mocked props
    const { container } = render(<Contact {...props} />);

    // Find the main element on the page
    const mainElement = container.querySelector('main');

    // Assert that the contact page is rendered correctly
    expect(
      within(mainElement).getByText('TEST CONTACT SUBTITLE')
    ).toBeInTheDocument();
    expect(within(mainElement).getByText('Test Body Text')).toBeInTheDocument();
  });
});
