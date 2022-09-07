import { useState, useContext } from 'react';
import { HvcContext } from '../../context';

import styles from './Dropdown.module.css';
import { ReactComponent as DropDown } from '../../asset/dropdown.svg';
import { options } from './data';

export const Dropdown = () => {
  const [showDrop, setDrop] = useState(false);
  const [selectedIdx, setIndex] = useState(null);
  const { handleSelectRegion } = useContext(HvcContext);

  const toggleDrop = () => {
    setDrop((prev) => !prev);
  };

  const handleSelection = (index) => {
    setIndex(index);
    handleSelectRegion(options[index].name);
    toggleDrop();
  };

  return (
    <div className={styles.dropdown}>
      <div onClick={toggleDrop}>
        <p>{selectedIdx === null ? 'Region' : options[selectedIdx].name}</p>
        <DropDown />
      </div>

      {showDrop && (
        <div className={styles.menuItems}>
          {options.map((each, index) => {
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
