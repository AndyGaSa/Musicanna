import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import logoDark from '../public/images/logoDark.png';
import { useRouter } from 'next/router';
import { FiMenu, FiX } from 'react-icons/fi';
import catSvg from '../public/cat.svg';
import esSvg from '/public/es.svg';
import enSvg from '/public/en.svg';
import { RiArrowDropDownLine } from 'react-icons/ri';
import { motion } from 'framer-motion';
import { Locale } from '../typings';

const Header = () => {
  const router = useRouter();
  console.log('router.locale', router.locale);
  const { pathname, asPath } = router;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [dropdownOpen, setdropdownOpen] = useState(false);

  const selectFlagImage = (lang: Locale) => {
    if (lang === Locale.es) {
      return esSvg;
    } else if (lang === Locale.eng) {
      return enSvg;
    } else {
      return catSvg;
    }
  };

  const [currentLocaleSvg, setLocaleSvg] = useState(
    selectFlagImage(router.locale as Locale)
  );

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const changeLanguage = (value: Locale) => {
    setdropdownOpen(!dropdownOpen);
    toggleMenu();
    setLocaleSvg(selectFlagImage(value));
    router.push({ pathname }, asPath, {
      locale: value,
    });
  };

  return (
    <div className="w-full border-b-[1px] border-b-black font-titleFont sticky top-0 bg-white z-50">
      <div className="max-w-7xl mx-auto px-4 h-20 flex justify-between items-center">
        <Link href="/" className="flex-none">
          <div>
            <Image width={80} height={80} src={logoDark} alt="logoDark" />
          </div>
        </Link>
        <div className="hidden md:flex md:pl-4 lg:pl-8 justify-between overflow-x-clip">
          <ul className="flex md:space-x-8 lg:space-x-18  text-lg font-semibold items-center">
            <li>
              <Link href="/">Inici</Link>
            </li>
            <li>
              <Link href="/categories/cancons">Cançons</Link>
            </li>
            <li>
              <Link href="/categories/contes verticals">Contes Verticals</Link>
            </li>
            <li>
              <Link href="/categories/comptacontes">Comptacontes</Link>
            </li>
            <li>
              <Link href="/contact">Contacte</Link>
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
                onClick={() => changeLanguage(Locale.cat)}
              >
                <Image
                  priority
                  src={catSvg}
                  alt={'catFlag'}
                  height={18}
                  width={18}
                />
                <a className="block py-2 px-5 text-base font-semibold text-body-color hover:bg-primary hover:bg-opacity-5 hover:text-primary">
                  Cat
                </a>
              </div>
              <div
                className="flex hover:cursor-pointer"
                onClick={() => changeLanguage(Locale.es)}
              >
                <Image
                  priority
                  src={esSvg}
                  alt={'es flag'}
                  height={18}
                  width={18}
                />
                <a className="block py-2 px-5 text-base font-semibold text-body-color hover:bg-primary hover:bg-opacity-5 hover:text-primary">
                  Es
                </a>
              </div>
              <div
                className="flex hover:cursor-pointer"
                onClick={() => changeLanguage(Locale.eng)}
              >
                <Image
                  priority
                  src={enSvg}
                  alt={'eng flag'}
                  height={18}
                  width={18}
                />
                <a className="block py-2 px-5 text-base font-semibold text-body-color hover:bg-primary hover:bg-opacity-5 hover:text-primary">
                  Eng
                </a>
              </div>
            </div>
          </ul>
        </div>
        <div className="md:hidden">
          <button
            className="text-lg"
            onClick={toggleMenu}
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="max-w-7xl mx-auto px-4 pb-8 text-white bg-black bg-opacity-50 md:hidden">
          <ul className="pt-8 space-y-6 text-xl font-semibold">
            <li>
              <Link href="/">Inici</Link>
            </li>
            <li>
              <Link href="/categories/cancons">Cançons</Link>
            </li>
            <li>
              <Link href="/categories/contes verticals">Contes Verticals</Link>
            </li>
            <li>
              <Link href="/categories/comptacontes">Comptacontes</Link>
            </li>
            <li>
              <Link href="/contact">Contacte</Link>
            </li>
            <li className="flex space-x-6">
              <div
                onClick={() => setdropdownOpen(!dropdownOpen)}
                className="overflow-hidden rounded-full w-8 h-8 flex justify-center items-center
                            hover:cursor-pointer"
              >
                <Image
                  priority
                  src={currentLocaleSvg}
                  alt={'currentFlag'}
                  height={58}
                  width={58}
                />
              </div>
              <div
                className={`${
                  dropdownOpen
                    ? `top-[91%] right-[10%] opacity-100 visible`
                    : 'top-[110%] right-[10%] invisible opacity-0'
                } 
              px-4 z-40 w-46 rounded border-[.5px] border-dark bg-white py-5 shadow-card transition-all flex `}
              >
                <div
                  className="flex hover:cursor-pointer"
                  onClick={() => {
                    changeLanguage(Locale.cat);
                  }}
                >
                  <Image
                    priority
                    src={catSvg}
                    alt={'cat flag'}
                    height={18}
                    width={18}
                  />
                  <a className="block py-2 px-5 text-base text-xl font-semibold text-black hover:bg-primary hover:bg-opacity-5 hover:text-primary">
                    Cat
                  </a>
                </div>
                <div
                  className="flex hover:cursor-pointer"
                  onClick={() => {
                    changeLanguage(Locale.es);
                  }}
                >
                  <Image
                    priority
                    src={esSvg}
                    alt={'es flag'}
                    height={18}
                    width={18}
                  />
                  <a className="block py-2 px-5 text-base text-xl font-semibold text-black hover:bg-primary hover:bg-opacity-5 hover:text-primary">
                    Es
                  </a>
                </div>
                <div
                  className="flex hover:cursor-pointer"
                  onClick={() => {
                    changeLanguage(Locale.eng);
                  }}
                >
                  <Image
                    priority
                    src={enSvg}
                    alt={'eng flag'}
                    height={18}
                    width={18}
                  />
                  <a className="block py-2 px-5 text-base text-xl font-semibold text-black hover:bg-primary hover:bg-opacity-5 hover:text-primary">
                    Eng
                  </a>
                </div>
              </div>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Header;
