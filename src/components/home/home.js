// Note: Home component...!

import React, { useEffect, useState } from 'react';

const Home = () => {

    // Note: Handeling states here...!
    const [electronicItem, setElectronicItem] = useState("");
    const [itemList, setItemList] = useState([]);
    const [authUser, setAuthUser] = useState(null);

    // Note: Add item handler...!
    const addItemHandler = () => {
        // console.log(electronicItem);

        let itemData = {
            itemName: electronicItem,
            userId: authUser.email,
        };

        let itemListClone = itemList.slice(0);
        itemListClone.push(itemData);
        setItemList(itemListClone);

        setElectronicItem("");

        // Note: Saving data in DB...!
        let dataInStr = JSON.stringify(itemListClone);
        localStorage.setItem("ElectronicItemsList", dataInStr);
    };

    // Note: Mounted hook...!
    useEffect(() => {
        if (localStorage.getItem("ElectronicItemsList") != null) {
            let fetchItemList = localStorage.getItem("ElectronicItemsList");
            let dataInJSON = JSON.parse(fetchItemList);
            console.log(dataInJSON);
            if (dataInJSON) setItemList(dataInJSON);
        }

        else {
            let emptyList = [];
            let dataInStr = JSON.stringify(emptyList);
            localStorage.setItem("ElectronicItemsList", dataInStr);
        }
    }, []);

    // Note: Mounted hook...!
    useEffect(() => {
        let fetchUser = localStorage.getItem("AuthenticatedUser");
        let actualUser = JSON.parse(fetchUser);
        // console.log(actualUser);
        if (actualUser) setAuthUser(actualUser);
    }, []);

    return (
        <>
            <h1> Welcome to CRUD App! </h1>

            <label>
                Item Name:
                <input
                    placeholder='Enter Product Name'
                    autoFocus
                    value={electronicItem}
                    onChange={(e) => setElectronicItem(e.target.value)}
                />
            </label>

            <button
                onClick={addItemHandler}
                disabled={electronicItem.trim().length < 1 ? true : false}
            >
                Add Item
            </button>
        </>
    );
};

export default Home;