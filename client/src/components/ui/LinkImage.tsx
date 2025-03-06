import '../../styles/LinkImage.css';

type LinkImageProps = {
  src: string;
  alt: string;
  url: string;
  width?: string | number;
  height?: string | number;
};

const LinkImage: React.FC<LinkImageProps> = ({
  src,
  alt,
  url,
  width,
  height,
}) => {
  return (
    <a href={url} target="_blank" rel="noopener noreferrer">
      <img
        className="link-image"
        src={src}
        alt={alt}
        width={width}
        height={height}
      />
    </a>
  );
};

export default LinkImage;
