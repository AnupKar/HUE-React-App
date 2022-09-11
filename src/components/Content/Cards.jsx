import { Card } from './Card';

import styles from './Card.module.css';
import { images } from '../../data/data';

export const Cards = () => {
  return (
    <div className={styles.cards}>
      {images.map((image) => {
        return <Card key={image.id} image={image} />;
      })}
    </div>
  );
};
