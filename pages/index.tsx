import Head from 'next/head';
import 'slick-carousel/slick/slick.css';
import Banner from '../components/Banner';
import BannerBottom from '../components/BannerBottom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Image from 'next/image';
import { sanityClient, urlFor } from '../sanity';
import { indexProps } from '../typings';
import Link from 'next/link';
import { GetServerSideProps } from 'next';

const Home: React.FC<indexProps> = ({
  posts,
  bannerImages,
  headerProps: { contact, categories },
  bannerBottomProps: { homeText },
}) => {
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
        {/* ============ Banner Start here ============ */}
        <Banner images={bannerImages} />
        {/* ============ Banner End here ============== */}
        <div className="max-w-7xl mx-auto relative z-30">
          <BannerBottom homeText={homeText} />
        </div>
        {/* ============ Banner-Bottom End here ======= */}
        {/* ============ Post Part Start here ========= */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 py-6">
          {posts.map((post) => (
            <Link key={post._id} href={`/post/${post.slug.current}`}>
              <div className="border-[1px] border-secondaryColor border-opacity-40 h-[450px] group">
                <div className="h-4/6 w-full overflow-hidden">
                  <Image
                    width={380}
                    height={350}
                    src={urlFor(post.mainImage)?.url()!}
                    alt={post.title}
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
        {/* ============ Post Part End here =========== */}
        {/* ============ Footer Start here============= */}
        <Footer />
        {/* ============ Footer End here ============== */}
      </main>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<indexProps> = async (
  context
) => {
  const query = `{'posts':*[_type == "post"  && language == $language][0..5] {
      _id,
      title,
      author -> {
        name,
        image
      },
      description,
      mainImage,
      slug
    },
    'bannerImages':*[_type == "banner"],
    'categories':*[_type == "category" && language == $language]{
      title, subtitle
    },
    'contact':*[_type == "contact" && language == $language]{
      title, subtitle
    },
    'homeText':*[_type == "homeText" && language == $language]{
      title, subtitle
    }
  }`;
  try {
    const { posts, bannerImages, categories, contact, homeText } =
      await sanityClient.fetch(query, {
        language: context.locale,
      });
    return {
      props: {
        posts,
        bannerImages,
        headerProps: {
          categories,
          contact,
        },
        bannerBottomProps: { homeText },
      },
    };
  } catch (error) {
    return {
      props: {
        posts: [],
        bannerImages: [],
        headerProps: {
          categories: [{ title: '', subtitle: '' }],
          contact: [{ title: '', subtitle: '' }],
        },
        bannerBottomProps: { homeText: [{ title: '', subtitle: '' }] },
        error: {
          statusCode: 401,
          message: (error as Error).message,
        },
      },
    };
  }
};

export default Home;
