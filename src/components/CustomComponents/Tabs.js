import React, { useEffect } from "react";
import Styled from "styled-components";
import { selectedTabIndex } from "../../action/shopAction";
import { useDispatch, useSelector } from "react-redux";

import { reCallTransisation } from "../../action/walletAction";

const TabHeader = Styled.div`
    display: flex;
    height: 50px;
    border-bottom: .05px solid lightgrey;
    width: 100%;
    position: relative;
    `;
const TabLabelItem = Styled.div`
    font-size: 20px;
    line-height: 50px;
    cursor: pointer;
    font-weight: 500;
    position: relative;
    color: ${(props) => (props.selected ? "#31BDF4" : "#010101")};
    padding: 0px 20px;
    border-bottom: ${(props) => (props.selected ? "2px solid #31BDF4" : 0)};
    @media (max-width: 960px){
        font-size: 12px;
    }
`;

const TabBody = Styled.div`
    position: relative;
    top: 25px;

`;

const Tabs = (props) => {
  const dispatch = useDispatch();
  const [selectedTab, setSelectedTab] = React.useState(0);
  const headers = props.headers;
  const changeTab = (index) => (event) => {
    setSelectedTab(index);
    dispatch(selectedTabIndex(index));
  };
  const functionRecall = useSelector((state) => state.wallet.transaction);

  useEffect(() => {
    dispatch(reCallTransisation(!functionRecall));
  }, [selectedTab]);

  return (
    <div>
      <TabHeader>
        {headers &&
          headers.map((header, index) => {
            return (
              <TabLabelItem
                key={header}
                onClick={changeTab(index)}
                selected={selectedTab === index}
              >
                {header}
              </TabLabelItem>
            );
          })}
      </TabHeader>
      <TabBody>{props.children && props.children[selectedTab]}</TabBody>
    </div>
  );
};

export default Tabs;
