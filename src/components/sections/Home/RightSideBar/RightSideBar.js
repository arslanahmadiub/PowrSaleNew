import React from "react";
import ProfileSection from "./ProfileSection";

import Grid from "@material-ui/core/Grid";
import { messages as msg } from "../../../../DummyData/DummyData";
import LogoutButton from "../../../CustomComponents/LogoutButton";

const RigthSideBar = (props) => {
  return (
    <div style={{ background: "#ffffff", padding: "20px" }}>
      <Grid container direction="column" spacing={4}>
        <Grid item>
          <ProfileSection />
        </Grid>

        <LogoutButton />
      </Grid>
    </div>
  );
};

export default RigthSideBar;
