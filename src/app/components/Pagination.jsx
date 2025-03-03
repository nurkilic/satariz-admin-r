import React from "react";

const Pagination = ({ currentPage, lastPage, onPageChange, pageSize, setPageSize }) => {
    // Sayfa numaralarını hesapla
    const getPageNumbers = () => {
        const pages = [];
        const maxPagesToShow = 5; // Gösterilecek maksimum sayfa sayısı

        if (lastPage <= maxPagesToShow) {
            // Eğer sayfa sayısı gösterilebilecek maksimum sayıdan az veya eşitse, tüm sayfaları göster
            for (let i = 1; i <= lastPage; i++) {
                pages.push(i);
            }
        } else {
            // Eğer sayfa sayısı fazla ise, belirli bir aralıkta sayfaları göster
            let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
            let endPage = Math.min(lastPage, startPage + maxPagesToShow - 1);

            if (endPage - startPage + 1 < maxPagesToShow) {
                startPage = Math.max(1, endPage - maxPagesToShow + 1);
            }

            if (startPage > 1) {
                pages.push(1);
                if (startPage > 2) {
                    pages.push("...");
                }
            }

            for (let i = startPage; i <= endPage; i++) {
                pages.push(i);
            }

            if (endPage < lastPage) {
                if (endPage < lastPage - 1) {
                    pages.push("...");
                }
                pages.push(lastPage);
            }
        }

        return pages;
    };

    return (
        <div className="row">
            <div className="col-sm-12 col-md-3 d-flex align-items-center justify-content-center justify-content-md-start">
                <select
                    className="form-control form-select form-control-solid form-select-sm"
                    value={pageSize}
                    onChange={(e) => setPageSize(Number(e.target.value))}
                >
                    {[10, 20, 30, 40].map((size) => (
                        <option key={size} value={size}>
                            {size} Veri Göster
                        </option>
                    ))}
                </select>
            </div>
            <div className="col-sm-12 col-md-9 d-flex align-items-center justify-content-center justify-content-md-end">
                <div id="kt_table_users_paginate">
                    <ul className="pagination">
                        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                            <a
                                className="page-link"
                                style={{ cursor: "pointer" }}
                                onClick={() => onPageChange(1)}
                            >
                                İlk
                            </a>
                        </li>
                        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                            <a
                                className="page-link page-text me-5"
                                style={{ cursor: "pointer" }}
                                onClick={() => onPageChange(currentPage - 1)}
                            >
                                Önceki
                            </a>
                        </li>
                        {getPageNumbers().map((page, index) => (
                            <li
                                key={index}
                                className={`page-item ${page === currentPage ? "active" : ""} ${page === "..." ? "disabled" : ""}`}
                            >
                                <a
                                    className="page-link"
                                    style={{ cursor: page === "..." ? "default" : "pointer" }}
                                    onClick={() => typeof page === "number" && onPageChange(page)}
                                >
                                    {page}
                                </a>
                            </li>
                        ))}
                        <li className={`page-item ${currentPage === lastPage ? "disabled" : ""}`}>
                            <a
                                className="page-link page-text"
                                style={{ cursor: "pointer" }}
                                onClick={() => onPageChange(currentPage + 1)}
                            >
                                Sonraki
                            </a>
                        </li>
                        <li className={`page-item ${currentPage === lastPage ? "disabled" : ""}`}>
                            <a
                                className="page-link"
                                style={{ cursor: "pointer" }}
                                onClick={() => onPageChange(lastPage)}
                            >
                                Son
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Pagination;