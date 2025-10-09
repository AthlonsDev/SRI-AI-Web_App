import React from "react";

const ModalViewText = () => {
    return (
        <>
            <div class='mx-auto p-4 text-center'>
                <button type='button' class='btn btn-outline-primary' data-bs-toggle="modal" data-bs-target="#TextModal">View</button>
            </div>
            <div class="modal fade" id="textModal" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class='modal-header'>
                    <h1 class='modal-title fs-5' id='staticBackdropLabel'>Transcription</h1>
                    <button type='button' class='btn-close' data-bs-dismiss='modal' data-bs-keyboard='false' tabindex='-1' aria-labelledby="staticBackdropLabel" aria-hidden='true'></button>
                </div>
            </div>
        </>
    );
};

export default ModalViewText