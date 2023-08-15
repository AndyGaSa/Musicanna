import Image from 'next/image';
import logoLight from '/public/images/legacyLogoMusicannaWhite.svg';
import { BsFacebook, BsWhatsapp, BsYoutube, BsInstagram } from 'react-icons/bs';
import { AiOutlineCopyrightCircle, AiOutlineMail } from 'react-icons/ai';

type SocialLinkProps = {
  href: string;
  Icon: React.ComponentType<any>;
  testId: string;
  label?: string;
};

const ICON_CLASS_NAME =
  'w-6 h-6 text-white/50 hover:text-white duration-300 cursor-pointer';

const SocialLink: React.FC<SocialLinkProps> = ({
  href,
  Icon,
  testId,
  label,
}) => (
  <a
    href={href}
    target="_blank"
    rel="noreferrer"
    className={`flex gap-1 xl:gap-3 text-white/50 hover:text-white duration-300 cursor-pointer`}
  >
    <Icon data-testid={testId} className={ICON_CLASS_NAME} />
    {label && <span>{label}</span>}
  </a>
);

const Footer = () => {
  return (
    <div className="w-full py-10 bg-bgColor text-white/80 px-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-4 justify-center items-center md:justify-between">
        <div className="flex items-center gap-3">
          <Image src={logoLight} width={110} height={110} alt="logo" />
          <p className="flex items-center text-sm font-titleFont gap-1">
            <AiOutlineCopyrightCircle className="mt-[1px]" />
            Andy Garcia || all rights reserved
          </p>
        </div>

        <div className="flex gap-6 py-8">
          <SocialLink
            href="https://www.instagram.com/musicanna.cat/"
            Icon={BsInstagram}
            testId="instagram"
          />
          <SocialLink
            href="https://es-es.facebook.com/musicanna.cat/"
            Icon={BsFacebook}
            testId="facebook"
          />
          <SocialLink
            href="https://www.youtube.com/@musicannacontesverticals8037"
            Icon={BsYoutube}
            testId="youtube"
          />
          <SocialLink
            href="https://www.instagram.com/contesverticals/"
            Icon={BsInstagram}
            testId="instagram"
          />
        </div>

        <div className="flex py-6 gap-4">
          <SocialLink
            href="https://wa.me/666767957"
            Icon={BsWhatsapp}
            testId="whatsapp"
            label="Whatsapp"
          />
          <SocialLink
            href="mailto: annalucini@musicanna.cat"
            Icon={AiOutlineMail}
            testId="mail"
            label="annalucini@musicanna.cat"
          />
        </div>
      </div>
    </div>
  );
};

export default Footer;
