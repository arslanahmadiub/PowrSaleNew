import React from "react";
import Grid from "@material-ui/core/Grid";
import Close from "@material-ui/icons/Close";
import Avatar from "@material-ui/core/Avatar";
import Hidden from "@material-ui/core/Hidden";
import CircularProgress from "../../../CustomComponents/CircularProgress";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../../../contexts/AuthContext";
import { RightSideBarContext } from "../../../../contexts/RightSideBarContext";
import { useDispatch } from "react-redux";
import { profileDialogAction } from "../../../../action/authAction";
import { useSelector } from "react-redux";
import { graphCall } from "../../../../action/dashboardAction";

const ProfileSection = (props) => {
  let dispatch = useDispatch();

  const {
    profilePercent: percentage,
    username,
    profilePhoto,
  } = React.useContext(AuthContext);
  const { toggleRightSideBar } = React.useContext(RightSideBarContext);
  const profileImage = useSelector((state) => state.auth.profileUrl);

  const history = useHistory();

  let handelEditProfile = () => {
    dispatch(profileDialogAction(true));
  };

  let handelRightSideBar = () => {
    toggleRightSideBar(true);
    dispatch(graphCall());
  };

  return (
    <Grid container direction="column" spacing={3}>
      <Grid item>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            <div
              style={{
                color: "#010101",
                fontSize: "14px",
                fontWeight: "500",
              }}
            >
              My Profile
            </div>
            <small
              style={{ color: "#7C7F84", fontSize: "12px", opacity: "0.4" }}
            >
              {/* {percentage || 0}% completed */}
            </small>
          </div>
          <Hidden smDown>
            <div
              onClick={handelRightSideBar}
              style={{ color: "#979FAA", fontSize: "10px", cursor: "pointer" }}
            >
              <Close />
            </div>
          </Hidden>
        </div>
      </Grid>
      <Grid item>
        <div style={{ width: "137px", margin: "auto" }}>
          <CircularProgress radius={60} thickness={7}>
            <Avatar
              style={{
                border: "solid 10px #ffffff",
                height: "110px",
                width: "110px",
                marginTop: "5px",
                marginLeft: "3px",
              }}
              alt={username}
              src={profileImage}
            />
          </CircularProgress>
        </div>
      </Grid>
      <Grid item>
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              color: "#010101",
              fontSize: "20px",
              fontWeight: "500",
              padding: "10px 0",
            }}
          >
            {username}
          </div>
          <small
            style={{ color: "#979FAA", fontSize: "14px", cursor: "pointer" }}
            // onClick={() => history.push("/edit-profile")}
            onClick={handelEditProfile}
          >
            Edit Profile
          </small>
        </div>
      </Grid>
    </Grid>
  );
};

export default ProfileSection;
