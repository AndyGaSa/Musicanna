import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import logoDark from '../public/images/legacyLogo.png';
import { useRouter } from 'next/router';
import { FiMenu, FiX } from 'react-icons/fi';
import catSvg from '../public/cat.svg';
import esSvg from '/public/es.svg';
import enSvg from '/public/en.svg';
import frSvg from '/public/fr.svg';
import { RiArrowDropDownLine } from 'react-icons/ri';
import { headerProps } from '../typings';
import { motion } from 'framer-motion';

const enum LocaleValues {
  es = 'es',
  ca = 'ca',
  eng = 'en',
  fr = 'fr',
}

const Header = ({ categories, contact }: headerProps) => {
  const router = useRouter();
  const { asPath } = router;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [menuAnimation, setMenuAnimation] = useState(false);
  const [dropdownOpen, setdropdownOpen] = useState(false);
  const [currentLocaleSvg, setLocaleSvg] = useState(catSvg);

  const selectFlagImage = (lang: LocaleValues) => {
    if (lang === LocaleValues.es) {
      return esSvg;
    } else if (lang === LocaleValues.eng) {
      return enSvg;
    } else if (lang === LocaleValues.fr) {
      return frSvg;
    } else {
      return catSvg;
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setMenuAnimation(!isMenuOpen);
  };

  const changeLanguage = (value: LocaleValues) => {
    setdropdownOpen(!dropdownOpen);
    toggleMenu();
    router.push({ pathname: '/' }, asPath, {
      locale: value,
    });
  };

  const menuVariants = {
    open: {
      opacity: 1,
      x: 0, // Slide from 0 to full width
      transition: {
        duration: 0.3,
      },
    },
    closed: {
      opacity: 0,
      x: '-100%', // Slide to the left by full width
      transition: {
        duration: 0.3,
      },
    },
  };

  useEffect(() => {
    setLocaleSvg(selectFlagImage(router.locale as LocaleValues));
  }, [router.locale]);

  return (
    <div className="w-full border-b-[1px] border-b-black font-titleFont sticky top-0 bg-white z-50">
      <div className="max-w-7xl mx-auto px-4 h-20 flex justify-between items-center">
        <Link href="/" className="flex-none">
          <div>
            <Image width={110} height={110} src={logoDark} alt="logoDark" />
          </div>
        </Link>
        <div className="hidden md:flex md:pl-4 lg:pl-8 justify-between overflow-x-clip">
          <ul className="flex md:space-x-8 lg:space-x-18  text-lg font-semibold items-center">
            <li>
              <Link href="/">Home</Link>
            </li>
            {categories?.map((category: any) => (
              <li key={category.subtitle}>
                <Link href={`/categories/` + category.title}>
                  {category.subtitle}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/contact">{contact ? contact[0]?.subtitle : ''}</Link>
            </li>
            <div
              onClick={() => setdropdownOpen(!dropdownOpen)}
              className="w-16 h-16 flex items-center hover:cursor-pointer"
            >
              <Image
                priority
                src={currentLocaleSvg}
                alt={'currentFlag'}
                height={18}
                width={18}
              />
              <motion.div
                initial={{ rotate: 0 }} // initial rotation angle
                animate={dropdownOpen ? { rotate: 180 } : { rotate: 0 }} // rotate to 180 degrees when the dropdown is open, otherwise rotate to 0 degrees
                transition={{ duration: 0.2 }} // transition duration
              >
                <RiArrowDropDownLine size={18} />
              </motion.div>
            </div>
            <div
              className={`${
                dropdownOpen
                  ? `top-[90%] right-[12%] opacity-100 visible`
                  : 'top-[110%] right-[12%] invisible opacity-0'
              } relative px-4 z-40 w-46 rounded border-[.5px] border-dark bg-white py-5 shadow-card transition-all flex flex-col`}
            >
              <div
                className="flex hover:cursor-pointer"
                onClick={() => changeLanguage(LocaleValues.ca)}
              >
                <Image src={catSvg} alt={'catFlag'} height={18} width={18} />
                <a className="block py-2 px-5 text-base font-semibold text-body-color hover:bg-primary hover:bg-opacity-5 hover:text-primary">
                  Cat
                </a>
              </div>
              <div
                className="flex hover:cursor-pointer"
                onClick={() => changeLanguage(LocaleValues.es)}
              >
                <Image src={esSvg} alt={'es flag'} height={18} width={18} />
                <a className="block py-2 px-5 text-base font-semibold text-body-color hover:bg-primary hover:bg-opacity-5 hover:text-primary">
                  Es
                </a>
              </div>
              <div
                className="flex hover:cursor-pointer"
                onClick={() => changeLanguage(LocaleValues.eng)}
              >
                <Image src={enSvg} alt={'eng flag'} height={18} width={18} />
                <a className="block py-2 px-5 text-base font-semibold text-body-color hover:bg-primary hover:bg-opacity-5 hover:text-primary">
                  Eng
                </a>
              </div>
              <div
                className="flex hover:cursor-pointer"
                onClick={() => changeLanguage(LocaleValues.fr)}
              >
                <Image src={frSvg} alt={'fr flag'} height={18} width={18} />
                <a className="block py-2 px-5 text-base font-semibold text-body-color hover:bg-primary hover:bg-opacity-5 hover:text-primary">
                  Fr
                </a>
              </div>
            </div>
          </ul>
        </div>
        <div className="md:hidden">
          <motion.button
            className="text-lg"
            onClick={toggleMenu}
            aria-label="Toggle Menu"
            initial={false}
            animate={menuAnimation ? 'open' : 'closed'}
          >
            {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </motion.button>
        </div>
      </div>
      {isMenuOpen && (
        <motion.div
          initial="closed"
          animate={menuAnimation ? 'open' : 'closed'}
          variants={menuVariants}
          className="absolute max-w-7xl mx-auto px-4 pb-8 text-white w-full bg-grey md:hidden"
        >
          <ul className="pt-8 space-y-6 text-xl font-semibold">
            <li>
              <Link href="/">Home</Link>
            </li>
            {categories?.map((category: any) => (
              <li key={category.subtitle}>
                <Link href={`/categories/` + category.title}>
                  {category.subtitle}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/contact">{contact ? contact[0]?.subtitle : ''}</Link>
            </li>
            <li className="flex space-x-6">
              <div
                onClick={() => setdropdownOpen(!dropdownOpen)}
                className="w-12 h-6 flex items-center hover:cursor-pointer"
              >
                <p className="pr-2">Lang</p>
                <Image
                  src={currentLocaleSvg}
                  alt={'currentFlag'}
                  height={22}
                  width={22}
                />
                <motion.div
                  initial={{ rotate: 0 }} // initial rotation angle
                  animate={dropdownOpen ? { rotate: 180 } : { rotate: 0 }} // rotate to 180 degrees when the dropdown is open, otherwise rotate to 0 degrees
                  transition={{ duration: 0.2 }} // transition duration
                >
                  <RiArrowDropDownLine size={28} />
                </motion.div>
              </div>
              <div
                className={`${
                  dropdownOpen
                    ? `  top-[85%] right-[31%] opacity-100 visible`
                    : 'top-[110%] right-[10%] invisible opacity-0'
                } 
                absolute px-4 z-40 w-46 rounded border-[.5px] border-dark bg-white py-2 shadow-card transition-all flex flex-col `}
              >
                <div
                  className="flex hover:cursor-pointer"
                  onClick={() => {
                    changeLanguage(LocaleValues.ca);
                  }}
                >
                  <Image src={catSvg} alt={'cat flag'} height={18} width={18} />
                  <a className="block py-2 px-5 text-base text-xl font-semibold text-black hover:bg-primary hover:bg-opacity-5 hover:text-primary">
                    Cat
                  </a>
                </div>
                <div
                  className="flex hover:cursor-pointer"
                  onClick={() => {
                    changeLanguage(LocaleValues.es);
                  }}
                >
                  <Image src={esSvg} alt={'es flag'} height={18} width={18} />
                  <a className="block py-2 px-5 text-base text-xl font-semibold text-black hover:bg-primary hover:bg-opacity-5 hover:text-primary">
                    Es
                  </a>
                </div>
                <div
                  className="flex hover:cursor-pointer"
                  onClick={() => {
                    changeLanguage(LocaleValues.eng);
                  }}
                >
                  <Image src={enSvg} alt={'eng flag'} height={18} width={18} />
                  <a className="block py-2 px-5 text-base text-xl font-semibold text-black hover:bg-primary hover:bg-opacity-5 hover:text-primary">
                    Eng
                  </a>
                </div>
                <div
                  className="flex hover:cursor-pointer"
                  onClick={() => {
                    changeLanguage(LocaleValues.fr);
                  }}
                >
                  <Image src={frSvg} alt={'Fr flag'} height={18} width={18} />
                  <a className="block py-2 px-5 text-base text-xl font-semibold text-black hover:bg-primary hover:bg-opacity-5 hover:text-primary">
                    Fr
                  </a>
                </div>
              </div>
            </li>
          </ul>
        </motion.div>
      )}
    </div>
  );
};

export default Header;
