import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BiSearch } from 'react-icons/bi';
import { Container } from '../Container';
import styles from './Searchbar.module.scss';

class Searchbar extends Component {
  state = {
    imageName: '',
  };

  handleNameChange = event => {
    this.setState({ imageName: event.currentTarget.value.toLowerCase() });
  };

  handleSubmit = event => {
    event.preventDefault();

    if (this.state.imageName.trim() === '') {
      alert('Enter image name');
      return;
    }

    this.props.onSubmit(this.state.imageName); //ссылка на проп onSubmit из App
  };

  render() {
    return (
      <header className={styles.searchbar}>
        <Container>
          <form className={styles.form} onSubmit={this.handleSubmit}>
            <button type="submit" className={styles.button}>
              <BiSearch className={styles.icon} />
            </button>

            <input
              className={styles.input}
              type="text"
              placeholder="Search images and photos"
              value={this.state.imageName}
              onChange={this.handleNameChange}
            />
          </form>
        </Container>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export { Searchbar };
