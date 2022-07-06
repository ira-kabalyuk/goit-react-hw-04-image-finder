import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { BiSearch } from 'react-icons/bi';
import { Container } from '../Container';
import styles from './Searchbar.module.scss';

function Searchbar({ onSubmit }) {
  const [imageName, setImageName] = useState('');

  const handleNameChange = event => {
    setImageName(event.currentTarget.value.toLowerCase());
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (imageName.trim() === '') {
      alert('Enter image name');
      return;
    }

    onSubmit(imageName); //ссылка на проп onSubmit из App
  };

  return (
    <header className={styles.searchbar}>
      <Container>
        <form className={styles.form} onSubmit={handleSubmit}>
          <button type="submit" className={styles.button}>
            <BiSearch className={styles.icon} />
          </button>
          <input
            className={styles.input}
            type="text"
            placeholder="Search images and photos"
            value={imageName}
            onChange={handleNameChange}
          />
        </form>
      </Container>
    </header>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export { Searchbar };
