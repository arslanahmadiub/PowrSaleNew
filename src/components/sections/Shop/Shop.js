import React, { useState, useEffect, useRef } from "react";
import Button from "../../CustomComponents/Button";
import ShopProfileForm from "../../Forms/ShopProfileForm";
import AddProductForm from "../../Forms/AddProductForm";

import Tabs from "../../CustomComponents/Tabs";
import Catalog from "./Catalog";
import CircularProgress from "@material-ui/core/CircularProgress";
import Backdrop from "@material-ui/core/Backdrop";
import { ToastContainer, toast } from "react-toastify";

import DesktopHeaderRow from "../../CustomComponents/DesktopHeaderRow";
import Grid from "@material-ui/core/Grid";
import { Dialog, DialogActions } from "@material-ui/core";
import ProductDisplay from "./ProductDisplay/ProductDisplay";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { shopPreviewDialog } from "../../../action/shopAction";
import { clearFormData } from "../../../action/shopAction";
import { shopCreate } from "../../../services/shopServices";
import { selectedShopId } from "../../../action/shopAction";
import { selectedShopName } from "../../../action/shopAction";
import { shopIdsAction } from "../../../action/shopAction";
import { saveShopData } from "../../../action/shopAction";
import { shopCreateLoading } from "../../../action/shopAction";
import { getShopIds } from "../../../services/dashboardService";
import { CopyToClipboard } from "react-copy-to-clipboard";
import CompleteProfile from "../Profile/CompleteProfile";
import { Hidden } from "@material-ui/core";
import { useHistory } from "react-router";
import { makeStyles } from "@material-ui/core/styles";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import move from "lodash-move";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#31BDF4",
    background: "rgba(182,172,162,0.2)",
  },
}));

export default function Shop(props) {
  // const [preview, togglePreview] = React.useState(false);
  const [publish, togglePublish] = React.useState(false);
  const [enable, setEnable] = useState(false);
  let [loading, setLoading] = useState(false);
  const classes = useStyles();
  const history = useHistory();

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [publishData, setPublishData] = useState({});
  const createShop = useSelector((state) => state.shopPreview.shopData);
  const shopIds = useSelector((state) => state.shopPreview.shopIdCollections);
  const selectedShop = useSelector((state) => state.shopPreview.selectedShopId);
  const selectedTabIndex = useSelector(
    (state) => state.shopPreview.selectedTab
  );
  const createShopData = useSelector((state) => state.shopPreview);
  const preview = useSelector((state) => state.shopPreview.preview);
  const logoFile = useSelector((state) => state.logoImage.logoFile);
  const logoUrl = useSelector((state) => state.logoImage.logo);
  const loadingComponent = useSelector(
    (state) => state.shopPreview.loadingDialog
  );

  let shopWidthRef = useRef();

  let dispatch = useDispatch();

  useEffect(() => {
    if (loadingComponent) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [loadingComponent]);
  const shopNameFromRedux = useSelector(
    (state) => state.shopPreview.selectedShop
  );
  const shopIdsFromRedux = useSelector(
    (state) => state.shopPreview.shopIdCollections
  );

  const [copyShopStyle, setCopyShopStyle] = useState(false);

  let togglePreview = () => {
    dispatch(shopPreviewDialog(false));
  };
  let userToken = localStorage.getItem("token");

  let shopIdsCollectionForCreateShop = async () => {
    let { data } = await getShopIds(userToken);

    if (data.Success && data.Details.length > 0) {
      let arr = move(data.Details, data.Details.length - 1, 0);
      dispatch(selectedShopId(arr[0].shop));
      dispatch(selectedShopName(arr[0].shop_name));
      dispatch(shopIdsAction(arr));
    }
  };
  const emailToast = () => {
    toast.success("Shop Created...", {
      position: "top-right",
      autoClose: 5000,
      draggable: false,
    });
  };
  let handelPublishShop = async () => {
    if (Object.keys(createShop).length > 0) {
      let {
        address,
        bio,
        city,
        country,
        email,
        facebook,
        instagram,
        name,
        phone,
        twitter,
        type,
        whatsapp,
      } = createShop;
      let form_data = new FormData();
      form_data.append("shop_name", name);
      form_data.append("business_type", type);
      form_data.append("country", country);
      form_data.append("city", city);
      form_data.append("address", address);
      form_data.append("business_phone", phone);
      form_data.append("business_email", email);
      form_data.append("shop_bio", bio);
      form_data.append("shop_logo", logoFile);
      form_data.append("instagram_link", instagram);
      form_data.append("facebook_link", facebook);
      form_data.append("twitter_link", twitter);
      form_data.append("whatsapp_number", whatsapp);

      try {
        dispatch(shopCreateLoading(true));
        let { data } = await shopCreate(form_data, userToken);

        if (data.Success) {
          dispatch(shopCreateLoading(false));
          emailToast();
          setTimeout(() => {
            dispatch(shopPreviewDialog(false));
          }, 1000);
          let shopPreview = {
            logo: logoUrl,
            name: name,
            brief: bio,
            social: { fb: facebook, ig: instagram, wp: whatsapp, tt: twitter },
            contacts: {
              phone: phone,
              email: email,
              address: address,
            },
            description: type,
            shopId: data.ID,
          };
          setPublishData(shopPreview);
          dispatch(shopCreateLoading(false));

          dispatch(clearFormData(true));
          shopIdsCollectionForCreateShop();
          togglePublish(true);
          dispatch(saveShopData({}));
        }
      } catch (error) {
        dispatch(shopCreateLoading(false));
      }
    }
  };

  let siteAddress = window.location.href;
  let copyAddress =
    siteAddress.slice(0, siteAddress.lastIndexOf("/") + 1) +
    "shop/" +
    selectedShop;

  let handelViewShop = () => {
    window.open(copyAddress, "_blank");
  };

  let publicButton = () => {
    if (selectedShop) {
      return (
        <Button onClick={handelViewShop} width="170px" height="20px">
          VIEW SHOP
        </Button>
      );
    }
  };

  let handelCopyShopLink = () => {
    setCopyShopStyle(true);
    setTimeout(() => {
      setCopyShopStyle(false);
    }, 2000);
  };

  return (
    <div ref={shopWidthRef}>
      <Hidden mdUp>
        <Grid container>
          <Grid
            item
            xs={6}
            style={{
              marginTop: "10px",
              display: "flex",
              width: "100%",
              height: "50px",
            }}
          >
            {selectedShop.length > 0 ? (
              <div style={{ display: "flex" }}>
                <FileCopyIcon
                  style={{
                    color: copyShopStyle ? "#979FAA" : "black",
                    cursor: "pointer",
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                />

                <CopyToClipboard text={copyAddress}>
                  <h4
                    style={{
                      color: copyShopStyle ? "#979FAA" : "black",
                      cursor: "pointer",
                    }}
                    onClick={handelCopyShopLink}
                  >
                    Copy Shop Link
                  </h4>
                </CopyToClipboard>
              </div>
            ) : null}
          </Grid>
          <Grid
            item
            xs={6}
            style={{
              marginTop: "10px",
              display: "flex",
              width: "100%",

              justifyContent: "flex-end",
            }}
          >
            {selectedShop.length > 0 ? (
              <div style={{ display: "flex" }}>
                <h4 style={{ color: "#31BDF4" }}>Shop Id: #{selectedShop} </h4>
              </div>
            ) : null}
          </Grid>
        </Grid>
      </Hidden>
      <CompleteProfile />
      <DesktopHeaderRow title="Shop">
        <Hidden smDown>
          <Grid container>
            <Grid
              item
              xs={4}
              style={{
                marginTop: "10px",
                display: "flex",
                width: "100%",
                height: "50px",

                justifyContent: "flex-end",
              }}
            >
              {selectedShop.length > 0 ? (
                <div style={{ display: "flex" }}>
                  <FileCopyIcon
                    style={{
                      color: copyShopStyle ? "#979FAA" : "black",
                      cursor: "pointer",
                      display: "flex",
                      justifyContent: "flex-end",
                    }}
                  />

                  <CopyToClipboard text={copyAddress}>
                    <h4
                      style={{
                        color: copyShopStyle ? "#979FAA" : "black",
                        cursor: "pointer",
                      }}
                      onClick={handelCopyShopLink}
                    >
                      Copy Shop Link
                    </h4>
                  </CopyToClipboard>
                </div>
              ) : null}
            </Grid>

            <Grid
              item
              xs={4}
              style={{
                marginTop: "10px",
                display: "flex",
                width: "100%",

                justifyContent: "flex-end",
              }}
            >
              {selectedShop.length > 0 ? (
                <div style={{ display: "flex" }}>
                  <h4 style={{ color: "#31BDF4" }}>
                    Shop Id: #{selectedShop}{" "}
                  </h4>
                </div>
              ) : null}
            </Grid>

            <Grid
              item
              xs={4}
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "flex-end",
              }}
            >
              {selectedTabIndex === 0 ? publicButton() : null}
            </Grid>
          </Grid>
        </Hidden>
        <Hidden mdUp>
          <Grid container>
            <Grid
              item
              xs={12}
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "flex-end",
              }}
            >
              {selectedTabIndex === 0 ? publicButton() : null}
            </Grid>
          </Grid>
        </Hidden>
      </DesktopHeaderRow>

      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>

      <Tabs headers={["Shop Profile", "Catalog", "Add Product"]}>
        <ShopProfileForm />
        <Catalog />
        <AddProductForm />
      </Tabs>

      {/* Preveiw version */}
      <Dialog open={preview} fullScreen>
        <DialogActions style={{ background: "#f5f8fd" }}>
          <Button onClick={togglePreview}>Edit Profile</Button>
          <Button onClick={handelPublishShop}>Publish Shop</Button>
        </DialogActions>
        <ProductDisplay shopData={createShopData.shopPreview} />
      </Dialog>

      {/* The published version */}
      {/* <Dialog open={publish} fullScreen onClose={() => togglePublish(false)}>
        <DialogActions>
          <Button onClick={() => togglePublish(false)}>Exit PREVIEW</Button>
        </DialogActions>
        <ProductDisplay shopData={publishData} />
      </Dialog> */}
    </div>
  );
}
