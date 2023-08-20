import Link from 'next/link';
import { PostsProps } from '../typings';
import Image from 'next/image';
import { urlFor } from '../sanity';

const IMAGE_WIDTH_HEIGHT = 500;

const Posts: React.FC<PostsProps> = ({ posts }) => (
  <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 py-6">
    {posts.map((post, index) => (
      <Link key={post._id} href={`/post/${post.slug.current}`}>
        <div className="border-[1px] border-secondaryColor border-opacity-40 h-[450px] group">
          <div className="h-4/6 w-full overflow-hidden">
            <Image
              width={IMAGE_WIDTH_HEIGHT}
              height={IMAGE_WIDTH_HEIGHT}
              src={
                urlFor(post.mainImage)
                  ?.width(IMAGE_WIDTH_HEIGHT)
                  .height(IMAGE_WIDTH_HEIGHT)
                  .url()!
              }
              alt={post.title}
              priority={index <= 2}
              className="w-full h-full object-cover brightness-75 group-hover:brightness-100 duration-300 group-hover:scale-110"
            />
          </div>
          <div className="h-2/6 w-full flex flex-col justify-center">
            <div className="flex justify-between items-center px-4 py-1 border-b-[1px] border-b-gray-500">
              <p>{post.title}</p>
            </div>
            <p className="py-2 px-4 text-base">
              {post.description?.substring(0, 60)}... by -{' '}
              <span className="font-semibold">{post.author?.name}</span>
            </p>
          </div>
        </div>
      </Link>
    ))}
  </div>
);

export default Posts;
