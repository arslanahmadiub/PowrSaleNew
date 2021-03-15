import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import Avatar from "@material-ui/core/Avatar";
import ExpandMore from "@material-ui/icons/ExpandMore";
import ExpandLess from "@material-ui/icons/ExpandLess";
import { ShopContext } from "../../../../contexts/ShopContext";
import Styled from "styled-components";
import { ClickAwayListener } from "@material-ui/core";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { selectedShopId } from "../../../../action/shopAction";
import { selectedShopName } from "../../../../action/shopAction";
import { logoImageFile } from "../../../../action/fileSaveAction";

import { imageEndPoint } from "../../../../config.json";

const List = Styled.ul`
    padding: 18px 8px;
  margin: 0;
  top: 0px;
  width: 100%;
  padding-left: 1em;
  background: #ffffff;
  border-top-right-radius: 0;
  border-top-left-radius: 0;
  border-radius: 10px;
  box-sizing: border-box;
  position:absolute;
  z-index: 100;
  cursor: pointer;
  box-shadow: 1px 1px 2px 0px lightgrey;
  display: ${(p) => (!p.show ? "none" : "")};
  
`;
const ListItem = Styled.li`
  list-style: none;
  cursor: pointer;
  padding: 2px;
  margin: 5px 0px;
  color: grey;
  &:hover{
      background:#979FAA;
      opacity: 0.5;
      color: #000;
  }
`;

const SelectedShop = (props) => {
  const [show, setShow] = React.useState(false);
  //   const { shops, currentShop, changeShop } = React.useContext(ShopContext);
  const shops = useSelector((state) => state.shopPreview.shopIdCollections);
  const selectedShop = useSelector((state) => state.shopPreview.selectedShop);
  const slectedShop = useSelector((state) => state.shopPreview.selectedShopId);

  let dispatch = useDispatch();
  const [logoImage, setLogoImage] = useState(null);
  const history = useHistory();

  let setFirstImage = () => {
    if (shops.length > 0) {
      const found = shops.find((element) => element.shop === slectedShop);

      if (found) {
        setLogoImage(imageEndPoint + found.shop_logo);
      } else {
        setLogoImage(imageEndPoint + shops[0].shop_logo);
      }
    }
  };

  useEffect(() => {
    setFirstImage();
  }, [shops]);

  function onChange(shop) {
    if (shop === "Create") {
      history.push("/shopPreview");
      // dispatch(logoImageFile(null));

      setLogoImage(null);
      dispatch(selectedShopId(""));
      dispatch(selectedShopName(""));
    } else {
      // dispatch(logoImageFile([]));

      dispatch(selectedShopId(shop.shop));
      dispatch(selectedShopName(shop.shop_name));
      setLogoImage(imageEndPoint + shop.shop_logo);
    }
  }

  return (
    <ClickAwayListener onClickAway={() => setShow(false)}>
      <div
        style={{
          padding: "0  0 0 0px",
          position: "absolute",
          bottom: "20%",
          width: "80%",
          display: shops.length > 0 ? "" : "none",
        }}
      >
        <div
          style={{
            fontSize: "18px",
            fontWeight: "500",
            color: "#010101",
            padding: "10px 5px",
          }}
        >
          Selected shop
        </div>

        <div
          onClick={() => setShow(!!shops && !show)}
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "5px",
            position: "relative",
            cursor: "pointer",
          }}
        >
          <div
            style={{ display: "flex", justifyContent: "normal", heigth: "" }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <div style={{ marginRight: "10px" }}>
                <Avatar alt="L" src={logoImage && logoImage} />
              </div>
              <div>
                {selectedShop.length > 0 ? selectedShop : "Create Shop"}
              </div>
            </div>
          </div>
          <div style={{ lineHeight: "0px", color: "#979FAA" }}>
            {show ? <ExpandLess /> : <ExpandMore />}
          </div>
        </div>
        <List onClick={() => setShow(!!shops && !show)} show={shops && show}>
          <ListItem onClick={() => onChange("Create")}>Create Shop</ListItem>
          {shops != null &&
            shops.map((shop) => {
              return (
                <ListItem key={shop?.shop} onClick={() => onChange(shop)}>
                  {shop?.shop_name}
                </ListItem>
              );
            })}
        </List>
      </div>
    </ClickAwayListener>
  );
};

export default SelectedShop;
