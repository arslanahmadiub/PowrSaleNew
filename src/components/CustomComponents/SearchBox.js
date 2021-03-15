import SearchIcon from '@material-ui/icons/Search';
import React from 'react'
import Styled from "styled-components";


const OutterBox = Styled.input`
    background: #FFFFFF;
    border-radius: 10px;
    border: none;
    position: relative;
    color: #979FAA;
    font-size: 14px;
    
    padding: 5px 10px;
    height: 40px;
    width: 100%;
    // @media (max-width: 960px){
    //     max-width: 50%;
    //     float: left;
    // }
    &::placehoder{
        color: #979FAA;
        font-size: 16px;
    }
`

const Icon = Styled(SearchIcon)`
    color: #979FAA;
    font-size: 20px;
    position: absolute;
    top: 30%;
    right: 5px;
`

const Container = Styled.div`
    position: relative;
`


const SearchBox = props => {
    const [text, setText] = React.useState("")

    const onSubmit = props.onSubmit;
    const onChange = props.onChange;

    const onEnterPress = event => {
        event.stopPropagation();
        event.preventDefault();


        if (text !== "") {
            onSubmit && onSubmit(text.trim())
        }


    }
    const handleChange = e => {
        e.stopPropagation();
        e.preventDefault();
        setText(e.target.value);
        onChange && onChange(e.target.value.trim())
    }

    return <Container >
        <form onSubmit={onEnterPress}>
            <OutterBox value={text} onChange={handleChange} placeholder={props.placeholder && props.placeholder} />
            <Icon />
        </form>



    </Container>
}

export default SearchBox