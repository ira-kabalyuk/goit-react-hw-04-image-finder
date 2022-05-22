import PropTypes from 'prop-types';
import styles from './ImageGalleryItem.module.scss';

const ImageGalleryItem = ({ url, alt, isOpenModal, id }) => {
  return (
    <li className={styles.item} onClick={isOpenModal}>
      <img className={styles.image} src={url} alt={alt} id={id} />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  url: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  alt: PropTypes.string.isRequired,
  isOpenModal: PropTypes.func.isRequired,
};

export { ImageGalleryItem };
