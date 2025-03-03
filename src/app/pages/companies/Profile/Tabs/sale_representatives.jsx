import React, {useState, useEffect} from "react";
import {useForm} from "react-hook-form";
import {apiRequest, useDynamicMutation} from "../../../../api/endpoints/index.jsx";
import {
    DELETE_SALE_REPRESENTATIVE,
    PROVINCE_DELETE,
    PUT_SALE_REPRESENTATIVE,
} from "../../../../api/paths/index.jsx";
import {toast} from "react-toastify";
import ModalComponent from "../../../../components/Modal.jsx";
import Swal from "sweetalert2";

const Form = ({formData, closeModal, fetchData}) => {
    const {
        register,
        handleSubmit,
        formState: {errors},
        reset,
    } = useForm();


    const mutation = useDynamicMutation();

    // Form gönderim işlemi
    const onSubmit = (data) => {
        const formDataToSend = new FormData();
        Object.keys(data).forEach((key) => {
            if (data[key]) {
                formDataToSend.append(key, data[key]);
            }
        });

        mutation.mutate(
            {
                url: PUT_SALE_REPRESENTATIVE.replace(':id', data.parent_id),
                data: formDataToSend,
            },
            {
                onSuccess: (response) => {
                    if (response.status !== 'success') {
                        toast.error(response.message);
                    }
                    else {
                        closeModal()
                        fetchData()
                    }
                },
                onError: (error) => {
                    toast.error(error.response.data.message);
                    console.error("Error:", error);
                },
            }
        );
    };

    React.useEffect(() => {
        console.log('formData')
        console.log(formData)
        reset(formData);
    }, [formData, reset]);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
                <label htmlFor="title" className="form-label">İsim</label>
                <input
                    type="text"
                    className="form-control"
                    maxLength={255}
                    {...register("name", {required: true})}
                />
                {errors.name && (
                    <span className="mt-5 text-danger">Bu alan zorunludur.</span>
                )}
            </div>
            <div className="mb-3">
                <label htmlFor="title" className="form-label">Soyisim</label>
                <input
                    type="text"
                    className="form-control"
                    maxLength={255}
                    {...register("surname", {required: true})}
                />
                {errors.surname && (
                    <span className="mt-5 text-danger">Bu alan zorunludur.</span>
                )}
            </div>
            <div className="mb-3">
                <label htmlFor="title" className="form-label">Telefon</label>
                <input
                    type="text"
                    className="form-control"
                    maxLength={255}
                    {...register("phone", {required: true})}
                />
                {errors.phone && (
                    <span className="mt-5 text-danger">Bu alan zorunludur.</span>
                )}
            </div>
            <div className="mb-3">
                <label htmlFor="title" className="form-label">E-Posta</label>
                <input
                    type="text"
                    className="form-control"
                    maxLength={255}
                    {...register("email", {required: true})}
                />
                {errors.email && (
                    <span className="mt-5 text-danger">Bu alan zorunludur.</span>
                )}
            </div>
            <div className="mb-3">
                <label htmlFor="title" className="form-label">Durum</label>
                <select className="form-control" {...register("status", {required: true})}>
                    <option value="0">Pasif</option>
                    <option value="1">Aktif</option>
                </select>
            </div>
            <div className="mb-3 text-center">
                <button type="submit" className="btn btn-primary">Kaydet</button>
            </div>
        </form>
    );
};

const CompanyProfileSaleRepresentativesTab = ({data, fetchData}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editData, setEditData] = useState([]);

    const openModal = () => {
        setIsModalOpen(true);
    };
    const closeModal = () => setIsModalOpen(false);
    const handleEdit = (row) => {
        setEditData(row)
        openModal(0)
        console.log("Edit:", row);
    };


    const handleDelete = (value) => {
        Swal.fire({
            title: "Kayıt siliniyor!",
            text: "Kaydı silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Evet, sil!",
            cancelButtonText: "Vazgeç"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const response = await apiRequest({url: DELETE_SALE_REPRESENTATIVE.replace(':id', value.parent_id) + value.id})
                if (response.status === "success") {
                    fetchData()
                } else toast.error(response.message);
            }
        });
    };


    return (
        <>
            <div className='card mb-5 mb-xl-10'>
                <div className="card-header">
                    <h3 className="card-title">Satış Temsilcileri</h3>
                </div>
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-bordered">
                            <thead>
                            <tr className="fw-bold fs-6 text-gray-800">
                                <th>#</th>
                                <th>İsim</th>
                                <th>Soyisim</th>
                                <th>Telefon</th>
                                <th>E-Posta</th>
                                <th>Durum</th>
                                <th>Yönetim</th>
                            </tr>
                            </thead>
                            <tbody>
                            {data && data.map((value, key) => {
                                return (
                                    <tr key={key}>
                                        <td>{value.id}</td>
                                        <td>{value.name}</td>
                                        <td>{value.surname}</td>
                                        <td>{value.phone}</td>
                                        <td>{value.email}</td>
                                        <td>{value.status === 0 ? <span className="badge badge-danger">Pasif</span> :
                                            <span className="badge badge-success">Aktif</span>}</td>
                                        <td>
                                            <button
                                                className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
                                                onClick={() => handleEdit(value)}  // edit işlemi için fonksiyon
                                            >
                                                <i className="ki-solid ki-pencil fs-6"></i>
                                            </button>
                                            <button
                                                className="btn btn-icon btn-bg-light btn-active-color-danger btn-sm me-1"
                                                onClick={() => handleDelete(value)}  // edit işlemi için fonksiyon
                                            >
                                                <i className="ki-solid ki-trash fs-6"></i>
                                            </button>

                                        </td>
                                    </tr>
                                )
                            })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <ModalComponent
                isOpen={isModalOpen}
                closeModal={closeModal}
                title={'Düzenle'}
            >
                {<Form fetchData={fetchData} closeModal={closeModal} formData={editData}/>}
            </ModalComponent>
        </>
    );
};

export {CompanyProfileSaleRepresentativesTab};
