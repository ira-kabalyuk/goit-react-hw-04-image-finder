import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import styles from './Modal.module.scss';
import { GrClose } from 'react-icons/gr';

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ url, alt, onClose, id }) => {
  return createPortal(
    <div className={styles.overlay} id={id}>
      <div className={styles.modal}>
        <button type="button" onClick={onClose} className={styles.close}>
          <GrClose className={styles.icon} />
        </button>
        <img src={url} alt={alt} />
      </div>
    </div>,
    modalRoot
  );
};

Modal.propTypes = {
  url: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
};

export { Modal };
