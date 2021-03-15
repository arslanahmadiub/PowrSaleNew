import React from "react";
import styled from "styled-components"

const TextAreaInput = styled.textarea`
border: 1px solid #ccc;
box-sizing: border-box;
border-radius: 10px;
resize: none;
width: 100%;
padding:10px;
font-size: 16px;
color:#000;
&:focus {
    outline-width: 0;
    border-radius: 10px;
    boder: solid 2px lightblue;
};
&::placeholder{
    color:#979FAA;
}
`

const Label = styled.label`
    font-size: 14px;
    position:relative; 
    padding: 15 0px;
    top: -5px;
`

const Asterisk = styled.span`
    color: red;
    font-size: 16px;
    font-weight: 600;
    display: ${props => props.show === true ? "" : "none"}
`


export default function ({ value, label, required, onChange, placeholder, id, disabled, readOnly, rows, ...props }) {

    return <Label htmFor={id}>{label && label} <Asterisk show={!!required}>*</Asterisk>

        <TextAreaInput
            required={required}
            placeholder={placeholder || "Type here..."}
            id={id}
            value={value}
            {...props}
            rows={rows || 5}
            readOnly={props.readOnly != null}
            onChange={onChange}
        />
    </Label>
}



