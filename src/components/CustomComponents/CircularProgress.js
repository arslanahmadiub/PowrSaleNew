import React from 'react'
import Styled from "styled-components"


const Container = Styled.div`
    position: relative;
    background: transparant;
    display: flex;
    justify-content: center;
    align-items: center;
    
`

const SVG = Styled.svg`
    position: relative;
    // width: ${props => 1.5 * props.width}px;
    // height: ${props => 1.5 * props.width}px;
    // padding: -15px;
    z-index: 100;
`
const Circle = Styled.circle`
    margin: auto;
    fill: none;
    stroke: ${p => p.secondary ? "#5A36CC" : "#31BDF4"};
    stroke-width:${props => props.thickness ? props.thickness : 1}%;
    stroke-linecap: round;
    transform: translate(0px, 0px);
    stroke-dasharray: ${p => p.percent ? `${(p.cfx * p.percent / 100)} ${(p.cfx * (100 - p.percent) / 100)}` : p.cfx};
    stroke-dashoffset: 157;

    `
const BgCircle = Styled.circle`
    fill: none;
    stroke: #F5F8FD;
    stroke-width:${props => props.thickness ? props.thickness : 1}%;
    stroke-linecap: round;
    transform: translate(0px, 0px);
    stroke-dashoffset: 157;
    stroke-dasharray: ${p => p.arc ? `${p.cfx / 2} ${p.cfx / 2}` : p.cfx}
    `

const InnerContent = Styled.div`
    position: absolute;
    left: 10px;
    top: 7px;
`

const CircularProgress = props => {
    var percent = props.arc ? 0.5 * Number(props.percent) : Number(props.percent) || 50;
    const radius = Number(props.radius) || 50;
    const thickness = Number(props.thickness) || 1;
    const cfx = 2 * Math.fround(Math.PI * Number(radius));
    const width = 2 * (Number(radius) + thickness);
    const centerAt = width / 2;

    const sec = props.secondary;

    return <Container>
        <SVG width={width}>
            <BgCircle cx={centerAt} cy={centerAt} r={Number(radius)} thickness={thickness} arc={props.arc} cfx={cfx} />
            <Circle cx={centerAt} cy={centerAt} r={Number(radius)} percent={percent} cfx={cfx} thickness={thickness} secondary={sec} arc={props.arc} />
        </SVG>

        <InnerContent>
            {props.children}
        </InnerContent>
    </Container>
}

export default CircularProgress;