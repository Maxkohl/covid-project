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
    fetch("https://api.covid19api.com/summary")
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            chartData: result,
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
  }

  // getChartData() {
  //   //insert API ajax call here after testing with dummy data
  //   this.setState({
  //     chartData: {
  //       labels: ["January", "February", "March", "April", "May"],
  //       datasets: [
  //         {
  //           label: "Rainfall",
  //           backgroundColor: [
  //             "#B21F00",
  //             "#C9DE00",
  //             "#2FDE00",
  //             "#00A6B4",
  //             "#6800B4",
  //           ],
  //           hoverBackgroundColor: [
  //             "#501800",
  //             "#4B5000",
  //             "#175000",
  //             "#003350",
  //             "#35014F",
  //           ],
  //           data: [65, 59, 80, 81, 56],
  //         },
  //       ],
  //     },
  //   });
  // }

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
