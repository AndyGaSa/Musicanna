import React from 'react';
import { render, screen, within } from '@testing-library/react';
import Contact, { getStaticProps } from '../pages/contact';
import { useRouter } from 'next/router';

// Mock the data that is being fetched from Sanity
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

// Mock the useRouter hook
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('Contact page', () => {
  beforeEach(() => {
    // Provide a mock implementation of the useRouter hook
    useRouter.mockImplementation(() => ({
      asPath: '/test-path',
      // Add any other properties or methods that your component needs
    }));
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
      within(mainElement).getByText('Test Contact Subtitle')
    ).toBeInTheDocument();
    expect(within(mainElement).getByText('Test Body Text')).toBeInTheDocument();
  });

  it('renders the categories correctly', async () => {
    // Fetch the props for the Contact component
    const { props } = await getStaticProps({ locale: 'en' });

    // Render the Contact component with the mocked props
    const { container } = render(<Contact {...props} />);

    // Find the main element on the page
    const mainElement = container.querySelector('main');

    // Assert that the contact page is rendered correctly
    expect(
      within(mainElement).getByText('Test Category Subtitle')
    ).toBeInTheDocument();
  });
});
