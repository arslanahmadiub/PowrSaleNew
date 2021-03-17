import React from "react";
import Styled from "styled-components";
import DoneIcon from "@material-ui/icons/Done";
import CloseIcon from "@material-ui/icons/Close";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useHistory } from "react-router";

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

const Inputs = Styled.input`
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

let Input = (
  {
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
    ...props
  },
  ref
) => {
  let handelVerification = () => {
    if (props.showInput) {
      if (props.name === "phone") {
        props.showInput("phone");
      } else {
        props.showInput("email");
      }
    }
  };
  return (
    <Label htmlFor={id}>
      {label && label} <Asterisk show={!!required}>*</Asterisk>
      <Inputs
        value={value}
        required={!!required}
        placeholder={placeholder || label || ""}
        type={type || "text"}
        id={id}
        name={props.name || id || ""}
        ref={ref && ref}
        onChange={onChange && onChange}
        onKeyDown={onKeyDown && onKeyDown}
        style={{
          width: width ? width : "100%",
          height: height ? height : "45px",
        }}
      />
      {props.loading && props.loading.status ? (
        <div style={{ display: "flex", marginTop: "5px" }}>
          <CircularProgress
            style={{ width: "20px", height: "20px", color: "#31BDF4" }}
          />
          <p style={{ marginLeft: "10px", color: "#31BDF4" }}>
            Waiting for verification...
          </p>
        </div>
      ) : (
        value &&
        value.length > 0 &&
        props.verification && (
          <div style={{ display: "flex" }}>
            {props.verification.status ? (
              <>
                <DoneIcon style={{ color: "#4CAF50" }} />
              </>
            ) : (
              <CloseIcon style={{ color: "#FF3D00" }} />
            )}
            {props.verification.status ? (
              <p
                style={{
                  fontSize: "14px",
                  color: "#4CAF50",
                  marginLeft: "6px",
                }}
              >
                Verified
              </p>
            ) : (
              <p
                style={{
                  fontSize: "14px",
                  color: "#FF3D00",
                  marginLeft: "6px",
                }}
              >
                Not verified,{" "}
                <span
                  style={{ color: "#31BDF4", cursor: "pointer" }}
                  onClick={handelVerification}
                >
                  click here
                </span>{" "}
                to verify now
              </p>
            )}
          </div>
        )
      )}
    </Label>
  );
};

export default React.forwardRef(Input);
