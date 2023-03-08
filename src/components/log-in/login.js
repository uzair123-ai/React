// Note: LogInScreen component...!

import React, { useState, useEffect } from 'react';

const LogInScreen = () => {

    // Note: Handeling states here...!
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [usersList, setUsersList] = useState([]);
    const [showMessage, setShowMessage] = useState(undefined);

    // Note: Component mounted hook...!
    useEffect(() => {
        let userListClone = usersList.slice(0);
        let fetchUsers = localStorage.getItem("Users");
        let dataInJSON = JSON.parse(fetchUsers);
        if (dataInJSON) {
            userListClone = dataInJSON;
            setUsersList(userListClone);
        }
    }, []);

    // Note: Function to login user..!
    const logInUser = () => {
        let user = {    
            email,
            password
        };
        // console.log(user);

        for (let i = 0; i < usersList.length; i++) {
            // console.log(usersList[i]);

            if (
                usersList[i].email == user.email &&
                usersList[i].password == user.password
            ) {
                setShowMessage("You have logged in successfully!");
                break;
            }

            else if (
                usersList[i].email == user.email &&
                usersList[i].password != user.password
            ) {
                setShowMessage("Password does not matched!");
                break;
            }

            else setShowMessage("User does not exist!");
        };
    };

    return (
        <>

            <h1> Log In </h1>

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
                onClick={logInUser}
            >
                Log In
            </button>
        </>
    );
};

export default LogInScreen;