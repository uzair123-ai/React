// Note: Navigation component...!

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Nav, NavItem, NavLink } from 'reactstrap';

const Navigation = (props) => {
    console.log("Props of navigation: ", props);
    let { userStatus } = props;

    // Note: Handeling states here...!
    const [user, setUser] = useState(null);

    // Note: Function to logout user...!
    const logOut = () => {
        let dataInStr = JSON.stringify(null);
        localStorage.setItem("AuthenticatedUser", dataInStr);
        console.log('You have logged out successfully!');
        window.location.reload();
    };

    // Note This hook will work on every update of userStatus state...!
    useEffect(() => {
        let userFound = false;
        let targetUser;

        let fetchUsers = localStorage.getItem("Users");
        fetchUsers = JSON.parse(fetchUsers);
        // console.log(fetchUsers);

        if (fetchUsers) {
            for (let i = 0; i < fetchUsers.length; i++) {
                // console.log(fetchUsers[i]);

                if (props?.userStatus?.email == fetchUsers[i].email) {
                    userFound = true;
                    targetUser = fetchUsers[i];
                    break;
                };
            };

            if (targetUser) {
                console.log(targetUser);
                setUser(targetUser);
            }
        };
    }, [userStatus != null]);

    // userStatus.email.slice(0, userStatus.email.lastIndexOf("@")).toUpperCase()

    return (
        <>
            {
                (userStatus)
                    ?
                    (
                        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                            <a className="navbar-brand" href="#">
                                {
                                    (userStatus)
                                        ?
                                        (user ? user.name : null)
                                        :
                                        (null)
                                }
                            </a>

                            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>

                            <div className="collapse navbar-collapse" id="navbarNav">
                                <ul className="navbar-nav" style={{ width: '100%' }}>
                                    <li className="nav-item">
                                        <Link to="/" className='nav-link'> Home  </Link>
                                    </li>

                                    <li className="nav-item">
                                        <Link to="item-list" className='nav-link'> Item List  </Link>
                                    </li>

                                    <li className="nav-item">
                                        <Link to="my-items" className='nav-link'> My Items </Link>
                                    </li>

                                    <li className="nav-item" style={{ marginLeft: 'auto' }}>
                                        <button
                                            className='btn btn-secondary'
                                            onClick={logOut}
                                        >
                                            Logout
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </nav>
                    )
                    :
                    (
                        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                            <a className="navbar-brand" href="#"> CRUD APP </a>

                            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>

                            <div className="collapse navbar-collapse" id="navbarNav">
                                <ul className="navbar-nav">
                                    <li className="nav-item">
                                        <Link to="/" className='nav-link'> Log In  </Link>
                                    </li>

                                    <li className="nav-item">
                                        <Link to="sign-up-screen" className='nav-link'> Sign Up </Link>
                                    </li>
                                </ul>
                            </div>
                        </nav>
                    )
            }
        </>
    );
};

export default Navigation;