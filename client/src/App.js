import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./pages/Home";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import CreateCar from "./pages/CreateCar";
import Car from "./pages/Car";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import { AuthContext } from "./helpers/AuthContext";


function App() {
  const [authState, setAuthState] = useState({
    username: "",
    id: 0,
    status: false,
  });

  useEffect(() => {
    axios
      .get("http://localhost:3001/auth/auth", {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        if (response.data.error) setAuthState({ ...authState, status: false });
        else
          setAuthState({
            username: response.data.username,
            id: response.data.id,
            status: true,
          });
      });
  }, []);

  var imageBasePath =
    window.location.protocol + "//" + window.location.host + "/images/";
  //Eliminuje problem niewyświetlania się logo na podstronach po odświeżeniu

  const logout = () => {
    localStorage.removeItem("accessToken");
    setAuthState({
      username: "",
      id: 0,
      status: false,
    });

  };

  return (
    <div className="App">
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <Router>
          <nav className="navbar navbar-light navbar-expand-lg sticky-top pt-2 pb-0 ps-3 pe-3 mb-3 customNavBg">
            <Link to="/" className="navbar-brand">
              <img src={imageBasePath + "carsharinglogo.png"} />
            </Link>

            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarNavDropdown"
              aria-controls="navbarNavDropdown"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavDropdown">
              <ul className="navbar-nav">
                <li className="nav-item active">
                  <Link to="/" className="nav-link" href="#">
                    Strona główna <span className="sr-only"></span>
                  </Link>
                </li>
              </ul>
              <form className="form-inline ms-auto ">
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <input
                      className="form-control"
                      type="search"
                      placeholder="Wyszukaj na stronie..."
                      aria-label="Wyszukaj"
                    />
                  </li>
                  <li className="nav-item">
                    <button className="btn mx-2" type="submit">
                      Szukaj
                    </button>
                  </li>
                  {!authState.status ? (
                    <>
                      <li className="nav-item active">
                        <Link to="/login" className="nav-link" href="#">
                          <LoginIcon/> Logowanie <span className="sr-only"></span>
                        </Link>
                      </li>
                      <li className="nav-item active">
                        <Link to="/registration" className="nav-link" href="#">
                          <PersonAddAltIcon/> Rejestracja <span className="sr-only"></span>
                        </Link>
                      </li>
                    </>
                  ) : (
                    <>
                      <li className="nav-item active">
                        <Link to='/' className="nav-link" onClick={logout}> 
                          <LogoutIcon/> Wyloguj
                        </Link>
                      </li>
                      <li className="nav-item mx-2 loggedAsStatus">
                        Jesteś zalogowany jako:
                        <div className="loggedAsUser">
                          <b>{authState.username}</b>
                        </div>
                      </li>
                    </>
                  )}
                </ul>
              </form>
            </div>
          </nav>

          {authState.username === "admin" && (
            <Link to="/createcar" title="Dodaj nowy samochód">
              <AddCircleIcon
                sx={{
                  fontSize: 60,
                  color: "rgb(143, 143, 143)",
                  "&:hover": { color: "rgb(110, 110, 110)" },
                  position: "fixed",
                  right: 40,
                  bottom: 40,
                }}
              />
            </Link>
          )}

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/createcar" element={<CreateCar />} />
            <Route path="/car/:id" element={<Car />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registration" element={<Registration />} />
          </Routes>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
