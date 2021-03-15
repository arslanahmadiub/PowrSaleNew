import React from "react";
import VerticalBar from "./VerticalBar";
import Styled from "styled-components";

const Container = Styled.div`
    display: flex;
    justify-content: space-evenly;
    padding: 50px 0;
    position: relative;
    width: 100%;
    `;

const BarChart = (props) => {
  const data = props.data;

  return (
    <Container>
      {data &&
        data.map((item, index) => {
          return (
            <div key={index}>
              <VerticalBar percent={item.percent} label={item.label} />
            </div>
          );
        })}
    </Container>
  );
};

export default BarChart;
