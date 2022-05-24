import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { RotatingLines } from 'react-loader-spinner';
import { ImageGalleryItem } from '../ImageGalleryItem';
import { Button } from '../Button';
import { Modal } from '../Modal';

import styles from './ImageGallery.module.scss';

class ImageGallery extends Component {
  state = {
    image: null,
    loading: false,
    error: null,
    page: 1,
    perPage: 12,
    modal: false,
    id: null,
    imageItem: null,
  };

  componentDidUpdate(prevProps, prevState) {
    const prevName = prevProps.imageName;
    const nextName = this.props.imageName;
    let prevPage = prevState.page;
    let nextPage = this.state.page;
    let perPage = this.state.perPage;

    if (prevName !== nextName) {
      prevPage = 1;
      nextPage = 1;
      perPage = 12;
    }

    if (prevName !== nextName || prevPage !== nextPage) {
      this.setState({ loading: true });
      fetch(
        `https://pixabay.com/api/?q=${nextName}&page=${nextPage}&key=25755883-425392836cbaa44f717c19250&image_type=photo&orientation=horizontal&per_page=${perPage}`
      )
        .then(res => res.json())
        .then(image => this.setState({ image }))
        .catch(error => this.setState({ error }))
        .finally(() => this.setState({ loading: false }));
    }
  }

  loadMoreHandler = () => {
    this.setState(prevState => ({
      page: (prevState.page += 1),
      perPage: (prevState.perPage += 12),
    }));
  };

  openModalHandler = event => {
    const { id } = event.target;
    this.setState(prevState => ({
      modal: true,
      id: +id,
      imageItem: prevState.image.hits.find(image => image.id === +id),
    }));
  };

  closeModalHandler = () => {
    console.log('close');
    this.setState({
      modal: false,
    });
  };

  getlargeImageUrl = () => {
    const url = this.state.imageItem;
    return url.largeImageURL;
  };

  render() {
    const { loading, image, error, modal } = this.state;

    return (
      <>
        {error && alert('error')}
        {loading && (
          <div className={styles.loader}>
            <RotatingLines
              width="50"
              strokeColor="#6495ED"
              strokeWidth="2"
              animationDuration="3"
            />
          </div>
        )}
        <ul className={styles.gallery}>
          {image &&
            image.hits.map(({ id, webformatURL, tags }) => (
              <ImageGalleryItem
                key={id}
                id={id}
                url={webformatURL}
                alt={tags}
                isOpenModal={this.openModalHandler}
              />
            ))}
        </ul>
        {modal && (
          <Modal
            onClose={this.closeModalHandler}
            id={this.state.id}
            url={this.getlargeImageUrl()}
            alt=""
          />
        )}

        {image && (
          <Button onClick={this.loadMoreHandler} text="load more"></Button>
        )}
      </>
    );
  }
}

ImageGallery.propTypes = {
  imageName: PropTypes.string.isRequired,
};

export { ImageGallery };
