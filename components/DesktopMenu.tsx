import Link from 'next/link';
import { DesktopMenu as DesktopMenuProps } from '../typings';
import LanguageDropdown from './LanguageDropdown';

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
