import React, { useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import CardFile_2 from "../components/CardFile_2";
import CardForm from "../components/CardForm";
import Sidebar from "../components/Sidebar";
import { getSpeech } from "../api";
import axios from 'axios'
import { useEffect, useState } from "react";


export default function Model_2(){
    return(
        <>
        {/* Sidebar Menu */}
        <Sidebar/>
            <div class="text-center">
                <h1>Model 2</h1>
            </div>
            <CardFile_2/>
        </>
    );
};