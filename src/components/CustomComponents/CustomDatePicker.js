import React, { useState, useEffect } from "react";
import Styled from "styled-components";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const Asterisk = Styled.span`
    color: red;
    font-size: 16px;
    font-weight: 600;
    display: ${(props) => (props.show === true ? "" : "none")}
`;
const Label = Styled.label`
    font-size: 14px;
    position:relative; 
    padding: 15 0px;
    top: -5px;
`;

const Input = Styled.input`
    display: block;
    
    font-size: 16px;
    padding: 0 10px;
    font-weight: 400;
    border: 1px solid #ccc;
    border-radius: 10px;
    &:focus {
        border-radius: 10px;
        border: 2px solid lightblue;
        outline-width: 0px;
    }

`;

export default function ({
  value,
  id,
  placeholder,
  onChange,
  label,
  required,
  type,
  width,
  height,
  onKeyDown,
  onClickDay,
  onClick,
  hideCalander,
  ...props
}) {
  const [showCalander, setShowCalander] = useState(false);
  let handelClick = () => {
    setShowCalander(!showCalander);
  };

  useEffect(() => {
    setShowCalander(!showCalander);
  }, [hideCalander]);

  useEffect(() => {
    setShowCalander(false);
  }, []);

  return (
    <div style={{ position: "relative" }}>
      <Label htmlFor={id}>
        {label && label} <Asterisk show={!!required}>*</Asterisk>
        <Input
          value={value}
          required={!!required}
          placeholder={placeholder || label || ""}
          type={type || "text"}
          id={id}
          name={props.name || id || ""}
          onChange={onChange && onChange}
          onKeyDown={onKeyDown && onKeyDown}
          onClick={handelClick}
          style={{
            width: width ? width : "100%",
            height: height ? height : "45px",
          }}
        />
      </Label>
      <div
        style={{
          display: showCalander ? "flex" : "none",
          position: "absolute",
          zIndex: "500",
        }}
      >
        <Calendar maxDate={new Date()} onClickDay={onClickDay && onClickDay} />
      </div>
    </div>
  );
}
