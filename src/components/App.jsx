import React, { Component } from 'react';

import { Container } from './Container';
import { Searchbar } from './Searchbar';
import { ImageGallery } from './ImageGallery';
import { Button } from './Button';
import { Modal } from './Modal';
import { Loader } from './Loader';

class App extends Component {
  state = {
    imageName: '',
    image: [],
    loading: false,
    error: null,
    page: 1,
    modal: false,
    id: null,
    imageItem: null,
    total: null,
  };

  componentDidUpdate(prevProps, prevState) {
    const prevName = prevState.imageName;
    const nextName = this.state.imageName;
    const prevPage = prevState.page;
    const nextPage = this.state.page;

    if (prevName !== nextName || prevPage !== nextPage) {
      this.setState({ loading: true });
      fetch(
        `https://pixabay.com/api/?q=${nextName}&page=${nextPage}&key=25755883-425392836cbaa44f717c19250&image_type=photo&orientation=horizontal&per_page=12`
      )
        .then(responce => {
          if (responce.ok) {
            return responce.json();
          }
          return Promise.reject(new Error('Error'));
        })
        .then(responce =>
          this.setState(prevState => ({
            image: [...prevState.image, ...responce.hits],
            total: responce.total,
          }))
        )
        .catch(error => this.setState({ error }))
        .finally(() => this.setState({ loading: false }));
    }
  }

  handleFormSubmit = imageName => {
    this.setState({
      imageName: imageName,
      page: 1,
      image: [],
    });
  };

  loadMoreHandler = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  openModalHandler = event => {
    const { id } = event.target;
    this.setState(prevState => ({
      modal: true,
      id: +id,
      imageItem: prevState.image.find(image => image.id === +id),
    }));
  };

  closeModalHandler = () => {
    this.setState({
      modal: false,
    });
  };

  getlargeImageUrl = () => {
    const url = this.state.imageItem;
    return url.largeImageURL;
  };

  render() {
    const { error, modal, loading, imageName, total, image } = this.state;
    const imageLength = image.length;
    return (
      <>
        {error && alert(error.message)}
        <Searchbar onSubmit={this.handleFormSubmit} />
        <Container>
          <ImageGallery
            imageName={this.state.imageName}
            image={this.state.image}
            isOpenModal={this.openModalHandler}
          />
          {!imageLength < total && loading && <Loader />}
          {imageLength < total && !loading && (
            <Button onClick={this.loadMoreHandler} text="load more"></Button>
          )}
          {modal && (
            <Modal
              onClose={this.closeModalHandler}
              id={this.state.id}
              url={this.getlargeImageUrl()}
              alt={imageName}
            />
          )}
        </Container>
      </>
    );
  }
}

export { App };
