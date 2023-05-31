import React from 'react';

const BannerBottom = () => {
  return (
    <div className="max-w-7xl mx-auto flex flex-col gap-10 lg:gap-0 lg:flex-row justify-center items-center h-auto lg:h-60 bg-bgColor text-white py-10 px-8 -mt-20 z-50">
      <div className="w-full lg:w-[60%] flex flex-col gap-3">
        <p className="text-xl uppercase font-bodyFont font-semibold text-white">
          MUSICANNA
        </p>
        z
        <h3 className="font-bold text-xl md:text-3xl">
          Cançoncs, contes verticals i contacontes per a nens i nenes de 0 a 6
          anys
        </h3>
        <h4 className="text-xl text-white/80">
          Un món d'imaginació, creativitat, contes i cançons
        </h4>
      </div>
    </div>
  );
};

export default BannerBottom;
