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

  getCountryLabel(countryData, totalConfirmedAllCountries) {
    const percentageOfCases = (
      (countryData.TotalConfirmed / totalConfirmedAllCountries) *
      100
    ).toFixed(2);

    return `${countryData.Country}: ${percentageOfCases}%`;
  }

  getRandomHex() {
    return "#" + Math.floor(Math.random() * 16777215).toString(16);
  }

  getChartData() {
    fetch("https://api.covid19api.com/summary")
      .then((res) => res.json())
      .then(
        (result) => {
          const fileteredData = result.Countries.map((data) => {
            return {
              Country: data.Country,
              TotalConfirmed: data.TotalConfirmed,
            };
          })
            .sort((a, b) => b.TotalConfirmed - a.TotalConfirmed)
            .slice(0, 6);

          const totalConfirmed = fileteredData.reduce(
            (a, b) => a + b.TotalConfirmed,
            0
          );

          this.setState({
            chartData: {
              labels: fileteredData.map((data) =>
                this.getCountryLabel(data, totalConfirmed)
              ),
              datasets: [
                {
                  label: "Test",
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
                  data: fileteredData.map((data) => data.TotalConfirmed),
                },
              ],
            },
          });
        },

        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Chart
            title="Top 10 Countries with Confirmed Cases"
            chartData={this.state.chartData}
          />
        </header>
      </div>
    );
  }
}

export default App;
