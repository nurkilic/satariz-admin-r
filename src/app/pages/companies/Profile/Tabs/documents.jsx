import React, {useState, useEffect} from "react";

const Documents = ({data}) => {
    return (
        <>
            <div className='card mb-5 mb-xl-10'>
                <div className="card-header">
                    <h3 className="card-title">Boostları</h3>
                </div>
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-bordered">
                            <thead>
                            <tr className="fw-bold fs-6 text-gray-800">
                                <th>#</th>
                                <th>Başlık</th>
                                <th>Belge</th>
                                <th>Eklenme Tarihi</th>
                            </tr>
                            </thead>
                            <tbody>
                            {data && data.map((value, key) => {
                                return (
                                    <tr key={key}>
                                        <td>{value.id}</td>
                                        <td>{value.doc.title}</td>
                                        <td><a target="_blank" href={value.document}>Tıkla!</a></td>
                                        <td>{new Date(value.created_at).toLocaleString("tr-TR")}</td>

                                    </tr>
                                )
                            })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
};

export {Documents};
