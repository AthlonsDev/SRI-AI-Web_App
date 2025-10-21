import React from 'react';
import { Card } from 'react-bootstrap';
import { useState } from "react"; 

const CardForm = ({ onSend }) => {
  const [inputValue, setInputValue] = useState([""]);
  const [searchType, setSearchType] = useState("title")

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleInputButtonClick = () => {
    if (onSend) {
      onSend(inputValue, searchType);
    }
  }

  const handleButtonClick = (event) => {
    setSearchType(event.target.innerText);
  }


  return (
    <Card className="shadow-sm">
      <Card.Body>
        <Card.Title class='text-center'>Card</Card.Title>
          <div class='input-group mb-3'>
            <input type='text' class='form-control' placeholder='Search' aria-describedby='button-addon2' value={inputValue} onChange={handleInputChange}/>
            <button type='button' class='btn btn-outline-secondary' id='button-addon2' onClick={handleInputButtonClick}>Send</button>
          </div>
          <div class='container-md row gx-5'>
            <div class='col'>
              <h4 class='text-center'>Search By</h4>
                <div class="hstack gap-5">
                  <button class='btn btn-outline-primary' onClick={handleButtonClick}>Title</button>
                  <button class='btn btn-outline-primary' onClick={handleButtonClick}>Author</button>
                  <button class='btn btn-outline-primary' onClick={handleButtonClick}>Content</button>
                </div>
            </div>
          </div>
      </Card.Body>
    </Card>
  );
};

export default CardForm;
