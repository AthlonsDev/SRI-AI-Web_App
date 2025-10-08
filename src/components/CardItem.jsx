
import React from 'react';
import { Card } from 'react-bootstrap';

const CardItem = (param) => {
  return (
   <Card className="shadow-sm">
        <img src='' class='card-img-top'alt=''/>
        <Card.Body>
          <Card.Title class='text-center'>Item</Card.Title>
            <div class=' text-center'>
                <button class='btn btn-outline-primary'>Select</button>
            </div>
        </Card.Body>
      </Card>
  );
};

export default CardItem;