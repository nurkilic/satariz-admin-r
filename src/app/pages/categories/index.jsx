import React, {useEffect, useState, useRef} from "react";
import axios from "axios";
import {TITLE} from "../../helpers/HelmetHelpers.jsx";
import {PageTitle} from "../../../_metronic/layout/core/index.ts";
import {ToolbarWrapper} from "../../../_metronic/layout/components/toolbar/index.ts";
import {Content} from "../../../_metronic/layout/components/content/index.ts";
import {apiRequest} from "../../api/endpoints/index.jsx";
import {GET_CATEGORIES} from "../../api/paths/index.jsx";


export const Categories = () => {
    const [data, setData] = useState([]);
    const [prevData, setPrevData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [expandedItems, setExpandedItems] = useState({});


    const fetchData = async (id = null) => {
        try {
            setLoading(true);
            const response = await apiRequest({
                url: GET_CATEGORIES, method: 'GET', data: {
                    id: id,
                },
            })
            if(id === null)
                setData(response.data)
            setExpandedItems(prevState => ({
                ...prevState,
                [id]: prevState[id] ? [...prevState[id], ...response.data] : response.data
            }));
            console.log(response.data)
            setLoading(false);
            return  response.data 
            
        } catch (err) {
            setLoading(false);
        }
    };


    useEffect(() => {
        fetchData()
        
    }, []);



    return (
        <>
            <TITLE title={'Kategori Yönetimi'}/>
            <PageTitle breadcrumbs={[]}>Kategori Yönetimi</PageTitle>
            <ToolbarWrapper/>
            <Content>
                <div className="card card-xl-stretch mb-xl-8">
                    <div className="card-header border-0 pt-5">
                        <h3 className="card-title align-items-start flex-column">
                            <span className="card-label fw-bold text-gray-900">Kategori Listesi</span>
                        </h3>

                    </div>
                    <div className="card-body pt-5">
                        <button className="btn btn-success btn-sm" onClick={() => setData(prevData)}>Geri
                            Dön
                        </button>
                        {data && data.map((value, index) => (
                            <div key={index}>
                                <div className="d-flex align-items-center" onClick={() => fetchData(value.id)}>
                                    <div className="symbol symbol-50px me-5">
                            <span className="symbol-label bg-light-success">
                                <i className={"fs-2 fas fa-" + (value?.icon_name ?? 'bars')}></i>
                            </span>
                                    </div>
                                    <div className="d-flex flex-column">
                                        <a href="#" className="text-gray-900 text-hover-primary fs-6 fw-bold">
                                            {value.title}
                                        </a>
                                        <span className="text-muted fw-bold">{value.listings_count} İlan</span>
                                    </div>
                                </div>

                                {/* Eğer bu öğeye tıklandıysa ve çocukları varsa listeyi göster */}
                                {expandedItems[value.id] && (
                                    <ul className="ms-4">
                                        {expandedItems[value.id].map((child, childIndex) => (
                                            <li key={childIndex} onClick={() => fetchData(child.id)} className="cursor-pointer">
                                                {child.title}
                                                {/* Eğer bu çocuk öğenin de alt öğeleri varsa onları da göster */}
                                                {expandedItems[child.id] && (
                                                    <ul className="ms-4">
                                                        {expandedItems[child.id].map((subChild, subChildIndex) => (
                                                            <li key={subChildIndex} onClick={() => fetchData(subChild.id)} className="cursor-pointer">
                                                                {subChild.title}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                )}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        ))}

                    </div>
                </div>
            </Content>
        </>
    );
}

export default Categories;
