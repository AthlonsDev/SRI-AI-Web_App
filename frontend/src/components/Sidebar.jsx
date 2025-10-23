import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () =>  {
    return (
        <>
            <button class="mx-auto m-2 btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">
                Sidebar
            </button>
            <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
                <div class="offcanvas-header">
                    <h5 class="offcanvas-title" id="offcanvasExampleLabel"></h5>
                    <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div class="offcanvas-body">
                    <div class="row gy-5">
                    <div class="p-1" data-bs-dismiss="offcanvas">
                        {/* <button type='button' class="btn btn-link">Button 1</button> */}
                        <Link to="/">Home</Link>
                    </div>
                    <div class="p-2" data-bs-dismiss="offcanvas">
                        <Link to="/model_1">Speech Recognition</Link>
                    </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Sidebar;