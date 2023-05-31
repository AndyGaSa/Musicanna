import React from 'react';
import { render } from '@testing-library/react';
import Post from './[slug]';

jest.mock('../sanity', () => ({
  urlFor: jest.fn().mockReturnValue({
    url: jest.fn().mockReturnValue('mockImageUrl'),
  }),
}));

describe('Post', () => {
  const mockPost = {
    title: 'Mock Post Title',
    description: 'Mock Post Description',
    author: {
      name: 'Mock Author Name',
      image: 'mockAuthorImage',
    },
    publishedAt: new Date().toISOString(),
    mainImage: 'mockMainImage',
  };

  test('renders the post component', () => {
    render(<Post post={mockPost} />);

    // Assert

    // Test post title
    expect(screen.getByText(mockPost.title)).toBeInTheDocument();

    // Test post description
    expect(screen.getByText(mockPost.description)).toBeInTheDocument();

    // Test post author
    expect(
      screen.getByText(`Publicat per ${mockPost.author.name}`)
    ).toBeInTheDocument();

    // Test post published date
    expect(
      screen.getByText(
        `Published at ${new Date(mockPost.publishedAt).toLocaleDateString()}`
      )
    ).toBeInTheDocument();

    // Test main image
    expect(screen.getByAltText(mockPost.title)).toHaveAttribute(
      'src',
      'mockImageUrl'
    );
  });
});
