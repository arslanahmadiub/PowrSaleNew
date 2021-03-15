import React from "react";
import {
  makeStyles,
  Button as MaterialButton,
  Hidden,
} from "@material-ui/core";
import Input from "../../CustomComponents/Input";

const Forgotpass = () => {
  return (
    <div
      style={{
        display: "flex",
        width: "100vw",
        height: "100vh",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div style={{ marginBottom: "5%" }}>
        <h1>Enter Email addres to reset your password...</h1>
      </div>
      <div style={{ widht: "40vw" }}>
        <Input placeholder="Enter Email Address" width="40vw" />
      </div>
      <div style={{ widht: "40vw" }}>
        <Input placeholder="Enter Email Address" width="40vw" />
      </div>
      <div>
        <MaterialButton
          fullWidth
          style={{
            background: "#1AB4B3",
            width: "40vw",
            color: "white",
            marginTop: "20px",
            height: "45px",
          }}
        >
          Send
        </MaterialButton>
      </div>
    </div>
  );
};

export default Forgotpass;
