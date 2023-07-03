import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { sanityClient, urlFor } from '../../sanity';
import { Post } from '../../typings';
import { GetStaticPaths, GetStaticProps } from 'next';
import Image from 'next/image';
import PortableText from 'react-portable-text';

interface Props {
  post: Post;
}

const Post: React.FC<Props> = ({ post }: Props) => {
  return (
    <div>
      <Header />

      <Image
        className="h-96 w-full object-cover"
        src={urlFor(post.mainImage).url()!}
        alt={post.title}
        width={580}
        height={550}
      />
      <div className="max-w-3xl mx-auto">
        <article className="w-full mx-auto p-5 bg-secondaryColor/10">
          <h1 className="font-titleFont font-medium text-[32px] text-primary border-b-[1px] border-b-cyan-800 mt-10 mb-3">
            {post.title}
          </h1>
          <h2 className="font-bodyFont  text-[18px] text-gray-500 mb-2">
            {post.description}
          </h2>
          <div className="flex items-center gap-2">
            <Image
              className="rounded-full w-12 h-12 object-cover bg-red-400"
              src={urlFor(post.author.image).url()}
              alt={post.author.name}
              width={30}
              height={30}
            />
            <p className="font-bodyFont text-base">
              Publicat per{' '}
              <span className="font-bold text-secondaryColor">
                {post.author.name}
              </span>{' '}
              - Published at {new Date(post.publishedAt).toLocaleDateString()}
            </p>
          </div>
          <div className="mt-10">
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
        </article>
      </div>
      <Footer />
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

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const query = `*[_type == "post" && slug.current == $slug][0]{
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
    }`;

  const post: Post = await sanityClient.fetch(query, {
    slug: params?.slug,
  });

  if (!post) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      post,
    },
    revalidate: 60,
  };
};
