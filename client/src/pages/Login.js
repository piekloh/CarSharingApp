import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../helpers/AuthContext";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  let navigate = useNavigate();
  const { setAuthState } = useContext(AuthContext);
  const { setProfilePath } = useContext(AuthContext);

  const login = () => {
    const data = { username: username, password: password };

    axios.post("http://localhost:3001/auth/login", data).then((response) => {
      if (response.data.error) alert(response.data.error);
      else {
        localStorage.setItem("accessToken", response.data.token);
        setAuthState({
          username: response.data.username,
          id: response.data.id,
          status: true,
        });
        const path = "/profile/" + JSON.stringify(response.data.id);
        setProfilePath({ path }); //works while logging but not immediately
        navigate("/");
      }
    });
  };

  return (
    <div className="loginContainer">
      <div className="loginTitle">Zaloguj się</div>
      <div className="loginInputs">
        <input
          id="username"
          type="text"
          onChange={(event) => {
            setUsername(event.target.value);
          }}
          onKeyPress={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              document.querySelector("#login").click();
            }
          }}
          placeholder="Nazwa użytkownika"
        ></input>
        <input
          id="password"
          type="password"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
          onKeyPress={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              document.querySelector("#login").click();
            }
          }}
          placeholder="Hasło"
        ></input>
        <div className="loginButton">
          <button id="login" onClick={login}>
            Zaloguj
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
