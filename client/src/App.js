import './App.css';
import axios from "axios";
import {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom'
import Home from './pages/Home';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CreateCar from './pages/CreateCar';
import Car from './pages/Car';

function App() {

  return (
    <div className='App'>
    <Router>
      <nav className="navbar navbar-light navbar-expand-lg sticky-top pt-2 pb-0 ps-3 customNavBg">
        <Link to='/' className="navbar-brand"><img src='Images\carsharinglogo.png'/>
          {/* Obrazek nie działa na podstronach po odświeżeniu */}</Link>
        
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Features</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Pricing</a>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Dropdown link
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                <a className="dropdown-item" href="#">Action</a>
                <a className="dropdown-item" href="#">Another action</a>
                <a className="dropdown-item" href="#">Something else here</a>
              </div>
            </li>
            <li>
              <form className="form-inline">
                <p><input className="form-control mr-sm-2" type="search" placeholder="Szukaj..." aria-label="Search"/></p>  
                <p><button className="btn btn-outline-success my-2 my-sm-0" type="submit">Szukaj</button></p>
              </form>
            </li>
          </ul>
        </div>
      </nav>


      
        <Link to='/createcar' title='Dodaj nowy samochód'><AddCircleIcon sx={{
        fontSize: 60,
        color: 'rgb(143, 143, 143)',
        '&:hover': {color: 'rgb(110, 110, 110)'},
        position: 'fixed',
        right: 40,
        bottom: 40
        }}/></Link>
        
          
        
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/createcar' element={<CreateCar/>} />
          <Route path='/car/:id' element={<Car/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
