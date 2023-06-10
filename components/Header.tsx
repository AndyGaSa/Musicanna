import Image from 'next/image';
import Link from 'next/link';
import logoDark from '../public/images/logoDark.png';

const Header = () => {
  return (
    <div className="w-full h-20 border-b-[1px] border-b-black font-titleFont sticky top-0 bg-white z-50 px-4">
      <div className="max-w-7xl h-full mx-auto flex justify-between items-center">
        <Link href="/">
          <div>
            <Image width={80} height={80} src={logoDark} alt="logoDark" />
          </div>
        </Link>
        <div>
          <ul className="hidden lg:inline-flex gap-8 uppercase text-sm font-semibold">
            <li className="headerLi">
              <Link href="/">Inici</Link>
            </li>
            <li className="headerLi">
              {' '}
              <Link key="songs" href={`/categories/cancons`}>
                Cançons
              </Link>
            </li>

            <li className="headerLi">Contes</li>
            <li className="headerLi">Comptacontes</li>
            <li className="headerLi">
              <Link key="songs" href={`/contact`}>
                Contacte
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex items-center gap-8 text-lg">
          <div className="flex items-center gap-1">
            <Image
              className="w-8 h-8 rounded-full"
              src="https://yt3.googleusercontent.com/ytc/AGIKgqNU9jdoeaLwTLLXS6sJlHtddo9mbH8DL-80VWtC1A=s900-c-k-c0x00ffffff-no-rj"
              alt="logo"
              width={30}
              height={30}
            />
            <p className="text-sm font-medium">Benvingut!</p>
          </div>

          <button className="uppercase text-sm border-[1px] border-primaryColor hover:border-secondaryColor px-4 py-1 font-semibold hover:text-white rounded-md hover:bg-secondaryColor transition-all duration-300 active:bg-yellow-600">
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
