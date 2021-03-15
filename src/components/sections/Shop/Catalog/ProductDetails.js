import React, { useState, useEffect } from "react";
import Styled from "styled-components";
import Grid from "@material-ui/core/Grid";
import Add from "@material-ui/icons/Add";
import Remove from "@material-ui/icons/Remove";
import Input from "../../../CustomComponents/Input";
import Button from "../../../CustomComponents/Button";
import PurchaseSummary from "../../../CustomComponents/PurchaseSummary";
import { detailAction } from "../../../../action/checkoutAction";
import { useDispatch } from "react-redux";

import { getFullUserDetails } from "../../../../services/authServices";

import Backdrop from "@material-ui/core/Backdrop";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import Alert from "@material-ui/lab/Alert";

const Quatnity = Styled.div`
    font-size: 30px;
    font-weight: 600;
    line-height: 50px;
`;

const ChangeButton = Styled.div`
    height: 60px;
    width: 60px;
`;

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#31BDF4",
    background: "rgba(182,172,162,0.2)",
  },
}));

const ProductDetails = (props) => {
  const dispatch = useDispatch();
  let userToken = localStorage.getItem("token");
  const [loading, setLoading] = useState(false);
  const classes = useStyles();
  const [errorMessage, setErrorMessage] = useState(null);
  const [checkoutDetails, setCheckoutDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });
  let { firstName, lastName, email, phone } = checkoutDetails;
  const [state, setState] = React.useState({ quantity: 1 });
  let [productPrice, setProductPrice] = useState(null);
  let { delivery, description, image, name, price } = props.details;

  let getDetail = async () => {
    try {
      setErrorMessage(null);
      setLoading(true);
      let { data } = await getFullUserDetails(userToken);
      setLoading(false);
      if (data.Success) {
        let { first_name, last_name, email, phone } = data.Details[0];
        let profileObject = {
          firstName: first_name,
          lastName: last_name,
          email: email,
          phone: phone,
        };
        setCheckoutDetails(profileObject);
      }
    } catch (error) {
      setLoading(false);

      setErrorMessage(
        <Alert variant="filled" severity="error">
          Some thing went wrong. try again letter....
        </Alert>
      );
    }
  };

  useEffect(() => {
    getDetail();
  }, []);
  const processPayment = (event) => {
    event.preventDefault();

    let userDetail = {
      firstName,
      lastName,
      email,
      phone,
      item: name,
      itemCost: price,
      totalCost: productPrice,
      shopId: props.details.shop_id,
      productId: props.details.productId,
      quantity: state,
    };
    dispatch(detailAction(userDetail));
    props.update(1);
  };

  let handelInputChange = (e) => {
    setCheckoutDetails({ ...checkoutDetails, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    setProductPrice(price);
  }, []);
  useEffect(() => {
    let newPrice = parseFloat(price) * state.quantity;
    setProductPrice(newPrice);
  }, [state]);

  const changeQuanty = (value) => (event) => {
    setState({ ...state, quantity: state.quantity + value || 1 });
  };

  return (
    <Grid container direction="column" spacing={3}>
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Grid item xs={12} sm={6} md={4}>
        how many?
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <ChangeButton>
            <Button onClick={changeQuanty(-1)} grey>
              <Remove fontSize="large" />
            </Button>
          </ChangeButton>
          <Quatnity>{state.quantity}</Quatnity>
          <ChangeButton>
            <Button onClick={changeQuanty(1)} grey>
              <Add fontSize="large" />
            </Button>
          </ChangeButton>
        </div>
      </Grid>
      <Grid item>
        <form
          onSubmit={processPayment}
          style={{ borderBottom: "0.5px solid #000", paddingBottom: "30px" }}
        >
          <Grid container direction="row" spacing={3}>
            <Grid item xs={12} sm={6}>
              <Input
                placeholder="First name"
                label="First name"
                name="firstName"
                value={firstName}
                onChange={handelInputChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Input
                placeholder="Last name"
                label="Last name"
                name="lastName"
                value={lastName}
                onChange={handelInputChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Input
                type={"email"}
                placeholder="Email address"
                label="Email address"
                name="email"
                value={email}
                onChange={handelInputChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Input
                type={"tel"}
                placeholder="Phone number"
                label="Phone number"
                name="phone"
                value={phone}
                onChange={handelInputChange}
                required
              />
            </Grid>

            <Grid
              item
              xs={12}
              style={{ marginTop: "10px", marginBottom: "10px" }}
            >
              {errorMessage && errorMessage}
            </Grid>
            <Grid item xs={12} sm={3} md={2}>
              <Button type="submit">Continue</Button>
            </Grid>
          </Grid>
        </form>
      </Grid>
      <Grid item>
        <PurchaseSummary
          data={{
            item: name,
            itemCost: price,
            totalCost: productPrice,
            deliveryCharge: "0",
          }}
        />
      </Grid>
    </Grid>
  );
};

export default ProductDetails;
