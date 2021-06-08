import React, { useEffect, useState } from "react";
import axios from "axios";

const URL = "http://localhost:3000/seats";

export default function ChooseSeats() {
  const [seats, setSeats] = useState();

  const randomizeTakenSeats = () => {
    const takenSeatsID = [];
    for (let i = 0; i < 11; i++) {
      takenSeatsID.push(Math.floor(Math.random() * 115) + 0);
    }
    return takenSeatsID;
  };

  const generateSeats = (seatsApiResponse) => {
    const takenSeats = [];
    const seatsGrid = document.createElement("div");
    seatsGrid.classList.add("seats__grid--left");
    randomizeTakenSeats().forEach((id) => {
      takenSeats.push(Object.entries(seatsApiResponse)[id]);
    });

    console.log(takenSeats);
    let styleContent = "";
    for (let i = 1; i <= 77; i++) {
      styleContent += `.seat--${i} { grid-area: seat--${i};}`;

      let seat = document.createElement("div");
      seat.classList.add(`seat`);
      seat.classList.add(`seat--${i}`);
      seatsGrid.appendChild(seat);
    }
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
      {/* <div className="seats__grid">
        <table>
          <tr>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </table>
        <table>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </table>
        <table>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </table>
        <table>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </table>
        <table>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </table>
      </div> */}

      <footer>
        <input value="Rezerwuj" className="input--submit" type="submit" />
      </footer>
    </main>
  );
}
