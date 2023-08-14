import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { MobileMenu } from '../typings';
import { RiArrowDropDownLine } from 'react-icons/ri';
import catSvg from '../public/cat.svg';
import esSvg from '/public/es.svg';
import enSvg from '/public/en.svg';
import frSvg from '/public/fr.svg';
import { LocaleValues } from './Header';
import { FiMenu, FiX } from 'react-icons/fi';

const MobileMenu = ({
  categories,
  contact,
  toggleMenu,
  menuAnimation,
  isMenuOpen,
  setDropdownOpen,
  dropdownOpen,
  currentLocaleSvg,
  changeLanguage,
}: MobileMenu) => {
  const menuVariants = {
    open: {
      opacity: 1,
      x: '0%', // Slide from 0 to full width
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
  return (
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
      {isMenuOpen && (
        <motion.div
          initial="closed"
          animate={menuAnimation ? 'open' : 'closed'}
          variants={menuVariants}
          className="absolute max-w-7xl left-0 mx-auto px-4 pb-8 mt-6 text-white w-full bg-grey md:hidden"
        >
          <ul
            className="pt-8 space-y-6 text-xl font-semibold"
            aria-label="menu"
          >
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
                onClick={() => setDropdownOpen(!dropdownOpen)}
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

export default MobileMenu;
