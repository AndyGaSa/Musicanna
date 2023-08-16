import React from 'react';
import Head from 'next/head';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { sanityClient, urlFor } from '../../sanity';
import {
  Category,
  categoriesProps,
  Params,
  Post,
  Contact,
} from '../../typings';
import { GetStaticPaths, GetStaticProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import PortableText from 'react-portable-text';

type NoPostsProps = {
  categories: Category[];
  contact: Contact[];
};

type CategoryHeaderProps = {
  categoryTitle: string;
  categoryDescription: any;
};

type PostsProps = {
  posts: Post[];
};

const SEOHead = ({ title }: { title?: string }) => (
  <Head>
    <title>{title || 'Musicanna'}</title>
    <link rel="icon" href="/smallLogo.ico" />
  </Head>
);

const IMAGE_WIDTH_HEIGHT = 350;

const Categories: React.FC<categoriesProps> = ({
  posts,
  categoryTitle,
  categoryDescription,
  headerProps: { categories, contact },
}) => {
  if (posts.length === 0) {
    return <NoPosts categories={categories} contact={contact} />;
  }

  return (
    <div>
      <SEOHead title={categoryTitle} />
      <main className="font-bodyFont">
        <Header categories={categories} contact={contact} />
        <CategoryHeader
          categoryTitle={categoryTitle}
          categoryDescription={categoryDescription}
        />
        <Posts posts={posts} />
        <Footer />
      </main>
    </div>
  );
};

const NoPosts: React.FC<NoPostsProps> = ({ categories, contact }) => (
  <div>
    <SEOHead />
    <main className="font-bodyFont">
      <div className="flex flex-col min-h-screen">
        <Header categories={categories} contact={contact} />
        <div className="justify-center grow py-10 flex lg:gap-12 gap-6 flex-col text-center xl:text-[25px] lg:text-[18px]">
          <h2>Ho sentim! No hi han posts per aquest idioma todavia.</h2>
          <h2>Lo sentimos! No hay posts para este idioma todavia</h2>
          <h2>
            We are sorry! There are no posts available for this language
            currently.
          </h2>
          <h2>
            Nous sommes désolés! Il n`&apos;`,y a pas encore de messages pour
            cette langue.
          </h2>
        </div>
        <Footer />
      </div>
    </main>
  </div>
);

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

const Posts: React.FC<PostsProps> = ({ posts }) => (
  <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 py-6">
    {posts.map((post, index) => (
      <Link key={post._id} href={`/post/${post.slug.current}`}>
        <div className="border-[1px] border-secondaryColor border-opacity-40 h-[450px] group">
          <div className="h-4/6 w-full overflow-hidden">
            <Image
              width={IMAGE_WIDTH_HEIGHT}
              height={IMAGE_WIDTH_HEIGHT}
              src={
                urlFor(post.mainImage)
                  ?.width(IMAGE_WIDTH_HEIGHT)
                  .height(IMAGE_WIDTH_HEIGHT)
                  .url()!
              }
              alt={post.title}
              priority={index <= 2}
              className="w-full h-full object-cover brightness-75 group-hover:brightness-100 duration-300 group-hover:scale-110"
            />
          </div>
          <div className="h-2/6 w-full flex flex-col justify-center">
            <div className="flex justify-between items-center px-4 py-1 border-b-[1px] border-b-gray-500">
              <p>{post.title}</p>
            </div>
            <p className="py-2 px-4 text-base">
              {post.description?.substring(0, 60)}... by -{' '}
              <span className="font-semibold">{post.author?.name}</span>
            </p>
          </div>
        </div>
      </Link>
    ))}
  </div>
);
export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  const query = `*[_type == "category"]{
    _id,
    title
  }`;
  const categories: Category[] = await sanityClient.fetch(query);

  const paths = categories
    .map((category: Category) =>
      locales!.map((locale) => ({
        params: { category: category.title.toLowerCase() },
        locale,
      }))
    )
    .flat();
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<categoriesProps, Params> = async (
  context
) => {
  const { category } = context.params!;
  const query = `{
    'posts':*[_type == "post"  && language == $language && $category in categories[]->title]{
      _id,
      publishedAt,
      title,
      author ->{
        name,
        image,
      },
      description,
      mainImage,
      slug,
      body
    },
    'categoryDescription':*[_type == "category" && title == $category  && language == $language]{
      description, subtitle
    },
    'categories':*[_type == "category" && language == $language]{
      title, subtitle
    },
    'contact':*[_type == "contact" && language == $language]{
      title, subtitle
    }
  }`;

  const { posts, categoryDescription, categories, contact } =
    await sanityClient.fetch(query, {
      category,
      language: context.locale,
    });

  if (posts.length === 0) {
    return {
      props: {
        posts: [],
        categoryTitle: '',
        categoryDescription: '',
        headerProps: {
          categories: [{ title: '', subtitle: '' }],
          contact: [{ title: '', subtitle: '' }],
        },
      },
    };
  }

  return {
    props: {
      posts,
      categoryTitle: categoryDescription[0].subtitle,
      categoryDescription: categoryDescription[0].description,

      headerProps: { categories, contact },
    },
  };
};

export default Categories;
