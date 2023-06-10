import React from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Contact: React.FC = () => {
  return (
    <div>
      <Head>
        <title>Musicanna</title>
        <link rel="icon" href="/smallLogo.ico" />
      </Head>

      <main className="font-bodyFont">
        {/* ============ Header Start here ============ */}
        <Header />
        {/* ============ Header End here ============== */}
        {/* ============ Post Part Start here ========= */}
        <h1 className="font-titleFont font-medium text-[32px] text-primary mt-10 mb-3 text-center">
          CONTACTE
        </h1>
        <div className="max-w-7xl mx-auto py-6">
          <p>
            Musicanna és una manera de crear, fer i viure la música i els
            contes.
          </p>
          <p>
            El formem un equip de dues persones l’Imma i l’Anna. Entre les dues
            realitzem espectacles per escoles, biblioteques, llars d’infants,
            etc,on acostem els contes i la música d’una manera molt interactiva.
            Impartim sessions de música en familia, per infants de 0 a 3 anys i
            llenguatge musical en familia de 4 a 6 anys. La nostra manera
            d’acostar ala música als infants és a través de les cançons , les
            audicions acompanyades de suport visual, els instruments que sempre
            poden tocar, el joc , el moviment i la relaxació. També fem xerrades
            per mestres i educadores.
          </p>
        </div>
        {/* ============ Post Part End here =========== */}
        {/* ============ Footer Start here============= */}
        <Footer />
        {/* ============ Footer End here ============== */}
      </main>
    </div>
  );
};

export default Contact;
