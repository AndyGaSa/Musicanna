import Link from 'next/link';
import { DesktopMenu as DesktopMenuProps } from '../typings';
import LanguageDropdown from './LanguageDropdown';
import CategoriesList from './CategoriesList';
import ActiveLink from './ActiveLink';

const DesktopMenu = ({
  categories,
  contact,
  setDropdownOpen,
  dropdownOpen,
  currentLocaleSvg,
  changeLanguage,
}: DesktopMenuProps) => {
  return (
    <div className="hidden md:flex md:pl-4 lg:pl-8 justify-between overflow-x-clip">
      <ul className="flex md:space-x-8 lg:space-x-18  text-lg font-semibold items-center">
        <li>
          <ActiveLink href="/" activeClassName="text-bannerColor font-bold">
            <span>Home</span>
          </ActiveLink>
        </li>
        <CategoriesList categories={categories} />
        <li>
          <ActiveLink
            href="/contact"
            activeClassName="text-bannerColor font-bold"
          >
            <span>{contact ? contact[0]?.subtitle : ''}</span>
          </ActiveLink>
        </li>
        <LanguageDropdown
          currentLocaleSvg={currentLocaleSvg}
          dropdownOpen={dropdownOpen}
          setDropdownOpen={setDropdownOpen}
          changeLanguage={changeLanguage}
        />
      </ul>
    </div>
  );
};

export default DesktopMenu;
