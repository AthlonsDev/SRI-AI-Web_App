import React from 'react';
import { Container, Navbar, Nav, Button } from 'react-bootstrap';

import CardForm from './components/CardForm.jsx';
import CardItem from './components/CardItem.jsx';



function App() {
  return (
    <>
      {/* Sidebar Menu */}
      <button class="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">
        Sidebar
      </button>
      <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
        <div class="offcanvas-header">
            <h5 class="offcanvas-title" id="offcanvasExampleLabel"></h5>
            <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">
            <div class="row gy-5">
            <div class="p-1 bg-info">
                <button type='button' class="btn btn-link">Button 1</button>
            </div>
            <div class="p-2 bg-warning">Flex item 2</div>
            <div class="p-2 bg-primary">Flex item 3</div>
            </div>

        </div>
    </div>
        {/* Title - Central align */}
        <div class="text-center">
          <h1>Title</h1>
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

        
  );
}

export default App;
