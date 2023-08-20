interface HeadingProps {
  children?: React.ReactNode;
  [key: string]: any;
}

interface ListItemProps {
  children: React.ReactNode;
}

interface LinkProps {
  href: string;
  children: React.ReactNode;
}

interface InlineAudioProps {
  asset: {
    _ref: string;
  };
}

export const SANITY_DATASET =
  process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
export const SANITY_PROJECT_ID =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'u8imjmtp';

const serializers = {
  h1: ({ children }: HeadingProps) => (
    <h1 className="text-3xl font-bold my-5 font-titleFont">{children}</h1>
  ),
  h2: ({ children }: HeadingProps) => (
    <h2 className="font-titleFont font-medium text-[24px] text-primary my-3">
      {children}
    </h2>
  ),
  h3: ({ children }: HeadingProps) => (
    <h3 className="font-titleFont font-medium text-[20px] text-primary my-3">
      {children}
    </h3>
  ),
  normal: ({ children }: HeadingProps) => <p className="my-4">{children}</p>,
  li: ({ children }: ListItemProps) => (
    <li className="ml-4 list-disc">{children}</li>
  ),
  link: ({ href, children }: LinkProps) => (
    <a href={href} className="text-cyan-500 hover:underline">
      {children}
    </a>
  ),
  inlineAudio: ({ asset: { _ref } }: InlineAudioProps) => {
    const [_file, id, extension] = _ref.split('-');
    const audioUrl = `https://cdn.sanity.io/files/${SANITY_PROJECT_ID}/${SANITY_DATASET}/${id}.${extension}`;

    return (
      <audio controls className="block w-full max-w-md mx-auto mt-10">
        <source src={audioUrl} type="audio/mpeg" />
      </audio>
    );
  },
};

export default serializers;
