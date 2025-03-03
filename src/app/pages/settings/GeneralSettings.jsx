import {PageTitle} from '../../../_metronic/layout/core'
import {ToolbarWrapper} from '../../../_metronic/layout/components/toolbar'
import {Content} from '../../../_metronic/layout/components/content'
import {TITLE} from "../../helpers/HelmetHelpers"
import {useQuery} from "@tanstack/react-query";
import {SETTINGS_DATA} from "../../api/endpoints/settings/index.jsx";
import {ImagePart} from "./parts/ImagePart.jsx";
import {ContactInfoPart} from "./parts/ContactInfoPart.jsx";
import {CompanyInfoPart} from "./parts/CompanyInfoPart.jsx";

const GeneralSettingWrapper = () => {
    const {data, isLoading, error} = useQuery({
        queryKey: ["settings"],
        queryFn: SETTINGS_DATA
    });


    return (
        <>
            <TITLE title={'Genel Ayarlar'}/>
            <PageTitle breadcrumbs={[]}>Genel Ayarlar</PageTitle>
            <ToolbarWrapper/>
            <Content>
                <div className='card card-custom '>
                    <div className="card-header card-header-stretch overflow-auto">
                        <ul className="nav nav-stretch nav-line-tabs fw-bold border-transparent flex-nowrap">
                            <li className="nav-item">
                                <a className="nav-link cursor-pointer active" data-bs-toggle="tab" href="#images">Görsel
                                    Ayarlar</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link cursor-pointer " data-bs-toggle="tab" href="#contacts">İletişim
                                    Ayarları</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link cursor-pointer " data-bs-toggle="tab" href="#company">Firma
                                    Ayarları</a>
                            </li>
                        </ul>
                    </div>
                    <div className="tab-content" id="myTabContent">
                        <div className="tab-pane fade show active" id="images" role="tabpanel">
                            <ImagePart data={data?.data?.settings}/>
                        </div>
                        <div className="tab-pane fade" id="contacts" role="tabpanel">
                            <ContactInfoPart data={data?.data?.settings}/>
                        </div>
                        <div className="tab-pane fade" id="company" role="tabpanel">
                            <CompanyInfoPart data={data?.data?.about}/>
                        </div>
                    </div>
                </div>
            </Content>
        </>
    )
}

export {GeneralSettingWrapper}
