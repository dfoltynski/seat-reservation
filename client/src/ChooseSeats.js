import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";

import axios from "axios";

const URL = "http://localhost:3000/seats";

export default function ChooseSeats({ numberOfSeats, adjacentSeats }) {
  const [seats, setSeats] = useState({ numberOfSeats, adjacentSeats });

  const grid = useRef();

  const returnNextSeat = (currentSeat) => {
    return `.s${
      Number(currentSeat.classList[1].split("")[1]) + 1
    }${currentSeat.classList[1]
      .split("")
      .slice(2, currentSeat.classList[1].length)
      .join("")}`;
  };

  const handleSeatClick = (e) => {
    let clickedSeat = e.target;
    if (!clickedSeat.classList.contains("seat--taken")) {
      if (!seats.adjacentSeats) {
        clickedSeat.classList.toggle("seat--choosen");

        // clean up when you clicked more times than number of seats
        if (
          grid.current.querySelectorAll(".seat--choosen").length >
          seats.numberOfSeats
        ) {
          grid.current
            .querySelectorAll(".seat--choosen")
            .forEach((seat) => seat.classList.remove("seat--choosen"));
        }
      } else {
        grid.current
          .querySelectorAll(".seat:not(.seat--taken)")
          .forEach((seat) => {
            console.log(seat);
          });

        clickedSeat.classList.add("seat--choosen");
        for (let i = 1; i < seats.numberOfSeats; i++) {
          let nextSeat = returnNextSeat(clickedSeat);
          clickedSeat = grid.current.querySelector(nextSeat);

          // clean up when you clicked more times than number of seats
          if (
            grid.current.querySelectorAll(".seat--choosen").length >
            seats.numberOfSeats
          ) {
            grid.current
              .querySelectorAll(".seat--choosen")
              .forEach((seat) => seat.classList.remove("seat--choosen"));
            break;
          }

          // do nothing when there is no place for x number of seats or you want to use taken seat
          if (
            clickedSeat == null ||
            clickedSeat.classList.contains("seat--taken")
          ) {
            grid.current
              .querySelectorAll(".seat:not(.seat--taken)")
              .forEach((seat) => {
                grid.current
                  .querySelectorAll(".seat--choosen")
                  .forEach((seat) => seat.classList.remove("seat--choosen"));
              });
            break;
          } else {
            clickedSeat.classList.add("seat--choosen");
          }
        }
      }
    }
  };

  const generateSeats = (seatsApiResponse) => {
    let seatsCords = [];
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
      grid.current.appendChild(seat);
    });

    const style = document.createElement("style");
    style.innerHTML = styleContent;
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
  }, []);

  return (
    <main className="seats">
      <div className="seats__grid__container">
        <div className="grid" ref={grid}></div>
      </div>
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
