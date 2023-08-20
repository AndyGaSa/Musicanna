import serializers, {
  SANITY_DATASET,
  SANITY_PROJECT_ID,
} from '../constants/portableTextSerializers';
import { CategoryHeaderProps } from '../typings';
import PortableText from 'react-portable-text';

const CategoryHeader: React.FC<CategoryHeaderProps> = ({
  categoryTitle,
  categoryDescription,
}) => (
  <>
    <h1 className="font-titleFont font-medium text-[32px] text-primary mt-10 mb-3 text-center">
      {categoryTitle?.toUpperCase()}
    </h1>
    <div className="font-titleFont font-small text-[16px] text-center p-6 max-w-7xl mx-auto">
      <PortableText
        dataset={SANITY_DATASET}
        projectId={SANITY_PROJECT_ID}
        content={categoryDescription}
        serializers={serializers}
      />
    </div>
  </>
);

export default CategoryHeader;
