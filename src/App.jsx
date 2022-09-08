import './App.css';
import { Routes, Route} from 'react-router-dom';
import { Home } from "./pages";
import {Cards, Instance,Storage} from "./components"

function App() {
  return (
      <Routes>
        <Route exact={true} path='/' element={<Home />}>
          <Route path='/card' element={<Cards />}></Route>
          <Route path='/instance' element={<Instance />}></Route>
          <Route path='/storage' element={<Storage />}></Route>
        </Route>
      </Routes>
  );
}

export default App;
