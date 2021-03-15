import React from 'react'
import Styled from "styled-components"

const Container = Styled.div`
    overflow-x: scroll;
    width: 100%;
    white-space: nowrap;
    display: flex;
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
    &::-webkit-scrollbar {
        display: none;
    };
`

const Content = Styled.div`
        margin: 0 10px;
`


const HorizontalScrollingContainer = props => {
    return <div>
        <Container>
            {props.children && props.children.map((item, index) => {
                return <Content key={index}>
                    {item}
                </Content>;
            })}
        </Container>
    </div>
}

export default HorizontalScrollingContainer;