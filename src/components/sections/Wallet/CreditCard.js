import React from "react";
import Styled from "styled-components";

const Container = Styled.div`
    border-radius: 12px;
    padding: 10px 12px;
    height: 170px;
    color: #fff;
    position: relative;
    background: #a73737;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #7a2828, #a73737);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #7a2828, #a73737); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    width:300px;
    display: inline-block;
    margin: 0 5px;
`;
const MomoContainer = Styled.div`
    border-radius: 12px;
    padding: 10px 12px;
    height: 170px;
    color: #fff;
    position: relative;
    background: #000000;
    width:300px;
    display: inline-block;
    margin: 0px 10px 10px 0;
`;

const Name = Styled.div`
    font-size: 20px;
    font-weight: 500;
    color: #fff;
    width: 260px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const Type = Styled.div`
    font-size: 10px;
    font-weight: 500;
    line-height: 21px;
`;
const Country = Styled.div`
    font-size: 10px;
    font-weight: 500;
    margin: 10px 0;    
`;

const Number = Styled.div`
    letter-spacing: 3px;
    font-weight: 500;
    margin: 10px 0;
`;
const Date = Styled.div`
    font-size: 20px;
    font-weight: 500;
    margin: 10px 0;
`;

const HeaderRow = Styled.div`
    display: flex;
    margin: 10px 0 20px 0;
    justify-content: space-between;
`;
const Circle = Styled.div`
    width: 20px;
    position: ;
    z-index: 10;
    height: 20px;
    border: solid 0.52px black;
    background: #979FAA;
    border-radius: 50px;
`;
const Circle1 = Styled.div`
    width: 20px;
    position:relative;
    right: -10px;
    z-index: 100;
    height: 20px;
    background: #F5F8FD;
    border-radius: 50px;
`;

const IntersectingCircle = Styled.div`
    display: flex;
    position: absolute;
    bottom: 10px;
    right: 10px;
    float: right;
`;

const CreditCard = ({ data, selected, ...props }) => {
  const { name, country, number, network } = data || {};

  const styles = selected && { boxShadow: "3px 3px 5px 3px #000" };

  return (
    <Container style={styles || {}}>
      <HeaderRow>
        <Name>{name && name}</Name>
        <Country>{country && country}</Country>
      </HeaderRow>
      <Type>{network && network.toUpperCase() + " MoMo"}</Type>

      <Number>{number && number}</Number>
      {/* <Date>{date && date}</Date> */}
      <IntersectingCircle>
        <Circle1 />
        <Circle />
      </IntersectingCircle>
    </Container>
  );
};

const MoMoCard = ({ data, selected, ...props }) => {
  const { name, country, number, date, network } = data;
  const styles = selected && { boxShadow: "3px 3px 5px 3px #a73737" };
  return (
    <MomoContainer style={styles || {}}>
      <HeaderRow>
        <Name>{name && name}</Name>
        <Type>{network && network.toUpperCase()}</Type>
      </HeaderRow>
      <Country>{country && country}</Country>
      <Number>{number && number}</Number>
      <Date>{date && date}</Date>
      <IntersectingCircle>
        <Circle1 />
        <Circle />
      </IntersectingCircle>
    </MomoContainer>
  );
};
export { CreditCard, MoMoCard };
export default CreditCard;
