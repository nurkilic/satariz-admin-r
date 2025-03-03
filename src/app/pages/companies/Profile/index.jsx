import React, {useState, useMemo, useEffect} from "react";
import {
    BASE_URL,
    GET_COMPANY,
} from "../../../api/paths/index.jsx";
import {useDispatch} from "react-redux";
import {showLoading, hideLoading} from "../../../redux/slice/LoadingSlice.tsx";
import {TITLE} from "../../../helpers/HelmetHelpers.jsx";
import {ToolbarWrapper} from "../../../../_metronic/layout/components/toolbar/index.ts";
import {Content} from "../../../../_metronic/layout/components/content/index.ts";
import {PageTitle} from "../../../../_metronic/layout/core/index.ts";
import Swal from 'sweetalert2'
import {KTIcon, toAbsoluteUrl} from "../../../../_metronic/helpers/index.ts";
import {Dropdown1} from "../../../../_metronic/partials/index.ts";
import {Link, useParams} from "react-router-dom";
import {apiRequest} from "../../../api/endpoints/index.jsx";
import {CompanyProfileUserTab} from "./Tabs/user.jsx";
import {CompanyProfileCorporateTab} from "./Tabs/corporate.jsx";
import {CompanyProfileSaleRepresentativesTab} from "./Tabs/sale_representatives.jsx";
import {ListingTable} from "../../listings/components/table.jsx";
import {Packages} from "./Tabs/packages.jsx";
import {Boosts} from "./Tabs/boosts.jsx";
import {Documents} from "./Tabs/documents.jsx";
import {CompanyInvoiceInformationTab} from "./Tabs/invoice_informations.jsx";
import {Invoices} from "./Tabs/invoices.jsx";

const CompanyProfile = () => {
    const {companyId} = useParams();
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [tab, setTab] = useState(0);
    const dispatch = useDispatch();

    const fetchData = async (reset = false) => {
        try {
            setLoading(true);
            const response = await apiRequest({
                url: GET_COMPANY + companyId, method: 'GET',
            })
            setData(response.data);
            setLoading(false);
        } catch (err) {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (loading) {
            dispatch(showLoading());
        } else {
            dispatch(hideLoading());
        }
    }, [loading, dispatch]);

    useEffect(() => {
        fetchData();
    }, [companyId]);


    if(!data || !data.user){
        return;
    }

    return (
        <>
            <TITLE title={'Mağaza Profili'}/>
            <PageTitle breadcrumbs={[]}>Mağaza Profili</PageTitle>
            <ToolbarWrapper/>
            <Content>
                <div className='card mb-5 mb-xl-10'>
                    <div className='card-body pt-9 pb-0'>
                        <div className='d-flex flex-wrap flex-sm-nowrap mb-3'>
                            <div className='me-7 mb-4'>
                                <div className='symbol symbol-100px symbol-lg-160px symbol-fixed position-relative'>
                                    <img src={data.user.corporate.logo} alt='' style={{objectFit: "contain"}}/>
                                    <div
                                        className='position-absolute translate-middle bottom-0 start-100 mb-6 bg-success rounded-circle border border-4 border-white h-20px w-20px'></div>
                                </div>
                            </div>

                            <div className='flex-grow-1'>
                                <div className='d-flex justify-content-between align-items-start flex-wrap mb-2'>
                                    <div className='d-flex flex-column'>
                                        <div className='d-flex align-items-center mb-2'>
                                            <a href='#!'
                                               className='text-gray-800 text-hover-primary fs-2 fw-bolder me-1'>
                                                { data.user.corporate.store_name }
                                            </a>
                                            {data.user.corporate.status === 1 ? <a href='#'>
                                                <KTIcon iconName='verify' className='fs-1 text-primary'/>
                                            </a> : <a href='#'>
                                                <KTIcon iconName='verify' className='fs-1 text-danger'/>
                                                </a> }
                                            <a
                                                href='#'
                                                className={
                                                    `btn btn-sm fw-bolder ms-2 fs-8 py-1 px-3 ` +
                                                    (data.user.status === 0 ? 'btn-light-danger' : (data.user.status === 1 ? 'btn-light-success' : (data.user.status === 2 ? 'btn-light-warning' : null)))
                                                }
                                                data-bs-toggle='modal'
                                                data-bs-target='#kt_modal_upgrade_plan'
                                            >
                                                { data.user.status === 0 ? 'Pasif Üye' : (data.user.status === 1 ? 'Aktif Üye' : (data.user.status === 2 ? 'Onay Bekleyen Üye' : null)) }
                                            </a>
                                            <a
                                                href='#'
                                                className={
                                                    `btn btn-sm fw-bolder ms-2 fs-8 py-1 px-3 ` +
                                                    (data.user.corporate.status === 0 ? 'btn-light-danger' : (data.user.corporate.status === 1 ? 'btn-light-success' : (data.user.corporate.status === 2 ? 'btn-light-warning' : null)))
                                                }
                                                data-bs-toggle='modal'
                                                data-bs-target='#kt_modal_upgrade_plan'
                                            >
                                                { data.user.corporate.status === 0 ? 'Pasif Kurumsal Hesap' : (data.user.corporate.status === 1 ? 'Aktif Kurumsal Hesap' : (data.user.corporate.status === 2 ? 'Onay Bekleyen Kurumsal Hesap' : null)) }
                                            </a>
                                        </div>

                                        <div className='d-flex flex-wrap fw-bold fs-6 mb-4 pe-2'>
                                            <a
                                                href='#'
                                                className='d-flex align-items-center text-gray-500 text-hover-primary me-5 mb-2'
                                            >
                                                <KTIcon iconName='profile-circle' className='fs-4 me-1'/>
                                                {data.user.name} {data.user.surname}
                                            </a>
                                            <a
                                                href='#'
                                                className='d-flex align-items-center text-gray-500 text-hover-primary me-5 mb-2'
                                            >
                                                <KTIcon iconName='call' className='fs-4 me-1'/>
                                                {data.user.phone}
                                            </a>
                                            <a
                                                href='#'
                                                className='d-flex align-items-center text-gray-500 text-hover-primary mb-2'
                                            >
                                                <KTIcon iconName='sms' className='fs-4 me-1'/>
                                                {data.user.email}
                                            </a>
                                        </div>
                                    </div>
                                </div>

                                <div className='d-flex flex-wrap flex-stack'>
                                    <div className='d-flex flex-column flex-grow-1 pe-8'>
                                        <div className='d-flex flex-wrap'>
                                            <div
                                                className='border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3'>
                                                <div className='d-flex align-items-center'>
                                                    <div className='fs-2 fw-bolder'>{data.stats.active_listing_count ?? 0}</div>
                                                </div>

                                                <div className='fw-bold fs-6 text-gray-500'>Aktif İlan Sayısı</div>
                                            </div>

                                            <div
                                                className='border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3'>
                                                <div className='d-flex align-items-center'>
                                                    <div className='fs-2 fw-bolder'>{data.stats.listing_count ?? 0}</div>
                                                </div>

                                                <div className='fw-bold fs-6 text-gray-500'>Toplam İlan Sayısı</div>
                                            </div>

                                            <div
                                                className='border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3'>
                                                <div className='d-flex align-items-center'>
                                                    <div className='fs-2 fw-bolder'>{data.membership_duration ?? 0}</div>
                                                </div>

                                                <div className='fw-bold fs-6 text-gray-500'>Üyelik Tarihi</div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='d-flex overflow-auto h-55px'>
                            <ul className='nav nav-stretch nav-line-tabs nav-line-tabs-2x border-transparent fs-5 fw-bolder flex-nowrap'>
                                <li className='nav-item'>
                                    <Link
                                        className={
                                            `nav-link text-active-primary me-6 ` +
                                            (tab === 0 && 'active')
                                        }
                                        to='#'
                                        onClick={() => setTab(0)}
                                    >
                                        Yetkili Bilgileri
                                    </Link>
                                </li>
                                <li className='nav-item'>
                                    <Link
                                        className={
                                            `nav-link text-active-primary me-6 ` +
                                            (tab === 1 && 'active')
                                        }
                                        onClick={() => setTab(1)}
                                        to='#'
                                    >
                                        Kurumsal Profili
                                    </Link>
                                </li>
                                <li className='nav-item'>
                                    <Link
                                        className={
                                            `nav-link text-active-primary me-6 ` +
                                            (tab === 2 && 'active')
                                        }
                                        to='#'
                                        onClick={() => setTab(2)}
                                    >
                                        Satış Temsilcileri
                                    </Link>
                                </li>
                                <li className='nav-item'>
                                    <Link
                                        className={
                                            `nav-link text-active-primary me-6 ` +
                                            (tab === 3 && 'active')
                                        }
                                        onClick={() => setTab(3)}
                                        to='#'
                                    >
                                        İlanları
                                    </Link>
                                </li>
                                <li className='nav-item'>
                                    <Link
                                        className={
                                            `nav-link text-active-primary me-6 ` +
                                            (tab === 4 && 'active')
                                        }
                                        onClick={() => setTab(4)}
                                        to='#'
                                    >
                                        Paketleri
                                    </Link>
                                </li>
                                <li className='nav-item'>
                                    <Link
                                        className={
                                            `nav-link text-active-primary me-6 ` +
                                            (tab === 5 && 'active')
                                        }
                                        onClick={() => setTab(5)}
                                        to='#'
                                    >
                                        Boostları
                                    </Link>
                                </li>
                                <li className='nav-item'>
                                    <Link
                                        className={
                                            `nav-link text-active-primary me-6 ` +
                                            (tab === 6 && 'active')
                                        }
                                        onClick={() => setTab(6)}
                                        to='#'
                                    >
                                        Belgeleri
                                    </Link>
                                </li>
                                <li className='nav-item'>
                                    <Link
                                        className={
                                            `nav-link text-active-primary me-6 ` +
                                            (tab === 7 && 'active')
                                        }
                                        onClick={() => setTab(7)}
                                        to='#'
                                    >
                                        Fatura Bilgileri
                                    </Link>
                                </li>
                                <li className='nav-item'>
                                    <Link
                                        className={
                                            `nav-link text-active-primary me-6 ` +
                                            (tab === 8 && 'active')
                                        }
                                        onClick={() => setTab(8)}
                                        to='#'
                                    >
                                        Faturaları
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="tab-content" id="myTabContent">
                    <div
                        className={
                            `tab-pane fade ` +
                            (tab === 0 && 'show active')
                        }
                        role="tabpanel"
                    >
                        <CompanyProfileUserTab data={data.user} fetchData={fetchData}/>
                    </div>
                    <div
                        className={
                            `tab-pane fade ` +
                            (tab === 1 && 'show active')
                        }
                        role="tabpanel"
                    >
                        <CompanyProfileCorporateTab data={data.user.corporate} fetchData={fetchData}/>
                    </div>
                    <div
                        className={
                            `tab-pane fade ` +
                            (tab === 2 && 'show active')
                        }
                        role="tabpanel"
                    >
                        <CompanyProfileSaleRepresentativesTab data={data.user?.corporate?.sale_representatives} fetchData={fetchData}/>
                    </div>
                    <div
                        className={
                            `tab-pane fade ` +
                            (tab === 3 && 'show active')
                        }
                        role="tabpanel"
                    >
                        <ListingTable otherFilters={{user_id: data.user.id}}/>
                    </div>
                    <div
                        className={
                            `tab-pane fade ` +
                            (tab === 4 && 'show active')
                        }
                        role="tabpanel"
                    >
                        <Packages data={data.user?.packages}/>
                    </div>
                    <div
                        className={
                            `tab-pane fade ` +
                            (tab === 5 && 'show active')
                        }
                        role="tabpanel"
                    >
                        <Boosts data={data.user?.boosts}/>
                    </div>
                    <div
                        className={
                            `tab-pane fade ` +
                            (tab === 6 && 'show active')
                        }
                        role="tabpanel"
                    >
                        <Documents data={data.user?.corporate?.documents}/>
                    </div>
                    <div
                        className={
                            `tab-pane fade ` +
                            (tab === 7 && 'show active')
                        }
                        role="tabpanel"
                    >
                        <CompanyInvoiceInformationTab data={data.user?.invoice_information}/>
                    </div>
                    <div
                        className={
                            `tab-pane fade ` +
                            (tab === 8 && 'show active')
                        }
                        role="tabpanel"
                    >
                        <Invoices data={data.user?.invoice_information}/>
                    </div>
                </div>
            </Content>
        </>
    );
};

export {CompanyProfile};
