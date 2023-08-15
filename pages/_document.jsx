import { Html, Head, Main, NextScript } from 'next/document';

export default function Document({ locale }) {
  return (
    <Html lang={locale || 'ca'}>
      <Head>
        {/* Preconnect to Google Fonts for a tiny performance boost */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />

        {/* Limit the number of font weights you're using for better performance */}
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600&family=Poppins:wght@400;500;600&display=swap"
          rel="stylesheet"
        />

        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#fff" />

        {/* Great! SEO-friendly description */}
        <meta
          name="description"
          content="Descobreix un món de contes i cançons per a nens i nenes en català. Aquesta web t’ofereix històries divertides, educatives i originals, acompanyades de música i il·lustracions. Ideal per estimular la imaginació, l’aprenentatge i l’amor per la llengua."
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
