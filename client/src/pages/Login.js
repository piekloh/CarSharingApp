import React, {useState, useContext} from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {AuthContext} from '../helpers/AuthContext';


function Login() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  let navigate = useNavigate();
  const {setAuthState} = useContext(AuthContext);


  const login = () => {
    const data = {username: username, password: password}

    axios.post('http://localhost:3001/auth/login', data).then((response)=>{
      if(response.data.error) alert(response.data.error);
      else{
        localStorage.setItem("accessToken", response.data.token);
        setAuthState({
          username: response.data.username,
          id: response.data.id,
          status: true,
        })
        navigate('/');
      }
    })
  }

  return (
    <div>Zaloguj się: 
      <input type='text' onChange={(event)=>{
        setUsername(event.target.value)
      }} placeholder='Nazwa użytkownika'></input>
      <input type='password' onChange={(event)=>{
        setPassword(event.target.value)
      }} placeholder='Hasło'></input>
      <button onClick={login}>Zaloguj</button>
    </div>
  )
}

export default Login