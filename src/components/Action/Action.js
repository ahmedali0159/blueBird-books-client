import React from 'react';
import './Action.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

const Action = (props) => {
    const {name, price, _id} = props.book;
    const deleteBook = id => {
        fetch(`https://secure-ocean-64878.herokuapp.com/deleteBook/${id}`, {
            method:"DELETE"
        })
        .then(res => res.json())
        .then(data => {
        console.log('deleted successfully');
    })
    }
   
    return (
        <div className="container">
            <table className="styled-table" style={{ width: "80%" }}>
            <thead>
        <tr>
            <th>Book Name</th>
            <th>Price</th>
            <th>Action</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>{name}</td>
            <td>{price}</td>
            <td> <button onClick={() => deleteBook(_id)}><FontAwesomeIcon icon={faTrash} /></button></td>

        </tr>
        
    </tbody>
</table>
        </div>
       
    );
};

export default Action;