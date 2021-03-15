import React, { useState, useEffect, useRef } from "react";
//import styled from "styled-components";
import Grid from "@material-ui/core/Grid";
import Input from "../CustomComponents/Input";
import Button from "../CustomComponents/Button";
import DatePicker from "../CustomComponents/DatePicker";
import PasswordInput from "../CustomComponents/PasswordInput";
import CustomLink from "../CustomComponents/CustomLink";
import { completeUserProfile } from "../../services/authServices";
import { getFullUserDetails } from "../../services/authServices";
import { imageEndPoint } from "../../config.json";
import {
  shopProfileFetchLoading,
  userProfileSaveLoading,
} from "../../action/dashboardAction";
import { profileDialogAction } from "../../action/authAction";
import { reCallProfileApi } from "../../action/dashboardAction";
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

  const [errorMessage, setErrorMessage] = useState(null);

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

  let handelProfileDataChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

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
              value={email}
              onChange={handelProfileDataChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Input
              placeholder="Phone number"
              label="Phone number"
              type="tel"
              name="phone"
              value={phone}
              onChange={handelProfileDataChange}
            />
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
