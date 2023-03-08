// Note: ItemList component...!

import React, { useEffect, useState } from 'react';
import EditModal from "../model/modal";

const ItemList = () => {

    // Note: Handeling states here...!
    const [dataList, setDataList] = useState([]);
    const [modalVisibility, setModalVisibility] = useState(false);
    const [editData, setEditData] = useState(null);
    const [updateValue, setUpdateValue] = useState("");

    // Note: Mounted Hook...!
    useEffect(() => {
        let fetchItemsData = localStorage.getItem("ElectronicItemsList")
        let dataInJSON = JSON.parse(fetchItemsData);
        if (dataInJSON) setDataList(dataInJSON);
    }, []);

    // Note: Delete handler...!
    const deleteHandler = (data, key) => {
        // console.log(data, key);

        let itemListClone = dataList.slice(0);
        itemListClone.splice(key, 1);
        setDataList(itemListClone);

        // Note: Saving data in DB LS...!
        let dataInStr = JSON.stringify(itemListClone);
        localStorage.setItem("ElectronicItemsList", dataInStr);
    };

    // Note: Edit handler...!
    const editHandler = (data, key) => {
        // console.log(key, data);
        setModalVisibility(true);

        let obj = {
            key,
            data
        };
        setEditData(obj);
        setUpdateValue(data.itemName);
    };

    // Note: Cancel handler...!
    const cancelHandler = () => {
        setModalVisibility(false);
        setEditData(null);
        setUpdateValue("");
    };

    // NOte: Update handler...!
    const updateHandler = () => {
        // console.log(editData);
        // console.log(updateValue);

        let uid = editData.data.userId;
        // console.log("User Id: ", uid);

        let update_Data = {
            itemName: updateValue,
            timeStamp: new Date().toLocaleTimeString(),
            userId: uid
        };

        // console.log(update_Data);

        let dataListClone = dataList.slice(0);
        // console.log(dataListClone);
        dataListClone.splice( editData.key , 1 , update_Data );
        setDataList(dataListClone);

        setEditData(null);
        setModalVisibility(false);
        setUpdateValue("");
    };

    return (
        <>

            <h1> Items List Screen! </h1>

            {/* Note: EditModal component */}
            {
                (modalVisibility)
                    ?
                    (
                        <div className='edit-container'>
                            <h3> Edit Section </h3>
                            <input
                                type={'text'}
                                placeholder="Edit Value"
                                value={updateValue}
                                onChange={(e) => setUpdateValue(e.target.value)}
                            />
                            <button onClick={updateHandler}>
                                Update
                            </button>

                            <button onClick={cancelHandler}>
                                Cancel
                            </button>
                        </div>
                    )
                    :
                    (null)
            }

            {
                (dataList && dataList.length > 0)
                    ?
                    (
                        dataList.map((item, index) => {
                            return (
                                <div key={index}>
                                    <span> {`${index + 1} ${item.itemName}`} </span>
                                    <button
                                        className='btn btn-secondary m-2'
                                        style={{ zIndex: 9999 }}
                                        onClick={() => deleteHandler(item, index)}
                                    > Delete </button>

                                    <button onClick={() => editHandler(item, index)}
                                    >Edit</button>


                                </div>
                            );
                        })
                    )
                    :
                    (<h2> Data Not Found! </h2>)
            }
        </>
    );
};

export default ItemList;