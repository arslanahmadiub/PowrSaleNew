import React, { useState, useEffect, useRef } from "react";

import Grid from "@material-ui/core/Grid";
import Input from "../CustomComponents/Input";
import Button from "../CustomComponents/Button";
import { Button as MaterialButton } from "@material-ui/core";
import verification from "../../assets/images/verification.svg";

import PasswordInput from "../CustomComponents/PasswordInput";
import CustomLink from "../CustomComponents/CustomLink";
import { completeUserProfile } from "../../services/authServices";
import { getFullUserDetails } from "../../services/authServices";
import { verifyEmailOrPhone } from "../../services/authServices";
import { validateOtp } from "../../services/authServices";
import { imageEndPoint } from "../../config.json";
import {
  shopProfileFetchLoading,
  userProfileSaveLoading,
} from "../../action/dashboardAction";
import { profileDialogAction } from "../../action/authAction";

import { setProfileImage } from "../../action/authAction";
import { useSelector, useDispatch } from "react-redux";
import Alert from "@material-ui/lab/Alert";
import CustomDatePicker from "../CustomComponents/CustomDatePicker";
import moment from "moment";
import CircularProgress from "@material-ui/core/CircularProgress";

const ProfileForm = (props) => {
  let dispatch = useDispatch();

  const [dateOfBirth, setDateOfBirth] = useState("");

  let [profileData, setProfileData] = useState({
    first_name: "",
    last_name: "",
    other_names: "",
    email: "",
    phone: "",
    newPassword: "",
    confirmPassword: "",
  });
  let {
    first_name,
    last_name,
    other_names,
    email,
    phone,
    newPassword,
    confirmPassword,
  } = profileData;
  let [profileAvatar, setProfielAvatar] = useState(null);
  let widthRef = useRef();
  let phoneRef = useRef(null);
  let emailRef = useRef(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const [emailVerification, setEmailVerification] = useState(false);
  const [mobileVerification, setMobileVerification] = useState(false);

  const profileLoading = useSelector(
    (state) => state.dashboard.profileDataSaveLoading
  );
  const [userImage, setUserImage] = useState("");

  useEffect(() => {
    setProfielAvatar(props.profileImage);
  }, [props.profileImage]);

  useEffect(() => {
    props.setProfileAvatar(userImage);
  }, [userImage]);
  let userToken = localStorage.getItem("token");

  let getProfileInfo = async () => {
    dispatch(shopProfileFetchLoading(true));

    let { data } = await getFullUserDetails(userToken);

    dispatch(shopProfileFetchLoading(false));

    if (data.Success) {
      if (data.Details[0].dob) {
        setDateOfBirth(data.Details[0].dob);
      }
      data.Details[0].newPassword = "";
      data.Details[0].confirmPassword = "";
      setProfileData(data.Details[0]);
      setUserImage(imageEndPoint + data.Details[0].profile_picture);
      dispatch(
        setProfileImage(imageEndPoint + data.Details[0].profile_picture)
      );
    }
  };
  useEffect(() => {
    getProfileInfo();
  }, []);

  const [otp, setOtp] = useState({
    otp1: "",
    otp2: "",
    otp3: "",
    otp4: "",
  });

  let { otp1, otp2, otp3, otp4 } = otp;
  let otpLength = otp1 + otp2 + otp3 + otp4;

  let handelProfileDataChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  let verifyId = async (userData) => {
    try {
      let { data } = await verifyEmailOrPhone(userData, userToken);
      if (data.Success) {
        if ("email" in userData) {
          setEmailVerification(data.is_verified);
        } else {
          setMobileVerification(data.is_verified);
        }
      }
    } catch (error) {}
  };
  useEffect(() => {
    if (email.length > 0) {
      verifyId({ email: email });
    }
    if (phone.length > 0) {
      verifyId({ phone: phone });
    }
  }, [profileData]);
  const saveProfile = async (event) => {
    event.preventDefault();
    let profileDataForm = new FormData();
    profileDataForm.set("first_name", first_name);
    profileDataForm.set("last_name", last_name);
    profileDataForm.set("other_names", other_names);
    profileDataForm.set("dob", dateOfBirth);
    profileDataForm.set("email", email);
    profileDataForm.set("phone", phone);
    profileDataForm.set("password", newPassword);
    profileDataForm.set("profile_picture", profileAvatar);
    try {
      dispatch(userProfileSaveLoading(true));
      let result = await completeUserProfile(profileDataForm, userToken);
      dispatch(userProfileSaveLoading(false));

      setErrorMessage(
        <Alert variant="filled" severity="success">
          {result.data.Message}
        </Alert>
      );
      setTimeout(() => {
        dispatch(profileDialogAction(false));
        getProfileImageInfo();
        setErrorMessage(null);
      }, 2000);
    } catch (ex) {
      dispatch(userProfileSaveLoading(false));
      if (ex.response) {
        if (ex.response.data.Errors.phone) {
          setErrorMessage(
            <Alert variant="filled" severity="error">
              Enter a valid mobile number...
            </Alert>
          );
        } else {
          setErrorMessage(
            <Alert variant="filled" severity="error">
              Something went wrong or server error...
            </Alert>
          );
        }
        setTimeout(() => {
          setErrorMessage(null);
        }, 3000);
      }
    }
  };
  let selector = document.getElementById("dobSelector");
  let containerRef = widthRef;
  if (containerRef.current) {
    if (selector) {
      let width = containerRef.current.scrollWidth - 40;
      document.getElementById("dobSelector").style.width =
        width.toString() + "px";
    }
  }

  let getProfileImageInfo = async () => {
    let { data } = await getFullUserDetails(userToken);

    if (data.Success) {
      dispatch(
        setProfileImage(imageEndPoint + data.Details[0].profile_picture)
      );
    }
  };

  const [calander, setCalander] = useState(false);
  let handelDayClick = (e) => {
    let dateValue = moment(e).format("yyyy-MM-DD");
    setDateOfBirth(dateValue);
    setCalander(!calander);
  };

  const [emailVerificationShow, setEmailVerificationShow] = useState(false);
  const [mobileVerificationShow, setMobileVerificationShow] = useState(false);
  const [verifiedMessageShow, setVerifiedMessageShow] = useState(false);
  const [phoneOrMobile, setPhoneOrMobile] = useState(false);

  let verifiedData = {
    status: true,
  };
  let unVerifiedData = {
    status: false,
  };
  let handelChange = (e) => {
    setOtp({ ...otp, [e.target.name]: e.target.value });
  };

  let handelPropShopInput = (value) => {
    if (value === "phone") {
      setEmailVerificationShow(false);
      setMobileVerificationShow(true);
    } else {
      setMobileVerificationShow(false);
      setEmailVerificationShow(true);
    }
  };

  let handelVerifyEmail = async () => {
    let convertOtp = otp1 + otp2 + otp3 + otp4;
    let convertedOtp = parseInt(convertOtp);

    let otpData = {
      email: email,
      otp: convertedOtp,
    };
    let mobileOtpData = {
      phone: phone,
      otp: convertedOtp,
    };

    if (emailVerificationShow) {
      try {
        let { data } = await validateOtp(otpData, userToken);
        if (data.Success) {
          verifyId({ email: email });

          setMobileVerificationShow(false);
          setEmailVerificationShow(false);
          setVerifiedMessageShow(true);
          setOtp({
            otp1: "",
            otp2: "",
            otp3: "",
            otp4: "",
          });
          setTimeout(() => {
            setVerifiedMessageShow(false);
          }, 3000);
        }
      } catch (error) {
        if (error.response.data.Success === false) {
          setErrorMessage("Invalid OTP!");
        }
      }
    } else {
      try {
        let { data } = await validateOtp(mobileOtpData, userToken);
        if (data.Success) {
          verifyId({ phone: phone });

          setMobileVerificationShow(false);
          setEmailVerificationShow(false);
          setVerifiedMessageShow(true);
          setOtp({
            otp1: "",
            otp2: "",
            otp3: "",
            otp4: "",
          });
          setTimeout(() => {
            setVerifiedMessageShow(false);
          }, 3000);
        }
      } catch (error) {
        if (error.response.data.Success === false) {
          setErrorMessage("Invalid OTP!");
        }
      }
    }

    setTimeout(() => {
      setErrorMessage(null);
    }, 3000);
  };

  let handelFocus = () => {
    if (emailVerificationShow) {
      emailRef.current.focus();
    } else {
      phoneRef.current.focus();
    }
  };

  let handelResend = () => {
    if (emailVerificationShow) {
      if (email.length > 0) {
        verifyId({ email: email });
      }
    } else {
      if (phone.length > 0) {
        verifyId({ phone: phone });
      }
    }
  };

  return (
    <>
      <form onSubmit={saveProfile}>
        <Grid container direction="row" spacing={5}>
          <Grid item xs={12} sm={6} ref={widthRef}>
            <Input
              placeholder="Enter first name"
              label="First name"
              name="first_name"
              value={first_name}
              onChange={handelProfileDataChange}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Input
              placeholder="Enter last name"
              label="Last Name"
              name="last_name"
              value={last_name}
              onChange={handelProfileDataChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Input
              placeholder="Other name(s)"
              label="Other name(s)"
              name="other_names"
              value={other_names}
              onChange={handelProfileDataChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomDatePicker
              placeholder="Enter your date of birth"
              label="DOB"
              name="dob"
              value={
                dateOfBirth.length > 0 ? dateOfBirth : "Enter Date of Birth"
              }
              onClickDay={handelDayClick}
              hideCalander={calander}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Input
              type="email"
              placeholder="Enter email address"
              label="Email address"
              name="email"
              required
              value={email}
              ref={emailRef}
              verification={emailVerification ? verifiedData : unVerifiedData}
              onChange={handelProfileDataChange}
              showInput={(value) => handelPropShopInput(value)}
              loading={{ status: true }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Input
              placeholder="Phone number"
              label="Phone number"
              type="tel"
              name="phone"
              value={phone}
              ref={phoneRef}
              verification={mobileVerification ? verifiedData : unVerifiedData}
              onChange={handelProfileDataChange}
              required
              showInput={(value) => handelPropShopInput(value)}
            />
          </Grid>

          {/* otp verification section */}
          <Grid
            item
            xs={12}
            style={{
              display:
                emailVerificationShow || mobileVerificationShow
                  ? "flex"
                  : "none",
            }}
          >
            <Grid container>
              <Grid item sm={3}></Grid>
              <Grid item sm={6}>
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
                      {emailVerificationShow
                        ? email
                        : mobileVerificationShow
                        ? phone
                        : null}
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
                  sm={12}
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
                      marginTop: "15px",
                    }}
                    onClick={handelVerifyEmail}
                  >
                    {mobileVerificationShow
                      ? "Verify Your Phone"
                      : "Verify Your Email"}
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
                    <p className="bottomVerificaton" onClick={handelFocus}>
                      {mobileVerificationShow
                        ? "Edit your mobile?"
                        : "Edit your email?"}
                    </p>
                    <p className="bottomVerificaton" onClick={handelResend}>
                      Resend
                    </p>
                  </div>
                </Grid>
              </Grid>

              <Grid item sm={3}></Grid>
            </Grid>
          </Grid>

          <Grid
            item
            xs={12}
            style={{ display: verifiedMessageShow ? "flex" : "none" }}
          >
            <Grid container>
              <Grid item sm={3}></Grid>
              <Grid itemScope sm={6}>
                <p style={{ fontSize: "24px", textAlign: "center" }}>
                  Congrats your{" "}
                  <span style={{ color: "#31BDF4" }}>
                    {phoneOrMobile ? "Phone Number" : "Email"}
                  </span>{" "}
                  has successfully been verified.{" "}
                </p>
                <Grid
                  item
                  style={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "center",
                    marginBottom: "5%",
                  }}
                >
                  <img src={verification} alt="google logo" />
                </Grid>
              </Grid>
              <Grid item sm={3}></Grid>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <h2
              style={{
                fontSize: "22px",
                fontWeight: "500",
                padding: "0",
                margin: "0",
              }}
            >
              Change password
            </h2>
          </Grid>

          <Grid item xs={12} sm={6}>
            <PasswordInput
              placeholder="New password"
              label="New password"
              name="newPassword"
              value={newPassword}
              onChange={handelProfileDataChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <PasswordInput
              placeholder="Confirm password"
              label="Confirm password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={handelProfileDataChange}
            />
          </Grid>

          <Grid item xs={12}>
            <span style={{ textAlign: "center" }}>
              * By continuing, you agree to Powrsale's{" "}
              <CustomLink>terms</CustomLink> and{" "}
              <CustomLink>privacy notice</CustomLink>
            </span>
          </Grid>
          <Grid
            container
            spacing={0}
            alignItems="center"
            justify="center"
            width="100%"
            style={{}}
          >
            <Grid
              item
              style={{
                display: profileLoading ? "flex" : "none",
                width: "100%",
                justifyContent: "center",
              }}
            >
              <CircularProgress />
            </Grid>
          </Grid>
          <Grid item xs={12}>
            {errorMessage && errorMessage}
          </Grid>
          <Grid item xs={12}>
            {newPassword !== confirmPassword ? (
              <Button type="submit" width="100%" disable faded>
                Submit
              </Button>
            ) : (
              <Button type="submit" width="100%">
                Submit
              </Button>
            )}
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default ProfileForm;
