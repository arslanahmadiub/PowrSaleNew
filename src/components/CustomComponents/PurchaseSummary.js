import React from "react";
import Styled from "styled-components";

const FlexContainer = Styled.div`
    display: flex;
    justify-content: space-between;
    padding: 15px 0;
`;

const ItemDescription = Styled.div`
    font-size: 20px;
    font-weight: 500;
    @media (max-width:930px){
        font-size: 16px;
    }

`;
const ItemPrice = Styled.div`
    font-size: 20px;
    font-weight: 500;
    @media (max-width:930px){
        font-size: 16px;
    }
`;
const DeliveryDescription = Styled.div`
    font-size: 20px;
    font-weight: 500;
    @media (max-width:930px){
        font-size: 18px;
    }
`;
const DeliveryPrice = Styled.div`
    font-size: 20px;
   
    min-width: 50px
    text-align: center;
    padding: 5px;
    font-weight: 500;
    @media (max-width:930px){
        font-size: 16px;
    }
`;
const TotalDescription = Styled.div`
    font-size: 24px;
    font-weight: 500;
    @media (max-width:930px){
        font-size: 18px;
    }
`;
const TotalPrice = Styled.div`
    font-size: 24px;
    font-weight: 500;
    @media (max-width:930px){
        font-size: 18px;
    }
`;

const PurchaseSummary = (props) => {
  const { item, itemCost, deliveryCharge, totalCost } = props.data;
  return (
    <div>
      <FlexContainer>
        <ItemDescription>{item && item}</ItemDescription>
        <ItemPrice>GHS {itemCost && itemCost}</ItemPrice>
      </FlexContainer>
      <FlexContainer>
        <DeliveryDescription>Delivery charge</DeliveryDescription>
        <DeliveryPrice>GHS {deliveryCharge && deliveryCharge}</DeliveryPrice>
      </FlexContainer>
      <FlexContainer>
        <TotalDescription>Total amount payable</TotalDescription>
        <TotalPrice>GHS {totalCost && totalCost}</TotalPrice>
      </FlexContainer>
      <FlexContainer></FlexContainer>
    </div>
  );
};

export default PurchaseSummary;
