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

export enum Locale {
  es = 'es',
  cat = 'cat',
  eng = 'en',
}
