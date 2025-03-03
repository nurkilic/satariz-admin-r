import React, {useState, useEffect} from "react";
import {useForm} from "react-hook-form";
import {useDynamicMutation} from "../../../../api/endpoints/index.jsx";
import {PUT_USER, SETTING_CONTACT_INFO_STORE} from "../../../../api/paths/index.jsx";
import {toast} from "react-toastify";

const CompanyProfileUserTab = ({data, fetchData}) => {
    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: {errors},
    } = useForm()

    const mutation = useDynamicMutation();
    useEffect(() => {
        if (data) {
            reset({
                name: data.name,
                surname: data.surname,
                status: data.status,
                phone: data.phone,
                email: data.email,
            });
        }
    }, [data]);
    const onSubmit = (e) => {
        mutation.mutate(
            {
                url: PUT_USER.replace(':id', data.id),
                data: e
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
    return (
        <>
            <div className='card mb-5 mb-xl-10'>
                <div className="card-header">
                    <h3 className="card-title">Yetkili Bilgileri</h3>
                </div>
                <form className='form' onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
                    <div className='card-body pt-9 pb-10'>
                        <div className="row">
                            <div className='form-group col-md-6'>
                                <label className="form-label">İsim</label>
                                <input type="text"
                                       className="form-control"
                                       max={255}
                                       {...register("name", {required: true})}/>
                                {errors.name && <span className="mt-5 text-danger">Bu alan zorunludur.</span>}
                            </div>
                            <div className='form-group col-md-6'>
                                <label className="form-label">Soyisim</label>
                                <input type="text"
                                       className="form-control"
                                       max={255}
                                       {...register("surname", {required: true})}/>
                                {errors.surname && <span className="mt-5 text-danger">Bu alan zorunludur.</span>}

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
                                <label className="form-label">E-Posta</label>
                                <input type="email"
                                       className="form-control"
                                       max={255}
                                       {...register("email", {required: true})}/>
                                {errors.email && <span className="mt-5 text-danger">Bu alan zorunludur.</span>}

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

export {CompanyProfileUserTab};
