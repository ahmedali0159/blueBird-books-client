import React from 'react';
import { Link } from 'react-router-dom';
import './Sidenav.css';

const Sidenav = () => {
    return (
             
             <div className="sidenav">
               <div>
                   <h3 className="header-nav">Bluebird Books</h3>
               </div>
          <Link to="/manager">Manage Books</Link>
                  <Link to="/addBook">Add Book</Link>
                  <Link to="">Edit Book</Link>
          </div>
    
    );
};

export default Sidenav;