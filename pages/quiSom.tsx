import React from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Image from 'next/image';
import girlsSvg from '../public/images/girls.svg';
import { headerProps, Params } from '../typings';
import { sanityClient } from '../sanity';
import { GetStaticProps } from 'next';

interface Props {
  headerProps: headerProps;
}

const QuiSom: React.FC<Props> = ({
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
        <h1 className="font-titleFont font-large text-[32px] text-primary mt-10 mb-3 text-center">
          QUI SOM
        </h1>
        <div className="max-w-7xl mx-auto p-6 flex flex-wrap">
          <div className="w-full md:w-1/2 mb-6 md:mb-0">
            <h3 className="font-titleFont font-medium text-[22px] text-primary mt-10 mb-3">
              Musicanna és una manera de crear, fer i viure la música i els
              contes.
            </h3>
            <p>
              El formem un equip de dues persones l’Imma i l’Anna. Entre les
              dues realitzem espectacles per escoles, biblioteques, llars
              d’infants, etc, on acostem els contes i la música d’una manera
              molt interactiva. Impartim sessions de música en familia, per
              infants de 0 a 3 anys i llenguatge musical en familia de 4 a 6
              anys. La nostra manera d’acostar la música als infants és a través
              de les cançons , les audicions acompanyades de suport visual, els
              instruments que sempre poden tocar, el joc , el moviment i la
              relaxació. També fem xerrades per mestres i educadores.
            </p>
            <h2 className="font-titleFont font-medium text-[22px] text-primary mt-10 mb-3">
              Més sobre nosaltres
            </h2>
            <h3 className="font-titleFont font-medium text-[20px] text-primary mt-10 mb-3">
              Anna Lucini
            </h3>
            <p>
              La música ha tingut un pes molt important durant la meva vida. De
              ben petita, a partir dels 3 anys, vaig començar tocant en la
              Joventut Percussionista de Catalunya dirigida pel mestre Àngel
              Colomer i del Romero. Tocàvem amb instruments Orff obres de música
              clàssica com la Simfonia de les joguines , obres per piano i
              orquestra on l‘orquestra la formàvem tot de nens i nenes tocant el
              xilòfon,el carilló..... Amb aquesta agrupació vam viatjar per
              diferents països d’Europa fent actuacions i participant en
              concursos d’orquestres. Aquesta manera de viure i gaudir la música
              l’he intentat transmetre a tots aquells infants que he conegut.
              Tan fent d’educadora, com explicant contes o el que fós. Fa més de
              30 anys que em dedico a fer arribar la música als infants, donant
              classes i dirigint conjunts instrumentals Orff. Tot va començar a
              l’escola de música moderna de Granollers impartint classes de
              música per nens i nenes a partir dels 3 anys i a l’Escola Oberta
              de música de Santa Maria de Palautordera dirigint grups
              d’instruments Orff. Amb l’Àfrica Pérez, vam crear la nostra pròpia
              escola de música, TamTam, especialitzada en l’ensenyament musical
              per a infants de 3 a 16 anys. També he estat mestra de música de
              cicle infantil i primària de l’escola pública del Remei de Santa
              Maria de Palautordera. Començo a treballar amb els més menuts
              intentant apropar el llenguatge musical d’una manera més
              entenedora a partir de l’experimentació amb instruments, la cançó
              , el joc i l’audició teatralitzada. Aquesta tasca amb nadons i el
              fet de ser mare em va portar a composar. La finalitat de les meves
              cançons és que els més petits gaudeixin de la música alhora que
              les utilitzin com a un dels primers llenguatges tal com he fet amb
              els meus fills. Al mateix m’ha passat amb els contes. Com a
              educadora infantil i tutora d’aula, sovint he utilitzat la música
              i els contes indistintament. Us podeu imaginar explicar un conte
              sense fer veus de llop o cantar una cançó? En l’actualitat una
              part del dia la dedico a dissenyar contes verticals amb l'Imma.
              L’altra realitzem sessions de música en llars d’infants i tallers
              per pares, mares i nadons, expliquem contes i impartim xerrades
              sobre recursos musicals i els contes per a infants de 0-6 a
              mestres i educadors/es. Ademés soc autora de jocs de taula i de
              contes infantils. En aquesta pàgina, trobareu el meu món, un món
              d'imaginació, creativitat, contes i cançons.
            </p>
            <h3 className="font-titleFont font-medium text-[20px] text-primary mt-10 mb-3">
              Imma Vilà
            </h3>
            <p>
              De ben petita tant la música com la dansa han format part de la
              meva vida. Vaig estudiar dansa a , vaig continuar fins i tot de
              gran rebent classes de claqué amb la Laia Molins, també vaig fer
              solfeig i piano a Vaig treballar durant uns anys a l escola
              bressol de Sant Esteve de Palautordera De petita també m’agradava
              cosir i em feia els vestits de les nines, mes endavant ( o uns
              anys despres vaig tenir una petita empresa dtall on cosiem
              penjolls arrecades, anells……. A partir del 2019 vaig començar a
              treballar amb l’Anna i entre les dues creem i cosim els contes
              verticals. També realitzem sessions de música en familia,
              contacontes en escoles, llars d’infants i biblioteques a part de
              xerrades per mestres i educadors. Per mi és molt important donar
              un cop de ma a quí més ho necessita i col.laboro activament amb
              una ong ….associació “Vida significativa” a la que hi dedico el
              temps que puc. Soc una gran aficionada al teatre, la música i la
              dansa.
            </p>
          </div>
          <div className="w-full h-fit md:w-1/2">
            <Image src={girlsSvg} alt="Girls" />
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
      title, subtitle
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

export default QuiSom;
