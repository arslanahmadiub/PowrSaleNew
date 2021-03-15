import React, { useState } from "react";
//import styled from "styled-components";
import Grid from "@material-ui/core/Grid";
import Select from "../CustomComponents/Select";
import Input from "../CustomComponents/Input";
// import Button from "../CustomComponents/Button";
import { Button } from "antd";
import Alert from "@material-ui/lab/Alert";

import { Form } from "antd";
import { DataContext } from "../../contexts/DataContext";
import { addCard } from "../../action/walletAction";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { addWallet } from "../../services/walletServices";

export default function WithdrawalForm({ type, externalFunction, ...props }) {
  const { countryList, bankList, mobileOperators } = React.useContext(
    DataContext
  );
  const dispatch = useDispatch();
  const walletCard = useSelector((state) => state.wallet.card);

  const processWidrawal = (values) => {
    alert("");
    //externalFunction(0)
  };

  const [mobileMoneyData, setMobileMoneyData] = useState({
    country: "",
    momoNetwork: "",
    momoNumber: "",
    mobileMoneyClientName: "",
  });

  let {
    country,
    momoNetwork,
    momoNumber,
    mobileMoneyClientName,
  } = mobileMoneyData;

  let countryListNew = ["Ghana"];
  let networkListNew = ["vodafone", "mtn", "airtel"];
  let userToken = localStorage.getItem("token");

  let handelMobileMoneyChange = (e) => {
    setMobileMoneyData({ ...mobileMoneyData, [e.target.name]: e.target.value });
  };

  const [errorMessage, setErrorMessage] = useState(null);
  const [loadingButton, setLoadingButton] = useState(false);
  let addWalletButton = async () => {
    let form_data = new FormData();

    form_data.set("momo_network", momoNetwork);
    form_data.set("mobile_money_number", momoNumber);
    form_data.set("mobile_money_name", mobileMoneyClientName);
    // let walletData = {
    //   name: mobileMoneyClientName,
    //   country: country,
    //   number: momoNumber,
    //   date: "09/2020",
    //   type: "momo",
    // };

    // dispatch(addCard(walletData));
    try {
      setErrorMessage(null);
      setLoadingButton(true);

      let { data } = await addWallet(form_data, userToken);

      props.walletFunctionCall(true);
      setMobileMoneyData({
        country: "",
        momoNetwork: "",
        momoNumber: "",
        mobileMoneyClientName: "",
      });
      setLoadingButton(false);
    } catch (error) {
      if (
        error.response.data.Success === false &&
        error.response.data.Message
      ) {
        setLoadingButton(false);

        setErrorMessage(
          <Alert variant="filled" severity="error">
            {error.response.data.Message}
          </Alert>
        );
        setTimeout(() => {
          setErrorMessage(null);
        }, 3000);
      } else if (
        error.response.data.Success === false &&
        error.response.data.Errors
      ) {
        if (error.response.data.Errors.mobile_money_number) {
          setErrorMessage(
            <Alert variant="filled" severity="error">
              Enter a valid mobile money number...
            </Alert>
          );
          setTimeout(() => {
            setErrorMessage(null);
          }, 3000);
        }
      } else {
        setErrorMessage(
          <Alert variant="filled" severity="error">
            Some thing went wrong or server error...
          </Alert>
        );
        setTimeout(() => {
          setErrorMessage(null);
        }, 3000);
      }
    }
    setLoadingButton(false);
  };

  return (
    <Form onFinish={processWidrawal}>
      <Grid container direction="row" spacing={5}>
        <Grid item xs={12} sm={6}>
          <Select
            list={countryListNew}
            label="Country"
            placeholder="Select country"
            required
            name="country"
            value={country}
            onChange={handelMobileMoneyChange}
          />
        </Grid>
        {type === "momo" && (
          <Grid item xs={12} sm={6}>
            <Select
              list={networkListNew}
              label="Momo Network"
              placeholder="Select network"
              required
              name="momoNetwork"
              value={momoNetwork}
              onChange={handelMobileMoneyChange}
            />
          </Grid>
        )}
        {type === "bank" && (
          <Grid item xs={12} sm={6}>
            <Select
              options={bankList}
              label="Bank name"
              placeholder="Select bank"
              required
            />
          </Grid>
        )}
        {type === "bank" && (
          <Grid item xs={12} sm={6}>
            <Input
              label="Bank account number"
              placeholder="Enter bank account number"
              required
            />
          </Grid>
        )}
        {type === "momo" && (
          <Grid item xs={12} sm={6}>
            <Input
              label="Momo number"
              placeholder="Enter the  momo account number"
              required
              name="momoNumber"
              value={momoNumber}
              onChange={handelMobileMoneyChange}
            />
          </Grid>
        )}
        {type === "momo" && (
          <Grid item xs={12} sm={6}>
            <Input
              label="Your Name"
              placeholder="Enter Your Name Here"
              required
              name="mobileMoneyClientName"
              value={mobileMoneyClientName}
              onChange={handelMobileMoneyChange}
            />
          </Grid>
        )}
        {type === "bank" && (
          <Grid item xs={12} sm={6}>
            <Input
              label="Bank branch"
              placeholder="Enter bank branch"
              required
            />
          </Grid>
        )}
        <Grid item xs={12}>
          <span style={{ color: "red", fontSize: "18px", marginTop: "0px" }}>
            {errorMessage !== null ? errorMessage : ""}
          </span>
        </Grid>
        <Grid item xs={12}>
          {/* <Button onClick={addWalletButton}>Add Wallet</Button> */}
          <Button
            type="primary"
            loading={loadingButton}
            onClick={addWalletButton}
            style={{
              background: "#31BDF4",
              border: "none",
              height: "50px",
              fontWeight: "bold",
            }}
          >
            Add Wallet
          </Button>
        </Grid>
      </Grid>
    </Form>
  );
}
