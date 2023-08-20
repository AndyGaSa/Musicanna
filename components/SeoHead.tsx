import Head from 'next/head';

const SEOHead = ({ title }: { title?: string }) => (
  <Head>
    <title>{title || 'Musicanna'}</title>
    <link rel="icon" href="/smallLogo.ico" />
  </Head>
);

export default SEOHead;
