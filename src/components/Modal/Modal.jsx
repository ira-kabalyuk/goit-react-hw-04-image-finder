import { createPortal } from 'react-dom';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './Modal.module.scss';
import { GrClose } from 'react-icons/gr';

const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = event => {
    if (event.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleBackDropClick = event => {
    if (event.target === event.currentTarget) {
      this.props.onClose();
    }
  };

  render() {
    const { url, alt, onClose, id } = this.props;

    return createPortal(
      <div
        className={styles.overlay}
        id={id}
        onClick={this.handleBackDropClick}
      >
        <div className={styles.modal}>
          <button type="button" onClick={onClose} className={styles.close}>
            <GrClose className={styles.icon} />
          </button>
          <img src={url} alt={alt} />
        </div>
      </div>,
      modalRoot
    );
  }
}

Modal.propTypes = {
  url: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
};

export { Modal };
