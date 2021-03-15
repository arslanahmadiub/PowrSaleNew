import React from "react";
import Styled from "styled-components";

const Container = Styled.div`
    padding: 10px 10px;
    border-radius: 20px;
    background: #FFFFFF;
    justify-content: center;
    align-items: center;
    text-align: center;
`


const Card = props => {
    return <Container>
        {props.children}
    </Container>
};

export default Card;