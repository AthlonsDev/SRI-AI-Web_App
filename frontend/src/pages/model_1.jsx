import React, { useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import CardFile from "../components/CardFile";
import CardForm from "../components/CardForm";
import Sidebar from "../components/Sidebar";
import { getSpeech } from "../api";
import axios from 'axios'
import { useEffect, useState } from "react";


export default function Model_1(){

    const [prediction, setPrediction] = useState(null);

    useEffect(() => {
        // Example features, replace with real input
        const features = ['example_feature1', 'example_feature2'];
        getSpeech(features).then((data) => {
            // setPrediction(data.message || data.prediction);
            
        });
    }, []);

    
    return(
        <>
        {/* Sidebar Menu */}
        <Sidebar/>
            <div class="text-center">
                <h1>Model 1</h1>
            </div>

            {/* Load model API */}

            <CardFile text={prediction ? prediction: "Loading..."}/>

        </>
    );
};