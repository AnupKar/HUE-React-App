import { useContext } from 'react';

import styles from './Navbar.module.css';
import { options } from './data';
import { HvcContext } from '../../context';
import { NavLink } from 'react-router-dom';
 
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
            <NavLink to={option.link} className={styles.Navlink_style}>
              <p className={option.id === navId ? styles.selectedText : ''}>
                {option.id}. {option.name}
              </p>
            </NavLink>
            
          </div>
        );
      })}
    </div>
  );
};
