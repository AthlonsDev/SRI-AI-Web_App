import React, { useEffect } from "react";
import CardForm from "../components/CardForm";
import CardItem from "../components/CardItem";
import Sidebar from "../components/Sidebar";
import { useState } from "react";

import { getSearch } from "../api";


export default function Home() {
    const [query, setQuery] = useState(null);
    const handleSend = async (inputValue, searchType) => {
        // Call getSearch with the input value as features
        const res = [inputValue, searchType];
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
                <div class="container-fluid">
                    <p>Found {query?.length ? query?.length : "0"} results</p>
                    <div class='row row-cols-2'>
                        {query?.map((item, index) => (
                            <div key={index}>
                                    <CardItem data={item ? item :"Loading..." } onSend={handleSend}/>
                            </div>
                        ))}
                    </div>
                </div>  
        </>
    )
}