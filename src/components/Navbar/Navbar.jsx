import { useContext } from 'react';

import styles from './Navbar.module.css';
import { options } from './data';
import { HvcContext } from '../../context';

export const Navbar = () => {
  const { handleNavChange, navId } = useContext(HvcContext);

  return (
    <div className={styles.Navbar_main}>
      {options.map((option) => {
        return (
          <div
            key={option.id}
            onClick={() => handleNavChange(option.id)}
            className={option.id === navId ? styles.selected : ''}
          >
            <p>
              {option.id}. {option.name}
            </p>
          </div>
        );
      })}
    </div>
  );
};
