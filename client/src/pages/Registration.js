import React from "react";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

function Registration() {
  let navigate = useNavigate();

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
    axios.post("http://localhost:3001/auth", data).then((response) => {
      console.log("Account created");
      navigate("/");
    });
  };

  return (
    <div className="createCarPage">
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
          <button type="submit">Utwórz konto</button>
          <div>Masz już konto? <a href="/login"> Zaloguj się</a></div>
        </Form>
      </Formik>
    </div>
  );
}

export default Registration;
