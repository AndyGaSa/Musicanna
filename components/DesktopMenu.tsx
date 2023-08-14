import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { DesktopMenu } from '../typings';
import { RiArrowDropDownLine } from 'react-icons/ri';
import catSvg from '../public/cat.svg';
import esSvg from '/public/es.svg';
import enSvg from '/public/en.svg';
import frSvg from '/public/fr.svg';
import { LocaleValues } from './Header';

const DesktopMenu = ({
  categories,
  contact,
  setDropdownOpen,
  dropdownOpen,
  currentLocaleSvg,
  changeLanguage,
}: DesktopMenu) => {
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
        <div
          onClick={() => setDropdownOpen(!dropdownOpen)}
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
  );
};

export default DesktopMenu;
