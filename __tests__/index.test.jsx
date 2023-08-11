import { render, screen } from '@testing-library/react';
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
      bannerImages: [
        {
          _id: '1',
          image: {
            asset: { _ref: 'image-Tb9Ew8CXIwaY6R1kjMvI0uRR-2000x3000-jpg' },
          },
        },
      ],
      headerProps: {
        categories: [
          { title: 'Category 1', subtitle: 'Categories Subtitle 1' },
        ],
        contact: [{ title: 'Contact 1', subtitle: 'Contact Subtitle 1' }],
      },
      bannerBottomProps: {
        homeText: [{ title: 'Home Text 1', subtitle: 'index Subtitle 1' }],
      },
    };

    // Render the Home component with the mocked props
    const { getByText, getAllByTestId } = render(<Home {...props} />);

    // Test the rendering of specific posts
    props.posts.forEach((post) => {
      expect(getByText(post.title)).toBeInTheDocument();
      expect(
        getByText(`${post.description.substring(0, 60)}... by -`)
      ).toBeInTheDocument();
      expect(getByText(post.author.name)).toBeInTheDocument();
    });

    // Test the rendering of banner images
    const bannerImages = getAllByTestId('bannerImg');
    expect(bannerImages.length).toBe(props.bannerImages.length);

    // Test the rendering of categories and contact in the header
    props.headerProps.categories.forEach((category) => {
      expect(screen.getAllByText(category.subtitle).length).toBeGreaterThan(0);
    });
    props.headerProps.contact.forEach((contact) => {
      expect(screen.getAllByText(contact.subtitle).length).toBeGreaterThan(0);
    });

    // Test the rendering of home text in the banner bottom
    props.bannerBottomProps.homeText.forEach((homeText) => {
      expect(getByText(homeText.title)).toBeInTheDocument();
      expect(getByText(homeText.subtitle)).toBeInTheDocument();
    });
  });

  it('renders the home page correctly when there are no posts', () => {
    // Mock the props for the Home component
    const props = {
      posts: [],
      bannerImages: [
        {
          _id: '1',
          image: {
            asset: { _ref: 'image-Tb9Ew8CXIwaY6R1kjMvI0uRR-2000x3000-jpg' },
          },
        },
      ],
      headerProps: {
        categories: [
          { title: 'Category 1', subtitle: 'Categories Subtitle 1' },
        ],
        contact: [{ title: 'Contact 1', subtitle: 'Contact Subtitle 1' }],
      },
      bannerBottomProps: {
        homeText: [{ title: 'Home Text 1', subtitle: 'index Subtitle 1' }],
      },
    };

    // Render the Home component with the mocked props
    const { getByText, getAllByTestId } = render(<Home {...props} />);

    // Test that no posts are rendered
    expect(screen.queryAllByTestId('post').length).toBe(0);

    // Test the rendering of banner images
    const bannerImages = getAllByTestId('bannerImg');
    expect(bannerImages.length).toBe(props.bannerImages.length);

    // Test the rendering of categories and contact in the header
    props.headerProps.categories.forEach((category) => {
      expect(screen.getAllByText(category.subtitle).length).toBeGreaterThan(0);
    });
    props.headerProps.contact.forEach((contact) => {
      expect(screen.getAllByText(contact.subtitle).length).toBeGreaterThan(0);
    });

    // Test the rendering of home text in the banner bottom
    props.bannerBottomProps.homeText.forEach((homeText) => {
      expect(getByText(homeText.title)).toBeInTheDocument();
      expect(getByText(homeText.subtitle)).toBeInTheDocument();
    });
  });

  it('renders the home page correctly when there are no banner images', () => {
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
        categories: [
          { title: 'Category 1', subtitle: 'Categories Subtitle 1' },
        ],
        contact: [{ title: 'Contact 1', subtitle: 'Contact Subtitle 1' }],
      },
      bannerBottomProps: {
        homeText: [{ title: 'Home Text 1', subtitle: 'index Subtitle 1' }],
      },
    };

    // Render the Home component with the mocked props
    const { getByText, getAllByTestId } = render(<Home {...props} />);

    // Test that no banner images are rendered
    expect(screen.queryAllByTestId('bannerImg').length).toBe(0);

    // Test the rendering of specific posts
    props.posts.forEach((post) => {
      expect(getByText(post.title)).toBeInTheDocument();
      expect(
        getByText(`${post.description.substring(0, 60)}... by -`)
      ).toBeInTheDocument();
      expect(getByText(post.author.name)).toBeInTheDocument();
    });

    // Test the rendering of categories and contact in the header
    props.headerProps.categories.forEach((category) => {
      expect(screen.getAllByText(category.subtitle).length).toBeGreaterThan(0);
    });
    props.headerProps.contact.forEach((contact) => {
      expect(screen.getAllByText(contact.subtitle).length).toBeGreaterThan(0);
    });

    // Test the rendering of home text in the banner bottom
    props.bannerBottomProps.homeText.forEach((homeText) => {
      expect(getByText(homeText.title)).toBeInTheDocument();
      expect(getByText(homeText.subtitle)).toBeInTheDocument();
    });
  });

  it('renders multiple posts correctly', () => {
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
        {
          _id: '2',
          title: 'Post 2',
          author: {
            name: 'Author 2',
            image: 'image-url',
          },
          description: 'Description 2',
          mainImage: {
            asset: { _ref: 'image-Tb9Ew8CXIwaY6R1kjMvI0uRR-2000x3000-jpg' },
          },
          slug: {
            current: 'post-2',
          },
        },
      ],
      bannerImages: [
        {
          _id: '1',
          image: {
            asset: { _ref: 'image-Tb9Ew8CXIwaY6R1kjMvI0uRR-2000x3000-jpg' },
          },
        },
      ],
      headerProps: {
        categories: [
          { title: 'Category 1', subtitle: 'Categories Subtitle 1' },
        ],
        contact: [{ title: 'Contact 1', subtitle: 'Contact Subtitle 1' }],
      },
      bannerBottomProps: {
        homeText: [{ title: 'Home Text 1', subtitle: 'index Subtitle 1' }],
      },
    };

    // Render the Home component with the mocked props
    const { getByText } = render(<Home {...props} />);

    // Test that all posts are rendered
    props.posts.forEach((post) => {
      expect(getByText(post.title)).toBeInTheDocument();
      expect(
        getByText(`${post.description.substring(0, 60)}... by -`)
      ).toBeInTheDocument();
      expect(getByText(post.author.name)).toBeInTheDocument();
    });
  });
});
