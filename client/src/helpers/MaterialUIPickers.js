import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import dayjs from "dayjs";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";

export default function MaterialUIPickers() {
  let now = new Date();
  var todayDate =
    now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate();
  let nowInMs = now.getTime();
  let tommorowTime = new Date(nowInMs + 1000 * 60 * 60 * 24);
  let maxDateTime = new Date(nowInMs + 1000 * 60 * 60 * 24 * 90); //90 days later

  let { id } = useParams();
  const [start, setStart] = React.useState(dayjs(todayDate));
  const [stop, setStop] = React.useState(dayjs(todayDate));
  const [reservations, setReservations] = useState([]);
  const arrayReservedDatesMs = [];
  const [disabledStartDatesMs, setDisabledStartDatesMs] =
    useState(arrayReservedDatesMs);
  const [disabledStopDateMs, setDisabledStopDateMs] = useState(
    new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 90)
  ); //3 months later
  let closestStopDateMs = new Date(
    new Date().getTime() + 1000 * 60 * 60 * 24 * 90
  );

  useEffect(() => {
    axios.get(`http://localhost:3001/reservations/${id}`).then((response) => {
      setReservations(response.data);

      // console.log(response.data); //array of all reservations for one car

      /////////////////Starting date//////////////////

      for (let i = 0; i < response.data.length; i++) {
        let startDateMs = new Date(response.data[i].start).getTime(); //number
        let stopDateMs = new Date(response.data[i].stop).getTime(); //number

        while (startDateMs <= stopDateMs) {
          arrayReservedDatesMs.push(startDateMs);

          startDateMs = startDateMs + 1000 * 60 * 60 * 24;
        }
      }
      // console.log(arrayReservedDatesMs);
      setDisabledStartDatesMs(arrayReservedDatesMs);
    });
  }, []);

  const orderCar = () => {
    axios
      .post(
        `http://localhost:3001/reservations`,
        {
          start: start,
          stop: stop,
          CarId: id,
        },
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      )
      .then((response) => {
        // console.log(response.data); //ordered dates
        let startDateMs = new Date(response.data.start).getTime(); //number
        let stopDateMs = new Date(response.data.stop).getTime(); //number

        // console.log(disabledStartDatesMs);

        while (startDateMs <= stopDateMs) {
          arrayReservedDatesMs.push(startDateMs);
          startDateMs = startDateMs + 1000 * 60 * 60 * 24;
        } //creating new array with reserved dates, below it is added to previous dates
        setDisabledStartDatesMs(
          disabledStartDatesMs.concat(arrayReservedDatesMs)
        ); //no need to refresh
      });
    document.querySelector(".orderConfirmed").innerHTML =
      "Rezerwacja wykonana pomyślnie";
  };

  const onChangeStart = (newStart) => {
    setStart(newStart.$d);

    let disabledStartDatesMsSorted = disabledStartDatesMs.slice();
    disabledStartDatesMsSorted = disabledStartDatesMsSorted.sort(function (
      a,
      b
    ) {
      return a - b;
    }); //sorted

    for (let i = 0; i < disabledStartDatesMsSorted.length; i++) {
      if (disabledStartDatesMsSorted[i] > newStart.$d.getTime()) {
        closestStopDateMs = disabledStartDatesMsSorted[i];
        break;
      }
    }
    setDisabledStopDateMs(closestStopDateMs);
  };

  /////////////DISABLING DATES//////////////////
  // function disableRandomDates() {
  //   return Math.random() > 0.7;
  // }
  // function disableWeekends(date) {
  //   return date.getDay() === 0 || date.getDay() === 6;
  // }
  // function disableOneDate(date) {
  //   return date.$d.getTime() === new Date("2022-09-09T00:00").getTime();
  // }
  function disableStartDates(date) {
    return disabledStartDatesMs.includes(date.$d.getTime());
  }
  function disableStopDate(date) {
    return disabledStopDateMs <= date.$d.getTime();
  }
  /////////////////////////////////////////////

  return (
    <div className="datepickersWithBtn">
      <div className="datepickers">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Stack spacing={3} sx={{ width: "400px", padding: "40px" }}>
            <DesktopDatePicker
              label="Początek rezerwacji:"
              className="datePicker"
              inputFormat="DD/MM/YYYY"
              disablePast={true}
              maxDate={maxDateTime}
              value={start}
              shouldDisableDate={disableStartDates}
              onChange={onChangeStart}
              renderInput={(params) => <TextField {...params} />}
            />
          </Stack>
        </LocalizationProvider>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Stack spacing={3} sx={{ width: "400px", padding: "40px" }}>
            <DesktopDatePicker
              label="Koniec rezerwacji:"
              className="datePicker"
              inputFormat="DD/MM/YYYY"
              disablePast={true}
              minDate={start}
              maxDate={maxDateTime}
              value={stop}
              shouldDisableDate={disableStopDate}
              onChange={(newKon) => {
                setStop(newKon.$d);
                // console.log(newKon.$d)
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </Stack>
        </LocalizationProvider>
      </div>
      <div className="BtnAndOrderConfirmed">
        <button className="btn mb-4" onClick={orderCar}>
          Zarezerwuj
        </button>
        <div className="orderConfirmed"></div>
      </div>
    </div>
  );
}
