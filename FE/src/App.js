import './App.css';
import { Home } from './Home';
import { Movies } from './Movies';
import { Administration } from './Administration';
import { Login } from './Login';
import { Register } from './Register';
import { BrowserRouter, Route, Routes, NavLink } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <br/>
        <h3>Movies</h3>
        <br/>
        <nav className='navbar navbar-expand-sm bg-light navbar-dark'>
          <ul className='navbar-nav'>
            <li className='nav-item- m-1'>
              <NavLink className='btn btn-light btn-outline-primary' to='/home'>
                Home
              </NavLink>
            </li>
            <li className='nav-item- m-1'>
              <NavLink className='btn btn-light btn-outline-primary' to='/administration'>
                Administration
              </NavLink>
            </li>
            <li className='nav-item- m-1'>
              <NavLink className='btn btn-light btn-outline-primary' to='/movies'>
                Movies
              </NavLink>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path='/home' element={<Home />}/>
          <Route path='/login' element={<Login />}/>
          <Route path='/register' element={<Register />}/>
          <Route path='/administration' element={<Administration />}/>
          <Route path='/movies' element={<Movies />}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
