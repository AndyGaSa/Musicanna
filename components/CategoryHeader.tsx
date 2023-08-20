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
        dataset={process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'}
        projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'u8imjmtp'}
        content={categoryDescription}
        serializers={{
          h1: (props: React.HTMLProps<HTMLHeadingElement>) => (
            <h1 className="text-3xl font-bold my-5 font-titleFont" {...props} />
          ),
          h2: (props: React.HTMLProps<HTMLHeadingElement>) => (
            <h2 className="text-2xl font-bold my-5 font-titleFont" {...props} />
          ),
          h3: (props: React.HTMLProps<HTMLHeadingElement>) => (
            <h3 className="text-2xl font-bold my-5 font-titleFont" {...props} />
          ),
          li: ({ children }: { children: React.ReactNode }) => (
            <li className="ml-4 list-disc">{children}</li>
          ),
          link: ({
            href,
            children,
          }: {
            href: string;
            children: React.ReactNode;
          }) => (
            <a href={href} className="text-cyan-500 hover:underline">
              {children}
            </a>
          ),
        }}
      />
    </div>
  </>
);

export default CategoryHeader;
