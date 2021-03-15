import React from "react";
import Styled from "styled-components";
import { Email, Facebook, Phone } from "@material-ui/icons";

const Buttons = Styled.input`
    display: block;
    height: 45px;
    width: 100%;
    font-size: 16px;
    padding: 0 10px;
    font-weight: 400;
    border: 1px solid #ccc;
    border-radius: 10px;
`;

export default function ({
  id,
  iconImage,
  onClick,
  buttonText,

  ...props
}) {
  return (
    <div style={{ display: "flex", height: "45px" }}>
      <div
        style={{
          position: "absolute",
          marginLeft: "10px",
          marginTop: "10px",
        }}
      >
        {iconImage}
      </div>
      <button id={id} onClick={onClick && onClick} className="materialButton">
        {buttonText}
      </button>
    </div>
  );
}
