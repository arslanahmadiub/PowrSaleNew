import React from "react";
import Styled from "styled-components";
import Grid from "@material-ui/core/Grid";
import { Facebook, Instagram, Twitter, WhatsApp } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import Backdrop from "@material-ui/core/Backdrop";
import { useSelector, useDispatch } from "react-redux";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#31BDF4",
    background: "rgba(182,172,162,0.2)",
  },
}));
const Container = Styled.div`
padding: 50px 30px;
border-radius: 0;
background: #F5F8FD;
min-height: 80%;
`;
const FlexContainer = Styled.div`
display: flex;
width: 100%;
justify-content:${(p) => (p.justify ? p.justify : "space-between")};
`;
const Brand = Styled.div`

`;

const BrandName = Styled.div`
    font-size: 30px;
    font-weight: bold;
    color: #010101;
    text-align: center;
`;

const BrandSlogan = Styled.div`
    font-size: 18px; 
    color: #979FAA;
    text-align: center;
    margin: 15px 0;    
`;

const ShopId = Styled.div`
    color: #31BDF4;
    font-size: 18px;
    text-align: center;
    margin: 15px 0;
`;

const BrandBrief = Styled.div`
    font-size: 16px;
    color: #010101;
    margin: 15px 0;
    text-align: center;
`;

const ContactLabel = Styled.div`
    font-size: 14px;
    color: #979FAA;
    padding: 10px 0 0  0;
`;
const Contact = Styled.div`
    font-size: 16px;
    color: #010101;
    font-weight: 600;
    padding: 0 0 10px 0;
`;

const CompanyLogo = Styled.img`
    display: block;
    height: 150px;
    width: 150px;
    margin: auto;  
    object-fit: cover;

    border-radius:15px; 
`;

const TopRowMobile = (props) => {
  const classes = useStyles();
  const shopLoading = useSelector((state) => state.shopPreview.shopLoading);
  const {
    logo,
    name,
    brief,
    social,
    contacts,
    description,
    shopId,
  } = props.data;
  return (
    <>
      <Backdrop className={classes.backdrop} open={shopLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>

      <div
        style={{
          margin: "0 0 50px 0",
          padding: "0 15px",
          borderBottom: "solid #979FAA .5px",
        }}
      >
        <CompanyLogo src={logo && logo} />

        <BrandName>{name && name}</BrandName>

        <BrandSlogan>{description && description}</BrandSlogan>

        <ShopId>Shop ID: {shopId && shopId}</ShopId>

        <BrandBrief>{brief && brief}</BrandBrief>

        <Grid container direction="row" spacing={3}>
          <Grid item xs={6}>
            <ContactLabel>Address</ContactLabel>

            <Contact>{contacts && contacts.address}</Contact>
          </Grid>
          <Grid item xs={6} md={3}>
            <ContactLabel>Phone</ContactLabel>

            <Contact>{contacts && contacts.phone}</Contact>
          </Grid>
          <Grid item xs={12} md={3}>
            <ContactLabel>Email</ContactLabel>

            <Contact>{contacts && contacts.email}</Contact>
          </Grid>
          {/* <Grid item xs={12} md={3}>
          <ContactLabel>Social</ContactLabel>

          <Contact>
            <FlexContainer style={{ width: "80px" }}>
              <Facebook style={{ width: "20px" }} />
              <Twitter style={{ width: "20px" }} />
              <Instagram style={{ width: "20px" }} />
              <WhatsApp style={{ width: "20px" }} />
            </FlexContainer>
          </Contact>
        </Grid> */}
        </Grid>
      </div>
    </>
  );
};

export default TopRowMobile;
