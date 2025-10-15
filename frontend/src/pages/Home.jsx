import React from "react";
import CardForm from "../components/CardForm";
import CardItem from "../components/CardItem";
import Sidebar from "../components/Sidebar";
import { useState } from "react";

import { getSearch } from "../api";


export default function Home() {
    const [query, setQuery] = useState(null);
    const handleSend = async (inputValue) => {
        // Call getSearch with the input value as features
        const title = [inputValue];
        const data = await getSearch(title);
        setQuery(data.message || data.prediction);
    };

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
                <CardForm onSend={handleSend} />
                </div>
                <div class='text-center'>
                {/* <h1>Search results: {query}</h1> */}
                
                </div>
                <div class="container-fluid">
                    <div class='row row-cols-2'>
                    <div class="col">
                        <CardItem text={query ? query: "Loading..."}/>
                    </div>
                    <div class="col">
                        {/* <CardItem/> */}
                    </div>
                    <div class="col">
                        {/* <CardItem/> */}
                    </div>
                    </div>
                </div>  
        </>
    )
}