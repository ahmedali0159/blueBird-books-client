import React, { useEffect, useState } from 'react';
import Action from '../Action/Action';
import Book from '../Book/Book';
import './Managebook.css';


const Managebook = (props) => {
   // const deleteBook = id => {
    
    const [books, setBooks] = useState([]);

    useEffect(() =>{
        fetch('https://secure-ocean-64878.herokuapp.com/books')
        .then(res => res.json())
        .then(data => setBooks(data));
    }, [])

    //}
    return (
       
     
        <div className="main">
        {
            books.map(book => <Action book={book}></Action>)
        }
   </div>
    );
};

export default Managebook;