import React from 'react';
import { Card } from 'react-bootstrap';

const CardForm = () => {
  return (
    <Card className="shadow-sm">
      <Card.Body>
        <Card.Title class='text-center'>Card</Card.Title>
          <div class='input-group mb-3'>
            <input type='text' class='form-control' placeholder='Search' aria-describedby='button-addon2'/>
            <button type='button' class='btn btn-outline-secondary' id='button-addon2'>Send</button>
          </div>
          <div class='container-md row gx-5'>
            <div class='col'>
              <div class="p-3">
                <button class='btn btn-outline-primary'>Option1</button>
                <button class='btn btn-outline-primary'>Option2</button>
                <button class='btn btn-outline-primary'>Option3</button>
              </div>
            </div>
          </div>
      </Card.Body>
    </Card>
  );
};

export default CardForm;
