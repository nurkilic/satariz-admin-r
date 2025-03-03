import React, {useState, useEffect} from "react";

const Packages = ({data}) => {
    return (
        <>
            <div className='card mb-5 mb-xl-10'>
                <div className="card-header">
                    <h3 className="card-title">Paketleri</h3>
                </div>
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-bordered">
                            <thead>
                            <tr className="fw-bold fs-6 text-gray-800">
                                <th>#</th>
                                <th>Paket</th>
                                <th>Açıklama</th>
                                <th>Kullanılabilir</th>
                                <th>Başlangıç</th>
                                <th>Bitiş</th>
                                <th>Durum</th>
                            </tr>
                            </thead>
                            <tbody>
                            {data && data.map((value, key) => {
                                return (
                                    <tr key={key}>
                                        <td>{value.id}</td>
                                        <td>{value.package.name}</td>
                                        <td>{value.package.description}</td>
                                        <td>{value.available}</td>
                                        <td>{new Date(value.start_date).toLocaleString("tr-TR")}</td>
                                        <td>{new Date(value.end_date).toLocaleString("tr-TR")}</td>
                                        <td>{value.status === 0 ? <span className="badge badge-danger">Pasif</span> :
                                            <span className="badge badge-success">Aktif</span>}</td>
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

export {Packages};
