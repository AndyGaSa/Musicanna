import Image from 'next/image';
import Slider from 'react-slick';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { urlFor } from '../sanity';

function SampleNextArrow(props: any) {
  const { onClick } = props;
  return (
    <div
      className="w-10 h-full absolute top-[0%] z-30 right-0 bg-gradient-to-l from-gray-900/20 hover:from-gray-900 overflow-hidden"
      onClick={onClick}
    >
      <div className="w-full h-full p-2 text-gray-300 text-sm relative flex items-center justify-end cursor-pointer">
        <FaChevronRight size={20} />
      </div>
    </div>
  );
}

function SamplePrevArrow(props: any) {
  const { onClick } = props;
  return (
    <div
      className="w-10 h-full absolute top-[0%] z-30 left-0 bg-gradient-to-r from-gray-900/50  hover:from-gray-900 overflow-hidden"
      onClick={onClick}
    >
      <div className="w-full h-full  p-2 text-gray-300 text-sm relative flex items-center justify-between cursor-pointer">
        <FaChevronLeft size={20} />
      </div>
    </div>
  );
}

const Banner = ({ images }: any) => {
  const imagesSorted = images.sort((a: any, b: any) => a.order - b.order);
  const settings = {
    dots: false,
    infinite: true,
    speed: 10,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };
  return (
    <div className="w-full h-auto lg:h-[550px] relative">
      <Slider {...settings} className="flex flex-col">
        {imagesSorted.map((image: any, index: any) => (
          <div className="lg:h-[600px]" key={image._id}>
            <Image
              className="xl:h-[68vh] h-[50vh] w-full object-cover"
              src={urlFor(image.image)?.url()!}
              width={1000}
              height={700}
              priority={index === 0}
              alt="bannerImg"
              data-testid="bannerImg"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Banner;
