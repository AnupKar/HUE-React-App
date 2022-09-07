import { useContext } from 'react';

import { Header, Navbar, Dropdown, Cards, Cart } from '../components';
import classes from './Home.module.css';
import { options } from '../components/Navbar/data';
import { HvcContext } from '../context';

export const Home = () => {
  const { navId } = useContext(HvcContext);

  return (
    <div>
      <Header />

      {/* main div */}
      <div className={classes.mainContainer}>
        {/* left div */}
        <div className={classes.leftContainer}>
          {/* current Tab & Region */}
          <div className={classes.bottomHeader}>
            {/* current Tab */}
            <div className={classes.currentTab}>
              <p>{options[navId - 1].name}</p>
            </div>
            {/* Region */}
            <Dropdown />
          </div>

          {/* nav bar */}
          <div className={classes.navBar}>
            <Navbar />
          </div>

          {/* content */}
          <div className={classes.mainContent}>
            <Cards />
          </div>
        </div>

        {/* right div */}
        <div className={classes.rightContainer}>
          {/* estime total cost */}
          <Cart />
        </div>
      </div>
    </div>
  );
};
