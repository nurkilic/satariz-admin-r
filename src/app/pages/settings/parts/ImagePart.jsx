import {useForm} from "react-hook-form";
import {useMutation, useQuery} from "@tanstack/react-query";
import {apiRequest, useDynamicMutation} from "../../../api/endpoints/index.jsx";
import {ToastContainer, toast} from 'react-toastify';
import {ALT_BASE_URI, SETTING_IMAGE_STORE} from "../../../api/paths/index.jsx";

export const ImagePart = ({data: data}) => {
    const {
        register,
        handleSubmit,
        watch,
        formState: {errors},
    } = useForm()

    const mutation = useDynamicMutation();

    const onSubmit = (e) => {
        const formData = new FormData();
        Object.keys(e).forEach((key) => {
            if (e[key]) {
                formData.append(key, e[key][0]);
            }
        });

        mutation.mutate(
            {
                url: SETTING_IMAGE_STORE,
                data: formData
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
                        <div className="col-md-4">
                            <div className="card">
                                <div className="card-body text-center">
                                    <img width="200" src={ALT_BASE_URI + data?.white_logo} alt=""/>
                                </div>
                                <div className="card-footer">
                                    <div className='form-group'>
                                        <label className="form-label">Beyaz Logo</label>
                                        <input type="file" accept={'image'}
                                               className="form-control" {...register("white_logo", {required: false})}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card">
                                <div className="card-body text-center">
                                    <img width="200" src={ALT_BASE_URI + data?.black_logo} alt=""/>
                                </div>
                                <div className="card-footer">
                                    <div className='form-group'>
                                        <label className="form-label">Siyah Logo</label>
                                        <input type="file" accept={'image'}
                                               className="form-control" {...register("black_logo", {required: false})}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card">
                                <div className="card-body text-center">
                                    <img width="40" src={ALT_BASE_URI + data?.favicon} alt=""/>
                                </div>
                                <div className="card-footer">
                                    <div className='form-group'>
                                        <label className="form-label">Favicon</label>
                                        <input type="file" accept={'image'}
                                               className="form-control" {...register("favicon", {required: false})}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-10">
                        <div className="col-md-4">
                            <div className="card">
                                <div className="card-body text-center">
                                    <img width="200" src={ALT_BASE_URI + data?.mail_logo} alt=""/>
                                </div>
                                <div className="card-footer">
                                    <div className='form-group'>
                                        <label className="form-label">Mail Logo</label>
                                        <input type="file" accept={'image'}
                                               className="form-control" {...register("mail_logo", {required: false})}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card">
                                <div className="card-body text-center">
                                    <img width="200" src={ALT_BASE_URI + data?.invoice_logo} alt=""/>
                                </div>
                                <div className="card-footer">
                                    <div className='form-group'>
                                        <label className="form-label">Fatura Logo</label>
                                        <input type="file" accept={'image'}
                                               className="form-control" {...register("invoice_logo", {required: false})}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card">
                                <div className="card-body text-center">
                                    <img width="200" src={ALT_BASE_URI + data?.alternative_logo} alt=""/>
                                </div>
                                <div className="card-footer">
                                    <div className='form-group'>
                                        <label className="form-label">Alternatif Logo</label>
                                        <input type="file" accept={'image'}
                                               className="form-control" {...register("alternative_logo", {required: false})}/>
                                    </div>
                                </div>
                            </div>
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

