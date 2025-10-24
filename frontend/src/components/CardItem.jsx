import React from 'react';
import { Card } from 'react-bootstrap';
import ModalViewItem from './ModalViewItem';

// CardItem expects a `data` object. If `data` includes an `id` or `index`,
// ModalViewItem will use it to avoid modal id collisions. Otherwise we fall back
// to a sanitized title inside ModalViewItem.
const CardItem = ({ data, index }) => {
  const title = data.title;
  const author = data.author;
  return (
    <Card className="shadow-md">
      <div class='card-header text-center'>
        by: {author}
      </div>
      <img src="" className="card-img-top" alt="" />
      <Card.Body>
        <Card.Title className="text-center">
          {title}
        </Card.Title>
        <div className="text-center">
          <ModalViewItem data={data} id={index ?? data.id} />
        </div>
      </Card.Body>
      <div class='card-footer text-muted text-center'>
        Get Timestamp
      </div>
    </Card>
  );
};

export default CardItem;