import React, { useState, useEffect } from "react";
import Styled from "styled-components";
import Grid from "@material-ui/core/Grid";
import Input from "../../../CustomComponents/Input";
import FancyInput from "../../../CustomComponents/FancyInput";
import Button from "../../../CustomComponents/Button";
import PurchaseSummary from "../../../CustomComponents/PurchaseSummary";
import Select from "../../../CustomComponents/Select";
import DatePicker from "../../../CustomComponents/DatePicker";
import { shipingAction } from "../../../../action/checkoutAction";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { DataContext } from "../../../../contexts/DataContext";
import { checkOut } from "../../../../services/shippingServices";
import CircularProgress from "@material-ui/core/CircularProgress";
import Alert from "@material-ui/lab/Alert";
import Collapse from "@material-ui/core/Collapse";
import { useHistory } from "react-router";

import Backdrop from "@material-ui/core/Backdrop";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#31BDF4",
    background: "rgba(182,172,162,0.2)",
  },
}));

const Quatnity = Styled.div`
    font-size: 30px;
    font-weight: 600;
    line-height: 50px;
`;

const ChangeButton = Styled.div`
    height: 60px;
    width: 60px;
`;

const PaymentDetails = (props) => {
  const [state, setState] = React.useState({ quantity: 1 });
  const priceDetail = useSelector((state) => state.checkout.checkoutUserDetail);
  const [powrSaleCurrencyType, setPowrSaleCurrencyType] = useState("GHS");
  const { countryList, currencies } = React.useContext(DataContext);
  let [loading, setLoading] = useState(false);
  const [error, seterror] = useState(false);
  let userToken = localStorage.getItem("token");
  const classes = useStyles();
  const [errorMessage, setErrorMessage] = useState(null);

  let networkList = ["mtn", "vodafone", "airtel"];

  const checkOutUserDetail = useSelector(
    (state) => state.checkout.checkoutUserDetail
  );
  const checkOutShippingDetail = useSelector(
    (state) => state.checkout.checkoutShipingDetail
  );

  const userBalance = checkOutUserDetail.balance;

  const history = useHistory();

  const [mobileMoneyData, setMobileMoneyData] = useState({
    momoNetwork: "",
    mobileMoneyNumber: "",
    mobileMoneyName: "",
  });

  const [cardData, setCardData] = useState({
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    csv: "",
  });

  let { cardNumber, cardName, expiryDate, csv } = cardData;
  let { momoNetwork, mobileMoneyNumber, mobileMoneyName } = mobileMoneyData;

  let [selectedButton, setSelectedButton] = useState(true);

  const [paymentMethod, setPaymentMethod] = useState("powrsale_balance");

  const processPayment = async (event) => {
    event.preventDefault();

    let form_data = new FormData();
    form_data.set("first_name", checkOutUserDetail.firstName);
    form_data.set("last_name", checkOutUserDetail.lastName);
    form_data.set("quantity", checkOutUserDetail.quantity.quantity);
    form_data.set("email", checkOutUserDetail.email);
    form_data.set("phone", checkOutUserDetail.phone);
    form_data.set("country", checkOutShippingDetail.country);
    form_data.set("delivery_location", checkOutShippingDetail.deliveryLocation);
    form_data.set("buyer_address", checkOutShippingDetail.address);
    form_data.set("additional_notes", checkOutShippingDetail.additionalNotes);
    form_data.set("payment_option", paymentMethod);
    form_data.set("product_id", checkOutUserDetail.productId);
    form_data.set("shop_id", checkOutUserDetail.shopId);
    form_data.set("amount", checkOutShippingDetail.finalCostWithCharges);
    form_data.set("balance", userBalance);
    form_data.set("delivery_amount", checkOutShippingDetail.deliveryCharges);

    form_data.set("momo_network", momoNetwork);
    form_data.set("mobile_money_number", mobileMoneyNumber);

    try {
      setLoading(true);
      let { data } = await checkOut(form_data, userToken);

      if (data.Success) {
        setLoading(false);
        history.push("/transactions");
      } else {
        setLoading(false);
        seterror(true);
      }
    } catch (error) {
      setLoading(false);

      if (error.response.data.Errors.mobile_money_number) {
        setErrorMessage(
          <Alert variant="filled" severity="error">
            Enter a valid value in mobile money number...
          </Alert>
        );

        setTimeout(() => {
          setErrorMessage(null);
        }, 3000);
      } else if (error.response.data.Errors.status === "failed") {
        setErrorMessage(
          <Alert variant="filled" severity="error">
            {error.response.data.Errors.message}
          </Alert>
        );
        setTimeout(() => {
          setErrorMessage(null);
        }, 3000);
      } else {
        setErrorMessage(
          <Alert variant="filled" severity="error">
            Some thing went wrong. try again letter....
          </Alert>
        );
        setTimeout(() => {
          setErrorMessage(null);
        }, 3000);
      }
    }
  };

  let handelMobileMoney = () => {
    setPaymentMethod("mobile_money");
    setSelectedButton(false);
    setCardData({
      cardNumber: "",
      cardName: "",
      expiryDate: "",
      csv: "",
    });
  };
  let handelCard = (e) => {
    setPaymentMethod("powrsale_balance");

    setSelectedButton(true);
    setMobileMoneyData({
      momoNetwork: "",
      mobileMoneyNumber: "",
      mobileMoneyName: "",
    });
  };

  let handelMobileChnage = (e) => {
    setMobileMoneyData({ ...mobileMoneyData, [e.target.name]: e.target.value });
  };

  let handelPowrSaleCurrency = (e) => {
    setPowrSaleCurrencyType(e.target.value);
  };

  let handelCardChange = (e) => {
    setCardData({ ...cardData, [e.target.name]: e.target.value });
  };

  return (
    <Grid container direction="column" spacing={3}>
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Grid item>
        <h1>Payout Options</h1>
      </Grid>
      <Grid item>
        <Collapse in={error}>
          <Alert variant="filled" severity="error">
            Transition transition
          </Alert>
        </Collapse>
      </Grid>

      <Grid container direction="row" spacing={3}>
        <Grid item style={{ marginLeft: "1%" }}>
          {selectedButton ? (
            <Button onClick={handelCard}>Powrsale Balance</Button>
          ) : (
            <Button outlined faded onClick={handelCard}>
              Powrsale Balance
            </Button>
          )}
        </Grid>

        <Grid item>
          {selectedButton ? (
            <Button outlined faded onClick={handelMobileMoney}>
              Mobile Money
            </Button>
          ) : (
            <Button onClick={handelMobileMoney}>Mobile Money</Button>
          )}
        </Grid>
      </Grid>
      <Grid item>
        <form
          onSubmit={processPayment}
          style={{ borderBottom: "0.5px solid #000", paddingBottom: "30px" }}
        >
          {!selectedButton ? (
            <Grid container direction="row" spacing={3}>
              <Grid item xs={12} sm={6}>
                <Select
                  id="type"
                  placeholder="Select Mobile Money Network"
                  label="MoMo Network"
                  list={networkList}
                  required
                  value={momoNetwork}
                  name="momoNetwork"
                  onChange={handelMobileChnage}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Input
                  type={"text"}
                  placeholder="024571992"
                  label="Mobile Money Number"
                  value={mobileMoneyNumber}
                  name="mobileMoneyNumber"
                  onChange={handelMobileChnage}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Input
                  type={"text"}
                  placeholder="Full Name"
                  label="Mobile Money Name"
                  name="mobileMoneyName"
                  value={mobileMoneyName}
                  onChange={handelMobileChnage}
                />
              </Grid>

              <Grid item xs={12} sm={6}></Grid>
              <Grid
                item
                xs={12}
                style={{ marginBottom: "10px", marginTop: "10px" }}
              >
                {errorMessage && errorMessage}
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button type="submit">Pay</Button>
              </Grid>
            </Grid>
          ) : (
            // <Grid container direction="row" spacing={3}>
            //   <Grid item xs={12} sm={6}>
            //     <Input
            //       type={"number"}
            //       placeholder="0000 0000 0000 0000"
            //       label="Card Number"
            //       value={cardNumber}
            //       name="cardNumber"
            //       onChange={handelCardChange}
            //     />
            //   </Grid>
            //   <Grid item xs={12} sm={6}>
            //     <Input
            //       type={"text"}
            //       placeholder="Full Name"
            //       label="Card Name"
            //       value={cardName}
            //       name="cardName"
            //       onChange={handelCardChange}
            //     />
            //   </Grid>
            //   <Grid item xs={12} sm={6}>
            //     <DatePicker
            //       label="Epiry Date"
            //       name="expiryDate"
            //       value={expiryDate}
            //       onChange={handelCardChange}
            //     />
            //   </Grid>
            //   <Grid item xs={12} sm={6}>
            //     <FancyInput
            //       type={"number"}
            //       placeholder="..."
            //       label="CVV/ CSV"
            //       value={csv}
            //       name="csv"
            //       onChange={handelCardChange}
            //     />
            //   </Grid>

            //   <Grid
            //     item
            //     xs={12}
            //     style={{ marginBottom: "10px", marginTop: "10px" }}
            //   >
            //     {errorMessage && errorMessage}
            //   </Grid>

            //   <Grid item xs={12} sm={6}>
            //     <Button type="submit">Pay</Button>
            //   </Grid>
            // </Grid>
            <Grid
              container
              direction="row"
              spacing={3}
              style={{ marginTop: "1%" }}
            >
              <Grid item xs={6} sm={2}>
                <Select
                  id="type"
                  placeholder="Currency Type"
                  list={["GHS"]}
                  value={powrSaleCurrencyType}
                  name="powrSaleCurrency"
                  onChange={handelPowrSaleCurrency}
                />
              </Grid>
              <Grid item xs={6} sm={10}>
                <h2
                  style={{
                    color:
                      parseFloat(userBalance) <
                      parseFloat(checkOutShippingDetail.finalCostWithCharges)
                        ? "red"
                        : "black",
                    opacity:
                      parseFloat(userBalance) <
                      parseFloat(checkOutShippingDetail.finalCostWithCharges)
                        ? "0.7"
                        : "1",
                  }}
                >
                  {userBalance && userBalance}
                </h2>
              </Grid>

              <Grid
                item
                xs={12}
                style={{ marginBottom: "10px", marginTop: "10px" }}
              >
                {errorMessage && errorMessage}
              </Grid>

              <Grid item xs={12} sm={6}>
                <Button
                  type="submit"
                  disable={
                    parseFloat(userBalance) <
                    parseFloat(checkOutShippingDetail.finalCostWithCharges)
                      ? true
                      : false
                  }
                  faded={
                    parseFloat(userBalance) <
                    parseFloat(checkOutShippingDetail.finalCostWithCharges)
                      ? true
                      : false
                  }
                >
                  Pay
                </Button>
              </Grid>
            </Grid>
          )}
        </form>
      </Grid>
      <Grid item>
        <PurchaseSummary
          data={{
            item: priceDetail.item,
            itemCost: priceDetail.itemCost,
            totalCost: checkOutShippingDetail.finalCostWithCharges,
            deliveryCharge: checkOutShippingDetail.deliveryCharges,
          }}
        />
      </Grid>
    </Grid>
  );
};

export default PaymentDetails;
