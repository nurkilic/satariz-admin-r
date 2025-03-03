import React, {useState, useEffect} from "react";
import {useForm} from "react-hook-form";
import {useDynamicMutation} from "../../../../api/endpoints/index.jsx";
import {
    GET_DISTRICTS,
    GET_PROVINCES, GET_TAX_OFFICES,
    GET_TOWNS, PUT_INVOICE_INFORMATION,
    PUT_USER,
    SETTING_CONTACT_INFO_STORE
} from "../../../../api/paths/index.jsx";
import {toast} from "react-toastify";
import axios from "axios";

const CompanyInvoiceInformationTab = ({data}) => {
    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: {errors},
    } = useForm()

    const business_type = watch("business_type")
    const mutation = useDynamicMutation();

    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [taxOffices, setTaxOffices] = useState([]);
    const [towns, setTowns] = useState([]);

    useEffect(() => {
        const getProvinces = async () => {
            const response = await axios.get(GET_PROVINCES);
            setProvinces(response.data);
            reset(data);

        }
        const getTaxOffices = async () => {
            const response = await axios.get(GET_TAX_OFFICES + data.province_id);
            setTaxOffices(response.data.data);
        }
        const getDistricts = async () => {
            const response = await axios.get(GET_DISTRICTS + data.province_id);
            setDistricts(response.data.data);
            reset(data);

        }
        const getValues = async () => {
            const response = await axios.get(GET_TOWNS + data.district_id);
            setTowns(response.data.data);
            reset(data);

        }
        getProvinces()
        getDistricts()
        getValues()
        getTaxOffices()

    }, [data, reset])

    const handleChangeProvince = async (province_id) => {
        const response = await axios.get(GET_DISTRICTS + province_id);
        setDistricts(response.data.data);
        setTowns([])
    }


    const handleChangeTaxProvince = async (province_id) => {
        const response = await axios.get(GET_TAX_OFFICES + province_id);
        setTaxOffices(response.data.data);
    }

    const handleChangeDistrict = async (district_id) => {
        const response = await axios.get(GET_TOWNS + district_id);
        setTowns(response.data.data);
    }

    const onSubmit = (e) => {
        mutation.mutate(
            {
                url: PUT_INVOICE_INFORMATION.replace(':id', data.user_id),
                data: e
            },
            {
                onSuccess: (response) => {
                    if (response.status !== 'success')
                        toast.error(response.message);
                },
                onError: (error) => {
                    toast.error(error.response.data.message);
                    console.error("Error:", error);
                },
            }
        );
    }

    if (!provinces || !districts || !towns)
        return;
    return (
        <>
            <div className='card mb-5 mb-xl-10'>
                <div className="card-header">
                    <h3 className="card-title">Fatura Bilgileri</h3>
                </div>
                <form className='form' onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
                    <div className='card-body pt-9 pb-10'>
                        <div className="row">
                            <div className='form-group col-md-6'>
                                <label className="form-label">Firma İsmi</label>
                                <input type="text"
                                       className="form-control"
                                       max={255}
                                       {...register("company_name", {required: true})}/>
                                {errors.company_name && <span className="mt-5 text-danger">Bu alan zorunludur.</span>}
                            </div>

                            <div className='form-group col-md-6'>
                                <label className="form-label">Firma Türü</label>

                                <select className="form-control" {...register("business_type", {required: true})}>
                                    <option value="0">Şahıs/Şirketi</option>
                                    <option value="1">Limited veya Anonim Şirketi</option>
                                </select>
                            </div>
                        </div>
                        {business_type == 1 ? (
                            <div className='form-group mt-5'>
                                <label className="form-label">Vergi Kimlik No</label>
                                <input type="text"
                                       className="form-control"
                                       {...register("tax_number")}/>
                            </div>
                        ) : (
                            <div className='form-group mt-5'>
                                <label className="form-label">T.C. Kimlik No</label>
                                <input type="text"
                                       className="form-control"
                                       {...register("turkish_id_number")}/>
                            </div>
                        )}

                        <div className="row mt-5">
                            <div className='form-group col-md-4'>
                                <label className="form-label">İl</label>
                                <select className="form-control" {...register("province_id", {
                                    required: true,
                                    onChange: (event) => handleChangeProvince(event.target.value),
                                })}
                                >
                                    {provinces?.map((province) => (
                                        <option key={province.id} value={province.id}>
                                            {province.name}
                                        </option>
                                    ))}
                                </select>

                            </div>
                            <div className='form-group col-md-4'>
                                <label className="form-label">İlçe</label>
                                <select className="form-control" {...register("district_id", {
                                    required: true,
                                    onChange: (event) => handleChangeDistrict(event.target.value),
                                })}>
                                    {districts && districts.map((value, key) => {
                                        return (<option key={key} value={value.id}>{value.name}</option>)
                                    })}
                                </select>
                            </div>
                            <div className='form-group col-md-4'>
                                <label className="form-label">Mahalle</label>
                                <select className="form-control"  {...register("neighbourhood_id", {required: true})}>
                                    {towns && towns.map((value, key) => {
                                        return (
                                            <optgroup label={value.name} key={value.id}>
                                                {value.neighbourhoods && value.neighbourhoods.map((neighbourhood, neKey) => {
                                                    return (<option key={neKey}
                                                                    value={neighbourhood.id}>{neighbourhood.name}</option>)
                                                })}
                                            </optgroup>
                                        )
                                    })}
                                </select>
                            </div>
                        </div>
                        <div className='form-group mt-5'>
                            <label className="form-label">Firma Adresi</label>
                            <input type="text"
                                   className="form-control"
                                   max={255}
                                   {...register("company_address", {required: true})}/>
                            {errors.company_address && <span className="mt-5 text-danger">Bu alan zorunludur.</span>}
                        </div>
                        <div className="row mt-5">
                            <div className='form-group col-md-6'>
                                <label className="form-label">Vergi Dairesi İl</label>
                                <select className="form-control" {...register("tax_office_province_id", {
                                    required: true,
                                    onChange: (event) => handleChangeTaxProvince(event.target.value),
                                })}
                                >
                                    {provinces?.map((province) => (
                                        <option key={province.id} value={province.id}>
                                            {province.name}
                                        </option>
                                    ))}
                                </select>

                            </div>
                            <div className='form-group col-md-6'>
                                <label className="form-label">Vergi Dairesi</label>
                                <select className="form-control" {...register("tax_office_id", {
                                    required: true
                                })}>
                                    {taxOffices && taxOffices.map((value, key) => {
                                        return (<option key={key} value={value.id}>{value.tax_office}</option>)
                                    })}
                                </select>
                            </div>
                        </div>

                    </div>
                    <div className="card-footer">
                        <button className="btn btn-success" type="submit" disabled={mutation.isPending}>
                            <i className="bi bi-check-circle-fill fs-4 me-2"></i>
                            {mutation.isPending ? "Güncelleniyor..." : "Güncelle"}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export {CompanyInvoiceInformationTab};
