import React from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Image from 'next/image';
import contactPhoto from '../public/images/quiSom.jpg';
import { headerProps, Params } from '../typings';
import { sanityClient } from '../sanity';
import { GetStaticProps } from 'next';
import PortableText from 'react-portable-text';
import serializers, {
  SANITY_DATASET,
  SANITY_PROJECT_ID,
} from '../constants/portableTextSerializers';

interface Props {
  headerProps: headerProps;
}

const Contact: React.FC<Props> = ({
  headerProps: { categories, contact },
}: Props) => {
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
        {/* ============ About us Part Start here ========= */}
        <h1 className="font-titleFont font-xl text-[34px] text-primary mt-12 mb-4 text-center">
          {contact[0]?.subtitle.toUpperCase()}
        </h1>
        <div className="max-w-7xl mx-auto p-6 flex flex-wrap">
          <div className="w-full md:w-1/2 mb-6 md:mb-0 text-justify">
            <PortableText
              dataset={SANITY_DATASET}
              projectId={SANITY_PROJECT_ID}
              content={contact[0]?.body || {}}
              serializers={serializers}
            />
          </div>
          <div className="w-full h-fit md:w-1/2 xl:px-16 my-6">
            <Image
              className="rounded-xl"
              src={contactPhoto}
              alt="Girls"
              priority
            />
          </div>
        </div>
        {/* ============ About us Part End here ========== */}
      </main>
      {/* ============ Footer Start here ============ */}
      <Footer />
      {/* ============ Footer End here ============== */}
    </div>
  );
};

export const getStaticProps: GetStaticProps<Props, Params> = async (
  context
) => {
  const query = `{
    'categories':*[_type == "category" && language == $language]{
      title, subtitle
    },
    'contact':*[_type == "contact" && language == $language]{
      title, subtitle, body
    }
  }`;

  const { categories, contact } = await sanityClient.fetch(query, {
    language: context.locale,
  });
  if (!contact || !categories) {
    return {
      props: {
        headerProps: {
          categories: [{ title: '', subtitle: '' }],
          contact: [{ title: '', subtitle: '' }],
        },
      },
    };
  }

  return {
    props: {
      headerProps: { categories, contact },
    },
  };
};

export default Contact;
