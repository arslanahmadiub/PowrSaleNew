import React from 'react'

export const RightSideBarContext = React.createContext()

export default function RightSideBarContextProvider(props) {
    const [showRightSideBar, toggleShow] = React.useState(false);

    function toggleRightSideBar(value) {
        if (value) { toggleShow(!!value) }

        toggleShow(!showRightSideBar)

    }

    return <RightSideBarContext.Provider value={{ showRightSideBar, toggleRightSideBar }} >
        {props.children}
    </RightSideBarContext.Provider>


}