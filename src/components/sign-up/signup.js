// Note: SignUpScreen component...!

import React, { useState, useEffect } from 'react';

let dummyData = [
    {
        id: 1,
        name: "ahmed",
        email: "ahmed@gmail.com",
        password: "ahmed123"
    },

    {
        id: 2,
        name: "ali",
        email: "ali@gmail.com",
        password: "ali123"
    },

    {
        id: 3,
        name: "bilal",
        email: "bilal@gmail.com",
        password: "bilal123"
    },
];

const SignUpScreen = () => {

    // Note: Handeling states here...!
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [usersList, setUsersList] = useState([]);

    const clearStates = () => {
        setName("");
        setEmail("");
        setPassword("");
    };

    // Note: Component mounted hook...!
    useEffect(() => {
        // Note: Fetching local storage DB data...!
        let dbData = localStorage.getItem("Users");
        // console.log(dbData);

        if (dbData == null) {
            let emptyArr = JSON.stringify([]);
            localStorage.setItem("Users", emptyArr);
        }

        else {
            let fetchData = localStorage.getItem("Users");
            let actualData = JSON.parse(fetchData);
            setUsersList(actualData);
            // console.log("Your Data: ", actualData);
        }
    }, []);

    // Note: Function to registered user...!
    const registeredUser = () => {
        let formData = {
            name,
            email,
            password
        };
        let duplicateFound = false;

        for (let i = 0; i < usersList.length; i++) {
            // console.log(usersList[i]);

            if (usersList[i].email == formData.email) {
                duplicateFound = true;
                break;
            };
        };

        if (!duplicateFound) {
            let userListClone = usersList.slice(0);
            userListClone.push(formData);
            setUsersList(userListClone);
            clearStates();

            let dataInStr = JSON.stringify(userListClone);
            localStorage.setItem("Users", dataInStr);
        }
        else console.log("Duplicate found!");
    };

    // 3 < 2 < 1 === false

    // Note: This hook will work on every update od usersList state...!
    useEffect(() => {
        // console.log(usersList);
    }, [usersList]);

    return (
        <>
            <h1> Sign Up </h1>

            <label htmlFor='name'>
                Name:
                <input
                    id='name'
                    type={'text'}
                    placeholder="Please Enter Your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </label>
            <br />

            <label htmlFor='email'>
                Email:
                <input
                    id='email'
                    type={'email'}
                    placeholder="Please Enter Your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </label>
            <br />

            <label htmlFor='password'>
                Password:
                <input
                    id='password'
                    type={'password'}
                    placeholder="******"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </label>
            <br />

            <button
                onClick={registeredUser}
            >
                Registered User
            </button>
        </>
    );
};

export default SignUpScreen;