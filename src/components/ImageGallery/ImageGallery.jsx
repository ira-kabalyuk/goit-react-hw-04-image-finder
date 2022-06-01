import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { ImageGalleryItem } from '../ImageGalleryItem';

import styles from './ImageGallery.module.scss';

class ImageGallery extends Component {
  render() {
    const { image, isOpenModal } = this.props;

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
}

ImageGallery.propTypes = {
  isOpenModal: PropTypes.func.isRequired,
  image: PropTypes.array.isRequired,
};

export { ImageGallery };
