import { useContext } from 'react';

import styles from './Cart.module.css';
import { HvcContext } from '../../context';

const calculatePrice = (images) => {
  let total = 0;
  images.forEach((image) => {
    total += Number(image.bit.price);
  });
  return (Math.round(total * 100) / 100).toFixed(2);
}

export const Cart = () => {
  const { images } = useContext(HvcContext);

  return (
    <div className={styles.cartContainer}>
      <h3>Cost Estimates</h3>

      <div className={styles.items}>
        {images.length > 0 &&
          images.map((image, index) => {
            return (
              <div className={styles.item} key={index}>
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
