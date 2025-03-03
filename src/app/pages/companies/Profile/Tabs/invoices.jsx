import React, {useState, useEffect} from "react";

const Invoices = ({data}) => {
    return (
        <>
            <div className='card mb-5 mb-xl-10'>
                <div className="card-header">
                    <h3 className="card-title">Faturaları</h3>
                </div>
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-bordered">
                            <thead>
                            <tr className="fw-bold fs-6 text-gray-800">
                                <th>#</th>
                                <th>Fatura Numarası</th>
                                <th>Açıklama</th>
                                <th>Durum</th>
                            </tr>
                            </thead>
                            <tbody>

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
};

export {Invoices};
