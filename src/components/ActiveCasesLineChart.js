import React, { Component } from "react";
import LineChart from "./LineChart";

class ActiveCasesLineChart extends Component {
  getChartData() {
    fetch(
      "https://api.covid19api.com/live/country/united-states/status/confirmed"
    )
      .then((res) => res.json())
      .then(
        (result) => {
          const fileteredData = result.Countries.map((data) => {
            return {
              Date: data.Date,
              Active: data.Active,
            };
          }).reduce((rv, x) => {
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
}

export default ActiveCasesLineChart;
