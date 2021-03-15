import React from "react";
import Styled from "styled-components";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import Input from "../CustomComponents/Input";
import TextArea from "../CustomComponents/TextArea";
import Button from "../CustomComponents/Button";
import FlatSelect from "../CustomComponents/FlatSelect";
import SearchBox from "../CustomComponents/SearchBox";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Hidden,
} from "@material-ui/core";
import TwinInputSelect from "../CustomComponents/TwinInputSelect";
import FlexContainer from "../CustomComponents/FlexContainer";
import { Close } from "@material-ui/icons";
import { countryCodes } from "../../DummyData/DummyData";

const Title = Styled.div`
    font-size: 30px;
    font-weight: 600;
    float: left;
    text-align: left;
    margin:0 0 20px 0;
`;
const SubTitle = Styled.div`
    font-size: 20px;
    font-weight: 600;
    float: left;
    text-align: left;
    margin:25px 0 5px 0;
    display: block;
`;

const TransactionForm = (props) => {
  const [state, setState] = React.useState({
    transactionType: "sell",
    delivery: "24hrs",
  });
  const [dialog, setDialog] = React.useState(false);
  const [message, setMessage] = React.useState("");

  const processRequest = (event) => {
    event.preventDefault();
    /* the state variable is your payload
            do any verifications needed
            them a post request to your server
         */
    /*
            Since the request can fail, use the setMessage hook to send a difirent if it fails.
            The one below is default for when it succeeds.

            if an if..else to detemine what to set in the message then  put the setDialog at the bottom,
            outside of the if..else block 
        */
    setMessage(
      "Your transaction request has been sent. We will update you when the other party accepts and makes payment."
    );
    setDialog(!dialog);
  };

  const handleRadioChange = (event) => {
    event.preventDefault();
    event.stopPropagation();

    setState({ ...state, delivery: event.target.value });
  };

  const SearchForMerchant = (event) => {
    //implement you search here
  };
  const handleTypingInput = (text) => (event) => {
    // you can access the partial text being typed here
    // it is stored in text
  };

  const onSelectionChange = (option) => {
    setState({
      ...state,
      transactionType: option === "selling" ? "sell" : "buy",
    });
  };

  return (
    <form onSubmit={processRequest}>
      <Grid container direction="row" spacing={2}>
        <Hidden smDown>
          <Grid item xs={12}>
            <Title>Transactions</Title>
          </Grid>
        </Hidden>
        <Grid item xs={12}>
          <Grid container direction="row" spacing={5}>
            <Grid item xs={6}>
              <FlatSelect
                onSelectionChange={onSelectionChange}
                bg
                list={["Selling", "Buying"]}
              />
            </Grid>
            <Grid item xs={6}>
              <SearchBox
                onChange={handleTypingInput}
                onSubmit={SearchForMerchant}
                placeholder="Search by merchant's ID"
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} md={6}>
          <SubTitle>
            {state.transactionType === "sell" ? "Seller" : "Buyer"} Info
          </SubTitle>

          <Grid item xs={12} md={10}>
            <Grid container direction="column">
              <Grid item xs={12}>
                <Input placeholder="Email address" type="email" required />
              </Grid>

              <Grid item xs={12}>
                <TwinInputSelect
                  list={countryCodes}
                  placeholder="Phone number"
                  type="tel"
                  required
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <SubTitle>Transaction info</SubTitle>
          <Grid container direction="row" spacing={3}>
            <Grid item xs={12} sm={6}>
              <Input placeholder="Item name" required />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TwinInputSelect
                required
                list={["GHS", "NGN", "USD", "CAD"]}
                placeholder="Price"
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <TextArea placeholder="Description" />
        </Grid>

        <Grid item xs={12}>
          <FormControl component="fieldset">
            <FormLabel component="legend">
              <SubTitle>Delivery Terms</SubTitle>
            </FormLabel>
            <RadioGroup
              aria-label="delivery options"
              name="delivery options"
              value={state.delivery}
              onChange={handleRadioChange}
              row
            >
              <FormControlLabel
                value="24hrs"
                control={<Radio color="primary" />}
                label="24hrs"
              />
              <FormControlLabel
                value="3days"
                control={<Radio color="primary" />}
                label="3 Days"
              />
              <FormControlLabel
                value="5days"
                control={<Radio color="primary" />}
                label="5 Days"
              />
            </RadioGroup>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <FlexContainer>
            <div>Note: Powrsale service charge is 5%</div>
            <div style={{ fontWeight: "600", fontSize: "22px" }}>
              {state && state.currency && state.currency}{" "}
              {(state && state.amount) || 0}
            </div>
          </FlexContainer>
          <FlexContainer>
            <div style={{ fontWeight: 400, fontSize: "22px" }}>
              Delivery Charge
            </div>
            <div style={{ fontWeight: "400", fontSize: "22px" }}>
              {state && state.currency && state.currency}{" "}
              {(state && state.deliveryFee) || 0}
            </div>
          </FlexContainer>

          <FlexContainer>
            <div style={{ fontWeight: 600, fontSize: "24px" }}>
              Total amount payable
            </div>
            <div style={{ fontWeight: "600", fontSize: "24px" }}>
              {state && state.currency && state.currency}{" "}
              {(state && state.deliveryFee) || 0}
            </div>
          </FlexContainer>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Button type="submit">Send Request</Button>
        </Grid>
        <Dialog open={dialog} onClose={() => !dialog}>
          <DialogActions>
            <Close onClick={() => setDialog(false)} fontSize="large" />
          </DialogActions>
          <DialogContent style={{ padding: "10%" }}>
            <DialogContentText>
              <h4>{message}</h4>
            </DialogContentText>
          </DialogContent>
        </Dialog>
      </Grid>
    </form>
  );
};

export default TransactionForm;
