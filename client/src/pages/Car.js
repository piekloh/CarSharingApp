import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../helpers/AuthContext";
import MaterialUIPickers from "../helpers/MaterialUIPickers";

function Car() {
  let { id } = useParams();
  let navigate = useNavigate();

  const [carObject, setCarObject] = useState({}); //obiekt
  const [opinions, setOpinions] = useState([]); //tabela obiektów
  const [newOpinion, setNewOpinion] = useState("");
  const { authState } = useContext(AuthContext);
  const [startDate, setStartDate] = useState('')

  useEffect(() => {
    axios.get(`http://localhost:3001/cars/byId/${id}`).then((response) => {
      setCarObject(response.data);
    });

    axios.get(`http://localhost:3001/opinions/${id}`).then((response) => {
      setOpinions(response.data);
    });
  }, []);

  const addOpinion = () => {
    axios
      .post(
        `http://localhost:3001/opinions`,
        {
          opinionBody: newOpinion,
          CarId: id,
          UserId: authState.id,
        },
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      )
      .then((response) => {
        if (response.data.error) {
          console.log(response.data.error);
          document.querySelector(".errorMessage").innerHTML =
            "Dodawanie opinii możliwe tylko po zalogowaniu";
        } else {
          setOpinions([
            ...opinions,
            {
              id: response.data.id,
              opinionBody: newOpinion,
              CarId: id,
              username: response.data.username,
            },
          ]);

          setNewOpinion("");
        }
      });
  };

  const deleteOpinion = (id) => {
    axios
      .delete(`http://localhost:3001/opinions/${id}`, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then(() => {
        // console.log("commment deleted")
        setOpinions(
          opinions.filter((value) => {
            return value.id !== id;
          })
        );
      });
  };

  const deleteCar = (id) => {
    axios.delete(`http://localhost:3001/cars/${id}`).then(() => {
      navigate("/");
    });
  };

  return (
    <>
      <div className="carInfo">
        <div className="brandAndModel">
          <div className="brand">
            <h1>{carObject.brand}</h1>
          </div>
          <div className="model">
            <h5>
              <i>{carObject.model}</i>
            </h5>
          </div>
        </div>
        <div className="image">
          {carObject.image && (
            <img
              className="img-fluid"
              src={carObject.image
                .replace("..\\client\\public", "")
                .replace("\\", "/")}
            />
          )}
        </div>
        <h3 className="pt-4">Szczegółowe informacje:</h3>
        <div className="moreInfo">
          <div className="moreInfoKeys">
            <p>Marka: </p>
            <p>Model: </p>
            <p>Liczba pasażerów: </p>
            <p>Liczba drzwi: </p>
            <p>Skrzynia biegów: </p>
            <p>Rozmiar: </p>
            <p>Cena za dobę w zł: </p>
            <p>Dostępność: </p>
          </div>
          <div className="moreInfoValues">
            <p>{carObject.brand}</p>
            <p>{carObject.model}</p>
            <p>{carObject.passengers}</p>
            <p>{carObject.doors}</p>
            <p>{carObject.gearbox}</p>
            <p>{carObject.size}</p>
            <p>{carObject.price}</p>
            <div className="availability">
              {carObject.available ? (
                <p style={{ color: "green" }}>Dostępny</p>
              ) : (
                <p style={{ color: "red" }}>Niedostępny</p>
              )}
            </div>
          </div>
        </div>
        {authState.username === "admin" && (
          <div className="deleteButton pb-4">
            <button className="btn"
            onClick={() => {
              deleteCar(carObject.id);
            }}
            >
            Delete Car
            </button>
          </div>

        )}
        <h3 className="pt-4">Zarezerwuj termin:</h3>
        {authState.status ? (
          <>
            <MaterialUIPickers/>
          </>
        ) : (
          <div className="loginToOrder pb-3">
            <a href="/login">Zaloguj się</a>, żeby wypożyczyć samochód
          </div>
        )}
        
      </div>








          







      <div className="opinions">
        <h3 className="pt-4">Opinie:</h3>
        <div className="addOpinionContainer py-3 ">
          <textarea
            rows="3"
            type="text"
            placeholder="Napisz swoją opinię..."
            className="mx-2 my-2 form-control"
            onChange={(event) => {
              setNewOpinion(event.target.value);
            }}
            value={newOpinion}
          />
          <button onClick={addOpinion} className="btn">
            Dodaj opinię
          </button>
          <span className="errorMessage"></span>
        </div>

        {/* Opinions */}

        <div className="listOfOpinions">
          {opinions.map((opinion, key) => {
            return (
              <div className="opinion" key={key}>
                <div className="opinionUsername">
                  {opinion.username === "admin" ? (
                    <b style={{ color: "blue" }}>[{opinion.username}]</b>
                  ) : (
                    <b>{opinion.username}</b>
                  )}
                </div>
                <div className="opinionBody">{opinion.opinionBody}</div>

                <div className="opinionCreatedAt">
                  {authState.username === opinion.username && (
                    <button
                      className="mx-2 btn deleteOpinionButton"
                      onClick={() => {
                        deleteOpinion(opinion.id);
                      }}
                    >
                      Usuń opinię
                    </button>
                  )}
                  Dodano&nbsp;
                  {opinion.createdAt ? (
                    <span>
                      {opinion.createdAt
                        .replace("T", ", ")
                        .replace(".000Z", "")}
                    </span>
                  ) : (
                    <span>chwilę temu...</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Car;
