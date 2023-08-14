import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import logoDark from '../public/images/legacyLogo.png';
import { useRouter } from 'next/router';
import catSvg from '../public/cat.svg';
import esSvg from '/public/es.svg';
import enSvg from '/public/en.svg';
import frSvg from '/public/fr.svg';
import { headerProps } from '../typings';
import DesktopMenu from './DesktopMenu';
import MobileMenu from './MobileMenu';

export const enum LocaleValues {
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
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [currentLocaleSvg, setLocaleSvg] = useState(catSvg);

  const LOCALE_SVG_MAP = {
    [LocaleValues.es]: esSvg,
    [LocaleValues.eng]: enSvg,
    [LocaleValues.fr]: frSvg,
    [LocaleValues.ca]: catSvg,
  };

  const selectFlagImage = (lang: LocaleValues) => {
    return LOCALE_SVG_MAP[lang] || catSvg; // fallback to catSvg if not found
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setMenuAnimation(!isMenuOpen);
  };

  const changeLanguage = (value: LocaleValues) => {
    setDropdownOpen(!dropdownOpen);
    toggleMenu();
    router.push({ pathname: '/' }, asPath, {
      locale: value,
    });
  };

  useEffect(() => {
    setLocaleSvg(selectFlagImage(router.locale as LocaleValues));
  }, [router.locale]);

  return (
    <header className="w-full border-b-[1px] border-b-black font-titleFont sticky top-0 bg-white z-50">
      <div className="relative max-w-7xl mx-auto px-4 h-20 flex justify-between items-center">
        <Link href="/" className="flex-none">
          <div>
            <Image width={110} height={110} src={logoDark} alt="logoDark" />
          </div>
        </Link>
        <DesktopMenu
          categories={categories}
          contact={contact}
          setDropdownOpen={setDropdownOpen}
          dropdownOpen={dropdownOpen}
          currentLocaleSvg={currentLocaleSvg}
          changeLanguage={changeLanguage}
        />
        <MobileMenu
          categories={categories}
          setDropdownOpen={setDropdownOpen}
          dropdownOpen={dropdownOpen}
          contact={contact}
          toggleMenu={toggleMenu}
          menuAnimation={menuAnimation}
          isMenuOpen={isMenuOpen}
          currentLocaleSvg={currentLocaleSvg}
          changeLanguage={changeLanguage}
        />
      </div>
    </header>
  );
};

export default Header;
