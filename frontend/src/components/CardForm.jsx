import React from 'react';
import { Card } from 'react-bootstrap';
import { useState } from "react"; 

const CardForm = ({ onSend }) => {
  const [inputValue, setInputValue] = useState([""]);
  const [searchType, setSearchType] = useState("Title")

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleInputButtonClick = () => {
    if (inputValue.length < 2){
      alert("Input field is empty!");
      return;
    } 
    else {
      if (onSend) {
        onSend(inputValue, searchType);
      }
    }
  }

  const handleButtonClick = (event) => {
    setSearchType(event.target.innerText);
  }


  return (
    <Card className="shadow-sm">
      <Card.Body>
        <div class='text-center'>
        <Card.Title>Card</Card.Title>
          <div class='input-group mb-3'>
            <input type='text' class='form-control' placeholder='Search' aria-describedby='button-addon2' value={inputValue} onChange={handleInputChange}/>
            <button type='button' class='btn btn-outline-success' id='button-addon2' onClick={handleInputButtonClick}>Send</button>
          </div>
          <h4 class='text-center'>Search By</h4>
          <div class="hstack gap-5 justify-content-center">
            <button class={`btn btn-outline-success ${searchType === 'Title' ? 'active' : ''}`} role="button" data-bs-toggle="button" aria-selected={searchType === "Title"} onClick={handleButtonClick}>Title</button>
            <button class={`btn btn-outline-success ${searchType === 'Author' ? 'active' : ''}`} data-bs-toggle="button" aria-selected={searchType === "Author"} onClick={handleButtonClick}>Author</button>
            <button class={`btn btn-outline-success ${searchType === 'Content' ? 'active' : ''}`} onClick={handleButtonClick}>Content</button>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default CardForm;
