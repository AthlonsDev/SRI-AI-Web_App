import React from 'react';
import { Card } from 'react-bootstrap';
import ModalViewItem from './ModalViewItem';

const CardItem = ({data}) => {
  const title = data.title
  return (
   <Card className="shadow-sm">
        <img src='' class='card-img-top'alt=''/>
        <Card.Body>
          <Card.Title class='text-center'>
            {title}
          </Card.Title>
            <div class=' text-center'>
                {/* <button class='btn btn-outline-primary'>Select</button> */}
                <ModalViewItem data={data}/>
            </div>
        </Card.Body>
      </Card>
  );
};

export default CardItem;