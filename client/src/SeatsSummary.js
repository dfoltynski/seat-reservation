import React from "react";
import { useSelector } from "react-redux";

export default function SeatsSummary() {
  const { seats } = useSelector((state) => state.seatsConfiguration);
  return (
    <div>
      <ul>
        {seats.map((seat) => (
          <li>
            Rząd {Number(seat.split("")[1]) + 1}, Miejsce
            {" " + Number(seat.split("").slice(2, seat.length).join("")) + 1}
          </li>
        ))}
      </ul>
    </div>
  );
}
