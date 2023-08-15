import Image from 'next/image';
import Slider from 'react-slick';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { urlFor } from '../sanity';

interface ArrowProps {
  onClick?: () => void;
}

const BANNER_WIDTH = 1400;
const BANNER_HEIGHT = 1200;

const NextArrow: React.FC<ArrowProps> = ({ onClick }) => (
  <div
    className="w-10 h-full absolute top-[0%] z-30 right-0 bg-gradient-to-l from-gray-900/20 hover:from-gray-900 overflow-hidden"
    onClick={onClick}
  >
    <div className="w-full h-full p-2 text-gray-300 text-sm relative flex items-center justify-end cursor-pointer">
      <FaChevronRight size={20} />
    </div>
  </div>
);

const PrevArrow: React.FC<ArrowProps> = ({ onClick }) => (
  <div
    className="w-10 h-full absolute top-[0%] z-30 left-0 bg-gradient-to-r from-gray-900/50  hover:from-gray-900 overflow-hidden"
    onClick={onClick}
  >
    <div className="w-full h-full  p-2 text-gray-300 text-sm relative flex items-center justify-between cursor-pointer">
      <FaChevronLeft size={20} />
    </div>
  </div>
);

interface ImageProps {
  _id: string;
  image: {
    asset: {
      _ref: string;
    };
  };
}

interface BannerProps {
  images: ImageProps[];
}

const Banner: React.FC<BannerProps> = ({ images }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 5000,
    fade: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <div className="w-full h-auto lg:h-[550px] relative">
      <Slider {...settings} className="flex flex-col">
        {images.map((image, index) => {
          const imageUrl = urlFor(image.image)
            .width(BANNER_WIDTH)
            .height(BANNER_HEIGHT)
            .url();

          return (
            <div className="lg:h-[600px]" key={image._id}>
              <Image
                className="xl:h-[68vh] h-[50vh] w-full object-cover"
                src={imageUrl}
                width={BANNER_WIDTH}
                height={BANNER_HEIGHT}
                priority={index === 0}
                alt="bannerImg"
                data-testid="bannerImg"
              />
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

export default Banner;
