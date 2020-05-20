import React, { Component } from "react";
import LineChart from "./LineChart";

class ActiveCasesLineChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: {},
    };
  }

  componentWillMount() {
    this.getChartData();
  }

  getDateLabel(timeStamp) {
    const date = new Date(timeStamp);
    const months = {
      "1": "Jan",
      "2": "Feb",
      "3": "Mar",
      "4": "Apr",
      "5": "May",
      "6": "Jun",
      "7": "Jul",
      "8": "Aug",
      "9": "Sep",
      "10": "Oct",
      "11": "Nov",
      "12": "Dec",
    };
    return months[date.getMonth() + 1] + " " + (date.getDate() + 1);
  }

  getChartData() {
    fetch(
      "https://api.covid19api.com/live/country/united-states/status/confirmed"
    )
      .then((res) => res.json())
      .then(
        (result) => {
          const filteredData = result
            .map((data) => {
              return {
                Date: data.Date,
                Active: data.Active,
              };
            })
            .reduce((rv, x) => {
              const item = rv.find((i) => i.Date === x.Date);
              if (item) {
                item.Active += x.Active;
              } else {
                rv.push(x);
              }
              return rv;
            }, []);

          this.setState({
            chartData: {
              labels: filteredData.map((data) => this.getDateLabel(data.Date)),
              datasets: [
                {
                  backgroundColor: "#add8e6",
                  borderColor: "#003366",
                  label: "Active Cases",
                  data: filteredData.map((data) => data.Active),
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
      <div>
        <LineChart chartData={this.state.chartData} />
      </div>
    );
  }
}

export default ActiveCasesLineChart;
