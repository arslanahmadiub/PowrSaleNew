import React from "react";
import Styled from "styled-components";
import BarChart from "./BarChart";
import Card from "../../CustomComponents/Card";
import FlatSelect from "../../CustomComponents/FlatSelect";
import { transactionVolumeData } from "../../../DummyData/DummyData";
const TopRow = Styled.div`
    display: flex;
    justify-content: space-between;
    padding: 5px 0 25px 0;;
    position: relative;
    width: 100%;
    height: 16px;
    `;
const Title = Styled.div`
    font-size: 14px;
    font-weight: 600;
`;

const TradingVolume = (props) => {
  return (
    <Card>
      <TopRow>
        <Title>Transaction Volume</Title>
        <FlatSelect list={transactionVolumeData} />
      </TopRow>
      <br />
      <br />
      <br />
      <BarChart data={props.data && props.data} />
    </Card>
  );
};

export default TradingVolume;
