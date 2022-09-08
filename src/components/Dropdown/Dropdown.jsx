import { useState, useContext, useEffect } from 'react';

import styles from './Dropdown.module.css';
import { ReactComponent as DropDownIcon } from '../../asset/dropdown.svg';

export const Dropdown = ({placeholder, data, onSelect}) => {
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
    <div className={styles.dropdown}>
      <div onClick={toggleDrop}>
        <p>{selectedIdx === null ? placeholder : data[selectedIdx].name}</p>
        <DropDownIcon />
      </div>

      {showDrop && (
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
