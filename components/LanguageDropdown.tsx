import Image, { StaticImageData } from 'next/image';
import { motion } from 'framer-motion';
import { RiArrowDropDownLine } from 'react-icons/ri';
import catSvg from '/public/cat.svg';
import esSvg from '/public/es.svg';
import enSvg from '/public/en.svg';
import frSvg from '/public/fr.svg';
import { LocaleValues } from '../constants/localeConstants';

interface LanguageDropdownProps {
  currentLocaleSvg: string;
  dropdownOpen: boolean;
  setDropdownOpen: (value: boolean) => void;
  changeLanguage: (lang: LocaleValues) => void;
}

interface Language {
  lang: LocaleValues;
  flag: StaticImageData; // TypeScript typing for next/image
  label: string;
}

const LANGUAGES: Language[] = [
  { lang: LocaleValues.ca, flag: catSvg, label: 'Cat' },
  { lang: LocaleValues.es, flag: esSvg, label: 'Es' },
  { lang: LocaleValues.eng, flag: enSvg, label: 'Eng' },
  { lang: LocaleValues.fr, flag: frSvg, label: 'Fr' },
];

const LanguageDropdown: React.FC<LanguageDropdownProps> = ({
  currentLocaleSvg,
  dropdownOpen,
  setDropdownOpen,
  changeLanguage,
}) => {
  return (
    <div className={`relative`}>
      <div
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="w-32 h-16 flex items-center hover:cursor-pointer"
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
          dropdownOpen ? `opacity-100 visible` : 'invisible opacity-0'
        } absolute px-4 z-40 w-46 rounded border-[.5px] border-dark bg-white py-5 shadow-card transition-all flex flex-col`}
      >
        {LANGUAGES.map(({ lang, flag, label }) => (
          <div
            key={label}
            className="flex hover:cursor-pointer"
            onClick={() => changeLanguage(lang)}
          >
            <Image src={flag} alt={`${label} flag`} height={18} width={18} />
            <a className="block py-2 px-5 text-base text-black font-semibold hover:bg-primary hover:bg-opacity-5 hover:text-primary">
              {label}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LanguageDropdown;
