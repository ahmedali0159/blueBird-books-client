import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import './Addbook.css';


const AddBook = () => {
    const { register, handleSubmit, errors } = useForm();
    const [imageURL, setImageURL] = useState(null);
    const onSubmit = data => {
        const bookData = {
            name:data.name,
            imageURL: imageURL,
            price:data.price
        }
        const url = `https://secure-ocean-64878.herokuapp.com/addbook`;
        console.log(bookData);
        fetch(url, {
          method:"POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(bookData)
        })
        .then(res => console.log('server side response', res));
    };
    const handleImageUpload = book => {
        console.log(book.target.files[0]);
        const imageData = new FormData();
        imageData.set('key', '6ad35e408d9ee58f8eb70bb8f8d1326e');
        imageData.append('image', book.target.files[0])

        axios.post('https://api.imgbb.com/1/upload', 
        imageData)
          .then(function (response) {
            setImageURL(response.data.data.display_url);
          })
          .catch(function (error) {
            console.log(error);
          });
    }
    return (
      
        <div>
            <div className="main">
            <h3>Add Book</h3>
             <form onSubmit={handleSubmit(onSubmit)}>
      <input className="type-input" name="name" defaultValue="Enter Name" ref={register}/>
      <input className="type-input" name="price" defaultValue="Enter Price" ref={register}/>
      <br/>
      <input className="type-input" name="exampleRequired" type='file'onChange={handleImageUpload} />
      {errors.exampleRequired && <span>This field is required</span>}

      <br/>
      <input  className="google-btn" value="Save" type="submit" />
    </form>
     </div>
          
        </div>
    );
};

export default AddBook;