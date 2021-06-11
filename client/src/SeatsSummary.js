import React from "react";
import { useSelector } from "react-redux";

export default function SeatsSummary() {
  const { seats } = useSelector((state) => state.seatsConfiguration);
  return (
    <div className="summary">
      <h1 className="summary__header">
        Twoja rezerwacja przebiegła pomyślnie!
      </h1>
      <ul className="summary__list">
        {seats.map((seat, i) => (
          <li className="summary__list__item">
            <span className="summary__list__item--id">id{i + 1}</span>
            Rząd {Number(seat.split("").slice(2, seat.length).join("")) + 1},
            Miejsce {Number(seat.split("")[1]) + 1}
          </li>
        ))}
      </ul>
      <h2 className="summary__header--small">
        Dziękujemy! W razie problemów prosimy o kontakt z działem administracji
      </h2>
    </div>
  );
}
