import React, { useEffect, useState } from "react";
import axios from "axios";

const URL = "http://localhost:3000/seats";

export default function ChooseSeats() {
  const [seats, setSeats] = useState();

  // function getNodeIndex(elm) {
  //   var c = elm.parentNode.children,
  //     i = 0;
  //   for (; i < c.length; i++) if (c[i] == elm) return i;
  // }

  const handleSeatClick = (e) => {
    console.log(e.target);
  };

  const generateSeats = (seatsApiResponse) => {
    let seatsCords = [];
    const seatsGrid = document.createElement("div");
    seatsGrid.classList.add("seats__grid--left");

    Object.entries(seatsApiResponse).forEach((seat) => {
      seatsCords.push(
        `${seat[1].cords.x}:${seat[1].cords.y}:${seat[1].reserved}`
      );
    });

    console.log(seatsCords[seatsCords.length - 1]);

    let styleContent = "";
    let seatClassName = "";
    seatsCords.forEach((seatCords) => {
      let seat = document.createElement("div");
      seatClassName = `seat--${seatCords.split(":")[0]}-${
        seatCords.split(":")[1]
      }`;
      styleContent += `.${seatClassName} { grid-area: ${seatClassName};}`;

      seat.classList.add(`seat`);
      seat.classList.add(`${seatClassName}`);
      console.log(seatCords.split(":")[2]);
      if (seatCords.split(":")[2] == "true") {
        seat.classList.add(`seat--taken`);
      }
      seat.onclick = handleSeatClick;
      seatsGrid.appendChild(seat);
    });

    const style = document.createElement("style");
    style.innerHTML = styleContent;
    document.querySelector(".seats").appendChild(seatsGrid);
    document.head.appendChild(style);
  };

  useEffect(() => {
    (async () => {
      const res = (await axios.get(URL)).data;
      setSeats(res);
      generateSeats(res);
    })();
  }, []);

  return (
    <main className="seats">
      <footer>
        <input value="Rezerwuj" className="input--submit" type="submit" />
      </footer>
    </main>
  );
}
