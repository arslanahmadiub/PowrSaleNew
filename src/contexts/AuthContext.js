import React from 'react'

export const AuthContext = React.createContext();


export default function AuthContextProvider(props) {
    const [user, changeUser] = React.useState(null)
    const [refresh, setRefresh] = React.useState(0)

    React.useEffect(() => {
        // You can make an api call here to either
        // Either check login State or to log the user in.
        // then Change the use object accordingly

        setUser();
    }, [user, refresh])

    function refreshUser() {
        setRefresh(Math.round((new Date()).getTime() / 1000000000))
    }


    function setUser(userObj) {
        if (userObj) {
            return changeUser(userObj)
        }
        return changeUser(null)
    }


    return <AuthContext.Provider value={{ user, setUser, refreshUser }}>
        {props.children}
    </AuthContext.Provider>
}