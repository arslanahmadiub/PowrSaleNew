import React from 'react'
import AuthContextProvider from './AuthContext'
import ThemeContextProvider from './ThemeContext'
import ShopContextProvider from './ShopContext'
import RightSideBarContextProvider from './RightSideBarContext'
import DataContextProvider from './DataContext'
import TransactionsContextProvider from './TransactionsContext'
import WalletContextProvider from './WalletContext'


export default function UnifiedContextProviderProvider(props) {


    return (
        <AuthContextProvider>
            <RightSideBarContextProvider>
                <ThemeContextProvider>
                    <ShopContextProvider>
                        <TransactionsContextProvider>
                            <DataContextProvider>
                                <WalletContextProvider>
                                    {props.children}
                                </WalletContextProvider>
                            </DataContextProvider>
                        </TransactionsContextProvider>
                    </ShopContextProvider>
                </ThemeContextProvider>
            </RightSideBarContextProvider>
        </AuthContextProvider>
    )

}