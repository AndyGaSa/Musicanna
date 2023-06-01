import { render } from '@testing-library/react';
import Home, { getServerSideProps } from '../pages/index';

// Mocking the sanityClient and urlFor functions
jest.mock('../sanity', () => ({
  sanityClient: {
    fetch: jest.fn(() => {
      return {
        status: 'success',
        message: 'mainImg',
      };
    }),
  },
  urlFor: jest.fn(),
}));

jest.mock(
  'next/image',
  () =>
    function Image() {
      return <img src="src" alt="img" />;
    }
);

describe('Home', () => {
  it('renders the home page correctly', () => {
    const posts = [
      {
        _id: '1',
        title: 'Post 1',
        author: {
          name: 'Author 1',
          image: 'image-url',
        },
        description: 'Description 1',
        mainImage: 'main-image-url',
        slug: {
          current: 'post-1',
        },
      },
    ];

    const { getByText, getByAltText } = render(<Home posts={posts} />);

    // Test the rendering of specific posts
    posts.forEach((post) => {
      expect(getByText(post.title)).toBeInTheDocument();
      expect(
        getByText(`${post.description.substring(0, 60)}... by -`)
      ).toBeInTheDocument();
      expect(getByText(post.author.name)).toBeInTheDocument();
    });
  });
});

describe('getServerSideProps', () => {
  it('should call posts api', async () => {
    const response = await getServerSideProps();

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          posts: {
            status: 'success',
            message: 'mainImg',
          },
        },
      })
    );
  });
});
