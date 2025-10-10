import React from 'react';
import { Card } from 'react-bootstrap';
import ModalViewText from './ModalView';

const CardFile = () => {
  return (
    <Card className="shadow-sm">
      <Card.Body>
        <Card.Title class='text-center mx-auto p-2'>Upload FIle</Card.Title>
          <div class='input-group mb-3'>
            <select class='form-select' id="inputGroupSelect01">
                  <option selected>Choose...</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
              </select>
            <button type='button' class='btn btn-outline-secondary' id='button-addon2'>Send</button>
          </div>
          <div class='container'>
                <div class="progress" role="progressbar" aria-label="Animated striped example" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">
                    <div class="progress-bar progress-bar-striped progress-bar-animated"></div>
                </div>
              <div class='text-center'>
                <ModalViewText/>
                <button type='button' class='btn btn-outline-primary'>Save</button>
              </div>
          </div>
      </Card.Body>
    </Card>
  );
};

export default CardFile;
