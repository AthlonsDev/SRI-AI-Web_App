import React from 'react';
import { Container, Navbar, Nav, Button } from 'react-bootstrap';

import ExampleCard from './components/ExampleCard.jsx';


function App() {
  return (
    <>
        <button class="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">
            Button with data-bs-target
        </button>
        <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
            <div class="offcanvas-header">
                <h5 class="offcanvas-title" id="offcanvasExampleLabel">Offcanvas</h5>
                <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div class="offcanvas-body">
              <div class="row gy-5">
                <div class="p-2 bg-info">
                  <button type='button' class="btn btn-link">Button 1</button>
                </div>
                <div class="p-2 bg-warning">Flex item 2</div>
                <div class="p-2 bg-primary">Flex item 3</div>
              </div>

            </div>
        </div>
        <div class="text-center">
          <h1>SRI AI Dashboard</h1>
          <p>Resize this responsive page to see the effect!</p> 
        </div>


        <div class="container mt-5">

        </div>        
        </>

        
  );
}

export default App;
