import { useEffect, useContext } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Home } from './pages';
import { Cards, Instance, Security, Storage, Review } from './components';
import { useLocation, useNavigate } from 'react-router-dom';
import { HvcContext } from './context';

const routes = [
  { path: '/card', component: <Cards /> },
  { path: '/instance', component: <Instance /> },
  { path: '/storage', component: <Storage /> },
  { path: '/security', component: <Security /> },
  { path: '/review', component: <Review /> },
];

function App() {
  const location = useLocation();
  const navigation = useNavigate();
  const { handleNavChange } = useContext(HvcContext);

  useEffect(() => {
    const pathName = location.pathname;
    if(pathName === '/') {
      navigation('/card');
    }
    const indx = routes.findIndex((each) => each.path === pathName);
    handleNavChange(indx + 1);
  }, [location.pathname]);

  return (
    <Routes>
      <Route exact={true} path="/" element={<Home />}>
        {routes.map((each) => {
          return <Route key={each.path} path={each.path} element={each.component} />;
        })}
      </Route>
    </Routes>
  );
}

export default App;
