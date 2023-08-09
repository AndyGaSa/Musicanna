import React from 'react';
import Head from 'next/head';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { sanityClient, urlFor } from '../../sanity';
import { Category, categoriesProps, Params } from '../../typings';
import { GetStaticPaths, GetStaticProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import PortableText from 'react-portable-text';

const Categories: React.FC<categoriesProps> = ({
  posts,
  categoryTitle,
  categoryDescription,
  headerProps: { categories, contact },
}: categoriesProps) => {
  // Check if posts array is empty
  if (posts.length === 0) {
    return (
      <div>
        <Head>
          <title>Musicanna</title>
          <link rel="icon" href="/smallLogo.ico" />
          <link rel="manifest" href="/manifest.json" />
        </Head>
        <main className="font-bodyFont">
          <div className="flex flex-col min-h-screen">
            {/* ============ Header Start here ============ */}
            <Header categories={categories} contact={contact} />
            {/* ============ Header End here ============== */}

            <div className="justify-center grow py-10 flex lg:gap-12 gap-6 flex-col text-center xl:text-[25px] lg:text-[18px]">
              {/*<h1 className="font-titleFont font-medium text-[32px] text-primary">
              {categoryTitle.toUpperCase()}
              </h1>*/}
              <h2>Ho sentim! No hi han posts per aquest idioma todavia.</h2>
              <h2>Lo sentimos! No hay posts para este idioma todavia</h2>
              <h2>
                We are sorry! There are no posts available for this language
                currently.
              </h2>
              <h2>
                Nous sommes désolés! Il n'y a pas encore de messages pour cette
                langue.
              </h2>
            </div>

            {/* ============ Footer Start here============= */}
            <Footer />
          </div>
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
        <Header categories={categories} contact={contact} />
        {/* ============ Header End here ============== */}
        {/* ============ Title and Description Start here ========= */}
        <h1 className="font-titleFont font-medium text-[32px] text-primary mt-10 mb-3 text-center">
          {categoryTitle.toUpperCase()}
        </h1>
        <div className="font-titleFont font-small text-[16px] text-center p-6 max-w-7xl mx-auto">
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
        {/* ============ Title and description end here ========= */}
        {/* ============ Post Part Start here ========= */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 py-6">
          {posts.map((post, index) => (
            <Link key={post._id} href={`/post/${post.slug.current}`}>
              <div className="border-[1px] border-secondaryColor border-opacity-40 h-[450px] group">
                <div className="h-4/6 w-full overflow-hidden">
                  <Image
                    width={380}
                    height={350}
                    src={urlFor(post.mainImage)?.url()!}
                    alt={post.title}
                    priority={index === 0}
                    className="w-full h-full object-cover brightness-75 group-hover:brightness-100 duration-300 group-hover:scale-110"
                  />
                </div>
                <div className="h-2/6 w-full flex flex-col justify-center">
                  <div className="flex justify-between items-center px-4 py-1 border-b-[1px] border-b-gray-500">
                    <p>{post.title}</p>
                  </div>
                  <p className="py-2 px-4 text-base">
                    {post.description?.substring(0, 60)}... by -
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
