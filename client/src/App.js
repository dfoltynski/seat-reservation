import React from "react";
import "./App.css";

function App() {
  const handleSubmit = (e) => {
    e.preventDefault();

    const numberOfSeats = Number(e.target[0].value);
    const adjacentSeats = Boolean(e.target[1].checked);
    console.log(numberOfSeats, adjacentSeats);

    // pass it to redux store
  };

  return (
    <div className="App">
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

export default App;
