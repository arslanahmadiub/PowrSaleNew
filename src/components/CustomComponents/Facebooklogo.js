import React from "react";
import logo from "../../assets/images/facebook.svg";

export default function Facebooklogo(props) {
  const { height, width, color } = props;
  if (color);

  return <img src={logo} height={height || 20} width={width || 20} alt="" />;
}
