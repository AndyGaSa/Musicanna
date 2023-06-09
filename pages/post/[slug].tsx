import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { sanityClient, urlFor } from '../../sanity';
import { Post, headerProps, Params } from '../../typings';
import { GetStaticPaths, GetStaticProps } from 'next';
import Image from 'next/image';
import PortableText from 'react-portable-text';
import Head from 'next/head';

interface Props {
  post: Post;
  headerProps: headerProps;
}

const Post: React.FC<Props> = ({
  post,
  headerProps: { categories, contact },
}: Props) => {
  return (
    <div>
      <Head>
        <title>Musicanna</title>
        <link rel="icon" href="/smallLogo.ico" />
      </Head>
      <main className="font-bodyFont">
        <Header categories={categories} contact={contact} />
        <Image
          className="h-96 w-full object-cover"
          src={urlFor(post.mainImage).url()!}
          alt={post.title}
          width={720}
          height={720}
          priority
        />
        <div className="max-w-3xl mx-auto">
          <article className="w-full mx-auto p-5 bg-secondaryColor/10">
            <h1 className="font-titleFont font-medium text-[32px] text-primary border-b-[1px] border-b-cyan-800 mt-10 mb-3">
              {post.title}
            </h1>
            <h2 className="font-bodyFont  text-[18px] text-gray-500 mb-2">
              {post.description}
            </h2>

            <div className="">
              <PortableText
                dataset={process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'}
                projectId={
                  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'u8imjmtp'
                }
                content={post.body}
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
                  normal: (props: any) => <p className="my-4" {...props} />,
                  li: ({ children }: any) => (
                    <li className="ml-4 list-disc">{children}</li>
                  ),
                  link: ({ href, children }: any) => (
                    <a href={href} className="text-cyan-500 hover:underline">
                      {children}
                    </a>
                  ),
                  inlineAudio: (value: any) => {
                    const ref = value.asset._ref;
                    const projeccId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
                    const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;

                    const [_file, id, extension] = ref.split('-');
                    const audioUrl = `https://cdn.sanity.io/files/${projeccId}/${dataset}/${id}.${extension}`;

                    return (
                      <audio
                        controls
                        className="block w-full max-w-md mx-auto mt-10"
                      >
                        <source src={audioUrl} type="audio/mpeg" />
                      </audio>
                    );
                  },
                }}
              />
            </div>
          </article>
        </div>
        <Footer />
      </main>
    </div>
  );
};

export default Post;

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  const query = `*[_type == "post"]{
        _id,
        slug{
            current
        }
    }`;
  const posts: Post[] = await sanityClient.fetch(query);

  const paths = posts
    .map((post: Post) =>
      locales!.map((locale) => ({
        params: { slug: post.slug.current },
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
  const { slug } = context.params!;
  const query = `{
    'post':*[_type == "post" && slug.current == $slug][0]{
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
        body,
      },
    'categories':*[_type == "category" && language == $language]{
        title, subtitle
    },
    'contact':*[_type == "contact" && language == $language]{
        title, subtitle
    },
    }`;

  const { post, categories, contact } = await sanityClient.fetch(query, {
    slug,
    language: context.locale,
  });

  if (!post) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      post,
      headerProps: {
        categories,
        contact,
      },
    },
    revalidate: 60,
  };
};
