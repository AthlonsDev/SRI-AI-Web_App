import React from "react";

const ModalViewItem = ({data}) => {
    const title = data.title
    const auth = data.author
    const sub = data.subject
    return (
        <>
            <div class='mx-auto p-4 text-center'>
                <button type='button' class='btn btn-outline-primary' data-bs-toggle="modal" data-bs-target="#staticBackdrop">View</button>
            </div>

            <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-scrollable">
                <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="staticBackdropLabel">Modal title</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <a href="">
                        <h2>{title}</h2>
                    </a>
                    <p>By {auth}</p>
                    <p>{sub}</p>

                </div>
                <div class="modal-footer-centered">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary">Summary</button>
                </div>
                </div>
            </div>
            </div>
        </>
    );
};

export default ModalViewItem