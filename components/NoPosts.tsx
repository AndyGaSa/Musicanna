import { NoPostsProps } from '../typings';
import Footer from './Footer';
import Header from './Header';
import SEOHead from './SeoHead';

const NoPosts: React.FC<NoPostsProps> = ({ categories, contact }) => (
  <div>
    <SEOHead />
    <main className="font-bodyFont">
      <div className="flex flex-col min-h-screen">
        <Header categories={categories} contact={contact} />
        <div className="justify-center grow py-10 flex lg:gap-12 gap-6 flex-col text-center xl:text-[25px] lg:text-[18px]">
          <h2>Ho sentim! No hi han posts per aquest idioma todavia.</h2>
          <h2>Lo sentimos! No hay posts para este idioma todavia</h2>
          <h2>
            We are sorry! There are no posts available for this language
            currently.
          </h2>
          <h2>
            Nous sommes désolés! Il n`&apos;`,y a pas encore de messages pour
            cette langue.
          </h2>
        </div>
        <Footer />
      </div>
    </main>
  </div>
);

export default NoPosts;
