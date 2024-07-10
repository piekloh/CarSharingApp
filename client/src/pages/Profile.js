import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function Profile() {
  let { id } = useParams(); //the same id as in App.js Route path "/profile/:id"
  const [userInfo, setUserInfo] = useState({});
  const [userReservations, setUserReservations] = useState([]);
  const [userOpinions, setUserOpinions] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:3001/auth/basicinfo/${id}`).then((response) => {
      console.log(response.data);
      setUserInfo({
        username: response.data.username,
        createdAt: response.data.createdAt
          .replace("T", ", ")
          .replace(".000Z", ""),
      });
    });

    axios
      .get(`http://localhost:3001/reservations/byuser/${id}`)
      .then((response) => {
        console.log("rezerwacje");
        console.log(response.data);
        setUserReservations(response.data);
      });

    axios
      .get(`http://localhost:3001/opinions/byuser/${id}`)
      .then((response) => {
        console.log("opinie");
        console.log(response.data);
        setUserOpinions(response.data);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="profilePageContainer">
      <div className="username">
        <h2 className="mb-4">
          <b>{userInfo.username}</b>
        </h2>
      </div>
      <div className="accountCreatedAt pb-2 mb-2">
        Konto utworzono: {userInfo.createdAt}
      </div>
      <div className="reservations">
        <p className="m-0">
          <b>Rezerwacje:</b>
        </p>
        <div className="table table-striped">
          <thead>
            <tr>
              <th scope="col">Początek</th>
              <th scope="col">Koniec</th>
              <th scope="col">Nr pojazdu</th>
            </tr>
          </thead>
          {userReservations.length !== 0 ? (
            userReservations.map((value, key) => {
              return (
                <tbody>
                  <tr>
                    <td>
                      <i>
                        {value.start
                          .replace("T", ", ")
                          .replace(", 22:00:00.000Z", "")}
                      </i>
                    </td>
                    <td>
                      <i>
                        {value.stop
                          .replace("T", ", ")
                          .replace(", 22:00:00.000Z", "")}
                      </i>
                    </td>
                    <td>{value.CarId}</td>
                  </tr>
                </tbody>
              );
            })
          ) : (
            <i>Nie dokonałeś jeszcze żadnej rezerwacji</i>
          )}
        </div>
      </div>
      <div className="opinions">
        <b>Opinie użytkownika:</b>
        {userOpinions.map((opinion, key) => {
          return (
            <div className="opinion" key={key}>
              <div className="opinionBody">{opinion.opinionBody}</div>

              <div className="opinionCreatedAt">
                Samochód nr {opinion.CarId};
                {opinion.createdAt ? (
                  <span className="ms-2">
                    {opinion.createdAt.replace("T", ", ").replace(".000Z", "")}
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
  );
}

export default Profile;
