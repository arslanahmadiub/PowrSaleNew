import React from 'react'
import Styled from "styled-components"

const Container = Styled.div`
    padding: 1px;
    position: relative;
    &:before{
        content: "";
        background: ${props => props.primary ? "#31BDF4" : "#F5F8FD"};
        border: 5px solid ${props => props.primary ? "#31BDF4" : "#F5F8FD"};
        border-radius: 2px;
        height: 5px;
        width: 5px;
        margin: 0 0 0 0px;
        position: absolute;
        top: 5px;
    }
`

const HeadlineText = Styled.div`
    font-size: 20px;
    font-weight: normal;
    color: #F5F8FD;
    margin-left: 25px;
    @media (max-width: 960px){
        font-size: 12px;
        margin-left: 25px;
    }
`
const ValueText = Styled.div`
    font-size: 20px;
    font-weight: bold;
    color: #FFFFFF;
    margin-left: 25px;
    @media (max-width: 960px){
        font-size: 16px;
        margin-left: 25px;
    }
`

const BulletedText = props => {
    return <Container primary={props.primary != null}>
        <HeadlineText>{props.title && props.title}</HeadlineText>
        <ValueText>{props.value && props.value}</ValueText>
    </Container>
}


export default BulletedText;