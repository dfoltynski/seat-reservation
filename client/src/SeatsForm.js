import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addSeatsConfiguration } from "./features/seatsConfiguration";
import { Redirect } from "react-router";
import "./App.css";

export default function SeatsForm() {
  const [redirect, setRedirect] = useState(false);
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();

    const numberOfSeats = Number(e.target[0].value);
    const adjacentSeats = Boolean(e.target[1].checked);
    console.log(numberOfSeats, adjacentSeats);

    // pass it to redux store
    dispatch(addSeatsConfiguration({ numberOfSeats, adjacentSeats }));
    setRedirect(true);
  };
  return redirect ? (
    <Redirect to="wybierz-miejsca" />
  ) : (
    <div className="seats__form">
      <form className="form" onSubmit={handleSubmit}>
        <div className="form__container--input">
          <label htmlFor="seats-number">Liczba miejsc: </label>
          <input
            id="seats-number"
            type="number"
            min="1"
            className="input"
            required
          />
        </div>
        <div className="form__container--input">
          <input id="adjacent-seats" type="checkbox" />
          <label htmlFor="adjacent-seats">
            Czy miejsca mają być sąsiednie?
          </label>
        </div>
        <div className="form__container--input">
          <input
            id="submit"
            type="submit"
            value="Wybierz miejsca"
            className="input--submit"
          />
        </div>
      </form>
    </div>
  );
}
