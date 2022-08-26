import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

function Home() {
  const [listOfCars, setListOfCars] = useState([]);
  let navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:3001/cars").then((response) => {
      setListOfCars(response.data);
    });
  }, []);

  return (
    <div className="App">
      <div className="container">
        <div className="row">
          {listOfCars.map((value, key) => {
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
                    <img className="img-thumbnail"
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
          })}
        </div>
      </div>
    </div>
  );
}

export default Home;
