import React from 'react';
import { bannerBottomProps } from '../typings';

interface CloudProps {
  cloudClass: string;
}

const Cloud: React.FC<CloudProps> = ({ cloudClass }) => (
  <div className={`${cloudClass} cloud-block`}>
    <div className="cloud"></div>
  </div>
);

const BannerBottom: React.FC<bannerBottomProps> = ({ homeText }) => {
  const { title, subtitle } = homeText?.[0] || {};

  return (
    <div className="max-w-5xl relative mx-auto flex flex-col gap-10 lg:gap-0 lg:flex-row justify-center items-center h-auto lg:h-60 bg-bannerColor text-white py-10 px-8 -mt-9 z-50">
      <div className="max-w-5xl mx-auto z-50 cloud-content">
        <Cloud cloudClass="cloud-1" />
        <Cloud cloudClass="cloud-2" />
        <Cloud cloudClass="cloud-3" />
        <Cloud cloudClass="cloud-4" />
      </div>
      <div className="w-full lg:w-[60%] flex flex-col gap-3">
        {title && <h3 className="font-bold text-xl md:text-3xl">{title}</h3>}
        {subtitle && <h4 className="text-xl text-white/80">{subtitle}</h4>}
      </div>
    </div>
  );
};

export default BannerBottom;
