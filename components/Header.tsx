import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import logoDark from '../public/images/logoDark.png';
import { useRouter } from 'next/router';
import { FiMenu, FiX } from 'react-icons/fi';
import catSvg from '../public/cat.svg';
import esSvg from '/public/es.svg';
import enSvg from '/public/en.svg';

const Header = () => {
  const router = useRouter();
  console.log('router.locale', router.locale);
  const { pathname, asPath } = router;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [dropdownOpen, setdropdownOpen] = useState(false);

  const selectFlagImage = (value: any) => {
    if (value === 'es') {
      return esSvg;
    } else if (value === 'en') {
      return enSvg;
    } else {
      return catSvg;
    }
  };

  const [currentLocaleSvg, setLocaleSvg] = useState(
    selectFlagImage(router.locale)
  );

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const changeLanguage = (value: any) => {
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
        <Link href="/">
          <div>
            <Image width={80} height={80} src={logoDark} alt="logoDark" />
          </div>
        </Link>
        <div className="hidden md:flex  justify-center">
          <ul className="flex space-x-14 text-lg font-semibold items-center">
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
              className="overflow-hidden rounded-full w-8 h-8 flex justify-center items-center
                            hover:cursor-pointer
                            "
            >
              <Image
                priority
                src={currentLocaleSvg}
                alt={'currentFlag'}
                height={18}
                width={18}
              />
            </div>
            <div
              className={`${
                dropdownOpen
                  ? `top-[90%] right-[12%] opacity-100 visible`
                  : 'top-[110%] right-[12%] invisible opacity-0'
              } relative
              px-4 z-40 w-46 rounded border-[.5px] border-dark bg-white py-5 shadow-card transition-all flex flex-col`}
            >
              <div
                className="flex hover:cursor-pointer"
                onClick={() => changeLanguage('cat')}
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
                onClick={() => changeLanguage('es')}
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
                onClick={() => changeLanguage('en')}
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
                    changeLanguage('cat');
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
                    changeLanguage('es');
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
                    changeLanguage('en');
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
