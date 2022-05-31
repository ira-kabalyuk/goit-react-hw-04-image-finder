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
    image: null,
    loading: false,
    error: null,
    page: 1,
    perPage: 12,
    modal: false,
    id: null,
    imageItem: null,
    total: null,
  };

  componentDidUpdate(prevProps, prevState) {
    console.log('update');
    const prevName = prevState.imageName;
    const nextName = this.state.imageName;
    const prevPage = prevState.page;
    const nextPage = this.state.page;
    const perPage = this.state.perPage;

    if (prevName !== nextName || prevPage !== nextPage) {
      this.setState({ loading: true });
      fetch(
        `https://pixabay.com/api/?q=${nextName}&page=${nextPage}&key=25755883-425392836cbaa44f717c19250&image_type=photo&orientation=horizontal&per_page=${perPage}`
      )
        .then(responce => {
          if (responce.ok) {
            return responce.json();
          }
          return Promise.reject(new Error('Error'));
        })
        .then(image => this.setState({ image, total: image.total }))
        .catch(error => this.setState({ error }))
        .finally(() => this.setState({ loading: false }));
    }
  }

  handleFormSubmit = imageName => {
    this.setState(prevState => ({
      imageName: imageName,
      page: (prevState.page = 1),
      perPage: (prevState.perPage = 12),
    }));
  };

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
    this.setState({
      modal: false,
    });
  };

  getlargeImageUrl = () => {
    const url = this.state.imageItem;
    return url.largeImageURL;
  };

  render() {
    const { error, modal, loading, imageName, total, perPage } = this.state;
    return (
      <>
        {error && alert(error.message)}
        <Searchbar onSubmit={this.handleFormSubmit} />
        <Container>
          {loading && <Loader />}
          <ImageGallery
            imageName={this.state.imageName}
            image={this.state.image}
            isOpenModal={this.openModalHandler}
          />
          {perPage < total && (
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
