import React, { useEffect } from "react";
import { useSelector } from "react-redux";

import axios from "axios";

const URL = "http://localhost:3000/seats";

export default function ChooseSeats() {
  const { seats } = useSelector((state) => state.seatsConfiguration);

  const handleSeatClick = (e) => {
    console.log(e.target);
  };

  const generateSeats = (seatsApiResponse) => {
    let seatsCords = [];
    const seatsGrid = document.createElement("div");
    seatsGrid.classList.add("seats__grid--left");

    Object.entries(seatsApiResponse).forEach((seat) => {
      seatsCords.push(
        `${seat[1].id}:${seat[1].cords.x}:${seat[1].cords.y}:${seat[1].reserved}`
      );
    });

    console.log(seatsCords[seatsCords.length - 1]);

    let styleContent = "";
    let seatClassName = "";
    seatsCords.forEach((seatCords) => {
      let seat = document.createElement("div");
      seatClassName = `${seatCords.split(":")[0]}`;
      styleContent += `.${seatClassName} { grid-area: ${seatClassName};}`;

      seat.classList.add(`seat`);
      seat.classList.add(`${seatClassName}`);
      if (seatCords.split(":")[3] == "true") {
        seat.classList.add(`seat--taken`);
      }
      seat.onclick = handleSeatClick;
      seatsGrid.appendChild(seat);
    });

    const style = document.createElement("style");
    style.innerHTML = styleContent;
    document.querySelector(".seats__grid__container").appendChild(seatsGrid);
    document.head.appendChild(style);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    (async () => {
      const res = (await axios.get(URL)).data;
      generateSeats(res);
    })();

    console.log(seats);
  }, []);

  return (
    <main className="seats">
      <div className="seats__grid__container"></div>
      <form className="form--reserve" onSubmit={handleSubmit}>
        <ul>
          <li>
            <div className="seat legend"></div>
            Miejsca dostępne
          </li>
          <li>
            <div className="seat seat--taken legend"></div>
            Miejsca zarezerwowane
          </li>
          <li>
            <div className="seat seat--choosen legend"></div>
            Twój wybór
          </li>
        </ul>
        <input
          value="Rezerwuj"
          className="input--submit input--reserve"
          type="submit"
        />
      </form>
    </main>
  );
}
