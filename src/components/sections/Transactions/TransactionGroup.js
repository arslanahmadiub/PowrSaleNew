import React from "react";
import Styled from "styled-components";
import TransactionItem from "./TransactionItem";

const Container = Styled.div``;

const Title = Styled.div`
    text-transform: uppercase;
    font-size: 16px;
    color: #979FAA;
    font-weight: 600;
    margin: 5px 0;
`;

const Body = Styled.div`
    margin: 20px 0;
`;

const TransactionGroup = (props) => {
  const title = props.title;
  const transactions = props.transactions;

  return (
    <Container>
      <Title>{title && title}</Title>
      <Body>
        {transactions &&
          transactions.map((item, index) => {
            return (
              <div key={index} style={{ margin: "30px 0" }}>
                <TransactionItem
                  secondaryButtonText={props.secondaryButtonText}
                  primaryButtonText={props.primaryButtonText}
                  history={props.history}
                  data={item}
                />
              </div>
            );
          })}
      </Body>
    </Container>
  );
};

export default TransactionGroup;
