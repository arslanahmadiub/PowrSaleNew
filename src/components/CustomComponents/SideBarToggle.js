import React from 'react'
import { makeStyles } from '@material-ui/core';
import { CaretLeftOutlined } from '@ant-design/icons'
import { ThemeContext } from '../../contexts/ThemeContext'


const useStyles = makeStyles((theme) => ({
    container: {
        background: props => props.primaryBlue,
        borderRadius: '50px',
        height: '50px',
        width: '50px',
        postion: 'relative',
        right: '-15px',
        top: '50vh',
    },
    arrow: {
        position: 'absolute',
        margin: 'auto auto',
        fontSize: '40px',
        top: '5px',
        left: '-5px',
        color: 'white'



    }
}))


export default function SideBarToggle(props) {

    const theme = React.useContext(ThemeContext)
    const styles = useStyles(theme);

    return <div className={styles.container}>

        <CaretLeftOutlined className={styles.arrow} />

    </div>
}