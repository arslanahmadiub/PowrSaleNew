import React, { useState, useEffect } from "react";
import { Grid, makeStyles, Button as MaterialButton } from "@material-ui/core";

import verification from "../../assets/images/verification.svg";

import { ThemeContext } from "../../contexts/ThemeContext";

import logo from "../../assets/images/logo.png";

import snapshot from "./../../assets/images/snapshot.svg";

import { useHistory } from "react-router";
import CircularProgress from "@material-ui/core/CircularProgress";
import Backdrop from "@material-ui/core/Backdrop";
import { Hidden } from "@material-ui/core";
import { verifyEmailOrPhone } from "../../services/authServices";
import { validateOtp } from "../../services/authServices";
const useStyles = makeStyles((theme) => ({
  container: {
    padding: "25px",
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#31BDF4",
    background: "rgba(182,172,162,0.2)",
  },
  emptyContainer: {
    color: "#553560",
    backgroundImage: `url(${snapshot})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center center",
    height: "100vh",
    width: "100%",
  },
  text: {
    textAlign: "center",
  },
  error: {
    color: "red",
  },
  heading: {
    textAlign: "center",
  },
  signInButton: {
    color: (props) => props.white,
    background: (props) => props.primaryGreen,
    textTransform: "capitalize",
    "&:hover": {
      background: (props) => props.primaryGreen,
    },
  },
  authToggle: {
    color: (props) => props.primaryBlue,
    textTransform: "capitalize",
    "&:hover": {
      background: "none",
    },
  },
  button: {
    textTransform: "capitalize",
  },
}));

export default function MobileOtp(props) {
  const history = useHistory();
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const theme = React.useContext(ThemeContext);
  const styles = useStyles(theme);

  const [otp, setOtp] = useState({
    otp1: "",
    otp2: "",
    otp3: "",
    otp4: "",
  });

  let { otp1, otp2, otp3, otp4 } = otp;

  let handelVerifyNumber = async () => {
    let convertOtp = otp1 + otp2 + otp3 + otp4;
    let convertedOtp = parseInt(convertOtp);
    if (convertOtp.length > 3) {
      console.log(convertedOtp);
    }
    let otpData = {
      phone: "arslanahmadiub@gmail.com",
      otp: convertedOtp,
    };
    // try {
    //   let result = await validateOtp(otpData, userToken);
    //   console.log(result);
    // } catch (error) {
    //   console.log(error);
    // }
  };

  let handelChange = (e) => {
    setOtp({ ...otp, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Grid container spacing={0}>
        <Grid item xs={12} sm={12} md={4}>
          <div className={styles.container}>
            <div
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "center",
                marginBottom: "5%",
              }}
            >
              <img src={logo} alt="google logo" />
            </div>
            <h1 className={styles.heading}>Verify Account</h1>

            <Grid container spacing={3}>
              <Grid
                item
                xs={12}
                style={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "center",
                  marginBottom: "5%",
                }}
              >
                <img src={verification} alt="google logo" />
              </Grid>
              <Grid
                item
                xs={12}
                style={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "center",

                  textAlign: "center",
                }}
              >
                <p style={{ fontSize: "16px", fontWeight: "600" }}>
                  We have sent the OTP to{" "}
                  <span style={{ fontWeight: "700", color: "#24B8D0" }}>
                    233500018792.
                  </span>
                  Input <br /> the code into the space below.
                </p>
              </Grid>
              <Grid
                item
                xs={12}
                style={{ paddingLeft: "10%", paddingRight: "10%" }}
              >
                <Grid container direction="row" spacing={5}>
                  <Grid item xs={3}>
                    <input
                      className="otp"
                      maxlength="1"
                      value={otp1}
                      name="otp1"
                      onChange={handelChange}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <input
                      className="otp"
                      maxlength="1"
                      value={otp2}
                      name="otp2"
                      onChange={handelChange}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <input
                      className="otp"
                      maxlength="1"
                      value={otp3}
                      name="otp3"
                      onChange={handelChange}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <input
                      className="otp"
                      maxlength="1"
                      value={otp4}
                      name="otp4"
                      onChange={handelChange}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid
                item
                xs={12}
                style={{ paddingLeft: "5%", paddingRight: "5%" }}
              >
                <MaterialButton
                  fullWidth
                  style={{
                    background: "#1AB4B3",
                    color: "white",
                    height: "50px",
                    borderRadius: "10px",
                  }}
                  onClick={handelVerifyNumber}
                >
                  Verify Your Number
                </MaterialButton>
              </Grid>
              <Grid
                item
                xs={12}
                style={{ paddingLeft: "5%", paddingRight: "5%" }}
              >
                <div
                  style={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "space-between",
                  }}
                >
                  <p className="bottomVerificaton">Edit your phone number?</p>
                  <p className="bottomVerificaton">Resend</p>
                </div>
              </Grid>
            </Grid>
          </div>
        </Grid>
        <Hidden only={["xs", "sm"]}>
          <Grid item sm={false} md={8}>
            <div className={styles.emptyContainer} />
          </Grid>
        </Hidden>
      </Grid>
    </>
  );
}
