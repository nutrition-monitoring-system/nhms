'use client'
import React from 'react';
import '../app/globals.css';
import { useTable,useGlobalFilter } from 'react-table';



function ChronicDiseaseTable() {
    const data = React.useMemo(
        () => [
            {
                disease: 'diabetes',
                blogName: 'diabetes management',
                blogLink: 'https://example.com/diabetes-management',
            },
            {
                disease: 'hypertension',
                blogName: 'Miraculous cure for high blood pressure',
                blogLink: 'https://example.com/hypertension',
            },
            {
                disease: 'hypertension',
                blogName: 'Miraculous cure for high blood pressure',
                blogLink: 'https://example.com/hypertension',
            },{
                disease: 'hypertension',
                blogName: 'Miraculous cure for high blood pressure',
                blogLink: 'https://example.com/hypertension',
            }
        ],
        []
    );

    const columns = React.useMemo(
        () => [
            {
                Header: 'chronic',
                accessor: 'disease', // 从原始数据中对应的键
            },
            {
                Header: 'Blog name',
                accessor: 'blogName',
            },
            {
                Header: 'Blog link',
                accessor: 'blogLink',
                Cell: ({ value }) => <a href={value} style={{ textDecoration: 'underline', color: 'blue' }}>Visit blog</a>,
            },
        ],
        []
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({ columns, data });

    return (
        <table {...getTableProps()} className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
                {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => (
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"{...column.getHeaderProps()}>{column.render('Header')}</th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()} className="bg-white divide-y divide-gray-200">
                {rows.map(row => {
                    prepareRow(row);
                    return (
                        <tr {...row.getRowProps()}>
                            {row.cells.map(cell => (
                                <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                            ))}
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}

export default ChronicDiseaseTable;
