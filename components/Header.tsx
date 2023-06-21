import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import logoDark from '../public/images/logoDark.png';
import { useRouter } from 'next/router';

const Header = () => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="w-full border-b-[1px] border-b-black font-titleFont sticky top-0 bg-white z-50">
      <div className="max-w-7xl mx-auto px-4 h-20 flex justify-between items-center">
        <Link href="/">
          <div>
            <Image width={80} height={80} src={logoDark} alt="logoDark" />
          </div>
        </Link>
        <div className="hidden md:flex flex-1 justify-center">
          <ul className="flex space-x-14 text-lg font-semibold">
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

            <select
              className="selectpicker"
              id="language-selector"
              onChange={(event) => {
                router.push('/', '/', {
                  locale: event.target.value.toLowerCase(),
                });
              }}
            >
              <option className="cursor-pointer">ES</option>
              <option className="cursor-pointer">CAT</option>
              <option className="cursor-pointer">EN</option>
            </select>
          </ul>
        </div>
        <div className="md:hidden">
          <button
            className="text-lg"
            onClick={toggleMenu}
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? 'Close' : 'Open'}
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="max-w-7xl mx-auto px-4 pb-8 text-white bg-black bg-opacity-50 md:hidden">
          <ul className="space-y-4 text-lg font-semibold">
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
            <li
              className="cursor-pointer"
              onClick={() => {
                router.push('/', '/', { locale: 'es' });
              }}
            >
              ES
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Header;
