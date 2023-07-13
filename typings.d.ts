import { ParsedUrlQuery } from 'querystring';

export interface Post {
  _id: string;
  publishedAt: string;
  title: string;
  author: {
    name: string;
    image: string;
  };
  //comments: Comment[];
  description: string;
  mainImage: {
    asset: {
      url: string;
    };
  };
  slug: {
    current: string;
  };
  body: [object];
}

export interface Category {
  _id: string;
  title: string;
}

export interface ServiceError {
  statusCode: number;
  message: string;
}

export interface headerProps {
  categories: [{ title; subtitle }];
  contact: [{ title; subtitle }];
}

export interface indexProps {
  posts: Post[];
  error?: ServiceError;
  bannerImages: [];
  headerProps: headerProps;
}

export interface categoriesProps {
  posts: Post[];
  categoryTitle: string;
  categoryDescription: [];
  headerProps: headerProps;
}

export interface Params extends ParsedUrlQuery {
  category: string;
}
