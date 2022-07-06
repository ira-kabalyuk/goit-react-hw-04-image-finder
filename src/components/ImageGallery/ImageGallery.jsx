import React from 'react';
import PropTypes from 'prop-types';

import { ImageGalleryItem } from '../ImageGalleryItem';

import styles from './ImageGallery.module.scss';

function ImageGallery({ image, isOpenModal }) {
  return (
    <ul className={styles.gallery}>
      {image &&
        image.map(({ id, webformatURL, tags }) => (
          <ImageGalleryItem
            key={id}
            id={id}
            url={webformatURL}
            alt={tags}
            isOpenModal={isOpenModal}
          />
        ))}
    </ul>
  );
}

ImageGallery.propTypes = {
  isOpenModal: PropTypes.func.isRequired,
  image: PropTypes.array.isRequired,
};

export { ImageGallery };
