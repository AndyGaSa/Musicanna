import { Category } from '../typings';
import ActiveLink from './ActiveLink';

interface CategoriesListProps {
  categories: Category[];
}

const CategoriesList: React.FC<CategoriesListProps> = ({ categories }) => {
  return (
    <>
      {categories?.map((category) => (
        <li key={category.subtitle}>
          <ActiveLink
            href={`/categories/` + encodeURIComponent(category.title)}
            activeClassName={'text-bannerColor font-bold'}
          >
            <span> {category.subtitle}</span>
          </ActiveLink>
        </li>
      ))}
    </>
  );
};

export default CategoriesList;
