import React from "react";
import styled from "styled-components";

const Label = styled.label`
  font-size: 14px;
  position: relative;
  padding: 15 0px;
  top: -5px;
`;

const Asterisk = styled.span`
  color: red;
  font-size: 16px;
  font-weight: 600;
  display: ${(props) => (props.show === true ? "" : "none")};
`;

const Select = styled.select`
  display: block;
  display: block;
  height: 45px;
  width: 100%;
  font-size: 16px;
  padding: 0 10px;
  font-weight: 400;
  border-radius: 10px;
  background: #fff;
  border: 1px solid #ccc;
  &:focus {
    border-radius: 10px;
    border: 2px solid lightblue;
    outline-width: 0px;
  }
`;

const Option = styled.option``;

export default function ({
  value,
  label,
  id,
  required,
  placeholder,
  list,
  onChange,
  ...props
}) {
  return (
    <Label htmlFor={id}>
      {label && label} <Asterisk show={!!required}>*</Asterisk>
      <Select
        id={id}
        value={value}
        placeholder={placeholder || ""}
        onChange={onChange}
        size="large"
        {...props}
      >
        <Option>{placeholder}</Option>
        {list &&
          list.map((item) => {
            return (
              <Option value={item} key={item}>
                {item}
              </Option>
            );
          })}
      </Select>
    </Label>
  );
}
