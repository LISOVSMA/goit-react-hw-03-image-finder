import PropTypes from 'prop-types';
import { GalleryItem, Image } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ imgSrc, alt, imgModal }) => {
  return (
    <GalleryItem>
      <Image src={imgSrc} alt={alt} data-src={imgModal} />
    </GalleryItem>
  );
};

ImageGalleryItem.propTypes = {
  imgSrc: PropTypes.string.isRequired,
  alt: PropTypes.string,
  imgModal: PropTypes.string.isRequired,
};
