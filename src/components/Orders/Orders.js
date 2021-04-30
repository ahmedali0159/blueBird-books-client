import React from 'react';
import 'date-fns';
import { useContext } from 'react';
import { UserContext } from '../../App';
import './Orders.css';
import Item from '../Item/Item';


const Orders = () => {
  //  const {bookType} = useParams();
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    return (
        <div style={{textAlign:"center"}}>
            <h1>Hello, {loggedInUser.name}</h1>
        <Item/>
        </div>
    );
};

export default Orders;