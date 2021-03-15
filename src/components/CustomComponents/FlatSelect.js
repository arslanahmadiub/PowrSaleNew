import { ClickAwayListener } from '@material-ui/core'
import { EventNote, ExpandLess, ExpandMore } from '@material-ui/icons'
import React from 'react'
import Styled from "styled-components"



const Container = Styled.div`
    postion: relative;
    height: 20px;
    cursor: pointer;
    padding: 10px;
    border-radius: 10px;
    background: ${p => p.bg ? "#FFFFFF" : ""}
`
const SelectText = Styled.div`
    color: #979FAA;
    font-size: 12px;
    text-align: center;
    width: 100%;
`

const DropdownIcon = Styled(ExpandMore)`
    position: relative;
    top:-5px;
    width: 20px;
    color: #979FAA;
`
const DropUpIcon = Styled(ExpandLess)`
    position: relative;
    top:-5px;
    width: 20px;
    color: #979FAA;
`
const Icon = Styled(EventNote)`
    position: relative;
    top:-5px;
    width: 20px;
    color: #5A36CC;
    margin-right: 10px;
`

const List = Styled.ul`
    position:relative;
    padding: 2px;
    z-index: 100;
    overflow: hidden;
    width: 100%;
    top: -15px;
    right: 10px;
    text-align: center;
    border-bottom-right-radius: 15px;
    border-bottom-left-radius: 15px;
    background: #FFF;
    padding: 10px;
    list-style-type: none;
    border-bottom-radius: 10px;
    display: ${p => p.show ? "" : "none"};
`

const ListItem = Styled.li`
    cursor: pointer;
    font-size: 11px;
    padding: 5px;
    border-radius: 10px;
    &:hover{
        background: #F5F8FD;
    }
`


const FlatSelect = props => {
    const [show, toggleShow] = React.useState(false)
    const [selected, setSelected] = React.useState(0)

    const list = props.list || []



    const selectItem = index => event => {
        event.stopPropagation();
        setSelected(index)
        toggleShow(!show)
        if (props.onSelectionChange != null) {
            props.onSelectionChange(list[selected].toLowerCase())
        }

    }



    const toggleDropDown = event => {
        if (list.length === 2) {
            setSelected((selected + 1) % 2)
            if (props.onSelectionChange != null) {
                props.onSelectionChange(list[selected].toLowerCase())
            }
        }
        else {
            toggleShow(!show)
        }
    }

    return <ClickAwayListener onClickAway={() => toggleShow(false)}>
        <Container onClick={toggleDropDown} bg={props.bg}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                {props.icon ? <Icon /> : <></>}
                <SelectText>{list.length > 0 ? list[selected] : "No Options"}</SelectText>
                {show ? <DropUpIcon /> : <DropdownIcon />
                }
            </div>

            <List show={show}>
                {
                    props && props.list && props.list.map((item, index) => {
                        return <ListItem key={index} onClick={selectItem(index)}>{item}</ListItem>
                    })
                }
            </List>
        </Container>
    </ClickAwayListener>
}

export default FlatSelect;