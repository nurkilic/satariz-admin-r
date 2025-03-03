import React from 'react';
import {KTSVG} from "../../_metronic/helpers/index.ts";

const ModalComponent = ({ isOpen, closeModal, title, children }) => {
    if (!isOpen) return null;

    return (
        <>
            <div className="modal fade show" style={{ display: 'block' }} tabIndex={-1} aria-hidden={!isOpen}>
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">{title}</h5>
                            <div
                                className="btn btn-icon btn-sm btn-active-light-primary ms-2"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                                onClick={closeModal}
                            >
                                <KTSVG path="media/icons/duotune/arrows/arr061.svg" className="svg-icon svg-icon-2x" />
                            </div>
                        </div>
                        <div className="modal-body">
                            {/* Dinamik içerik burada */}
                            {children}
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal-backdrop fade show"></div>
        </>
    );
};

export default ModalComponent;
