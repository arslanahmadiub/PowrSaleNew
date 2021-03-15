import { Visibility, VisibilityOff } from "@material-ui/icons";
import React from "react";
import Input from "./Input";

export default function PasswordInput(props) {
  const [visible, setVisible] = React.useState(false);

  const toggleVisibility = (event) => {
    event.stopPropagation();
    event.preventDefault();
    setVisible(!visible);
  };

  return (
    <div style={{ position: "relative" }}>
      <Input
        placeholder={props.placeholder || "Password"}
        onChange={props.onChange && props.onChange}
        type={visible ? "text" : "password"}
        name={props.name || props.id || ""}
        value={props.value}
        style={{ position: "relative", paddingRight: "75px" }}
      />

      <Visibility
        onClick={toggleVisibility}
        style={{
          position: "absolute",
          right: "6px",
          top: "0%",
          fontSize: "35px",
          color: "#000",
          background: "rgba(151,159,170, 0.2)",
          padding: "8px",
          borderRadius: "10px",
          display: visible ? "none" : "",
        }}
      />
      <VisibilityOff
        onClick={toggleVisibility}
        style={{
          position: "absolute",
          right: "6px",
          top: "0%",
          color: "#000",
          fontSize: "35px",
          background: "rgba(151,159,170, 0.2)",
          padding: "8px",
          borderRadius: "10px",
          display: visible ? "" : "none",
        }}
      />
    </div>
  );
}
