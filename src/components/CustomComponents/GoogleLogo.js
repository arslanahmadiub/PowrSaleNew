import React from "react";
import logo from "../../assets/images/glogo.svg";

export default function GoogleLogo(props) {
  const { height, width, color } = props;
  if (color);

  return <img src={logo} height={height || 20} width={width || 20} alt="" />;
}
