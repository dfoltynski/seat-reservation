import React from "react";
import { Route, Switch } from "react-router";
import "./App.css";
import ChooseSeats from "./ChooseSeats";
import SeatsForm from "./SeatsForm";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={SeatsForm} />
        <Route exact path="/wybierz-miejsca" component={ChooseSeats} />
        {/* <Route path="/odbierz-rezerwacje" component={ChooseSeats} /> */}
      </Switch>
    </div>
  );
}

export default App;
