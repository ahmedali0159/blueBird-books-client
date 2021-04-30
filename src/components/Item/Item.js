import React, { useEffect, useState } from 'react';
import './Item.css';

const Item = () => {
    const [items, setItems] = useState([]);

    useEffect(() =>{
        fetch('https://secure-ocean-64878.herokuapp.com/orders')
        .then(res => res.json())
        .then(data => setItems(data));
    }, [])

    return (
        <div>
            <h3>You have: {items.length} orders </h3>
            {
                items.map(item => <table className=" container styled-table" style={{ width: "80%" }}> <th> {item.name}</th> <th>{item.email}</th> <th>{item.price}</th> <th>{(new Date(item.checkIn).toDateString('dd/MM/yyyy'))}</th></table>)
            }
        </div>
    );
};

export default Item;