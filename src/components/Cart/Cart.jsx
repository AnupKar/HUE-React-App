import { useContext } from 'react';

import styles from './Cart.module.css';
import { HvcContext } from '../../context';

const calculatePrice = (images) => {
  let total = 0;
  images.forEach((image) => {
    total += parseInt(image.bit.price, 10);
  });
  return total;
}

export const Cart = () => {
  const { images } = useContext(HvcContext);

  return (
    <div className={styles.cartContainer}>
      <h3>Cost Estimates</h3>

      <div className={styles.items}>
        {images.length > 0 &&
          images.map((image) => {
            return (
              <div className={styles.item} key={image.id}>
                <p>{image.name} - {image.bit.name} </p>
                <p>{image.bit.price}</p>
              </div>
            );
          })}
      </div>

      <div className={styles.total}>
        <hr />
        {images.length > 0 && (
          <p>
            $ {calculatePrice(images)} <span>/</span> mo
          </p>
        )}
      </div>
    </div>
  );
};
