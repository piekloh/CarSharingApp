import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


function Login() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  let navigate = useNavigate();


  const login = () => {
    const data = {username: username, password: password}

    axios.post('http://localhost:3001/auth/login', data).then((response)=>{
      console.log(response.data)
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