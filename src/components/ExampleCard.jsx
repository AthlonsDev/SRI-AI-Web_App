import React from 'react';
import { Card } from 'react-bootstrap';

const ExampleCard = () => {
  return (
    <Card className="shadow-sm">
      <Card.Body>
        <Card.Title>Example Card</Card.Title>
        <Card.Text>
          This is a sample Bootstrap card component rendered in React.
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default ExampleCard;
