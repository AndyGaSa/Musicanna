import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { sanityClient, urlFor } from '../../sanity';
import { Post, headerProps, Params } from '../../typings';
import { GetStaticPaths, GetStaticProps } from 'next';
import Image from 'next/image';
import PortableText from 'react-portable-text';
import SEOHead from '../../components/SeoHead';
import serializers, {
  SANITY_DATASET,
  SANITY_PROJECT_ID,
} from '../../constants/portableTextSerializers';

interface PostPageProps {
  post: Post;
  headerProps: headerProps;
}

const IMAGE_WIDTH_HEIGHT = 720;

const PostPage: React.FC<PostPageProps> = ({
  post,
  headerProps: { categories, contact },
}: PostPageProps) => {
  return (
    <div>
      <SEOHead title={post.title} />
      <main className="font-bodyFont">
        <Header categories={categories} contact={contact} />
        <Image
          className="h-96 w-full object-cover"
          src={
            urlFor(post.mainImage)
              ?.width(IMAGE_WIDTH_HEIGHT)
              .height(IMAGE_WIDTH_HEIGHT)
              .url()!
          }
          alt={post.title}
          width={IMAGE_WIDTH_HEIGHT}
          height={IMAGE_WIDTH_HEIGHT}
          priority
        />
        <section className="max-w-3xl mx-auto">
          <article className="w-full mx-auto p-5 bg-secondaryColor/10">
            <h1 className="font-titleFont font-medium text-[32px] text-primary border-b-[1px] border-b-cyan-800 mt-10 mb-3">
              {post.title}
            </h1>
            <h2 className="font-bodyFont  text-[18px] text-gray-500 mb-2">
              {post.description}
            </h2>
            <PortableText
              dataset={SANITY_DATASET}
              projectId={SANITY_PROJECT_ID}
              content={post.body}
              serializers={serializers}
            />
          </article>
        </section>
        <Footer />
      </main>
    </div>
  );
};

export default PostPage;

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

export const getStaticProps: GetStaticProps<PostPageProps, Params> = async (
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
