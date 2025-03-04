import React, {useEffect, useState} from 'react';
import {useForm} from "react-hook-form";
import {useDynamicMutation} from "../../../api/endpoints/index.jsx";
import {toast} from 'react-toastify';
import {SETTING_COMPANY_INFO_STORE} from "../../../api/paths/index.jsx";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export const CompanyInfoPart = ({data: data}) => {
    const [editor, setEditor] = useState('');

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        watch,
        formState: {errors},
    } = useForm({
        defaultValues: {
            company_name: data?.company_name,
            phone: data?.phone,
            address: data?.address,
        }
    })

    useEffect(() => {
        if(data){
            setValue('company_name', data?.company_name)
            setValue('phone', data?.phone)
            setValue('address', data?.address)
            setEditor(data?.about)
        }
    }, [data]);

    const mutation = useDynamicMutation();
    const modules = {
        toolbar: [
            [{header: [1, 2, 3, false]}], // Başlık seviyeleri
            ["bold", "italic", "underline", "strike"], // Metin biçimlendirme
            [{list: "ordered"}, {list: "bullet"}], // Liste türleri
            [{align: []}], // Hizalama seçenekleri
            ["blockquote", "code-block"], // Alıntı ve kod bloğu
            [{color: []}, {background: []}], // Renk seçenekleri
            [{script: "sub"}, {script: "super"}], // Alt simge / Üst simge
            ["link", "image", "video"], // Link, resim, video ekleme
            ["clean"], // Biçimlendirmeyi temizle
        ],
    };
    const formats = [
        "header",
        "bold",
        "italic",
        "underline",
        "strike",
        "blockquote",
        "list",
        "bullet",
        "align",
        "color",
        "background",
        "script",
        "link",
        "image",
        "video",
    ];

    const onSubmit = (e) => {
        e.about = editor
        mutation.mutate(
            {
                url: SETTING_COMPANY_INFO_STORE,
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
                        <div className='form-group col-md-12'>
                            <label className="form-label">Firma İsmi</label>
                            <input type="text"
                                   className="form-control"
                                   max={255}
                                   {...register("company_name", {required: true})}/>
                            {errors.company_name && <span className="mt-5 text-danger">Bu alan zorunludur.</span>}
                        </div>
                    </div>
                    <div className="row mt-10">
                        <div className='form-group col-md-6'>
                            <label className="form-label">Telefon</label>
                            <input type="text"
                                   className="form-control"
                                   {...register("phone", {required: true})}/>
                            {errors.phone && <span className="mt-5 text-danger">Bu alan zorunludur.</span>}
                        </div>
                        <div className='form-group col-md-6'>
                            <label className="form-label">Adres</label>
                            <input type="text"
                                   className="form-control"
                                   max={255}
                                   {...register("address", {required: true})}/>
                            {errors.address && <span className="mt-5 text-danger">Bu alan zorunludur.</span>}
                        </div>
                    </div>
                    <div className="mt-10">
                        <ReactQuill
                            theme="snow"
                            value={editor}
                            onChange={setEditor}
                            modules={modules} // Özelleştirilmiş toolbar
                            formats={formats} // Desteklenen formatlar  
                            placeholder="Buraya yazmaya başlayabilirsiniz..."
                        />
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

