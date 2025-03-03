import React, {useState, useMemo, useEffect} from "react";
import axios from "axios";
import {GET_PROVINCES, PROVINCE_CREATE, PROVINCE_DELETE, PROVINCE_UPDATE} from "../../api/paths/index.jsx";
import {useDispatch} from "react-redux";
import {showLoading, hideLoading} from "../../redux/slice/LoadingSlice.tsx";
import {TITLE} from "../../helpers/HelmetHelpers.jsx";
import {ToolbarWrapper} from "../../../_metronic/layout/components/toolbar/index.ts";
import {Content} from "../../../_metronic/layout/components/content/index.ts";
import {PageTitle} from "../../../_metronic/layout/core/index.ts";
import Swal from 'sweetalert2'

import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from '@tanstack/react-table'
import ModalComponent from "../../components/Modal.jsx";
import {useForm} from "react-hook-form";
import {apiRequest, useDynamicMutation} from "../../api/endpoints/index.jsx";
import {toast} from "react-toastify";
import Pagination from "../../components/Pagination.jsx";

const Form = ({formData, closeModal, fetchData, mode}) => {
    const {
        register,
        handleSubmit,
        formState: {errors},
        reset,
    } = useForm({
        defaultValues: formData,
    });

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
                url: mode ? PROVINCE_CREATE : PROVINCE_UPDATE,
                data: formDataToSend,
            },
            {
                onSuccess: (response) => {
                    if (response.status === "success") {
                        closeModal();
                        fetchData();

                        toast.success(response.message);
                    } else toast.error(response.message);
                },
                onError: (error) => {
                    toast.error("Bir sorun oluştu");
                    console.error("Error:", error);
                },
            }
        );
    };

    // Formun başlangıçta gelen `formData` ile doldurulması
    React.useEffect(() => {
        reset(formData); // Gelen formData'yı reset ile forma yüklüyoruz
    }, [formData, reset]);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
                <label htmlFor="title" className="form-label">Başlık</label>
                <input
                    type="text" // "email" yerine "text" kullanıldı
                    className="form-control"
                    maxLength={255}
                    {...register("name", {required: true})}
                />
                {errors.name && (
                    <span className="mt-5 text-danger">Bu alan zorunludur.</span>
                )}
            </div>
            <div className="mb-3">
                <label htmlFor="title" className="form-label">Plaka Numarası</label>
                <input
                    type="number" // "email" yerine "text" kullanıldı
                    className="form-control"
                    maxLength={255}
                    {...register("plate_number", {required: true})}
                />
                {errors.name && (
                    <span className="mt-5 text-danger">Bu alan zorunludur.</span>
                )}
            </div>
            <div className="mb-3">
                <label htmlFor="title" className="form-label">Kordinatları <small>(Virgül ile ayırın.)</small></label>
                <input
                    type="text" // "email" yerine "text" kullanıldı
                    className="form-control"
                    maxLength={255}
                    {...register("coordinates", {required: true})}
                />
                {errors.name && (
                    <span className="mt-5 text-danger">Bu alan zorunludur.</span>
                )}
            </div>
            <div className="mb-3 text-center">
                <button type="submit" className="btn btn-primary">Kaydet</button>
            </div>
        </form>
    );
};
const Provinces = () => {
    const columnHelper = createColumnHelper()

    const [data, setData] = useState([]);
    const [editData, setEditData] = useState([]);
    const createData = {
        title: null,
        plate_number: null,
        coordinates: null,
    }
    const [loading, setLoading] = useState(true);
    const [pageIndex, setPageIndex] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [sorting, setSorting] = useState([]);
    const [search, setSearch] = useState('');
    const [modalMode, setModalMode] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = (mode) => {
        setModalMode(mode);
        setIsModalOpen(true);
    };
    const closeModal = () => setIsModalOpen(false);
    const dispatch = useDispatch();

    const fetchData = async (reset = false) => {
        try {
            if (search.length > 1 || reset) {
                console.log(search.length)
                console.log(search.length)
                setCurrentPage(1)
            }
            setLoading(true);
            const response = await axios.get(GET_PROVINCES, {
                params: {
                    page: currentPage,
                    perPage: pageSize,
                    sortBy: sorting[0]?.id, // Sıralama yapılacak kolon
                    sortOrder: sorting[0]?.desc ? 'desc' : 'asc', // Sıralama yönü
                    search, // Arama terimi
                },
            });
            setData(response.data);
            setLastPage(response.data.last_page);
            setLoading(false);
        } catch (err) {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [pageIndex, pageSize, sorting, search, currentPage]);


    useEffect(() => {
        if (loading) {
            dispatch(showLoading());
        } else {
            dispatch(hideLoading());
        }
    }, [loading, dispatch]);

    const handlePageChange = (page) => {
        if (page >= 1 && page <= lastPage) {
            setCurrentPage(page);
        }
    };

    const handleEdit = (row) => {
        setEditData(row)
        openModal(0)
        console.log("Edit:", row);
    };

    const handleDelete = (id) => {
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
                const response = await apiRequest({url: PROVINCE_DELETE + id})
                if (response.status === "success") {
                    await fetchData(true);
                    toast.success(response.message);
                } else toast.error(response.message);
            }
        });
        console.log("Delete:", id);
    };

    const columns = useMemo(() => [
        columnHelper.accessor('id', {
            header: () => '#',
            cell: info => info.renderValue(),
            footer: info => info.column.id,
        }),
        columnHelper.accessor('name', {
            header: () => 'Başlık',
            cell: info => info.getValue(),
            footer: info => info.column.id,
        }),
        columnHelper.accessor('control', {
            header: () => (
                <div className="float-end">
                    Yönetim
                </div>
            ),
            cell: info => (
                <div className="float-end">
                    <button
                        className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
                        onClick={() => handleEdit(info.row.original)}  // edit işlemi için fonksiyon
                    >
                        <i className="ki-solid ki-pencil fs-6"></i>
                    </button>
                    <button
                        className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
                        onClick={() => handleDelete(info.row.original.id)}  // delete işlemi için fonksiyon
                    >
                        <i className="ki-solid ki-trash fs-6"></i>
                    </button>
                </div>
            ),
            footer: info => info.column.id,  // Bu kısmı footer için kullanabilirsiniz.
        })
    ], []);

    const table = useReactTable({
        data: data?.data || [],
        columns,
        getCoreRowModel: getCoreRowModel(),
        pageCount: data?.last_page || 0,
        state: {
            pagination: {pageIndex, pageSize},
            sorting, // Sıralama durumu
        },
        manualFiltering: true,

        onSortingChange: setSorting, // Sorting işlevi
    });


    return (
        <>
            <TITLE title={'İl Listesi'}/>
            <PageTitle breadcrumbs={[]}>İl Listesi</PageTitle>
            <ToolbarWrapper/>
            <Content>
                <div className='card card-custom'>
                    <div className="card-body">
                        <div className="justify-content-between d-flex"
                             style={{marginBottom: "1rem", padding: "0.5rem"}}>
                            <input
                                type="text"
                                className="form-control form-control-solid form-sm"
                                placeholder="Ara..."
                                style={{width: '20%'}}
                                value={search}
                                onChange={(e) => setSearch(e.target.value)} // Arama değişimi
                            />
                            <button className="btn btn-success btn-sm" onClick={() => openModal(1)}>
                                <i className="ki-solid ki-plus-square fs-6"></i>
                                Yeni Veri
                            </button>
                        </div>

                        <div className="table-responsive">
                            <table className="table table-hover table-rounded table-striped border gy-7 gs-7">
                                <thead>
                                {table.getHeaderGroups().map(headerGroup => (
                                    <tr
                                        className="fw-bold fs-6 text-gray-800 border-bottom border-gray-200"
                                        key={headerGroup.id}>
                                        {headerGroup.headers.map(header => (
                                            <th
                                                className="fw-bold fs-6 text-gray-800 border-bottom border-gray-200"
                                                key={header.id}
                                                onClick={header.column.getToggleSortingHandler()} // Sorting işlevi
                                            >
                                                {header.isPlaceholder
                                                    ? null
                                                    : flexRender(
                                                        header.column.columnDef.header,
                                                        header.getContext()
                                                    )}
                                            </th>
                                        ))}
                                    </tr>
                                ))}
                                </thead>


                                <tbody>
                                {loading ? (
                                    <tr>
                                        <td colSpan={columns.length}>Loading...</td>
                                    </tr>
                                ) : data.data && data.data.length > 0 ? (
                                    table.getRowModel().rows.map(row => (
                                        <tr key={row.id}>
                                            {row.getVisibleCells().map(cell => (
                                                <td key={cell.id}>
                                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                </td>
                                            ))}
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={columns.length}>Veri bulunamadı.</td>
                                    </tr>
                                )}
                                </tbody>


                            </table>
                        </div>

                        <Pagination
                            currentPage={currentPage}
                            pageSize={pageSize}
                            setPageSize={setPageSize}
                            lastPage={lastPage}
                            onPageChange={handlePageChange}
                        />


                    </div>
                </div>
            </Content>
            <ModalComponent
                isOpen={isModalOpen}
                closeModal={closeModal}
                title={modalMode === 1 ? 'Yeni Kayıt' : 'Düzenle'}
            >
                {<Form mode={modalMode} fetchData={fetchData} closeModal={closeModal} formData={modalMode === 0 ? editData : createData}/>}
            </ModalComponent>
        </>
    );
};

export {Provinces};
