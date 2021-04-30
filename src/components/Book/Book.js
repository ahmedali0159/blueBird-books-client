import React from "react";
import { Link } from "react-router-dom";

const Book = (props) => {
  const {name, imageURL, price, _id} = props.book;
  return (
    <div className="container col-md-3 ">
      <div>
        <img className="card-img-top" style={{ height: "300px",  width: "18rem",  marginTop:"50px", boxShadow:"5px 5px 5px 3px gray" }} src={imageURL} alt="" />
        </div>
      <h5 className="card-title" style={{marginTop:"10px"}}>{name}</h5>

      <div style={{ display: "inline-flex" }}>
      <Link to={`/checkout/${_id}`}> <button className="btn btn-info d-flex justify-content-end">
          Buy Now
        </button>
        </Link>
       
      </div>
      <h3 style={{ display:"inline-flex", marginLeft:"80px"}}>{price}</h3>
    
    </div>
  );
};

export default Book;
