import React from "react";
import Styled from "styled-components";
import Grid from "@material-ui/core/Grid";
import Add from "@material-ui/icons/Add";
import Remove from "@material-ui/icons/Remove";
import Input from "../CustomComponents/Input";
import Button from "../CustomComponents/Button";
import PurchaseSummary from "../CustomComponents/PurchaseSummary";

const Quatnity = Styled.div`
    font-size: 30px;
    font-weight: 600;
    line-height: 50px;
`;

const ChangeButton = Styled.div`
    height: 60px;
    width: 60px;
`;

const PaymentForm = (props) => {
  const [state, setState] = React.useState({ quantity: 1 });

  const processPayment = (event) => {
    event.preventDefault();
  };

  const changeQuanty = (value) => (event) =>
    setState({ ...state, quantity: state.quantity + value || 1 });

  return (
    <Grid container direction="column" spacing={3}>
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
              <Input placeholder="First name" label="First name" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Input placeholder="Last name" label="Last name" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Input
                type={"email"}
                placeholder="Email address"
                label="Email address"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Input
                type={"tel"}
                placeholder="Phone number"
                label="Phone number"
              />
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
            item: "Apple",
            itemCost: 40,
            totalCost: "54",
            deliveryCharge: 14,
          }}
        />
      </Grid>
    </Grid>
  );
};

export default PaymentForm;
