import React from 'react';
import { Card } from 'react-bootstrap';
import ModalViewText from './ModalViewText';
import { useState } from "react";

const CardFile = (param) => {

  const [file, setFile] = useState();

  const fileHandler = (event) => {
    setFile = event.target.files[0];
  }

  const uploadFile = () => {
    if (!file) {
      return;
    }
  }

  

  return (
    <Card className="shadow-sm">
      <Card.Body>
        <Card.Title class='text-center mx-auto p-2'>Upload FIle</Card.Title>
          <div>
            <input class="form-control" type="file" id="formFile" onChange={fileHandler}/>
          </div>
          <div class='container'>
                <div class="progress" role="progressbar" aria-label="Animated striped example" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">
                    <div class="progress-bar progress-bar-striped progress-bar-animated"></div>
                </div>
              <div class='text-center'>
                <ModalViewText text={param.text}/>
                <button type='button' class='btn btn-outline-primary'>Save</button>
              </div>
          </div>
      </Card.Body>
    </Card>
  );
};

export default CardFile;
