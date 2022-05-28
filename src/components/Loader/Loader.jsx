import { RotatingLines } from 'react-loader-spinner';
import styles from './Loader.module.scss';

const Loader = () => {
  return (
    <div className={styles.loader}>
      <RotatingLines
        width="50"
        strokeColor="#6495ED"
        strokeWidth="2"
        animationDuration="3"
      />
    </div>
  );
};

export { Loader };
