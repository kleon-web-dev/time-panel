import { useState } from "react";
import Calendar from "./Calendar";
import TimeWatch from "./TimeWatch";
import Alarm from "./Alarm";
import Weather from "./Weather";


function App() {
  return (
    <div className="container">
      <div className="clocks-container">
        <Weather />
        <Calendar />
        <TimeWatch />
        <Alarm />
      </div>
    </div>
  );
}

export default App;
