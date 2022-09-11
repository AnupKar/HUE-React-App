import { useContext } from 'react';

import { Header, Navbar, Dropdown, Cards, Cart, Instance } from '../components';
import classes from './Home.module.css';
import { options } from '../components/Navbar/data';
import { options as RegionOptions } from '../components/Dropdown/data';
import { HvcContext } from '../context';
import { Outlet } from 'react-router-dom';

export const Home = () => {
  const { navId, handleSelectRegion } = useContext(HvcContext);

  const handleRegionSelect = (index) => {
    handleSelectRegion(RegionOptions[index].name);
  } 

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
            <Dropdown placeholder="Region" data={RegionOptions} onSelect={handleRegionSelect} />
          </div>

          {/* nav bar */}
          <div className={classes.navBar}>
            <Navbar />
          </div>

          {/* content */}
          <div className={classes.mainContent}>
            <Outlet />
           {/*  <Cards /> */ } 
            {/* <Instance />  */} 
            
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
