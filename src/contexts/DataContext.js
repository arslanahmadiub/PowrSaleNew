import React from 'react'
import { countryList, bankList, businessTypes, mobileOperators, currencies } from './DataSets'

export const DataContext = React.createContext();


export default function DataContextProvider(props) {


    return (
        <DataContext.Provider value={{ countryList, currencies, bankList, mobileOperators, businessTypes }}>
            {props.children}
        </DataContext.Provider>
    )
}