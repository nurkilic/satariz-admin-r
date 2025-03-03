import React, {useState, useEffect} from "react";
import {useForm} from "react-hook-form";
import {useDynamicMutation} from "../../../../api/endpoints/index.jsx";
import {
    BASE_URL,
    GET_DISTRICTS,
    GET_PROVINCES, GET_TOWNS, PUT_COMPANY,
    PUT_USER
} from "../../../../api/paths/index.jsx";
import {toast} from "react-toastify";
import axios from "axios";

const CompanyProfileCorporateTab = ({data, fetchData}) => {
    const {
        register,
        handleSubmit,
        reset,
        watch,
        setValue,
        formState: {errors},
    } = useForm()

    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [towns, setTowns] = useState([]);


    const mutation = useDynamicMutation();

    useEffect(() => {
        const getProvinces = async () => {
            const response = await axios.get(GET_PROVINCES);
            setProvinces(response.data);
        }
        const getDistricts = async () => {
            const response = await axios.get(GET_DISTRICTS + data.province_id);
            setDistricts(response.data.data);

        }
        const getValues = async () => {
            const response = await axios.get(GET_TOWNS + data.district_id);
            setTowns(response.data.data);
        }
        getProvinces()
        getDistricts()
        getValues()
        setTimeout(() => {
            reset(data);
        }, 500)
    }, [])

    const handleChangeProvince = async (province_id) => {
        const response = await axios.get(GET_DISTRICTS + province_id);
        setDistricts(response.data.data);
        setTowns([])
    }

    const handleChangeDistrict = async (district_id) => {
        const response = await axios.get(GET_TOWNS + district_id);
        setTowns(response.data.data);
    }

    const onSubmit = (e) => {
        const formData = new FormData();

        // Form verilerini ekle
        Object.keys(e).forEach((key) => {
            if (key === "logo" && e.logo[0]) {
                // Dosya eklenmişse, FormData'ya ekle
                formData.append("logo", e.logo[0]);
            } else if (key === "store_photo" && e.store_photo[0]) {
                // Dosya eklenmişse, FormData'ya ekle
                formData.append("store_photo", e.store_photo[0]);
            } else {
                formData.append(key, e[key]);
            }
        });

        mutation.mutate(
            {
                url: PUT_COMPANY.replace(':id', data.user_id),
                data: formData,
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            },
            {
                onSuccess: (response) => {
                    if (response.status !== 'success')
                        toast.error(response.message);
                    else
                        fetchData()
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
                    <h3 className="card-title">Kurumsal Profili</h3>
                </div>
                <form className='form' onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
                    <div className='card-body pt-9 pb-10'>
                        <div className="row">
                            <div className="col-md-6">

                                <div className="image-input image-input-outline" data-kt-image-input="true">
                                    <div className="image-input-wrapper w-125px h-125px"
                                         style={{
                                             backgroundImage: `url("${data.logo}")`,
                                             backgroundSize: "contain",
                                             backgroundPosition: "center"
                                         }}></div>
                                    <label
                                        className="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow"
                                        data-kt-image-input-action="change" data-bs-toggle="tooltip"
                                        title="Change avatar">
                                        <i className="ki-duotone ki-pencil fs-7"><span className="path1"></span><span
                                            className="path2"></span></i>
                                        <input {...register("logo", {required: false})} type="file" name="logo"
                                               accept=".png, .jpg, .jpeg .webp"/>
                                    </label>

                                    <span
                                        className="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow"
                                        data-kt-image-input-action="cancel" data-bs-toggle="tooltip"
                                        title="Cancel avatar">
                                <i className="ki-duotone ki-cross fs-2"><span className="path1"></span><span
                                    className="path2"></span></i>                            </span>
                                </div>
                                <div className="form-text"><strong>Logo </strong>: png, jpg, jpeg, webp.
                                </div>
                            </div>
                            <div className="col-md-6 float-end">
                                <div className="image-input image-input-outline" data-kt-image-input="true">
                                    <div className="image-input-wrapper w-125px h-125px"
                                         style={{
                                             backgroundImage: `url("${data.store_photo}")`,
                                             backgroundSize: "contain",
                                             backgroundPosition: "center"
                                         }}></div>
                                    <label
                                        className="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow"
                                        data-kt-image-input-action="change" data-bs-toggle="tooltip"
                                        title="Change avatar">
                                        <i className="ki-duotone ki-pencil fs-7"><span className="path1"></span><span
                                            className="path2"></span></i>
                                        <input {...register("store_photo", {required: false})} type="file"
                                               name="store_photo" accept=".png, .jpg, .jpeg .webp"/>
                                    </label>

                                    <span
                                        className="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow"
                                        data-kt-image-input-action="cancel" data-bs-toggle="tooltip"
                                        title="Cancel avatar">
                                <i className="ki-duotone ki-cross fs-2"><span className="path1"></span><span
                                    className="path2"></span></i>                            </span>
                                </div>
                                <div className="form-text"><strong>Mağaza Görseli </strong>: png, jpg, jpeg, webp.
                                </div>
                            </div>
                        </div>
                        <div className="row mt-10">
                            <div className='form-group col-md-6'>
                                <label className="form-label">Firma İsmi</label>
                                <input type="text"
                                       className="form-control"
                                       max={255}
                                       {...register("store_name", {required: true})}/>
                                {errors.store_name && <span className="mt-5 text-danger">Bu alan zorunludur.</span>}
                            </div>
                            <div className='form-group col-md-6'>
                                <label className="form-label">Faaliyet Alanı</label>
                                <select className="form-control"
                                        {...register("category_id", {required: true})}>
                                    <option value="1">Vasıta</option>
                                    <option value="2">Emlak</option>
                                </select>
                            </div>
                        </div>
                        <div className="row mt-5">
                            <div className='form-group col-md-6'>
                                <label className="form-label">Telefon</label>
                                <input type="number"
                                       className="form-control"
                                       {...register("phone", {required: true})}/>
                                {errors.phone && <span className="mt-5 text-danger">Bu alan zorunludur.</span>}
                            </div>
                            <div className='form-group col-md-6'>
                                <label className="form-label">Adres</label>
                                <input type="text"
                                       className="form-control"
                                       max={255}
                                       {...register("company_address", {required: true})}/>
                                {errors.company_address &&
                                    <span className="mt-5 text-danger">Bu alan zorunludur.</span>}

                            </div>
                        </div>
                        <div className="row mt-5">
                            <div className='form-group col-md-12'>
                                <label className="form-label">Hakkında</label>
                                <textarea className="form-control" cols="10"
                                          rows="4" {...register("about", {required: true})}></textarea>
                            </div>
                        </div>
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
                                <select className="form-control" {...register("district_id", {required: true, onChange: (event) => handleChangeDistrict(event.target.value),})}>
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
                        <div className="row mt-5">

                            <div className='form-group col-md-12'>
                                <label className="form-label">Durum</label>
                                <select className="form-control" {...register("status", {required: true})}>
                                    <option value="0">Pasif</option>
                                    <option value="1">Aktif</option>
                                    <option value="2">Onay Bekliyor</option>
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

export {CompanyProfileCorporateTab};
