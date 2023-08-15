import { MobileMenu as MobileMenuProps } from '../typings';
import { FiMenu, FiX } from 'react-icons/fi';
import LanguageDropdown from './LanguageDropdown';
import { motion } from 'framer-motion';
import CategoriesList from './CategoriesList';
import ActiveLink from './ActiveLink';

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
  const menuIcon = isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />;

  return (
    <div className="md:hidden">
      <motion.button
        className="text-lg"
        onClick={toggleMenu}
        aria-label="Toggle Menu"
        initial={false}
        animate={menuAnimation ? 'open' : 'closed'}
      >
        {menuIcon}
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
              <ActiveLink href="/" activeClassName="text-bannerColor ">
                <span>Home</span>
              </ActiveLink>
            </li>
            <CategoriesList categories={categories} />
            <li>
              <ActiveLink href="/contact" activeClassName="text-bannerColor ">
                <span>{contact ? contact[0]?.subtitle : ''}</span>
              </ActiveLink>
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
