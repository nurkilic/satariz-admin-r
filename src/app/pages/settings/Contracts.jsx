import { PageTitle } from '../../../_metronic/layout/core'
import { ToolbarWrapper } from '../../../_metronic/layout/components/toolbar'
import { Content } from '../../../_metronic/layout/components/content'
import { TITLE } from "../../helpers/HelmetHelpers"
import { useQuery } from "@tanstack/react-query"
import { CONTRACT_DATA } from "../../api/endpoints/settings/index.jsx"
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { React, useState, useEffect } from "react"
import { Quill } from "../../components/Quill.jsx"
import { showLoading, hideLoading } from '../../redux/slice/LoadingSlice.tsx';
import {useDispatch} from "react-redux";
import {useDynamicMutation} from "../../api/endpoints/index.jsx";
import {SETTING_IMAGE_STORE, UPDATE_CONTRACTS} from "../../api/paths/index.jsx";
import {toast} from "react-toastify";

const Contracts = () => {
    const { data, isPending, error } = useQuery({
        queryKey: ["contracts"],
        queryFn: CONTRACT_DATA
    })
    const dispatch = useDispatch();

    const [activeTab, setActiveTab] = useState(null)
    const [datum, setDatum] = useState({}) // datum'u bir obje olarak tanımlıyoruz

    useEffect(() => {
        if (data && data?.data && data?.data.length > 0) {
            setActiveTab(data.data[0].id) // İlk id'yi aktif tab yap
            // datum'u obje olarak ayarlıyoruz, id'ye göre içerik verisini alıyoruz
            const tabsData = data.data.reduce((acc, tab) => {
                acc[tab.id] = tab.content;
                return acc;
            }, {});
            setDatum(tabsData);
        }
    }, [data])

    const handleContentChange = (tabId, value) => {
        setDatum((prevState) => ({
            ...prevState,
            [tabId]: value // İlgili tabId'ye göre içeriği güncelliyoruz
        }));
    };

    const mutation = useDynamicMutation();

    const onSubmit = () => {
        mutation.mutate(
            {
                url: UPDATE_CONTRACTS,
                data: {id: activeTab, data: datum[activeTab]}
            },
            {
                onSuccess: (response) => {
                    if (response.status === 'success')
                        toast.success(response.message);
                    else
                        toast.error(response.message);
                },
                onError: (error) => {
                    toast.error("Bir sorun oluştu");
                    console.error("Error:", error);
                },
            }
        );
    }


    useEffect(() => {
       if(isPending || mutation.isPending)
           dispatch(showLoading());
       else
           dispatch(hideLoading());

    }, [isPending, mutation.isPending])

    return (
        <>
            <TITLE title={'Sözleşmeler'} />
            <PageTitle breadcrumbs={[]}>Sözleşmeler</PageTitle>
            <ToolbarWrapper />
            <Content>
                <div className='card card-custom'>
                    <div className="card-header card-header-stretch overflow-auto">
                        <ul className="nav nav-stretch nav-line-tabs fw-bold border-transparent flex-nowrap">
                            {data?.data && data.data.map((tab) => (
                                <li key={tab.id} className="nav-item">
                                    <a
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`nav-link cursor-pointer ${tab.id === activeTab ? "active" : ""}`}
                                        data-bs-toggle="tab"
                                        href={tab.slug}
                                    >
                                        {tab.title}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="tab-content" id="myTabContent">
                        {data?.data && data.data.map((tab) => (
                            <div
                                key={tab.id}
                                className={`tab-pane fade ${activeTab === tab.id ? "show active" : ""}`}
                                id={tab.slug} role="tabpanel"
                            >
                                <Quill
                                    content={datum[tab.id]} // datum'dan id'ye göre içerik alıyoruz
                                    tabId={tab.id} // tabId'yi Quill component'ine geçiriyoruz
                                    onChange={(id, newContent) => handleContentChange(id, newContent)} // İçeriği güncelleyen fonksiyonu geçiriyoruz
                                />
                            </div>
                        ))}
                    </div>
                    <div className="card-footer">
                        <button className="btn btn-success" onClick={onSubmit} style={{float: "right"}} type="submit" disabled={mutation.isPending}>
                            <i className="bi bi-check-circle-fill fs-4 me-2"></i>
                            {mutation.isPending ? "Gönderiliyor..." : "Gönder"}
                        </button>
                    </div>
                </div>
            </Content>
        </>
    )
}

export { Contracts }
