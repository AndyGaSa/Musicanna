import { ParsedUrlQuery } from 'querystring';
import { LocaleValues } from '../utils/localeConstants';

export interface Post {
  _id: string;
  publishedAt: string;
  title: string;
  author: {
    name: string;
    image: string;
  };
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
  _id?: string;
  title: string;
  subtitle?: string;
}

export interface Contact {
  title: string;
  subtitle: string;
  body?: any;
}

export interface ServiceError {
  statusCode: number;
  message: string;
}

export interface headerProps {
  categories: Category[];
  contact: Contact[];
}

export interface CommonMenuProps extends headerProps {
  setDropdownOpen: (value: boolean) => void;
  dropdownOpen: boolean;
  currentLocaleSvg: string;
  changeLanguage: (lang: LocaleValues) => void;
}

export interface DesktopMenu extends CommonMenuProps {}

export interface MobileMenu extends CommonMenuProps {
  toggleMenu: () => void;
  menuAnimation: boolean;
  isMenuOpen: boolean;
}

export interface bannerBottomProps {
  homeText: [{ title; subtitle }];
}

export interface indexProps {
  posts: Post[];
  error?: ServiceError;
  bannerImages: [];
  headerProps: headerProps;
  bannerBottomProps: bannerBottomProps;
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

export interface NoPostsProps {
  categories: Category[];
  contact: Contact[];
}

export interface PostsProps {
  posts: Post[];
}

export interface CategoryHeaderProps {
  categoryTitle: string;
  categoryDescription: any;
}
