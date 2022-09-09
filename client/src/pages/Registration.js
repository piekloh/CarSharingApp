import React, { useState } from "react";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

function Registration() {
  let navigate = useNavigate();

  const [password2, setPassword2] = useState("");

  const initialValues = {
    username: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .min(3, "Nazwa użytkownika musi się składać z 3 do 15 znaków")
      .max(15, "Nazwa użytkownika musi się składać z 3 do 15 znaków")
      .required("To pole nie może być puste"),
    password: Yup.string()
      .min(5, "Nazwa użytkownika musi się składać z 5 do 20 znaków")
      .max(20, "Nazwa użytkownika musi się składać z 5 do 20 znaków")
      .required("To pole nie może być puste"),
  });

  const onSubmit = async (data) => {

    if (password2 === data.password) {
      if (document.querySelector("#agreement").checked) {
        axios.post("http://localhost:3001/auth", data).then((response) => {
          if(response.data.error){
            console.log(response.data.error)
            document.querySelector(".userExists").innerHTML =
            "Użytkownik o podanej nazwie już istnieje";
          } 
          else{
          console.log("Account created");
          navigate("/");
          }

        });
      } else {
        document.querySelector(".notAccepted").innerHTML =
          "Akceptuj warunki korzystania z serwisu";
        
      }
    } else {
      document.querySelector(".wrongPassword").innerHTML =
        "Wprowadzone hasła nie są jednakowe";
    }
  };

  return (
    <div className="registrationContainer">
      <div className="registrationTitle">Utwórz konto</div>
      <div className="registrationInputs">
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          <Form>
            {/* username */}
            <div className="inputField">
              <ErrorMessage name="username" component="p" />
              <Field
                className="inputCreateCar"
                name="username"
                placeholder="Nazwa użytkownika"
              />
            </div>
            {/* password */}
            <div className="inputField">
              <ErrorMessage name="password" component="p" />
              <Field
                className="inputCreateCar"
                name="password"
                type="password"
                placeholder="Hasło"
              />
            </div>
            {/* password2 */}
            <div className="wrongPassword"></div>
            <div className="inputField">
              <input
                name="password2"
                type="password"
                placeholder="Powtórz hasło"
                onChange={(event) => {
                  setPassword2(event.target.value);
                }}
              />
            </div>
            <div className="agreement">
              <div className="description">
                Zapoznałem się z <a href="#">regulaminem</a> serwisu
              </div>
              <div className="checkbox">
                <input type="checkbox" id="agreement" />
              </div>
            </div>
            <div className="notAccepted"></div>
            <div className="registrationButton">
              <button type="submit">Utwórz konto</button>
            </div>
            <div className="userExists"></div>
            <div className="toLogin">
              Masz już konto? <a href="/login"> Zaloguj się</a>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
}

export default Registration;
