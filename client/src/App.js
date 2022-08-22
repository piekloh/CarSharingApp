import './App.css';
import axios from "axios";
import {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom'
import Home from './pages/Home';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CreateCar from './pages/CreateCar';


function App() {

  return (
    <div className='App'>
        <Router>
          <Link to='/createcar' title='Dodaj nowy samochód'><AddCircleIcon sx={{
          fontSize: 60,
          color: 'rgba(31, 31, 31, 0.4)',
          '&:hover': {color: 'rgba(8, 8, 8, 0.4)'},
          position: 'fixed',
          right: 40,
          bottom: 40
          }}/></Link>
          <Link to='/'>Strona główna</Link>
          

          
          <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/createcar' element={<CreateCar/>} />
          </Routes>
        </Router>
    </div>
  );
}

export default App;
