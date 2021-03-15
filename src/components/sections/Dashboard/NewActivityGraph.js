import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import Grid from "@material-ui/core/Grid";
import { useSelector } from "react-redux";
import Chart from "react-apexcharts";

function NewActivityGraph(props) {
  const [graphData, setgraphData] = useState([]);

  let graphDataFromProps = () => {
    if (props.data.length > 0) {
      let activityData = [];

      props.data.map((item) => {
        let y = item.y;
        activityData.push(y);
      });
      setgraphData(activityData);
    }
  };

  useEffect(() => {
    graphDataFromProps();
  }, [props.data]);

  let options = {
    chart: {
      id: "apexchart-example",
      background: "#345gg",
    },
    dataLabels: {
      enabled: false,
    },
    grid: {
      show: false,
    },
    fill: {
      colors: ["#31BDF4", "#31BDF4"],
    },
    stroke: {
      show: true,
      curve: "smooth",
      colors: "#0800ff",
      width: 2,
      dashArray: 0,
    },
    title: {
      text: "Activity",
      align: "left",
      margin: 10,
      offsetX: 0,
      offsetY: 0,
      floating: true,
      style: {
        fontSize: "14px",
        fontWeight: "bold",
        fontFamily: undefined,
        color: "#263238",
      },
    },
    xaxis: {
      categories: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],

      axisBorder: {
        show: true,
        color: "#31BDF4",
        height: 3,
        width: "100%",
        offsetX: 0,
        offsetY: 0,
      },
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
      name: "Activity",
      data: graphData,
    },
  ];

  return (
    <Grid container>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
        <Chart
          options={options}
          series={series}
          type="area"
          height="250"
          width="100%"
        />
      </Grid>
    </Grid>
  );
}

export default NewActivityGraph;
