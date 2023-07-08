import React from 'react';

const BannerBottom = () => {
  return (
    <div className="max-w-5xl mx-auto flex flex-col gap-10 lg:gap-0 lg:flex-row justify-center items-center h-auto lg:h-60 bg-bannerColor text-white py-10 px-8 -mt-20 z-50">
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
        <h3 className="font-bold text-xl md:text-3xl">
          Musicanna és una manera de crear, fer i viure la música i els contes.
        </h3>
        <h4 className="text-xl text-white/80">
          Cançons, contes verticals i contacontes per a nens i nenes de 0 a 6
          anys. <br /> Un món d&#39;imaginació, creativitat, contes i cançons
        </h4>
      </div>
    </div>
  );
};

export default BannerBottom;
