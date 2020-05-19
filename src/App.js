import React, { Component } from "react";
import Chart from "./components/Chart";
import "./App.css";

class App extends Component {
  constructor(props) {
    super();
    this.state = {
      chartData: {},
    };
  }

  componentWillMount() {
    this.getChartData();
  }

  getChartData() {
    //insert API ajax call here after testing with dummy data
    this.setState({
      chartData: {
        labels: ["January", "February", "March", "April", "May"],
        datasets: [
          {
            label: "Rainfall",
            backgroundColor: [
              "#B21F00",
              "#C9DE00",
              "#2FDE00",
              "#00A6B4",
              "#6800B4",
            ],
            hoverBackgroundColor: [
              "#501800",
              "#4B5000",
              "#175000",
              "#003350",
              "#35014F",
            ],
            data: [65, 59, 80, 81, 56],
          },
        ],
      },
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Chart chartData={this.state.chartData} />
        </header>
      </div>
    );
  }
}

export default App;
