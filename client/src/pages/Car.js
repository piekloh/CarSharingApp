import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function Car() {
  let { id } = useParams();

  const [carObject, setCarObject] = useState({}); //obiekt
  const [opinions, setOpinions] = useState([]); //tabela obiektów
  const [newOpinion, setNewOpinion] = useState("");

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
      .post(`http://localhost:3001/opinions`, {
        opinionBody: newOpinion,
        CarId: id,
      },
      {
        headers:{
          accessToken: sessionStorage.getItem("accessToken")
        }
      })
      .then((response) => {
        if (response.data.error) console.log(response.data.error);
        else{
          // console.log(response.data)
          const opinionToAdd = { opinionBody: response.data.opinionBody };
          setOpinions([...opinions, opinionToAdd]);
          setNewOpinion("");
      }
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
      </div>
      <div className="opinions">
        <h3 className="pt-4">Opinie:</h3>
        <div className="addOpinionContainer pt-4 ">
          <input
            type="text"
            placeholder="Napisz swoją opinię..."
            className="mx-2"
            onChange={(event) => {
              setNewOpinion(event.target.value);
            }}
            value={newOpinion}
          />
          <button onClick={addOpinion}>Dodaj opinię</button>
        </div>

        {/* Opinions */}

        <div className="listOfOpinions">
          {opinions.map((opinion, key) => {
            return (
              <div className="opinion" key={key}>
                <div className="opinionBody">{opinion.opinionBody}</div>
                <div className="opinionCreatedAt">
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
