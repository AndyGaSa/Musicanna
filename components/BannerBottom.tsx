import React from 'react';
import { bannerBottomProps } from '../typings';

const BannerBottom = ({ homeText }: bannerBottomProps) => {
  return (
    <div className="max-w-5xl mx-auto flex flex-col gap-10 lg:gap-0 lg:flex-row justify-center items-center h-auto lg:h-60 bg-bannerColor text-white py-10 px-8 -mt-9 z-50">
      <div className="max-w-5xl mx-auto z-50 cloud-content">
        <div className="cloud-1 cloud-block">
          <div className="cloud"></div>
        </div>
        <div className="cloud-2 cloud-block">
          <div className="cloud"></div>
        </div>
        <div className="cloud-3 cloud-block">
          <div className="cloud"></div>
        </div>
        <div className="cloud-4 cloud-block">
          <div className="cloud"></div>
        </div>
      </div>
      <div className="w-full lg:w-[60%] flex flex-col gap-3">
        <h3 className="font-bold text-xl md:text-3xl">{homeText[0].title}</h3>
        <h4 className="text-xl text-white/80">{homeText[0].subtitle}</h4>
      </div>
    </div>
  );
};

export default BannerBottom;
