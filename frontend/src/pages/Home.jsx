import React from "react";
import { Container, Navbar, Nav, Button } from 'react-bootstrap';
import { Link } from "react-router-dom";
import CardForm from "../components/CardForm";
import CardItem from "../components/CardItem";
import Sidebar from "../components/Sidebar";


export default function Home() {
    return (
        <>
        {/* Sidebar Menu */}
        <Sidebar/>
            {/* Page Body */}
                {/* Title - Central align */}
                <div class="text-center">
                <h1>Title</h1>
                {/* <Link to="/model_1">Link</Link> */}
                </div>
                {/* Form layout */}
                <div class='container-fluid'>
                <CardForm/>
                </div>
                <div class='text-center'>
                <h1>Search results</h1>
                </div>
                <div class="container-fluid">
                    <div class='row row-cols-3'>
                    <div class="col">
                        <CardItem/>
                    </div>
                    <div class="col">
                        <CardItem/>
                    </div>
                    <div class="col">
                        <CardItem/>
                    </div>
                    </div>
                </div>  
        </>
    )
}