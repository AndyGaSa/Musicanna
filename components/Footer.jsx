import Image from 'next/image';
import logoLight from '../public/images/LegacyLogoMusicannaWhite.svg';
import { BsFacebook, BsWhatsapp, BsYoutube, BsInstagram } from 'react-icons/bs';
import { AiOutlineCopyrightCircle, AiOutlineMail } from 'react-icons/ai';

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
          <a href="https://www.instagram.com/musicanna.cat/" target="_blank">
            <BsInstagram
              data-testid="instagram"
              className="w-6 h-6 text-white/50 hover:text-white duration-300 cursor-pointer"
            />
          </a>
          <a href="https://es-es.facebook.com/musicanna.cat/" target="_blank">
            <BsFacebook
              data-testid="facebook"
              className="w-6 h-6 text-white/50 hover:text-white duration-300 cursor-pointer"
            />
          </a>
          <a
            href="https://www.youtube.com/@musicannacontesverticals8037"
            target="_blank"
          >
            <BsYoutube
              data-testid="youtube"
              className="w-6 h-6 text-white/50 hover:text-white duration-300 cursor-pointer"
            />
          </a>
          <a href="https://www.instagram.com/contesverticals/" target="_blank">
            <BsInstagram
              data-testid="instagram"
              className="w-6 h-6 text-white/50 hover:text-white duration-300 cursor-pointer"
            />
          </a>
        </div>
        <div className="flex py-6 gap-4">
          <a
            href="https://wa.me/666767957"
            target="_blank"
            className="flex gap-1 xl:gap-3 text-white/50 hover:text-white duration-300 cursor-pointer"
          >
            <BsWhatsapp data-testid="whatsapp" className="w-6 h-6" />
            <span>Whatsapp</span>
          </a>
          <a
            href="mailto: annalucini@musicanna.cat"
            target="_blank"
            className="flex gap-1 xl:gap-3 text-white/50 hover:text-white duration-300 cursor-pointer"
          >
            <AiOutlineMail data-testid="mail" className="w-6 h-6" />
            <span>annalucini@musicanna.cat</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
