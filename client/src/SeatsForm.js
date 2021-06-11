import React, { useState } from "react";
import "./App.css";
import ChooseSeats from "./ChooseSeats";

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

export default function SeatsForm() {
  const [redirect, setRedirect] = useState(false);

  const [numberOfSeats, setNumberOfSeats] = useState(0);
  const [adjacentSeats, setAdjacentSeats] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    setNumberOfSeats(Number(e.target[0].value));
    setAdjacentSeats(Boolean(e.target[1].checked));

    setRedirect(true);
  };
  return redirect ? (
    <ChooseSeats numberOfSeats={numberOfSeats} adjacentSeats={adjacentSeats} />
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
