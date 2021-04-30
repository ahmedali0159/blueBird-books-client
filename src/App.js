import React, { createContext, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import './App.css';
import AddBook from "./components/AddBook/AddBook";
import Admin from "./components/Admin/Admin";
import Checkout from "./components/Checkout/Checkout";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Managebook from "./components/Managebook/Managebook";
import Navbar from "./components/Navbar/Navbar";
import Nomatch from "./components/Nomatch/Nomatch";
import Sidenav from "./components/Sidenav/Sidenav";
import Orders from "./components/Orders/Orders";


export const UserContext = createContext();
function App(props) {
  const [loggedInUser, setLoggedInUser] = useState({});
  return (
    <UserContext.Provider value = {[loggedInUser, setLoggedInUser]}>
    
           <Router>
         
        <Switch>
          <Route exact path="/">
          <Navbar/>
            <Home/>
          </Route>
          <Route path='/home'>
          <Navbar/>
            <Home></Home>
          </Route>
          <Route path="/admin">
           
            <Admin/>
          </Route>
          <PrivateRoute path="/addbook">
          <Sidenav></Sidenav>
            <AddBook/>
          </PrivateRoute>

          <Route path="/login">
          <Navbar/>
            <Login/>
          </Route>
          <PrivateRoute path="/checkout/:_id">
        
            <Checkout/> 
          </PrivateRoute>
          <PrivateRoute path="/orders">
            <Orders></Orders>
          </PrivateRoute>
          <Route path="/nomatch">
            <Nomatch/>
          </Route>
          <Route path="/manager">
            <Sidenav></Sidenav>
            <Managebook/>
          </Route>

        </Switch>
    </Router>
    </UserContext.Provider>
  );
}

export default App;
