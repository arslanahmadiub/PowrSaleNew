import React from "react";
import Styled from "styled-components";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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
    height: 45px;
    width: 100%;
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
  selected,
  id,
  placeholder,
  onChange,
  label,
  required,
  type,
  onKeyDown,
  ...props
}) {
  return (
    <Label htmlFor={id}>
      {label && label} <Asterisk show={!!required}>*</Asterisk>
      {/* <Input
        value={value}
        required={!!required}
        placeholder={placeholder || label || ""}
        type={type || "date"}
        id={id}
        name={props.name || id || ""}
        onChange={onChange && onChange}
      /> */}
      <br />
      <DatePicker
        id={id}
        selected={selected}
        required={!!required}
        name={props.name || id || ""}
        onChange={onChange && onChange}
        className="datePicker"
        placeholder={placeholder || label || ""}
        onKeyDown={onKeyDown && onKeyDown}
      />
      {selected !== "" ? null : (
        <p style={{ position: "absolute", top: 33, left: 15 }}>
          Select your date of birth
        </p>
      )}
    </Label>
  );
}
