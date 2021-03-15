import React from "react";
import logo from "../../assets/images/phone.svg";

export default function PhoneLogo(props) {
  const { height, width, color } = props;
  if (color);

  return <img src={logo} height={height || 20} width={width || 20} alt="" />;
}
