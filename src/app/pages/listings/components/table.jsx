import React, {useState, useEffect, useMemo} from "react";
import {KTIcon} from "../../../../_metronic/helpers/index.ts";
import {createColumnHelper, flexRender, getCoreRowModel, useReactTable} from "@tanstack/react-table";
import Pagination from "../../../components/Pagination.jsx";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {apiRequest} from "../../../api/endpoints/index.jsx";
import {GET_COMPANIES, GET_LISTINGS} from "../../../api/paths/index.jsx";
import {hideLoading, showLoading} from "../../../redux/slice/LoadingSlice.tsx";

const ListingTable = ({otherFilters = {}}) => {
    const columnHelper = createColumnHelper()

    const [data, setData] = useState([]);
    const [filterData, setFilterData] = useState({
        category_id: -1,
        status: 'all',
        listing_number: null,
    });
    const [loading, setLoading] = useState(true);
    const [pageSize, setPageSize] = useState(10);
    const [sorting, setSorting] = useState([]);
    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const debounceTimeout = React.useRef(null); // useRef ile zamanlayıcıyı tutuyoruz
    const navigate = useNavigate();  // useNavigate hook'unu kullanarak yönlendirme işlemi


    const dispatch = useDispatch();

    const fetchData = async (reset = false) => {
        try {
            if (search.length > 1 || reset) {
                console.log(search.length)
                console.log(search.length)
                setCurrentPage(1)
            }
            setLoading(true);
            const response = await apiRequest({
                url: GET_LISTINGS, method: 'GET', data: {
                    page: currentPage,
                    perPage: pageSize,
                    sortBy: sorting[0]?.id, // Sıralama yapılacak kolon
                    sortOrder: sorting[0]?.desc ? 'desc' : 'asc', // Sıralama yönü
                    search,
                    filters: filterData,
                    ...otherFilters
                },
            })

            setData(response.data);
            setLastPage(response.data.last_page);
            setLoading(false);
        } catch (err) {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [pageSize, sorting, currentPage]);


    useEffect(() => {
        if (debounceTimeout.current) {
            clearTimeout(debounceTimeout.current);
        }

        debounceTimeout.current = setTimeout(() => {
            fetchData();
        }, 500); // 500 ms bekleme süresi

        return () => {
            if (debounceTimeout.current) {
                clearTimeout(debounceTimeout.current);
            }
        };
    }, [search]);


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
        navigate(`/companies/profile/${row}`);  // Düzenleme sayfasına yönlendirme
    };

    const columns = useMemo(() => [
        columnHelper.accessor('listing_number', {
            header: () => 'İlan Numarası',

        }),
        columnHelper.accessor('corporate', {
            header: () => 'Üye',
            cell: info => {
                return info.row.original?.corporate?.store_name ?? (info.row.original?.user?.name + ' ' + info.row.original?.user?.surname);  // "name" özelliği
            },
            enableSorting: false,
        }),

        columnHelper.accessor('category_parents', {
            header: () => 'Kategori',
            cell: info => {
                return info.row.original?.category_parents[0].title + '/' + info.row.original?.category_parents[1].title;  // "name" özelliği
            },
            enableSorting: false,
        }),
        columnHelper.accessor('title', {
            header: () => 'İlan Başlığı',
            cell: info => info.getValue(),
        }),
        columnHelper.accessor('price', {
            header: () => 'İlan Fiyatı',
            cell: info => info.getValue().price,
        }),
        columnHelper.accessor('province', {
            header: () => 'İl/İlçe/Mahalle',
            cell: info => {
                return info.row.original?.province.name + '/' + info.row.original?.district.name + '/' + info.row.original?.neighbourhood.name;  // "name" özelliği
            },
            enableSorting: false,
        }),
        columnHelper.accessor('status', {
            header: () => 'Durum',
            cell: info => {
                if (info.row.original?.status === 'inactive')
                    return (<span className="badge badge-danger">Pasif</span>)
                else if (info.row.original?.status === 'active')
                    return (<span className="badge badge-success">Aktif</span>)
                else if (info.row.original?.status === 'awaiting_approval')
                    return (<span className="badge badge-warning">Onay Bekliyor</span>)
                else if (info.row.original?.status === 'sold')
                    return (<span className="badge badge-primary">Başarıya Ulaşmış <small>(Satılmış, Kiralanmış)</small></span>)
                else
                    return (<span className="badge badge-danger">Başarıya Ulaşmış <small>(Satılmış, Kiralanmış)</small></span>)

            },
            enableSorting: false,
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
                        onClick={() => handleEdit(info.row.original.id)}  // edit işlemi için fonksiyon
                    >
                        <i className="ki-solid ki-eye fs-6"></i>
                    </button>
                </div>
            ),
            enableSorting: false,
            footer: info => info.column.id,  // Bu kısmı footer için kullanabilirsiniz.
        })
    ], []);

    const table = useReactTable({
        data: data?.data || [],
        columns,
        getCoreRowModel: getCoreRowModel(),
        pageCount: data?.last_page || 0,
        state: {
            pagination: {pageSize},
            sorting,
        },
        manualFiltering: true,

        onSortingChange: setSorting, // Sorting işlevi
    });
    return (
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
                    {/* begin::Filter Button */}
                    <button
                        disabled={loading}
                        type='button'
                        className='btn btn-light-primary me-3'
                        data-kt-menu-trigger='click'
                        data-kt-menu-placement='bottom-end'
                    >
                        <KTIcon iconName='filter' className='fs-2'/>
                        Filtrele
                    </button>
                    {/* end::Filter Button */}
                    {/* begin::SubMenu */}
                    <div className='menu menu-sub menu-sub-dropdown w-300px w-md-325px' data-kt-menu='true'>
                        {/* begin::Header */}
                        <div className='px-7 py-5'>
                            <div className='fs-5 text-gray-900 fw-bolder'>Filtreleme Seçenekleri</div>
                        </div>
                        {/* end::Header */}

                        {/* begin::Separator */}
                        <div className='separator border-gray-200'></div>
                        {/* end::Separator */}

                        {/* begin::Content */}
                        <div className='px-7 py-5' data-kt-user-table-filter='form'>

                            {/* end::Input group */}

                            {/* begin::Input group */}
                            <div className='mb-10'>
                                <label className='form-label fs-6 fw-bold'>Kategori:</label>
                                <select
                                    className='form-select form-select-solid fw-bolder'
                                    data-kt-select2='true'
                                    data-placeholder='Select option'
                                    data-allow-clear='true'
                                    data-kt-user-table-filter='two-step'
                                    data-hide-search='true'
                                    onChange={(e) => setFilterData((prevState) => ({
                                        ...prevState,
                                        category_id: e.target.value
                                    }))}
                                    value={filterData.category_id}
                                >
                                    <option value='-1'>Tümü</option>
                                    <option value='1'>Vasıta</option>
                                    <option value='2'>Emlak</option>
                                </select>
                            </div>
                            <div className='mb-10'>
                                <label className='form-label fs-6 fw-bold'>İlan Numarası:</label>
                                <input type="number" className="form-control form-control-solid fw-bolder"
                                       onChange={(e) => setFilterData((prevState) => ({
                                           ...prevState,
                                           listing_number: e.target.value
                                       }))}
                                />
                            </div>
                            <div className='mb-10'>
                                <label className='form-label fs-6 fw-bold'>İlan Durumu:</label>
                                <select
                                    className='form-select form-select-solid fw-bolder'
                                    data-kt-select2='true'
                                    data-placeholder='Select option'
                                    data-allow-clear='true'
                                    data-kt-user-table-filter='two-step'
                                    data-hide-search='true'
                                    onChange={(e) => setFilterData((prevState) => ({
                                        ...prevState,
                                        status: e.target.value
                                    }))}
                                    value={filterData.status}
                                >
                                    <option value='all'>Tümü</option>
                                    <option value='active'>Aktif</option>
                                    <option value='inactive'>Pasif</option>
                                    <option value='sold'>Başarıya Ulaşmış</option>
                                    <option value='awaiting_approval'>Onay Bekliyor</option>
                                    <option value='removed'>Kaldırılmış</option>
                                </select>
                            </div>
                            {/* end::Input group */}

                            {/* begin::Actions */}
                            <div className='d-flex justify-content-end'>
                                <button
                                    type='button'
                                    disabled={loading}
                                    onClick={() => setFilterData({
                                        category_id: -1,
                                        status: 'all',
                                        listing_number: null,
                                    })}
                                    className='btn btn-light btn-active-light-primary fw-bold me-2 px-6'
                                    data-kt-menu-dismiss='true'
                                    data-kt-user-table-filter='reset'
                                >
                                    Sıfırla
                                </button>
                                <button
                                    disabled={loading}
                                    type='button'
                                    onClick={() => fetchData()}
                                    className='btn btn-primary fw-bold px-6'
                                    data-kt-menu-dismiss='true'
                                    data-kt-user-table-filter='filter'
                                >
                                    Uygula
                                </button>
                            </div>
                            {/* end::Actions */}
                        </div>
                        {/* end::Content */}
                    </div>
                    {/* end::SubMenu */}
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
    )
};

export {ListingTable};
