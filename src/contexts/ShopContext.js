import React from 'react'
import { shopsData } from '../DummyData/DummyData';
import Shops from '../Helpers/ShopsController';


export const ShopContext = React.createContext();


export default function ShopContextProvider(props) {
    const [currentShop, changeShop] = React.useState(null);
    const [shops, setShops] = React.useState(shopsData || []);


    function findOfflineShop() { // retrieves locally save shops

        // this should return and array of shop objects in the local cache
        let localShops = JSON.parse(localStorage.getItem('userShops'));

        if (localShops) {
            setShops(localShops);
        }
    }

    async function addShop(shopData) {// shopData is an object

        /** 
         * Because shop info is cached, It is important to controlhow new
         *  shops are added to the database so that the cache is upto date.
         * This function will handle adding new shop accross the app so it 
         * can also keep both the cache and the context upto date.
        */

        if (shopData) {
            // keep the existing shops before you overwrite them.
            // in case adding fails, you can revert to th old one.

            // now a temporary storage for the updated shops
            const newShopsData = [...shops, shopData]

            // now try to uppdate the upstream
            const updatedShops = await Shops.addNew(shopData);

            /**
             * assuming the the api call returns either a truthy or falsy.
             * Do the below simple check to see if it worked.
             * If your design is different, then modify this accordinly.
            */

            if (!!updatedShops) {
                /**
                 * If the remote update was successful, then update the local
                 */
                // update the cache
                localStorage.setItem("userShops", JSON.stringify(newShopsData));

                // update the context as well
                setShops(newShopsData)

                return true;
            } else {
                return false;
            }

        }

    }

    async function updateShop(shopId, shopData) {// shopData is an object, Id is a string

        /** 
         * Because shop info is cached, It is important to controlhow new
         *  shops are added to the database so that the cache is upto date.
         * This function will handle adding new shop accross the app so it 
         * can also keep both the cache and the context upto date.
        */

        if (shopData && shopId) {
            // keep the existing shops before you overwrite them.
            // in case adding fails, you can revert to th old one.


            // now try to uppdate the upstream
            const updatedShop = await Shops.updateShop(shopId, shopData);

            /**
             * assuming the the api call returns either a truthy or falsy.
             * Do the below simple check to see if it worked.
             * If your design is different, then modify this accordinly.
            */

            if (!!updatedShop) {
                /**
                 * If the remote update was successful, then update the local
                 */

                const localShops = JSON.parse(localStorage.getItem('userShops'));

                // modifying the local copy
                localShops[localShops.map((item, index) => [item, index]).filtering((item, index) => item[1].id === shopId)[0][0]] = { id: shopId, ...shopData };

                // update the cache
                localStorage.setItem("userShops", JSON.stringify(localShops));

                // update the context
                setShops(localShops)

                return true;
            } else {
                return false;
            }

        }

    }



    // this effect runs only once
    // only when first mounted
    React.useEffect(() => {
        findOfflineShop();
    }, [])

    React.useEffect(() => {
        if (shops) changeShop(shops[0])
    }, [shops])




    return <ShopContext.Provider value={{ shops, currentShop, changeShop, addShop, updateShop }}>
        {props.children}
    </ShopContext.Provider>
}

