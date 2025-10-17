import React from 'react';
import { Card } from 'react-bootstrap';
import ModalViewItem from './ModalViewItem';

// CardItem expects a `data` object. If `data` includes an `id` or `index`,
// ModalViewItem will use it to avoid modal id collisions. Otherwise we fall back
// to a sanitized title inside ModalViewItem.
const CardItem = ({ data, index }) => {
  const title = data.title;

  return (
    <Card className="shadow-sm">
      <img src="" className="card-img-top" alt="" />
      <Card.Body>
        <Card.Title className="text-center">{title}</Card.Title>
        <div className="text-center">
          <ModalViewItem data={data} id={index ?? data.id} />
        </div>
      </Card.Body>
    </Card>
  );
};

export default CardItem;