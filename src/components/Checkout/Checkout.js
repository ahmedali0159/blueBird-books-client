import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { useContext } from 'react';
import { UserContext } from '../../App';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,

  KeyboardDatePicker,
} from '@material-ui/pickers';

import "./Checkout.css";

const Checkout = () => {
  const {_id} = useParams();
  const[book, setBooks] = useState([]);
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const [selectedDate, setSelectedDate] = useState({
      checkIn: new Date()
  });
  
  const handleCheckInDate = (date) => {
    const newDate = {...selectedDate}
    newDate.checkIn = date;
  setSelectedDate(newDate);
};

const handleOrder = () => {
  const newOrdered = {...loggedInUser, ...selectedDate, ...book }
  fetch('https://secure-ocean-64878.herokuapp.com/addOrder', {
    method:"POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newOrdered)
  })
  .then(res => res.json())
  .then(data => {
    console.log(data);
  })
}
  useEffect(() => {
        fetch(`https://secure-ocean-64878.herokuapp.com/book/${_id}`)
        .then(res => res.json())
        .then(data => setBooks(data[0]))
  },[])
  return (
    <div className="container">
      <h1>CheckOut</h1>
      <table style={{ width: "100%" }}>
        <tbody>
        <tr>
          <th>Description</th>
          <th>Quantity</th>
          <th>Price</th>
        </tr>
        <tr>
          <td>{book.name}</td>
          <td>1</td>
          <td>{book.price}</td>
        </tr>
       <tr>
         <td>Total</td>
         <td></td>
         <td>{book.price}</td>
       </tr>
       </tbody>
      
      </table>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justify="space-around">
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="dd/MM/yyyy"
          margin="normal"
          id="date-picker-inline"
          label="Check in date"
          value={selectedDate.checkIn}
          onChange={handleCheckInDate}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
      </Grid>
     
    </MuiPickersUtilsProvider>
      <div className="check-btn">
      <Link to='/orders'><button onClick={handleOrder}  className="google-btn">Order Now</button></Link>
      </div>
    </div>
  );
};

export default Checkout;
