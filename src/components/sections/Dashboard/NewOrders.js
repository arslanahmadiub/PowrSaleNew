import React from "react";
import Styled from "styled-components";
import Card from "../../CustomComponents/Card";

const LargeBoldText = Styled.div`
    color: #31BDF4;
    font-weight: bolder;
    margin: ${(props) => (props.margin ? props.margin : "0")}px;
    font-size: ${(props) => (props.size ? props.size : 20)}px;
    text-align: center;
`;

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

const NewOrders = (props) => {
  const val = props.value;

  return (
    <Card>
      <LargeBoldText margin={5} size={40}>
        {val}
      </LargeBoldText>
      <SmallFadedLabel>New Orders</SmallFadedLabel>
    </Card>
  );
};

export default NewOrders;
