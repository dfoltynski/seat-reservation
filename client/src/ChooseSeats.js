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
    randomizeTakenSeats().forEach((id) => {
      takenSeats.push(Object.entries(seatsApiResponse)[id]);
    });

    console.log(takenSeats);
  };

  useEffect(() => {
    (async () => {
      const res = (await axios.get(URL)).data;
      setSeats(res);
      generateSeats(res);
    })();
  }, []);

  return <div></div>;
}
