import React, { useEffect, useState } from "react";
import Styled from "styled-components";
import Grid from "@material-ui/core/Grid";
import BannerContainer from "../../CustomComponents/BannerContainer";
import TradingVolume from "./TradingVolume";
import NewActivityGraph from "./NewActivityGraph";
import PaymentLinkVisits from "./PaymentLinkVisits.js";
import TransactionStatus from "./TransactionStatus";
import NewOrders from "./NewOrders";
import Card from "../../CustomComponents/Card";
import FlatSelect from "../../CustomComponents/FlatSelect";
import { Hidden } from "@material-ui/core";
import ArcProgressBar from "../../CustomComponents/ArcProgressBar";
import { AuthContext } from "../../../contexts/AuthContext";
import CompleteProfile from "../Profile/CompleteProfile";
import { getDashboardData } from "../../../services/dashboardService";
import { useDispatch, useSelector } from "react-redux";
import { getFullUserDetails } from "../../../services/authServices";
import { imageEndPoint } from "../../../config.json";
import { setProfileImage } from "../../../action/authAction";
import { getShopIds } from "../../../services/dashboardService";
import { selectedShopId } from "../../../action/shopAction";
import { selectedShopName } from "../../../action/shopAction";
import { shopIdsAction } from "../../../action/shopAction";
import { profileDialogAction } from "../../../action/authAction";

const TopRow = Styled.div`
    display: flex;
    justify-content: space-between;
    color: #010101;
`;
const SubText = Styled.div`
    color: ${(props) => "#FFFFFF"};
    font-size: 18px;
     margin: 15px 0;
    @media (max-width: 960px){
        font-size: 12px;
    }
`;

const Title = Styled.div`
    color: ${(props) => (props.plain ? "#FFF" : "#010101")};
    font-size: 22px;
    font-weight: bold;
    margin: 0px 0;
    @media (max-width: 960px){
        font-size: 18px;
    };
`;

const Dashboard = (props) => {
  const [dataSet, changeDataSet] = React.useState(null);

  let dispatch = useDispatch();

  const { user } = React.useContext(AuthContext);

  const [activityData, setactivityData] = useState([]);
  const [profilePercent, setProfilePercent] = useState(null);

  const shopNameFromRedux = useSelector(
    (state) => state.shopPreview.selectedShop
  );

  let getProfileInfo = async () => {
    let { data } = await getFullUserDetails(userToken);

    if (data.Success) {
      dispatch(
        setProfileImage(imageEndPoint + data.Details[0].profile_picture)
      );
    }
  };

  let userToken = localStorage.getItem("token");

  let dashboardDataGet = async () => {
    try {
      let { data } = await getDashboardData(userToken);

      let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      let newTransactionVolume = [];

      if (data.Success) {
        setProfilePercent(data.Profile);
        data.transactionVolume.map((item, index) => {
          let transVolume = {
            percent: item.y,
            label: days[index],
          };
          newTransactionVolume.push(transVolume);
        });

        setactivityData(data.activityData);
        let newDashboardData = {
          growth: data.Growth,
          dayVolume: 23,
          newOrders: data.newOrders,
          paymentLinkVisitsData: {
            day: 0,
            week: data.shopLinkVisitData.week,
            month: 0,
          },
          shipped: 89,
          delivered: 90,
          completed: 344,

          transactionStatusData: data.transactionData,
          transactionVolume: newTransactionVolume,
        };

        changeDataSet(newDashboardData);
      }
    } catch (error) {}
  };

  useEffect(() => {
    getProfileInfo();
    dashboardDataGet();
    shopsIdsCollections();
  }, []);

  let shopsIdsCollections = async () => {
    let { data } = await getShopIds(userToken);
    if (data.Success && data.Details.length > 0) {
      if (shopNameFromRedux.length < 1) {
        dispatch(shopIdsAction(data.Details));
        dispatch(selectedShopId(data.Details[0].shop));
        dispatch(selectedShopName(data.Details[0].shop_name));
      }
    }
  };

  useEffect(() => {
    showProfileDialog();
  }, [profilePercent]);

  const data = { ...dataSet, ...user };

  let showProfileDialog = () => {
    if (profilePercent) {
      if (profilePercent === 100) {
        dispatch(profileDialogAction(false));
      } else {
        if (window.location.href.includes("dashboard")) {
          dispatch(profileDialogAction(true));
        }
      }
    }
  };
  return (
    <>
      <CompleteProfile />

      <Grid container direction="column" spacing={5}>
        <Hidden smDown>
          <Grid item>
            <TopRow>
              {profilePercent !== null && profilePercent < 100 ? (
                <Title>
                  {profilePercent !== null ? profilePercent : 0}% completed
                </Title>
              ) : null}

              {/* <FlatSelect
                list={[
                  "Jan - Feb, 2020",
                  "Mar - Apr, 2020",
                  "May - Jun, 2020",
                  "Jul - Aug, 2020",
                  "Sep - Oct, 2020",
                ]}
                bg
              /> */}
            </TopRow>
          </Grid>
        </Hidden>

        <Grid item>
          <BannerContainer centered>
            <div>
              <Title plain>Hi, {data && data.username && data.username}</Title>
              <SubText>
                Welcome to Powrsale Dashboard. Setup your shop and make your
                first transaction.
              </SubText>
            </div>
          </BannerContainer>
        </Grid>

        <Grid item>
          <Grid container spacing={2} direction="row">
            <Grid xs={12} md={6} item>
              <Card>
                <NewActivityGraph
                  data={activityData.length > 0 ? activityData : []}
                />
              </Card>
            </Grid>
            <Grid xs={12} md={3} item>
              <PaymentLinkVisits data={data && data.paymentLinkVisitsData} />
            </Grid>
            <Grid xs={12} md={3} item>
              <Grid container spacing={2} direction="row">
                <Grid xs={6} md={12} item>
                  <Card>
                    <ArcProgressBar
                      label={"Growth this week"}
                      thickness={10}
                      percent={(data && data.growth && data.growth) || 0}
                      SelectedShop
                      secondary
                      arc
                    >
                      {(data && data.growth && data.growth) || 0}
                    </ArcProgressBar>
                  </Card>
                </Grid>
                <Grid xs={6} md={12} item>
                  <NewOrders
                    value={(data && data.newOrders && data.newOrders) || 0}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid container spacing={3} direction="row">
            <Grid xs={12} md={6} item>
              <TradingVolume data={data && data.transactionVolume} />
            </Grid>
            <Grid xs={12} md={6} item>
              <TransactionStatus data={data && data.transactionStatusData} />
            </Grid>
          </Grid>
        </Grid>
        <Grid item></Grid>
      </Grid>
    </>
  );
};

export default Dashboard;
