import React, { useCallback } from "react";
import { Link } from "react-router-dom";
import CardFile from "../components/CardFile";
import CardForm from "../components/CardForm";
import Sidebar from "../components/Sidebar";
import { getPrediction } from "../api";
import axios from 'axios'
import { useEffect, useState } from "react";


export default function Model_1(){

    const [prediction, setPrediction] = useState(null);

    useEffect(() => {
        // Example features, replace with real input
        const features = [1, 2, 3, 4];
        getPrediction(features).then((data) => {
            setPrediction(data.message || data.prediction);
        });
    }, []);

    return(
        <>
        {/* Sidebar Menu */}
        <Sidebar/>
            <div class="text-center">
                <h1>Model 1</h1>
<<<<<<< HEAD
                <h2>Prediction - {getPrediction}</h2>
=======
                <h2>Prediction - {prediction ? prediction: "Loading..."}</h2>
>>>>>>> bfa1bdee7fce1c5ecc9c88e18320d68420b11903
            </div>

            {/* Load model API */}

            <CardFile/>
            {/* <CardForm/> */}
        </>
    );
};



// import React, { useEffect, useState } from "react";
// import axios from "axios";

// function App() {
// const [data, setData] = useState([]);

// useEffect(() => {
// axios
// .get("https://your-api-endpoint.com/data")
// .then((response) => setData(response.data))
// .catch((error) => console.error("Error fetching data:", error));
// }, []);