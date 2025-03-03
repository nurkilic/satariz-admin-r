import React from "react";
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table";

const DataTable = ({ columns, data, pagination, onPageChange, totalPages }) => {
    const table = useReactTable({
        data,
        columns,
        pageCount: pagination ? totalPages : undefined,
        getCoreRowModel: getCoreRowModel(),
        manualPagination: !!pagination, // Pagination kontrolü manuel olarak yapılır
    });

    return (
        <div>
            <table className="table">
                <thead>
                {table.getHeaderGroups().map((headerGroup) => (
                    <tr key={headerGroup.id}>
                        {headerGroup.headers.map((header) => (
                            <th key={header.id}>
                                {header.isPlaceholder
                                    ? null
                                    : flexRender(header.column.columnDef.header, header.getContext())}
                            </th>
                        ))}
                    </tr>
                ))}
                </thead>
                <tbody>
                {table.getRowModel().rows.map((row) => (
                    <tr key={row.id}>
                        {row.getVisibleCells().map((cell) => (
                            <td key={cell.id}>
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </td>
                        ))}
                    </tr>
                ))}
                </tbody>
            </table>

            {pagination && (
                <div className="pagination">
                    <button
                        onClick={() => onPageChange(pagination.currentPage - 1)}
                        disabled={pagination.currentPage === 1}
                    >
                        Önceki
                    </button>
                    <button
                        onClick={() => onPageChange(pagination.currentPage + 1)}
                        disabled={pagination.currentPage === totalPages}
                    >
                        Sonraki
                    </button>
                </div>
            )}
        </div>
    );
};

export default DataTable;
