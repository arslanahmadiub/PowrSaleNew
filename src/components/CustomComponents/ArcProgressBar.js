import React from "react";
import Styled from "styled-components";

const SVG = Styled.svg`
    position: relative;
    z-index: 100;
    
`;
const Circle = Styled.circle`
    margin: auto;
    width: 100%;
    heigth: 100%;
    fill: none;
    stroke: #5A36CC;
    stroke-width:10;
    stroke-linecap: round;
    stroke-dasharray: ${(props) =>
      props.percent
        ? `${(314 * props.percent) / 100} ${
            (314 * (100 - props.percent)) / 100
          }`
        : 314};
    stroke-dashoffset: 157;
    `;
const Circle1 = Styled.circle`
    margin: auto;
    width: 100%;
    heigth: 100%;
    fill: none;
    stroke: #F5F8FD;
    stroke-width:10;
    stroke-linecap: round;
    stroke-dasharray: 157 157;
    stroke-dashoffset: 157;
    `;

const Text = Styled.text`
    font-size: 20px;
    font-weight: 500;
    stroke: #010101;
    text-align: center;
    postion: absolute;

`;

const SmallLabel = Styled.text`
    fill: #979FAA;
    font-size: 12px;
    text-align: center;
    
`;

const ArcProgressBar = (props) => {
  const percent = 0.5 * props.percent;
  const label = props.label;
  return (
    <SVG width={111} height={80}>
      <Circle1 cx="55" cy="55" r="50" />
      <Circle
        cx="55"
        cy="55"
        r="50"
        percent={percent === 0 || percent < 0 ? 1 : percent > 50 ? 50 : percent}
      />
      <Text x="30%" y="70%">
        {props.children}%
      </Text>

      <SmallLabel x="10%" y="100%">
        {label}
      </SmallLabel>
    </SVG>
  );
};

export default ArcProgressBar;
