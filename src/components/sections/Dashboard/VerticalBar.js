import React from "react";
import Styled from "styled-components";

const Label = Styled.div`
    font-size: 12px;
    color: #979FAA;
    text-align: center;
    line-height: 20px;
    width: 100%;
    position: absolute;
    bottom: 0;
    `;

const InnerBar = Styled.div`
    background: #5A36CC;
    position: absolute;
    border-radius: 3px;
    bottom: 0px;
    width: 100%;
    height:${(p) => (Number(p.percent) ? Number(p.percent) : 10)}%;
    `;
const OutterBar = Styled.div`
    position: absolute;
    background: #F5F8FD;
    border-radius: 3px;
    width: 15px;
    bottom: 20px;
    height: 95%;
    `;

const Container = Styled.div`
    width: 15px;
    height: 100%;
    position: absolute;
    bottom: 0;
`;

const VerticalBar = (props) => {
  return (
    <Container>
      <OutterBar>
        <InnerBar percent={(props && props.percent && props.percent) || 0} />
      </OutterBar>
      <Label>{props.label && props.label}</Label>
    </Container>
  );
};

export default VerticalBar;
