import React from "react";

import "./App.css";
import BarChart from "./components/BarChart";
import NavigationBar from "./components/NavigationBar";
import PopulationGraph from "./components/PopulationGraph";
import ConnectWalletButton from "./components/WallectConnection";

export default function App() {
  return (
    <div className="App">
      <div className="left">
        <NavigationBar />
      </div>
      <div className="top-center">
        <PopulationGraph />
      </div>
      <div className="top-right">
        < ConnectWalletButton/>
      </div>
      <div className="center-bottom">
        <BarChart />
      </div>
    </div>
  );
}
