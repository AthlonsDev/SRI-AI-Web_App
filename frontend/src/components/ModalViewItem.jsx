import React from "react";

// ModalViewItem: uses a unique id per item so multiple instances don't collide.
const ModalViewItem = ({ data, id }) => {
    const title = data.title;
    const auth = data.author;
    const sub = data.subject;
    // allow caller to pass an id (e.g. index) — fallback to a sanitized title
    const modalId = `modal-${id ?? title?.replace(/\s+/g, '-').toLowerCase()}`;
    const labelId = `${modalId}-label`;

    return (
        <>
            <div class="hstack gap-5 justify-content-center">
                <button
                    type="button"
                    className="btn btn-outline-success"
                    data-bs-toggle="modal"
                    data-bs-target={`#${modalId}`}
                >
                    View
                </button>
                <button
                    type="button"
                    className="btn btn-outline-success"
                    data-bs-toggle="modal"
                    data-bs-target={`#${modalId}`}
                >
                    Link
                </button>
            </div>

            <div
                className="modal fade"
                id={modalId}
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                tabIndex={-1}
                aria-labelledby={labelId}
                aria-hidden="true"
            >
                <div className="modal-dialog modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id={labelId}>
                                {title}
                            </h1>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body">
                            <a href="#">
                                <h2>{title}</h2>
                            </a>
                            <p>By {auth}</p>
                            <p>{sub}</p>
                        </div>
                        <div className="modal-footer-centered">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                                Close
                            </button>
                            <button type="button" className="btn btn-primary">Summary</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ModalViewItem;