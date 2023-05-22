import React from 'react';
import { MdOutlineMonitor } from 'react-icons/md';
import { IoMdHeartEmpty } from 'react-icons/io';
import { GoComment } from 'react-icons/go';

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
      {/*<div className="w-full lg:w-[40%] flex items-center justify-center gap-2 lg:gap-8">
        <div className="w-full flex flex-col items-center group">
          <MdOutlineMonitor className="text-4xl text-gray-300 group-hover:text-white duration-300" />
          <p className="text-xs md:text-sm font-titleFont text-white/50 group-hover:text-white">
            watch on youtube
          </p>
        </div>
        <div className="w-full flex flex-col items-center justify-center group">
          <IoMdHeartEmpty className="text-4xl text-gray-300 group-hover:text-white duration-300" />
          <p className="text-xs md:text-sm font-titleFont text-white/50 group-hover:text-white">
            like our contents
          </p>
        </div>
        <div className="w-full flex flex-col items-center justify-center group">
          <GoComment className="text-4xl text-gray-300 group-hover:text-white duration-300" />
          <p className="text-xs md:text-sm font-titleFont text-white/50 group-hover:text-white">
            place comments
          </p>
        </div>
  </div>*/}
    </div>
  );
};

export default BannerBottom;
