import React, { Component } from "react";
import { Line } from "react-chartjs-2";

class LineChart extends Component {
  render() {
    return (
      <div>
        <Line data={this.props.chartData} />
      </div>
    );
  }
}

export default LineChart;
