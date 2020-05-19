import React, { Component } from "react";
import { Doughnut } from "react-chartjs-2";

class Chart extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <Doughnut
          data={this.props.chartData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            title: {
              display: true,
              text: this.props.title,
              fontSize: 20,
            },
            legend: {
              display: true,
              position: "right",
            },
          }}
        />
      </div>
    );
  }
}
export default Chart;
