import React from "react";
import { Link } from "react-router-dom";
import CardFile from "../components/CardFile";
import CardForm from "../components/CardForm";
import Sidebar from "../components/Sidebar";
import { getPrediction } from "../api";

export default function Model_1(){
    return(
        <>
        {/* Sidebar Menu */}
        <Sidebar/>
            <div class="text-center">
                <h1>Model 1</h1>
                <h2>Prediction - </h2>
            </div>

            {/* Load model API */}

            <CardFile/>
            {/* <CardForm/> */}
        </>
    );
};