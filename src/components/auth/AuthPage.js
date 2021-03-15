import React, { useState, useEffect, createRef, useRef } from "react";
import {
  Grid,
  makeStyles,
  Button as MaterialButton,
  DialogContentText,
} from "@material-ui/core";
import PasswordInput from "../CustomComponents/PasswordInput";
import Input from "../CustomComponents/Input";
import { Redirect } from "react-router-dom";

import MaterialUIButton from "../CustomComponents/MaterialUIButton";
import { ThemeContext } from "../../contexts/ThemeContext";

import { Email } from "@material-ui/icons";
import logo from "../../assets/images/logo.png";
import Alert from "@material-ui/lab/Alert";
import GoogleLogo from "../CustomComponents/GoogleLogo";
import Facebooklogo from "../CustomComponents/Facebooklogo";
import PhoneLogo from "../CustomComponents/PhoneLogo";
import { AuthContext } from "../../contexts/AuthContext";
import snapshot from "./../../assets/images/snapshot.svg";
import { Link } from "react-router-dom";

import { createUser } from "../../services/authServices";
import { loginUser } from "../../services/authServices";
import { loginUserWithGoogle } from "../../services/authServices";
import { loginUserWithFacebook } from "../../services/authServices";
import FacebookLogin from "react-facebook-login";

import GoogleLogin from "react-google-login";
import { useHistory } from "react-router";
import CircularProgress from "@material-ui/core/CircularProgress";
import Backdrop from "@material-ui/core/Backdrop";
import { Hidden } from "@material-ui/core";

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

export default function AuthenticationPage(props) {
  const history = useHistory();
  const classes = useStyles();

  let shopLink = localStorage.getItem("shopLink");

  const [wantsToSignIn, setWantsToSignIn] = useState(true);
  const [data, setData] = useState({
    email: "",
    password: "",
    password2: "",
    mobile: "",
  });

  useEffect(() => {
    if (window.location.search.includes("true")) {
      setWantsToSignIn(true);
    } else if (window.location.search.includes("false")) {
      setWantsToSignIn(false);
    }
  }, []);

  let { email, password, password2, mobile } = data;
  const [usePhoneSignIn, setPhoneSignIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("Hello Message");
  const [RedirectToReferrer, setRedirectToReferrer] = useState(false);

  const [loadingShow, setLoadingShow] = useState(false);

  const theme = React.useContext(ThemeContext);
  const { from } = props.location || { from: { pathname: "/" } };

  const { setUser } = React.useContext(AuthContext);
  const styles = useStyles(theme);

  const toggleAuthType = () => {
    setWantsToSignIn(!wantsToSignIn);
    setData({
      email: "",
      password: "",
      password2: "",
      mobile: "",
    });
  };

  const toggleAuthMethod = () => {
    setPhoneSignIn(!usePhoneSignIn);
    setData({
      email: "",
      password: "",
      password2: "",
      mobile: "",
    });
  };

  let widthRef = useRef();

  const handlePhoneInput = (e) => {
    const re = /^[0-9\b]+$/;

    if (e.target.value === "" || re.test(e.target.value)) {
      return setData({ ...data, mobile: e.target.value });
    }
  };

  const handleEmailInput = (events) => {
    return setData({ ...data, email: events.target.value });
  };

  const handlePasswordInput = (event) => {
    return setData({ ...data, password: event.target.value });
  };
  const handlePassword2Input = (event) => {
    return setData({ ...data, password2: event.target.value });
  };

  let responseFacebook = async (res) => {
    let accessToken = {
      email: res.email,
    };
    try {
      let { data } = await loginUserWithFacebook(accessToken);
      if (data.Success) {
        localStorage.setItem("token", data.Token);
        history.push("/dashboard");
      }
    } catch (error) {}
  };

  let responseGoogle = async (res) => {
    let accessToken = {
      token: res.accessToken,
    };
    try {
      let { data } = await loginUserWithGoogle(accessToken);
      if (data.Success) {
        localStorage.setItem("token", data.Token);
        history.push("/dashboard");
      }
    } catch (error) {}
  };

  let handelLoginClickAfterSignUp = () => {
    setWantsToSignIn(true);
  };

  let handelForgotPass = () => {
    history.push("/forgotPass");
  };

  let handelSignin = async () => {
    let form_data = new FormData();
    form_data.append("email", email);
    form_data.append("password1", password);
    form_data.append("password2", password2);

    let form_data_phone = new FormData();
    form_data_phone.append("phone", mobile);
    form_data_phone.append("password1", password);
    form_data_phone.append("password2", password2);

    if (!wantsToSignIn) {
      if (usePhoneSignIn === false) {
        if (email === null || password === null || password2 === null) {
          setErrorMessage(
            <Alert variant="filled" severity="error">
              Please fill all fields...
            </Alert>
          );
        } else if (password !== password2) {
          setErrorMessage(
            <Alert variant="filled" severity="error">
              Password doesn't match...
            </Alert>
          );
        } else {
          setErrorMessage("");
          try {
            setLoadingShow(true);
            let { data } = await createUser(form_data);
            setLoadingShow(false);

            if (data.Success) {
              setErrorMessage(
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-around",
                  }}
                >
                  Account created successfully..For Login
                  <div
                    style={{
                      color: "#1AB4B3",
                      cursor: "pointer",
                      marginLeft: "10px",
                    }}
                    onClick={handelLoginClickAfterSignUp}
                  >
                    Click Here
                  </div>
                </div>
              );
              setData({
                email: "",
                password: "",
                password2: "",
              });
            }
          } catch (ex) {
            if (ex.response && ex.response.status === 500) {
              setLoadingShow(false);

              let error = ex.response.data.Errors;

              if ("email" in error) {
                setErrorMessage(
                  <Alert variant="filled" severity="error">
                    {error.email[0]}
                  </Alert>
                );
              } else if ("password2" in error) {
                setErrorMessage(
                  <Alert variant="filled" severity="error">
                    {error.password2[0]}
                  </Alert>
                );
              } else if ("__all__" in error) {
                setErrorMessage(
                  <Alert variant="filled" severity="error">
                    {error.__all__[0]}
                  </Alert>
                );
              } else {
              }
            }
          }
        }
      } else {
        if (mobile === null || password === null || password2 === null) {
          setErrorMessage(
            <Alert variant="filled" severity="error">
              Please fill all fields...
            </Alert>
          );
        } else if (password !== password2) {
          setErrorMessage(
            <Alert variant="filled" severity="error">
              Password doesn't match...
            </Alert>
          );
        } else {
          setErrorMessage("");
          try {
            setLoadingShow(true);
            let { data } = await createUser(form_data_phone);

            setLoadingShow(false);

            if (data.Success) {
              setErrorMessage(
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-around",
                  }}
                >
                  Account created successfully..For Login
                  <div
                    style={{
                      color: "#1AB4B3",
                      cursor: "pointer",
                      marginLeft: "10px",
                    }}
                    onClick={handelLoginClickAfterSignUp}
                  >
                    Click Here
                  </div>
                </div>
              );
              setData({
                email: "",
                password: "",
                password2: "",
                mobile: "",
              });
            }
          } catch (ex) {
            if (ex.response && ex.response.status === 500) {
              setLoadingShow(false);
              if (ex.response.data.Success === false) {
                if (ex.response.data.Errors) {
                  setErrorMessage(
                    <Alert variant="filled" severity="error">
                      {ex.response.data.Errors.__all__[0]}
                    </Alert>
                  );
                }
              } else {
                setErrorMessage(
                  <Alert variant="filled" severity="error">
                    Some thing went wrong or server error...
                  </Alert>
                );
              }
            }
          }
        }
      }
    } else {
      let loginData = new FormData();
      loginData.append("email", email);
      loginData.append("password", password);

      let loginDataForMobile = new FormData();
      loginDataForMobile.append("phone", mobile);
      loginDataForMobile.append("password", password);
      if (usePhoneSignIn === false) {
        try {
          setLoadingShow(true);
          let { data } = await loginUser(loginData);
          setLoadingShow(false);

          if (data.Success) {
            await localStorage.setItem("token", data.Token);
            if (shopLink !== null) {
              let index = shopLink.lastIndexOf("/");
              history.push(
                "shop/" + shopLink.substring(index + 1, shopLink.length)
              );
              localStorage.removeItem("shopLink");
            } else {
              history.push("/dashboard");
              localStorage.removeItem("shopLink");
            }
          }
        } catch (ex) {
          setLoadingShow(false);

          if (ex.response && ex.response.status === 401) {
            if (ex.response.data.Success === false) {
              setErrorMessage(
                <Alert variant="filled" severity="error">
                  {ex.response.data.Message}
                </Alert>
              );
            }
          }
        }
      } else {
        try {
          setLoadingShow(true);
          let { data } = await loginUser(loginDataForMobile);
          setLoadingShow(false);

          if (data.Success) {
            await localStorage.setItem("token", data.Token);

            if (shopLink !== null) {
              let index = shopLink.lastIndexOf("/");
              history.push(
                "shop/" + shopLink.substring(index + 1, shopLink.length)
              );
              localStorage.removeItem("shopLink");
            } else {
              history.push("/dashboard");

              localStorage.removeItem("shopLink");
            }
          }
        } catch (ex) {
          setLoadingShow(false);
          if (ex.response && ex.response.status === 401) {
            if (ex.response.data.Success === false) {
              setErrorMessage(
                <Alert variant="filled" severity="error">
                  {ex.response.data.Message}
                </Alert>
              );
            }
          }
        }
      }
    }
    setLoadingShow(false);
  };
  const pageHeader = wantsToSignIn
    ? "Sign in to your Powrsale account"
    : "Sign up to Powrsale";

  useEffect(() => {
    setErrorMessage(null);
  }, [usePhoneSignIn, wantsToSignIn]);

  if (RedirectToReferrer === true) {
    return <Redirect to={from} />;
  }

  let containerRef = widthRef;

  return (
    <Grid container spacing={0} ref={widthRef}>
      <Grid item sm={12} md={4}>
        <div className={styles.container}>
          <div style={styles.logo}>
            <img src={logo} alt="google logo" />
          </div>
          <h1 className={styles.heading}>{pageHeader}</h1>

          <Grid container spacing={3}>
            <Grid
              item
              xs={12}
              style={{ display: usePhoneSignIn ? "" : "none" }}
            >
              {/* <TwinInputSelect
                list={countryCodes}
                placeholder="Phone Number"
                onChange={handlePhoneInput}
              /> */}
              <Input
                placeholder="Mobile Number"
                value={mobile}
                onChange={handlePhoneInput}
              />
            </Grid>
            <Grid
              item
              xs={12}
              style={{ display: usePhoneSignIn ? "none" : "" }}
            >
              <Input
                placeholder="Email"
                type="email"
                value={email}
                onChange={handleEmailInput}
              />
            </Grid>
            <Grid item xs={12}>
              <PasswordInput
                placeholder="Password"
                onChange={handlePasswordInput}
                value={password}
              />
            </Grid>
            {wantsToSignIn ? (
              <Grid
                item
                xs={12}
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  width: "100%",
                  marginTop: "-10px",
                }}
              >
                <h3
                  style={{ color: "#1AB4B3", cursor: "pointer" }}
                  onClick={handelForgotPass}
                >
                  Forgot Password?
                </h3>
              </Grid>
            ) : null}

            {wantsToSignIn ? null : (
              <Grid item xs={12}>
                <PasswordInput
                  placeholder="Confirm Password"
                  value={password2}
                  onChange={handlePassword2Input}
                />
              </Grid>
            )}

            <Grid item xs={12}>
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "center",
                  color: "red",
                  fontSize: "16px",
                }}
              >
                {errorMessage}
              </div>
            </Grid>

            <Backdrop className={classes.backdrop} open={loadingShow}>
              <CircularProgress color="inherit" />
            </Backdrop>

            <Grid item xs={12}>
              <MaterialButton
                className={styles.signInButton}
                fullWidth
                onClick={handelSignin}
              >
                {wantsToSignIn ? "Sign In" : "Create Free Account"}
              </MaterialButton>
            </Grid>
            <Grid item xs={12}>
              <DialogContentText className={styles.text}>Or</DialogContentText>
            </Grid>
            <Grid
              item
              xs={12}
              style={{ display: usePhoneSignIn ? "" : "none" }}
            >
              <MaterialUIButton
                onClick={toggleAuthMethod}
                iconImage={<Email />}
                buttonText={
                  wantsToSignIn
                    ? "Sign In with Email"
                    : "Create Account With Email"
                }
              />
            </Grid>
            <Grid
              item
              xs={12}
              style={{ display: usePhoneSignIn ? "none" : "" }}
            >
              <MaterialUIButton
                onClick={toggleAuthMethod}
                iconImage={
                  <PhoneLogo
                    style={{ color: "#039BE5", width: "50px", height: "50px" }}
                  />
                }
                buttonText={
                  wantsToSignIn
                    ? "Sign In With Phone"
                    : "Create Account With Phone"
                }
              />
            </Grid>
            <Grid
              item
              xs={12}
              style={{ display: usePhoneSignIn ? "none" : "" }}
            ></Grid>

            <Grid item xs={12}>
              <div
                style={{
                  display: "flex",
                  position: "absolute",
                  marginTop: "10px",
                  marginLeft: "10px",
                }}
              >
                <Facebooklogo />
              </div>
              <FacebookLogin
                appId="417433252826469"
                autoLoad={false}
                fields="name,email,picture"
                callback={responseFacebook}
                id="facebookLoginButton"
                cssClass="materialButton"
              />
            </Grid>
            <Grid item xs={12}>
              <GoogleLogin
                clientId="27367811829-gc62lq8bdl0pqn88v28ekr8r1f3uo9dp.apps.googleusercontent.com"
                render={(renderProps) => (
                  <MaterialUIButton
                    iconImage={<GoogleLogo />}
                    buttonText="Sign in with Google"
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}
                  />
                )}
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={"single_host_origin"}
              />
            </Grid>

            <Grid item xs={12}>
              <DialogContentText
                style={{
                  paddingLeft: "10%",
                  paddingRight: "10%",
                  textAlign: "center",
                }}
              >
                * By signing up I agree to Powrsale{" "}
                <Link to="/terms">Terms</Link> and{" "}
                <Link to="/privacy-policy">Privacy Policy</Link>
              </DialogContentText>
            </Grid>
            <Grid item xs={12}>
              <DialogContentText className={styles.text}>
                {wantsToSignIn ? "Don't have an account?" : "Have an account?"}{" "}
                <MaterialButton
                  onClick={toggleAuthType}
                  className={styles.authToggle}
                >
                  {wantsToSignIn ? "Create" : "Sign In"}
                </MaterialButton>
              </DialogContentText>
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
  );
}
