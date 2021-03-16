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
import { useLocation } from "react-router-dom";
import Alert from "@material-ui/lab/Alert";

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

export default function EmailOtp(props) {
  const history = useHistory();
  const classes = useStyles();
  const theme = React.useContext(ThemeContext);
  const styles = useStyles(theme);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const [userEmail, setUserEmail] = useState(null);
  const [sentEmail, setSentEmail] = useState(true);
  const search = useLocation().state;

  useEffect(() => {
    if (search) {
      setUserEmail(search);
    }
  }, []);

  const [otp, setOtp] = useState({
    otp1: "",
    otp2: "",
    otp3: "",
    otp4: "",
  });

  let { otp1, otp2, otp3, otp4 } = otp;

  let otpLength = otp1 + otp2 + otp3 + otp4;
  useEffect(() => {
    verifyEmail();
  }, []);

  let verifyEmail = async () => {
    if (userEmail && sentEmail) {
      setSentEmail(false);
      let emailData = {
        email: userEmail && userEmail.email,
      };
      try {
        let { data } = await verifyEmailOrPhone(emailData, userEmail.token);
      } catch (error) {}
    }
  };

  let handelVerifyEmail = async () => {
    let convertOtp = otp1 + otp2 + otp3 + otp4;
    let convertedOtp = parseInt(convertOtp);

    let otpData = {
      email: userEmail.email,
      otp: convertedOtp,
    };

    try {
      let { data } = await validateOtp(otpData, userEmail.token);
      if (data.Success) {
        setSuccessMessage("OTP Verified...");

        setTimeout(() => {
          localStorage.setItem("token", userEmail.token);
          history.push("/dashboard");
        }, 3000);
      }
    } catch (error) {
      if (error.response.data.Success === false) {
        setErrorMessage("Invalid OTP!");
      }
    }

    setTimeout(() => {
      setErrorMessage(null);
      setSuccessMessage(null);
    }, 3000);
  };

  let handelChange = (e) => {
    setOtp({ ...otp, [e.target.name]: e.target.value });
  };

  let handelResend = () => {
    setSentEmail(true);
    verifyEmail();
    setSuccessMessage("Otp send to your email...");
    setTimeout(() => {
      setSuccessMessage(null);
    }, 3000);
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
                  We have sent the OTP to
                  <br />{" "}
                  <span style={{ fontWeight: "700", color: "#24B8D0" }}>
                    {userEmail && userEmail.email}
                  </span>
                  <br />
                  Input the code into the space below.
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
                      maxLength="1"
                      value={otp1}
                      name="otp1"
                      onChange={handelChange}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <input
                      className="otp"
                      maxLength="1"
                      value={otp2}
                      name="otp2"
                      onChange={handelChange}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <input
                      className="otp"
                      maxLength="1"
                      value={otp3}
                      name="otp3"
                      onChange={handelChange}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <input
                      className="otp"
                      maxLength="1"
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
                  disabled={otpLength.length < 4 ? true : false}
                  style={{
                    background: otpLength.length < 4 ? "#9EB4C1" : "#1AB4B3",
                    color: "white",
                    height: "50px",
                    borderRadius: "10px",
                  }}
                  onClick={handelVerifyEmail}
                >
                  Verify Your Email
                </MaterialButton>
              </Grid>
              <Grid xs={12} style={{ paddingLeft: "5%", paddingRight: "5%" }}>
                {errorMessage && (
                  <Alert variant="filled" severity="error">
                    {errorMessage && errorMessage}
                  </Alert>
                )}
                {successMessage && (
                  <Alert variant="filled" severity="success">
                    {successMessage && successMessage}
                  </Alert>
                )}
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
                  <p className="bottomVerificaton">Edit your email?</p>
                  <p className="bottomVerificaton" onClick={handelResend}>
                    Resend
                  </p>
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
