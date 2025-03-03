import {useForm} from "react-hook-form";
import {useDynamicMutation} from "../../../api/endpoints/index.jsx";
import {toast} from 'react-toastify';
import {SETTING_CONTACT_INFO_STORE} from "../../../api/paths/index.jsx";
import {useEffect} from "react";

export const ContactInfoPart = ({data: data}) => {
    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: {errors},
    } = useForm()

    const mutation = useDynamicMutation();
    useEffect(() => {
        if(data){
            reset({
                title: data.title,
                company_name: data.company_name,
                phone: data.phone,
                email: data.email,
                address: data.address,
                about: data.about,
                keywords: data.keywords,
                description: data.description,
            });
        }
    }, [data]);
    const onSubmit = (e) => {
        mutation.mutate(
            {
                url: SETTING_CONTACT_INFO_STORE,
                data: e
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

    return (
        <>
            <form className='form' onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
                <div className='card-body'>
                    <div className="row">
                        <div className='form-group col-md-6'>
                            <label className="form-label">Başlık</label>
                            <input type="text"
                                   className="form-control"
                                   max={255}
                                    {...register("title", {required: true})}/>
                        </div>
                        <div className='form-group col-md-6'>
                            <label className="form-label">Firma İsmi</label>
                            <input type="text"
                                   className="form-control"
                                   max={255}
                                    {...register("company_name", {required: true})}/>
                            {errors.company_name && <span className="mt-5 text-danger">Bu alan zorunludur.</span>}

                        </div>
                    </div>
                    <div className="row mt-10">
                        <div className='form-group col-md-4'>
                            <label className="form-label">Telefon</label>
                            <input type="number"
                                   className="form-control"
                                    {...register("phone", {required: true})}/>
                            {errors.phone && <span className="mt-5 text-danger">Bu alan zorunludur.</span>}
                        </div>
                        <div className='form-group col-md-4'>
                            <label className="form-label">E-Posta</label>
                            <input type="email"
                                   className="form-control"
                                   max={255}
                                    {...register("email", {required: true})}/>
                            {errors.email && <span className="mt-5 text-danger">Bu alan zorunludur.</span>}
                        </div>
                        <div className='form-group col-md-4'>
                            <label className="form-label">Adres</label>
                            <input type="text"
                                   className="form-control"
                                   max={255}
                                    {...register("address", {required: true})}/>
                            {errors.address && <span className="mt-5 text-danger">Bu alan zorunludur.</span>}
                        </div>
                    </div>
                    <div className="row mt-10">
                        <div className='form-group col-md-6'>
                            <label className="form-label">Anahtar Kelimeler</label>
                            <input type="text"
                                   className="form-control"
                                   max={255}
                                    {...register("keywords", {required: true})}/>
                            {errors.keywords && <span className="mt-5 text-danger">Bu alan zorunludur.</span>}
                        </div>
                        <div className='form-group col-md-6'>
                            <label className="form-label">Açıklama</label>
                            <input type="text"
                                   className="form-control"
                                   max={255}
                                    {...register("description", {required: true})}/>
                            {errors.description && <span className="mt-5 text-danger">Bu alan zorunludur.</span>}
                        </div>
                    </div>
                </div>
                <div className="card-footer">
                    <button className="btn btn-success" type="submit" disabled={mutation.isPending}>
                        <i className="bi bi-check-circle-fill fs-4 me-2"></i>
                        {mutation.isPending ? "Gönderiliyor..." : "Gönder"}
                    </button>
                </div>
            </form>
        </>
    )
}

