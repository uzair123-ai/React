// Note: AppRotes component...!

import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

// Note: Importing reuseable components...!
import Navigation from './components/navigation/navigation';
import LogInScreen from './components/log-in/login';
import SignUpScreen from './components/sign-up/signup';
import Home from './components/home/home';
import ItemList from './components/item-list/item-list';
import MyItems from './components/my-items/my-items';

const AppRoutes = () => {

  // Note: Handeling states here...!
  const [authUser, setAuthUser] = useState(null);

  // Note: Component mounted hook...!
  useEffect(() => {
    if (localStorage.getItem("AuthenticatedUser") != null) {
      let fetchUser = localStorage.getItem("AuthenticatedUser");
      let dataInJSON = JSON.parse(fetchUser);
      if (dataInJSON) setAuthUser(dataInJSON);
    }

    else {
      let authenticatedUser = null;
      let dataInStr = JSON.stringify(authenticatedUser);
      localStorage.setItem("AuthenticatedUser", dataInStr);
    };
  }, []);

  useEffect(() => console.log(authUser), [authUser]);

  return (
    <>
      <Router>
        <Navigation userStatus={authUser} />

        {
            (authUser != null)
            ?
            (
              <Routes>
                <Route path='/' element={<Home />} />
                <Route path='item-list' element={<ItemList />} />
                <Route path='my-items' element={<MyItems />} />
              </Routes>
            )
            :
            (
              <Routes>
                <Route path='/' element={<LogInScreen />} />
                <Route path='sign-up-screen' element={<SignUpScreen />} />
              </Routes>
            )
        }
      </Router>
    </>
  );
};

export default AppRoutes;