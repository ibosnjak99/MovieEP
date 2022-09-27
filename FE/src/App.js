import './App.css';
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
        <h2>Movies</h2>
        <br/>
        <Routes>
          <Route path='/' element={<Login />}/>
          <Route path='/register' element={<Register />}/>
          <Route path='/administration' element={<Administration />}/>
          <Route path='/movies' element={<Movies />}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
