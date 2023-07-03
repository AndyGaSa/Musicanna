import React from 'react';
import Head from 'next/head';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { sanityClient, urlFor } from '../../lib/sanity';
import { Post, Category } from '../../typings';
import { GetStaticPaths, GetStaticProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ParsedUrlQuery } from 'querystring';
import PortableText from 'react-portable-text';
import { useRouter } from 'next/router';

interface Props {
  posts: Post[];
  categoryTitle: string;
  categoryDescription: [];
}

interface Params extends ParsedUrlQuery {
  category: string;
}

const Categories: React.FC<Props> = ({
  posts,
  categoryTitle,
  categoryDescription,
}: Props) => {
  const router = useRouter();

  // Check if posts array is empty
  if (posts.length === 0) {
    return (
      <div>
        <Head>
          <title>Musicanna</title>
          <link rel="icon" href="/smallLogo.ico" />
        </Head>
        <main className="font-bodyFont">
          {/* ============ Header Start here ============ */}
          <Header />
          {/* ============ Header End here ============== */}
          <div className="text-center mt-10">
            <h1 className="font-titleFont font-medium text-[32px] text-primary mb-3">
              {categoryTitle.toUpperCase()}
            </h1>
            <p>No posts available for this language currently.</p>
          </div>
          {/* ============ Footer Start here============= */}
          <Footer />
          {/* ============ Footer End here ============== */}
        </main>
      </div>
    );
  }

  return (
    <div>
      <Head>
        <title>Musicanna</title>
        <link rel="icon" href="/smallLogo.ico" />
      </Head>

      <main className="font-bodyFont">
        {/* ============ Header Start here ============ */}
        <Header />
        {/* ============ Header End here ============== */}
        {/* ============ Post Part Start here ========= */}
        <h1 className="font-titleFont font-medium text-[32px] text-primary mt-10 mb-3 text-center">
          {categoryTitle.toUpperCase()}
        </h1>
        <div className="font-titleFont font-small text-[10px] mb-3 ml-12 mr-12 text-center">
          <PortableText
            dataset={process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'}
            projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'u8imjmtp'}
            content={categoryDescription}
            serializers={{
              h1: (props: any) => (
                <h1
                  className="text-3xl font-bold my-5 font-titleFont"
                  {...props}
                />
              ),
              h2: (props: any) => (
                <h2
                  className="text-2xl font-bold my-5 font-titleFont"
                  {...props}
                />
              ),
              h3: (props: any) => (
                <h3
                  className="text-2xl font-bold my-5 font-titleFont"
                  {...props}
                />
              ),
              li: ({ children }: any) => (
                <li className="ml-4 list-disc">{children}</li>
              ),
              link: ({ href, children }: any) => (
                <a href={href} className="text-cyan-500 hover:underline">
                  {children}
                </a>
              ),
            }}
          />
        </div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 py-6">
          {posts.map((post) => (
            <Link key={post._id} href={`/post/${post.slug.current}`}>
              <div className="border-[1px] border-secondaryColor border-opacity-40 h-[450px] group">
                <div className="h-3/5 w-full overflow-hidden">
                  <Image
                    width={380}
                    height={350}
                    src={urlFor(post.mainImage)?.url()!}
                    alt={post.title}
                    className="w-full h-full object-cover brightness-75 group-hover:brightness-100 duration-300 group-hover:scale-110"
                  />
                </div>
                <div className="h-2/5 w-fullflex flex-col justify-center">
                  <div className="flex justify-between items-center px-4 py-1 border-b-[1px] border-b-gray-500">
                    <p>{post.title}</p>
                    <Image
                      className="w-12 h-12 rounded-full object-cover"
                      src={urlFor(post.author?.image)?.url()!}
                      alt="authorImg"
                      width={30}
                      height={30}
                    />
                  </div>
                  <p className="py-2 px-4 text-base">
                    {post.description.substring(0, 60)}... by -
                    <span className="font-semibold">{post.author?.name}</span>
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
        {/* ============ Post Part End here =========== */}
        {/* ============ Footer Start here============= */}
        <Footer />
        {/* ============ Footer End here ============== */}
      </main>
    </div>
  );
};

export default Categories;

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

export const getStaticProps: GetStaticProps<Props, Params> = async (
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
    }
  }`;

  const { posts, categoryDescription } = await sanityClient.fetch(query, {
    category,
    language: context.locale,
  });

  if (posts.length === 0) {
    return {
      props: {
        posts: [],
        categoryTitle: '', // Add the category title or other required data here
        categoryDescription: [], // Add the category description or other required data here
      },
    };
  }

  return {
    props: {
      posts,
      categoryTitle: categoryDescription[0].subtitle,
      categoryDescription: categoryDescription[0].description,
    },
  };
};
