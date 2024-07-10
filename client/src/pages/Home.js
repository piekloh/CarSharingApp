import React from "react";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";
import CarBrands from "../helpers/CarBrands";

function Home() {
  const [listOfCars, setListOfCars] = useState([]);
  let navigate = useNavigate();
  const { searchTerm } = useContext(AuthContext);
  const [brandFilterValue, setBrandFilterValue] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/cars").then((response) => {
      setListOfCars(response.data);
    });
  }, []);

  return (
    <div className="App">
      <div className="container">
        <div className="filterBar ">
          <div className="filter results">
            <b>Filtruj wyniki:</b>
          </div>
          <div className="inputField mt-0 ms-0 ps-0 pb-0">
            <div className="mb-2">Marka samochodu: </div>
            <select
              id="brandSelector"
              className="inputCreateCar"
              name="brand"
              onChange={(event) => {
                setBrandFilterValue(event.target.value);
              }}
            >
              <option value="">-</option>
              <CarBrands />
            </select>
          </div>

          <div style={{ clear: "both" }}></div>
          <button
            className="btn"
            onClick={() => {
              setBrandFilterValue("");
              document.querySelector("#brandSelector").value = "";
            }}
          >
            Wyczyść filtry
          </button>
        </div>
        <div className="row" id="carsContainer">
          {/* eslint-disable-next-line array-callback-return */}
          {listOfCars.map((value, key) => {
            if (
              (brandFilterValue === "" &&
                (searchTerm === "" ||
                  (value.brand + " " + value.model)
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()))) ||
              (searchTerm === "" && brandFilterValue === value.brand)
            ) {
              return (
                <div
                  className="car col-8"
                  key={key}
                  onClick={() => {
                    navigate(`/car/${value.id}`);
                  }}
                >
                  <div className="brand">
                    <h2>{value.brand}</h2>
                  </div>
                  <div className="model">
                    <h4>
                      <i>{value.model}</i>
                    </h4>
                  </div>
                  <div className="infoWithPhoto">
                    <div className="moreInfoKeys">
                      <p>Liczba miejsc: </p>
                      <p>Liczba drwi: </p>
                      <p>Skrzynia biegów: </p>
                      <p>Rozmiar: </p>
                      <div className="price">Cena za dobę w zł: </div>
                    </div>
                    <div className="moreInfoValues">
                      <p>{value.passengers}</p>
                      <p>{value.doors}</p>
                      <p>{value.gearbox}</p>
                      <p>{value.size}</p>
                      <p>{value.price}</p>
                    </div>
                    {value.image && (
                      // eslint-disable-next-line jsx-a11y/alt-text
                      <img
                        className="img-thumbnail"
                        src={value.image
                          .replace("..\\client\\public\\", "")
                          .replace("\\", "/")}
                      />
                    )}
                  </div>
                  <div className="availability">
                    {value.available ? (
                      <h2 style={{ color: "green" }}>Dostępny</h2>
                    ) : (
                      <h2 style={{ color: "red" }}>Niedostępny</h2>
                    )}
                  </div>
                </div>
              );
            }
          })}
        </div>
      </div>
    </div>
  );
}

export default Home;
