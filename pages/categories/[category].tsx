import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { sanityClient } from '../../sanity';
import { Category, categoriesProps, Params, Post } from '../../typings';
import { GetStaticPaths, GetStaticProps } from 'next';
import NoPosts from '../../components/NoPosts';
import SEOHead from '../../components/SeoHead';
import Posts from '../../components/Posts';
import CategoryHeader from '../../components/CategoryHeader';

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
