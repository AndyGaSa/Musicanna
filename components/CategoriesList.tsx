import Link from 'next/link';
import { Category } from '../typings';

interface CategoriesListProps {
  categories: Category[];
}

const CategoriesList: React.FC<CategoriesListProps> = ({ categories }) => {
  return (
    <>
      {categories?.map((category) => (
        <li key={category.subtitle}>
          <Link href={`/categories/` + category.title}>
            {category.subtitle}
          </Link>
        </li>
      ))}
    </>
  );
};

export default CategoriesList;
