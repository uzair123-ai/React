// Note: MyItems component...!

import React, { useEffect, useState } from 'react';

const MyItems = () => {

    // Handeling states here...!
    const [user, setUser] = useState(null);
    const [itemsList, setItemsList] = useState([]);
    const [customList, setCustomList] = useState([]);

    // Note: Mounted hook...!
    useEffect(() => {
        // Note: Fetching user from DB....!
        let fetchUser = localStorage.getItem("AuthenticatedUser");
        fetchUser = JSON.parse(fetchUser);
        // console.log(fetchUser);
        if (fetchUser) setUser(fetchUser);

        // Note: Fetching user from DB....!
        let fetchItemsList = localStorage.getItem("ElectronicItemsList");
        fetchItemsList = JSON.parse(fetchItemsList);
        // console.log(fetchItemsList);
        if (fetchItemsList) setItemsList(fetchItemsList);
    }, []);

    // This hook will update on when itemsList state update...!
    useEffect(() => {
        let arr = [];

        if (itemsList.length > 0) {
            for (let i = 0; i < itemsList.length; i++) {
                // console.log(itemsList[i]);

                if (itemsList[i].userId == user.email) {
                    arr.push(itemsList[i]);
                }
            };

            if (arr.length > 0) {
                // console.log(arr);
                setCustomList(arr);
            }
        };
    }, [itemsList]);

    return (
        <>
            <h1> My Items List Screen! </h1>

            {
                (customList && customList.length > 0)
                    ?
                    (
                        itemsList.map((item, index) => {
                            if (item.userId == user.email) {
                                return (
                                    <h3 key={index}> {item.itemName} </h3>
                                );
                            }
                        })
                    )
                    :
                    (
                        <h2> Data Not Found! </h2>
                    )
            }
        </>
    );
};

export default MyItems;