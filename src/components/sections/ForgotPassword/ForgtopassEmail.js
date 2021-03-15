import React, { useState } from "react";
import { Grid, makeStyles, Button as MaterialButton } from "@material-ui/core";
import { resetPasswordService } from "../../../services/authServices";

import Input from "../../CustomComponents/Input";

import { ThemeContext } from "../../../contexts/ThemeContext";

import logo from "../../../assets/images/logo.png";
import Alert from "@material-ui/lab/Alert";

import snapshot from "../../../assets/images/snapshot.svg";

import { useHistory } from "react-router";
import CircularProgress from "@material-ui/core/CircularProgress";
import Backdrop from "@material-ui/core/Backdrop";

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

export default function ForgtopassEmail(props) {
  const history = useHistory();
  const classes = useStyles();
  const [errorMessage, setErrorMessage] = useState(null);
  const [email, setEmail] = useState("");

  let handelSendEmail = async () => {
    let emailData = {
      email,
    };
    try {
      setErrorMessage(null);
      setLoadingShow(true);
      let { data } = await resetPasswordService(emailData);
      if (data.Success) {
        setLoadingShow(false);
        setErrorMessage(
          <Alert variant="filled" severity="success">
            Reset email is successfully sent to your email...
          </Alert>
        );
        setTimeout(() => {
          setErrorMessage(null);
          history.push("/");
        }, 3000);
      }
    } catch (error) {
      setLoadingShow(false);
      setErrorMessage(
        <Alert variant="filled" severity="error">
          {error.response.data.Message}
        </Alert>
      );
      setTimeout(() => {
        setErrorMessage(null);
      }, 3000);
    }
  };
  const [loadingShow, setLoadingShow] = useState(false);

  const theme = React.useContext(ThemeContext);

  const styles = useStyles(theme);

  let handelLoginPress = () => {
    history.push("/");
  };

  return (
    <Grid container spacing={0}>
      <Backdrop className={classes.backdrop} open={loadingShow}>
        <CircularProgress color="inherit" />
      </Backdrop>

      <Grid item sm={12} md={4}>
        <div className={styles.container}>
          <div style={styles.logo}>
            <img src={logo} alt="google logo" />
          </div>
          <br />
          <h1 className={styles.heading}>Enter email to reset password</h1>

          <Grid container spacing={3}>
            <Grid item xs={12} style={{ marginTop: "10%" }}>
              <Input
                placeholder="Enter email address"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </Grid>
            <Grid item xs={12}>
              <MaterialButton
                className={styles.signInButton}
                fullWidth
                onClick={handelSendEmail}
              >
                Send
              </MaterialButton>
            </Grid>
            <Grid item xs={12}>
              {errorMessage && errorMessage}
            </Grid>
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
              <h3>
                Please{" "}
                <span
                  style={{ color: "#1AB4B3", cursor: "pointer" }}
                  onClick={handelLoginPress}
                >
                  click here
                </span>{" "}
                to login
              </h3>
            </Grid>
          </Grid>
        </div>
      </Grid>
      <Grid item sm={false} md={8}>
        <div className={styles.emptyContainer} />
      </Grid>
    </Grid>
  );
}
