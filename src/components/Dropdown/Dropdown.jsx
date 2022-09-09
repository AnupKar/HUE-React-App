import { useState, useContext, useEffect } from 'react';

import styles from './Dropdown.module.css';
import { ReactComponent as DropDownIcon } from '../../asset/dropdown.svg';

export const Dropdown = ({placeholder, data, onSelect, height, width, isDefault = null}) => {
  const [showDrop, setDrop] = useState(false);
  const [selectedIdx, setIndex] = useState(null);
  const toggleDrop = () => {
    setDrop((prev) => !prev);
  };

  const handleSelection = (index) => {
    setIndex(index);
    onSelect(index);
    toggleDrop();
  };

  useEffect(() => {
    setIndex(null);
  }, [data]); 

  return (
    <div className={styles.dropdown} >
      <div style={(width && height) && {width:width,height:height}} onClick={toggleDrop}>
        <p>{isDefault ? isDefault : selectedIdx === null ? placeholder : data[selectedIdx].name}</p>
        <DropDownIcon />
      </div>

      {!isDefault && showDrop && (
        <div className={styles.menuItems}>
          {data.map((each, index) => {
            return (
              <p key={each.id} onClick={() => handleSelection(index)}>
                {each.name}
              </p>
            );
          })}
        </div>
      )}
    </div>
  );
};
