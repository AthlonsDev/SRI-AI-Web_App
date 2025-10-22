import React from 'react';
import { Card } from 'react-bootstrap';
import ModalViewText from './ModalViewText';
import { useState } from "react";

const CardFile = (param) => {

  const [file, setFile] = useState(null);
  const [transcription, setTrascription] = useState(null);
  

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  }

  // file upload to backend API to be implemented
  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

   try {
      const response = await fetch('http://localhost:8000/speech', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('File upload failed');
      }

      const data = await response.json();
      setTrascription(data.transcription);
      console.log('File uploaded successfully:', data);
    } 
    catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <Card className="shadow-sm">
      <Card.Body>
        <Card.Title class='text-center mx-auto p-2'>Upload File</Card.Title>
          <div>
            <input class="form-control" type="file" id="formFile" onChange={handleFileChange}/>
            <button type='button' class='btn btn-outline-secondary' onClick={handleUpload}>Upload</button>
          </div>
          <div class='container'>

                {/* TODO: Connect progress bar to actual model loading */}
                
                <div class="progress" role="progressbar" aria-label="Animated striped example" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">
                    <div class="progress-bar progress-bar-striped progress-bar-animated"></div>
                </div>
              <div class='text-center'>
                <ModalViewText text={transcription}/>
                <button type='button' class='btn btn-outline-primary'>Save</button>
              </div>
          </div>
      </Card.Body>
    </Card>
  );
};

export default CardFile;
