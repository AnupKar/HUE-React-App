import { useState, useContext } from 'react';
import { HvcContext } from '../../context';

import styles from './Card.module.css';

export const Card = ({ image }) => {
  const [selected, setSelected] = useState(false);
  const [selectedBit, setSelectedBit] = useState(null);
  const { region, handleSetImages } = useContext(HvcContext);

  const handleSelection = () => {
    setSelected(prev => !prev);

    // handle select
    const selectImgBit = {
      id: image.id,
      name: image.name,
      bit: selectedBit || image.bit[0]
    }
    handleSetImages(selectImgBit);
  };

  const changeBit = (bit) => {
    // if(selected) {
    //   const res = window.confirm('Are you sure you want to change the Bit?');
    //   console.log("res", res)
    //   if(res === true) {
        setSelectedBit(bit);
        setSelected(prev => !prev);
      // }
    // }
  }

  return (
    <div className={styles.card}>
      <div className={styles.leftSide}>
        {/* image */}
        <div className={styles.image} />

        {/* title and description */}
        <div className={styles.details}>
          <p>
            {image.name} {region && ` - ${region}`}
          </p>
          <p>{image.description}</p>
        </div>
      </div>

      <div className={styles.selection}>
        <div>
          {image.bit.length > 1 ? (
            image.bit.map((each, index) => {
              return (
                <div key={each.id}>
                  <input
                    type="radio"
                    id={`${each.name}_${image.id + each.id}`}
                    name={`bit_${image.id}`}
                    value={each.name}
                    defaultChecked={index === 0}
                    onChange={(_) => changeBit(each)}
                  />
                  <label htmlFor={`${each.name}_${image.id + each.id}`}>{each.name}</label>
                </div>
              );
            })
          ) : (
            <p>{image.bit[0].name}</p>
          )}
        </div>
        <div
          className={`${styles.btn} ${!selected ? styles.selectBtn : styles.alreadySelected}`}
          onClick={handleSelection}
        >
          <p>{!selected ? 'Select' : 'Selected'}</p>
        </div>
      </div>
    </div>
  );
};
