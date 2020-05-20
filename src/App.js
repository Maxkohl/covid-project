import React, { Component } from "react";
import Sidebar from "./components/Sidebar";
import "./App.css";

class App extends Component {
  constructor(props) {
    super();
    this.state = {};
  }

  render() {
    return (
      <div className="App">
        <Sidebar chartData={this.state.chartData} />
        <header className="App-header"></header>
      </div>
    );
  }
}

export default App;
