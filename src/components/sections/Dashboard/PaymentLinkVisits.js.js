import React from "react";
import Styled from "styled-components";
import Card from "../../CustomComponents/Card";

const Selector = Styled.div`
    display: flex;
    cursor: pointer;
    justify-content: space-evenly;
    border-radius: 50px;
    border: 0.5px solid #979FAA;
    color: #979FAA;
    width: 100%;
    margin: auto;
    @media (max-width: 960px){
        width: 50%;
    }
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

const LargeBlackBoldText = Styled.div`
    color: #010101;
    font-weight: bolder;
    margin: ${(props) => (props.margin ? props.margin : "0")}px;
    font-size: ${(props) => (props.size ? props.size : 20)}px;
    text-align: center;
`;

const PaymentLinkVisits = (props) => {
  const [index, setIndex] = React.useState(0);
  const data = [props?.data?.day, props?.data?.week, props?.data?.month];
  const changeIndex = (index) => (event) => {
    event.stopPropagation();
    setIndex(index);
  };
  return (
    <Card>
      <Selector>
        <SmallFadedLabel
          onClick={changeIndex(0)}
          borderLeftRadius
          padding={6}
          selected={index === 0}
          borderRight
        >
          Day
        </SmallFadedLabel>
        <SmallFadedLabel
          onClick={changeIndex(1)}
          padding={6}
          selected={index === 1}
          borderRight
        >
          Week
        </SmallFadedLabel>
        <SmallFadedLabel
          borderRightRadius
          onClick={changeIndex(2)}
          padding={6}
          selected={index === 2}
        >
          Month
        </SmallFadedLabel>
      </Selector>
      <LargeBlackBoldText margin={35} size={50}>
        {data[index] || 0}
      </LargeBlackBoldText>

      <SmallFadedLabel>Shop link visits</SmallFadedLabel>
    </Card>
  );
};

export default PaymentLinkVisits;
