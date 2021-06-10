import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";

import axios from "axios";

const URL = "http://localhost:3000/seats";
const CHOSEN_STYLE = "seat--chosen";
const TAKEN_STYLE = "seat--taken";

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

  const generateSeatsSuggestion = () => {
    grid.current
      .querySelectorAll(`.seat:not(.${TAKEN_STYLE}`)
      .forEach((seat) => {
        for (let i = 0; i < seats.numberOfSeats; i++) {
          console.log(seat);

          // done
          if (
            grid.current.querySelectorAll(`.${CHOSEN_STYLE}`).length ==
            seats.numberOfSeats
          ) {
            break;
          }

          // if seat is null | has taken style | has chosen style do nothing and clean
          if (
            seat == null ||
            seat.classList.contains(`${TAKEN_STYLE}`) ||
            seat.classList.contains(`${CHOSEN_STYLE}`)
          ) {
            grid.current
              .querySelectorAll(`.seat:not(.${TAKEN_STYLE})`)
              .forEach((seat) => {
                grid.current
                  .querySelectorAll(`.${CHOSEN_STYLE}`)
                  .forEach((seat) => seat.classList.remove(`${CHOSEN_STYLE}`));
              });
            break;
          } else {
            seat.classList.add(`${CHOSEN_STYLE}`);

            let nextSeat = returnNextSeat(seat);
            seat = grid.current.querySelector(nextSeat);
          }
        }
      });
  };

  const handleSeatClick = (e) => {
    let clickedSeat = e.target;
    if (!clickedSeat.classList.contains(`${TAKEN_STYLE}`)) {
      if (!seats.adjacentSeats) {
        clickedSeat.classList.toggle(`${CHOSEN_STYLE}`);

        // if amount of chosen style elements are greater than provided number of seats clean up
        if (
          grid.current.querySelectorAll(`.${CHOSEN_STYLE}`).length >
          seats.numberOfSeats
        ) {
          grid.current
            .querySelectorAll(`.${CHOSEN_STYLE}`)
            .forEach((seat) => seat.classList.remove(`${CHOSEN_STYLE}`));
        }
      } else {
        grid.current
          .querySelectorAll(`.seat:not(.${TAKEN_STYLE})`)
          .forEach((seat) => {
            console.log(seat);
          });

        clickedSeat.classList.add(`${CHOSEN_STYLE}`);
        for (let i = 1; i < seats.numberOfSeats; i++) {
          let nextSeat = returnNextSeat(clickedSeat);
          clickedSeat = grid.current.querySelector(nextSeat);

          // if amount of chosen style elements are greater than provided number of seats clean up
          if (
            grid.current.querySelectorAll(`.${CHOSEN_STYLE}`).length >
            seats.numberOfSeats
          ) {
            grid.current
              .querySelectorAll(`.${CHOSEN_STYLE}`)
              .forEach((seat) => seat.classList.remove(`${CHOSEN_STYLE}`));
            break;
          }

          // if clicked seat is null | has taken style | has chosen style do nothing and clean
          if (
            clickedSeat == null ||
            clickedSeat.classList.contains(`${TAKEN_STYLE}`) ||
            clickedSeat.classList.contains(`${CHOSEN_STYLE}`)
          ) {
            grid.current
              .querySelectorAll(`.seat:not(.${TAKEN_STYLE})`)
              .forEach((seat) => {
                grid.current
                  .querySelectorAll(`.${CHOSEN_STYLE}`)
                  .forEach((seat) => seat.classList.remove(`${CHOSEN_STYLE}`));
              });
            break;
          } else {
            clickedSeat.classList.add(`${CHOSEN_STYLE}`);
          }
        }
      }
    }
  };

  const generateSeats = (seatsApiResponse) => {
    let seatsCords = [];
    Object.entries(seatsApiResponse).forEach((seat) => {
      seatsCords.push(
        `${seat[1].id}:${seat[1].cords.x}:${seat[1].cords.y}:${seat[1].reserved}` //s02:0:2:false
      );
    });

    let styleContent = "";
    let seatClassName = "";
    seatsCords.forEach((seatCords) => {
      let seat = document.createElement("div");
      seatClassName = `${seatCords.split(":")[0]}`;
      styleContent += `.${seatClassName} { grid-area: ${seatClassName};}`;

      seat.classList.add(`seat`);
      seat.classList.add(`${seatClassName}`);
      if (seatCords.split(":")[3] == "true") {
        seat.classList.add(`${TAKEN_STYLE}`);
      }
      seat.onclick = handleSeatClick;
      grid.current.appendChild(seat);
    });

    const style = document.createElement("style");
    style.innerHTML = styleContent;
    document.head.appendChild(style);

    if (seats.adjacentSeats) {
      generateSeatsSuggestion();
    }
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
            <div className="seat seat--chosen legend"></div>
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
