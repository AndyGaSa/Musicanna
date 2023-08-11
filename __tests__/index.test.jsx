import { render } from '@testing-library/react';
import { useRouter } from 'next/router';
import Home from '../pages/index';

// Mock the useRouter hook
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('Home', () => {
  beforeEach(() => {
    // Provide a mock implementation of the useRouter hook
    useRouter.mockImplementation(() => ({
      asPath: '/test-path',
      // Add any other properties or methods that your component needs
    }));
  });

  it('renders the home page correctly', () => {
    // Mock the props for the Home component
    const props = {
      posts: [
        {
          _id: '1',
          title: 'Post 1',
          author: {
            name: 'Author 1',
            image: 'image-url',
          },
          description: 'Description 1',
          mainImage: {
            asset: { _ref: 'image-Tb9Ew8CXIwaY6R1kjMvI0uRR-2000x3000-jpg' },
          },
          slug: {
            current: 'post-1',
          },
        },
      ],
      bannerImages: [],
      headerProps: {
        categories: [],
        contact: [],
      },
      bannerBottomProps: { homeText: [] },
    };

    // Render the Home component with the mocked props
    const { getByText } = render(<Home {...props} />);

    // Test the rendering of specific posts
    props.posts.forEach((post) => {
      expect(getByText(post.title)).toBeInTheDocument();
      expect(
        getByText(`${post.description.substring(0, 60)}... by -`)
      ).toBeInTheDocument();
      expect(getByText(post.author.name)).toBeInTheDocument();
    });
  });
});
