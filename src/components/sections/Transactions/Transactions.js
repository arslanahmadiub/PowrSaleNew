import Tabs from "../../CustomComponents/Tabs";
import React, { useState, useEffect } from "react";
import Styled from "styled-components";
import FlatSelect from "../../CustomComponents/FlatSelect";
import { Hidden } from "@material-ui/core";
import RenderTransactions from "./RenderTransactions";
import { useSelector, useDispatch } from "react-redux";
import { getProgressTransistion } from "../../../services/transistionServices";
import moment from "moment";
import CompleteProfile from "../Profile/CompleteProfile";

const TopRow = Styled.div`
    display: flex;
    justify-content: space-between;
    font-size: 30px;
    font-weight: 500;
    color: #010101;
`;
const RenderButtons = Styled.div`
display: flex;
justify-content: space-between;
width: 35%;

`;

const Body = Styled.div`

`;

const Transactions = (props) => {
  let userToken = localStorage.getItem("token");
  const [transisction, setTransiscton] = useState(null);
  const [transisctionHistory, setTransisctonHistory] = useState(null);

  const functionRecall = useSelector((state) => state.wallet.transaction);

  useEffect(() => {
    getTransistion();
  }, [functionRecall]);

  let getTransistion = async () => {
    let { data } = await getProgressTransistion(userToken, "inprogress");

    if (data.Success) {
      let transistionData = [];
      data.Details.map((item) => {
        const m2 = moment(item.created_at);
        let time = m2.format("h:mm");
        let date = m2.format("YYYY MM DD");

        let newTransistion = {
          id: item.txID,
          title: item.shop_name,
          description: item.shop_description,
          amount: item.amount,
          date: date,
          time: time,
          status: item.delivery_status
            ? item.delivery_status
            : item.payment_status,
        };
        transistionData.push(newTransistion);
      });
      setTransiscton(transistionData);
    }
  };

  let getTransistionWithHistory = async () => {
    try {
      let { data } = await getProgressTransistion(userToken, "history");
      if (data.Success) {
        let transistionData = [];
        data.Details.map((item) => {
          const m2 = moment(item.created_at);
          let time = m2.format("h:mm");
          let date = m2.format("YYYY MM DD");

          let newTransistion = {
            id: item.txID,
            title: item.shop_name,
            description: item.shop_description,
            amount: item.amount,
            date: date,
            time: time,
            status: item.delivery_status,
          };
          transistionData.push(newTransistion);
        });
        setTransisctonHistory(transistionData);
      }
    } catch (error) {
      setTransisctonHistory([]);
    }
  };

  useEffect(() => {
    getTransistion();
    getTransistionWithHistory();
  }, []);
  return (
    <div>
      <CompleteProfile />
      <Hidden smDown>
        <TopRow>
          <div>Transactions</div>
          {/* <RenderButtons>
            <FlatSelect
              list={[
                "Jan - Feb, 2020",
                "Mar - Apr, 2020",
                "May - Jun, 2020",
                "Jul - Aug, 2020",
                "Sep - Oct, 2020",
              ]}
              bg
            />
          </RenderButtons> */}
        </TopRow>
      </Hidden>

      <Body>
        <Tabs headers={["In Progress", "History"]}>
          <RenderTransactions transactions={transisction} />
          <RenderTransactions history transactions={transisctionHistory} />
        </Tabs>
      </Body>
    </div>
  );
};

export default Transactions;
