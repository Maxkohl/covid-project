import React, { Component } from "react";
import PieChart from "./components/PieChart";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import Sidebar from "./components/Sidebar";
import "./App.css";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const classes = useStyles;

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
      <div className="App">
        <Card className="card" height="100px" width="100px">
          <PieChart
            title="Top 10 Countries with Confirmed Cases"
            chartData={this.state.chartData}
          />
        </Card>
        <Sidebar />
        <header className="App-header"></header>
      </div>
    );
  }
}

export default App;
