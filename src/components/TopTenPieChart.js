import React, { Component } from "react";
import PieChart from "./PieChart";

class TopTenPieChart extends Component {
  constructor(props) {
    super(props);
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
            .slice(0, 10);

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
                  backgroundColor: fileteredData.map(this.getRandomHex),
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
      <div className="Chart">
        <PieChart chartData={this.state.chartData} title="Top 10 Countries" />
        <header className="App-header"></header>
      </div>
    );
  }
}

export default TopTenPieChart;
