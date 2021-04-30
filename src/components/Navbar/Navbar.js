import React, { useContext } from 'react';
import { UserContext } from '../../App';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    return (
        <div className="header">
              <nav>
                  <h1>Bluebird Books</h1>
                  <Link to="/home">Home</Link>
                  <Link to="/orders/:_id">Orders</Link>
                  <Link to="/addbook">Admin</Link>
                  <button className="btn btn-warning"> <Link to="login" >{loggedInUser.email ? loggedInUser.name|| loggedInUser.email : "Login"}</Link></button>
            </nav>
        </div>
    );
};

export default Navbar;