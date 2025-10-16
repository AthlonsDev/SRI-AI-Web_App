import React, { useEffect } from "react";
import CardForm from "../components/CardForm";
import CardItem from "../components/CardItem";
import Sidebar from "../components/Sidebar";
import { useState } from "react";

import { getSearch } from "../api";


export default function Home() {
    const [query, setQuery] = useState(null);
    const handleSend = async (inputValue) => {
        // Call getSearch with the input value as features
        const res = [inputValue];
        const data = await getSearch(res);
        const resArray = Array.isArray(data) ? data : [data];
        setQuery(resArray);
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
                {/* <h1>Search results: {}</h1> */}
                
                </div>
                <div class="container-fluid">
                    <div class='row row-cols-2'>
                    <div class="col">
                        <p>Found {query?.length} results</p>
                        {query?.map((item, index) => (
                              <div key={index}>
                                <CardItem text={JSON.stringify(item.title, null, 2) ? JSON.stringify(item.title, null, 2): "Loading..."}/>
                            </div>
                        ))}
                        {/* <CardItem text={JSON.stringify(query?.title, null, 2) ? JSON.stringify(query?.title, null, 2): "Loading..."}/> */}
                        {/* {query?.length > 0 && (
                             <p>Found {query?.length} results:</p>
                            // <CardItem text={JSON.stringify(query.title, null, 2) ? JSON.stringify(query.title, null, 2): "Loading..."}/>
                        )} */}
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