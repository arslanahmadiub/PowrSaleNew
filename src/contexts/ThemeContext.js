import React from 'react'

export const ThemeContext = React.createContext();


export default function ThemeContextProvider(props) {

    return <ThemeContext.Provider value={themeConfig}>
        {props.children}
    </ThemeContext.Provider>
}

const themeConfig = {
    primaryGreen: '#1AB4B3', // green
    primaryBlue: '#31BDF4', // blue
    basicBlack: '#000000', // black
    lightGrey: '#F5F8FD', // lightgrey
    semiGrey: '#E7EEFA', //midgrey
    darkGrey: '#979FAA', // darkgrey
    mainOrange: '#F18F6C', //orange
    white: '#FFFFFF', //white
}