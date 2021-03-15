import React from "react";
import Styled from "styled-components";
import Card from "../../CustomComponents/Card";
import ArcProgressBar from "../../CustomComponents/ArcProgressBar";

const SmallFadedLabel = Styled.div`
    font-size: 12px;
    border-radius: ${(props) => (props.selected ? "50px" : "0")};
    border-bottom-left-radius: ${(props) =>
      props.selected && props.borderLeftRadius ? "50px" : "0"};
    border-bottom-right-radius: ${(props) =>
      props.selected && props.borderRightRadius ? "50px" : "0"};
    border-top-right-radius: ${(props) =>
      props.selected && props.borderRightRadius ? "50px" : "0"};
    border-top-left-radius: ${(props) =>
      props.selected && props.borderLeftRadius ? "50px" : "0"};
    color: ${(props) => (props.selected ? "#fff" : "#979FAA")};
    background: ${(props) => (props.selected ? "#31BDF4" : "")};
    text-align: center;
    line-height: 20px;
    width: 100%;
    padding: ${(props) => (props.padding ? props.padding : "0")}px;
    border: ${(props) => (props.bordered ? "0.5px solid #979FAA" : "none")};
    border-right: ${(props) =>
      props.borderRight ? "0.5px solid #979FAA" : "none"};
    border-left: ${(props) =>
      props.borderLeft ? "0.5px solid #979FAA" : "none"};
`;

const Growth = (props) => {
  return (
    <Card>
      <ArcProgressBar percent={50} />

      <SmallFadedLabel>Growth this week</SmallFadedLabel>
    </Card>
  );
};

export default Growth;
