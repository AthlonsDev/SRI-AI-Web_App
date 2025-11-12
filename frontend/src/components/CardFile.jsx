import React from 'react';
import { Card } from 'react-bootstrap';
import ModalViewText from './ModalViewText';
import { useState } from "react";
import { Document, Packer, Paragraph, TextRun } from "docx";


const CardFile = (data) => {

  const [file, setFile] = useState(null);
  const [transcription, setTrascription] = useState(null);
  const [loading, setLoading] = useState(false);
  
// handle file input change
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  }

  // send data to parent component
  React.useEffect(() => {
    if (transcription) {
      data.setTranscription(transcription);
    }
  }, [transcription]);

  // file upload to backend API to be implemented
  const handleUpload = async () => {
    if (!file) return;

    setLoading(true); // show loading spinner while uploading
    const formData = new FormData();
    formData.append('file', file);
    const API_URL = import.meta.env.VITE_API_URL || "http://10.3.0.75:8000";

   try {
      const response = await fetch(`${API_URL}/speech`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('File upload failed');
      }

      const data = await response.text();
      setTrascription(data);
      setLoading(false);
      console.log('File uploaded successfully:', data);

    } 
    catch (error) {
      console.error('Error uploading file:', error); // expects a JSON response with transcription
    }
  };
  
  const generateDoc = () => {
    const segments = transcription.split('<br/>');
    const paragraph = new Paragraph({
        children: segments.flatMap((segment, i) => [
            new TextRun(segment),
            ...(i < segments.length - 1 ? [new TextRun({ break: 1 })] : [])
        ]),
    });
    const doc = new Document({
      sections: [{
        properties: {},
        children: [
          paragraph,
        ],
      }],
    });
    return doc;
  };

  const saveDoc = async () => {
    
    const doc = generateDoc();
    const buffer = await Packer.toBlob(doc);

    const url = window.URL.createObjectURL(buffer)
    const link = document.createElement('a');
    link.href = url;
    link.download = "transcription.docx";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.removeObjectURL(url);
  };

  return (
    <Card className="shadow-sm">
      <Card.Body>
        <Card.Title class='text-center'>Upload File</Card.Title>
          <div class="hstack gap-5 justify-content-center">
            <input class="form-control" type="file" id="formFile" onChange={handleFileChange}/>
            <button type='button ' class='btn btn-outline-secondary' onClick={handleUpload}>Upload</button>
          </div>
              {loading &&
                <div class="d-flex justify-content-center">
                  <div class="spinner-border" role="status" aria-hidden="true"></div>
                </div>
              }
          <div class='container'>
              <div class='text-center'>
                <ModalViewText text={transcription}/>
                <button type='button' class='btn btn-outline-primary' onClick={saveDoc}>Save</button>
              </div>
          </div>
      </Card.Body>
    </Card>
  );
};

export default CardFile;
