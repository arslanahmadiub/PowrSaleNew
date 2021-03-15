import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import Chart from "react-apexcharts";

function NewTransactionStatus(props) {
  const [graphData, setGraphData] = useState([]);
  let defectorData = () => {
    let newData = [];
    props.data.map((item) => {
      let y = item.y;
      newData.push(y);
    });
    setGraphData(newData);
  };

  useEffect(() => {
    defectorData();
  }, [props.data]);

  let options = {
    chart: {
      id: "apexchart-example",
    },
    dataLabels: {
      enabled: false,
    },
    grid: {
      show: false,
    },
    fill: {
      colors: [props.graphColor, props.graphColor, props.graphColor],
    },
    stroke: {
      show: true,
      curve: "smooth",
      colors: "#0800ff",
      width: 2,
      dashArray: 0,
    },
    xaxis: {
      categories: ["", "", "", "", "", "", ""],
      axisBorder: {
        show: true,
        color: props.lineColor,
        height: 3,
        width: "100%",
        offsetX: 0,
        offsetY: 0,
      },
      show: false,
    },

    yaxis: {
      show: false,
    },
    chart: {
      toolbar: {
        show: false,
      },
    },
  };
  let series = [
    {
      type: "area",
      name: props.status,
      data: graphData,
    },
  ];
  return (
    <Chart
      options={options}
      series={series}
      type="area"
      height="200"
      width="100%"
    />
  );
}

export default NewTransactionStatus;
