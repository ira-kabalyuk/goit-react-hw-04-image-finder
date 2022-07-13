import { createPortal } from 'react-dom';
import { useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './Modal.module.scss';
import { GrClose } from 'react-icons/gr';

const modalRoot = document.querySelector('#modal-root');

function Modal({ url, alt, onClose }) {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });

  const handleKeyDown = event => {
    if (event.code === 'Escape') {
      onClose();
    }
  };

  const handleBackDropClick = event => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <div className={styles.overlay} onClick={handleBackDropClick}>
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

Modal.propTypes = {
  url: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export { Modal };
