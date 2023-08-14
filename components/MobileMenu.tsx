import Link from 'next/link';
import { MobileMenu as MobileMenuProps } from '../typings';
import { FiMenu, FiX } from 'react-icons/fi';
import LanguageDropdown from './LanguageDropdown';
import { motion } from 'framer-motion';

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
}: MobileMenuProps) => {
  const menuVariants = {
    open: {
      opacity: 1,
      x: '0%',
      transition: {
        duration: 0.3,
      },
    },
    closed: {
      opacity: 0,
      x: '-100%',
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
              <LanguageDropdown
                currentLocaleSvg={currentLocaleSvg}
                dropdownOpen={dropdownOpen}
                setDropdownOpen={setDropdownOpen}
                changeLanguage={changeLanguage}
              />
            </li>
          </ul>
        </motion.div>
      )}
    </div>
  );
};

export default MobileMenu;
