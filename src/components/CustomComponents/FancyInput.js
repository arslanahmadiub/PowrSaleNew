import React from "react";
import Styled from "styled-components";
import LockIcon from "@material-ui/icons/Lock";

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
    padding: 0 35px;
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
  ...props
}) {
  return (
    <Label htmlFor={id}>
      {label && label} <Asterisk show={!!required}>*</Asterisk>
      <div id="csv">
        <Input
          value={value}
          required={!!required}
          placeholder={placeholder || label || ""}
          type={type || "text"}
          id={id}
          name={props.name || id || ""}
          onChange={onChange && onChange}
        />
      </div>
      <LockIcon
        style={{ position: "absolute", display: "flex", top: "32", left: "10" }}
      />
    </Label>
  );
}
