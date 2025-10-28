import React from 'react';
import { Card } from 'react-bootstrap';
import ModalViewText from './ModalViewText';
import { useState } from "react";

const CardFile = () => {

  const [file, setFile] = useState(null);
  const [transcription, setTrascription] = useState(null);
  

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    // handleUpload();
  }

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
          <div class="hstack gap-5 justify-content-center">
            <input class="form-control " type="file" id="formFile" onChange={handleFileChange}/>
            <button type='button' class='btn btn-outline-success' onClick={handleUpload}>Upload</button>
          </div>
          <div class='container'>                
          </div>
      </Card.Body>
    </Card>
  );
};

export default CardFile;
