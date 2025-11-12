import React, { useCallback } from "react";
import { data, Link, useParams } from "react-router-dom";
import CardFile from "../components/CardFile";
import CardForm from "../components/CardForm";
import Sidebar from "../components/Sidebar";
import { getSpeech } from "../api";
import axios from 'axios'
import { useEffect, useState } from "react";
import { use } from "react";




export default function Model_1(){
    const [transcription, setTranscription] = useState("");
// retireve transcription data from CardFile component
    const handleSetTranscription = useCallback((data) => {
        setTranscription(data);
    }, []);
    return(
        <>
        {/* Sidebar Menu */}
        <Sidebar/>
            <div class="text-center">
                <h1>Model 1</h1>
            </div>

            {/* Load model API */}

            <CardFile text={data} setTranscription={handleSetTranscription}/>

            <h2 class="text-center mt-4 mb-4">
                Transcription
            </h2>

            <h8>
                {transcription ? <div dangerouslySetInnerHTML={{ __html: transcription }} /> : "No Transcription Available"}
            </h8>
        </>
    );
};