import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import NavItem from "./NavItem";
import NewTransactionPanel from "./NewTransationPanel";
import logo from "../../../../assets/images/logo.png";
import SelectedShop from "./SelectedShop";
import { navItems } from "../../../../DummyData/DummyData";
import { useSelector, useDispatch } from "react-redux";
import { closeSideBar } from "../../../../action/dashboardAction";

export default function LeftSideBar(props) {
  const history = useHistory();
  const dispatch = useDispatch();

  const closeDrawer = useSelector((state) => state.dashboard.closeSide);

  let url = window.location.href.split("/").pop();
  const changeSelected = (item, index) => (event) => {
    var cleaned = item.text.toLowerCase().trim().replace(" ", "-");
    dispatch(closeSideBar(!closeDrawer));

    if (cleaned === "shop") {
      history.push("/shopPreview");
    } else {
      history.push(`/${cleaned}`);
    }
  };

  useEffect(() => {
    changeIndex();
  }, [url]);

  let changeIndex = () => {
    if (url === "dashboard" || url === "overview") {
      setItemIndex(0);
    } else if (url === "shopPreview") {
      setItemIndex(1);
    } else if (url === "transactions") {
      setItemIndex(2);
    } else if (url === "wallet") {
      setItemIndex(3);
    }
  };

  const [itemIndex, setItemIndex] = useState(0);

  return (
    <div
      style={{ position: "relative", height: "100vh", padding: "0px 0 0 0px" }}
    >
      <Grid container direction="column" spacing={3}>
        <Grid item style={{ cursor: "pointer" }}>
          <img
            onClick={() => history.push("/")}
            height="40"
            src={logo}
            alt="Powrsale logo"
          />
        </Grid>
        {/* <Grid item>
          <NewTransactionPanel />
        </Grid> */}
        <Grid item>
          {navItems &&
            navItems.map((item, index) => {
              return (
                <div onClick={changeSelected(item, index)} key={index}>
                  <NavItem
                    key={item.text}
                    text={item.text}
                    icon={item.icon}
                    selected={itemIndex === index ? true : false}
                  />
                </div>
              );
            })}
        </Grid>
      </Grid>
      <SelectedShop />
    </div>
  );
}
