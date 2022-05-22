import React, { Component } from 'react';

import { Container } from './Container';
import { Searchbar } from './Searchbar';
import { ImageGallery } from './ImageGallery';
class App extends Component {
  state = {
    imageName: '',
  };

  handleFormSubmit = imageName => {
    this.setState({ imageName });
  };

  render() {
    return (
      <>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <Container>
          <ImageGallery imageName={this.state.imageName} />
        </Container>
      </>
    );
  }
}

export { App };
