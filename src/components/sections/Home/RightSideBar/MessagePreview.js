import React from "react";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
const MessagePreview = (props) => {
  return (
    <Grid container direction="row" spacing={5}>
      <Grid item xs={2}>
        <Avatar
          alt={props?.sender}
          src={props?.image}
          style={{ height: "50px", width: "50px" }}
        />
      </Grid>
      <Grid item xs={10}>
        <Grid container direction="column" spacing={0}>
          <Grid item xs={12}>
            <h3
              style={{
                margin: 0,
                padding: 0,
                color: "#010101",
                fontSize: "16px",
                lineHeight: "19px",
              }}
            >
              {props?.sender}
            </h3>
          </Grid>
          <Grid item xs={3}>
            <small
              style={{
                color: "rgba(124, 127, 132, 0.4)",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                width: "170px",
                display: "inline-block",
              }}
            >
              {props?.message}
            </small>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default MessagePreview;
