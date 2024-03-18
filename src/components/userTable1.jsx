"use client"
import React, { useState } from 'react';
import {
    useReactTable,
     getCoreRowModel,
     getPaginationRowModel,
     getSortedRowModel
   } from '@tanstack/react-table';
// import 'bootstrap/dist/css/bootstrap.min.css';
import '../app/tailwind.css';


import useSWR from "swr";

const fetcher = (...args) =>
    fetch(
        ...args,
        {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        },
        { next: { revalidate: 3600 } }
    ).then((res) => res.json());



// 定义全局过滤器组件
function GlobalFilter({
    preGlobalFilteredRows,
    globalFilter,
    setGlobalFilter,
}) {
    const count = preGlobalFilteredRows.length;
    const [value, setValue] = React.useState(globalFilter);
    const onChange = useAsyncDebounce(value => {
        setGlobalFilter(value || undefined);
    }, 200);

    return (
        <span>
            Search:{' '}
            <input
                className="form-control"
                value={value || ""}
                onChange={e => {
                    setValue(e.target.value);
                    onChange(e.target.value);
                }}
                placeholder={`${count} records...`}
            />
        </span>
    );
}

// 定义默认列过滤器组件
// function DefaultColumnFilter({
//     column: { filterValue, preFilteredRows, setFilter },
// }) {
//     const count = preFilteredRows.length;

//     return (
//         <input
//             className="form-control"
//             value={filterValue || ''}
//             onChange={e => {
//                 setFilter(e.target.value || undefined);
//             }}
//             placeholder={`Search ${count} records...`}
//         />
//     );
// }

// 定义表格组件
function Table({ columns, data }) {
    const defaultColumn = React.useMemo(
        () => ({
            // 默认的列过滤器 UI
            Filter: undefined,
        }),
        []
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        state,
        preGlobalFilteredRows,
        setGlobalFilter,
        page,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state: { pageIndex, pageSize },
    } = useReactTable(
        {
            columns,
            data,
            defaultColumn,
            initialState: { pageIndex: 0, pageSize: 5 },
        },
        useGlobalFilter,
        useSortBy,
        usePagination

    );
    
    const [selectedEmail, setSelectedEmail] = useState(null);
    const handleRowClick = (email) => {
        setSelectedEmail(email);
      };


      return (
        <div>
            <GlobalFilter
                preGlobalFilteredRows={preGlobalFilteredRows}
                globalFilter={state.globalFilter}
                setGlobalFilter={setGlobalFilter}
            />
            

            <pre>
                {/* <code>
                    {JSON.stringify(
                        {
                            pageIndex,
                            pageSize,
                            pageCount,
                            canNextPage,
                            canPreviousPage,
                        },
                        null,
                        2
                    )}
                </code> */}
            </pre>

            <table className="min-w-full divide-y divide-gray-200" {...getTableProps()}>
                <thead className="bg-gray-50">
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" {...column.getHeaderProps(column.getSortByToggleProps())}>
                                    {column.render('Header')}
                                    {/* 渲染列过滤器 UI */}
                                    <span>
                                        {column.isSorted
                                            ? column.isSortedDesc
                                                ? ' 🔽'
                                                : ' 🔼'
                                            : ''}
                                    </span>
                                    {/* <div>{column.canFilter ? column.render('Filter') : null}</div> */}

                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody className="bg-white divide-y divide-gray-200" {...getTableBodyProps()}>
                    {page.map((row, i) => {
                        prepareRow(row);
                        const isSelected = row.original.email === selectedEmail; // 使用邮箱地址判断行是否被选中
                        return (
                            <tr {...row.getRowProps()} onClick={() => handleRowClick(row.original.email)}
                            className={`${isSelected ? "bg-blue-100" : ""}`} // 如果行被选中，应用不同的背景色
                        >
                                {row.cells.map(cell => {
                                    return <td className="px-6 py-4 whitespace-nowrap" key={cell.id}>
                                     {flexRender(
                                         cell.column.columnDef.cell,
                                         cell.getContext()
                                       )}</td>;
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <ul className="flex justify-center items-center space-x-2 my-4">
            <li className="flex" onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                <a className="px-4 py-2 border rounded text-blue-500 hover:bg-blue-500 hover:text-white transition-colors cursor-pointer">First</a>
            </li>
            {/* Other pagination items */}
            <li className="flex" onClick={() => previousPage()} disabled={!canPreviousPage}>
                <a className="px-4 py-2 border rounded text-blue-500 hover:bg-blue-500 hover:text-white transition-colors cursor-pointer">{'<'}</a>
            </li>
            <li className="flex" onClick={() => nextPage()} disabled={!canNextPage}>
                <a className="px-4 py-2 border rounded text-blue-500 hover:bg-blue-500 hover:text-white transition-colors cursor-pointer">{'>'}</a>
            </li>
            <li className="flex" onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                <a className="px-4 py-2 border rounded text-blue-500 hover:bg-blue-500 hover:text-white transition-colors cursor-pointer">Last</a>
            </li>
            <li>
                <span className="px-4 py-2 border rounded text-blue-500">
                    Page <strong>{pageIndex + 1} of {pageOptions.length}</strong>
                </span>
            </li>
            <li>
                <input
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    type="number"
                    defaultValue={pageIndex + 1}
                    onChange={e => {
                        const page = e.target.value ? Number(e.target.value) - 1 : 0
                        gotoPage(page)
                    }}
                    style={{ width: '100px', height: '20px' }}
                />
            </li>
            <select
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={pageSize}
                onChange={e => {
                    setPageSize(Number(e.target.value))
                }}
                style={{ width: '120px', height: '38px' }}
            >
                {[5, 10, 20, 30, 40, 50].map(pageSize => (
                    <option key={pageSize} value={pageSize}>
                        Show {pageSize}
                    </option>
                ))}
            </select>
        </ul>


            <br />
            {/* <div>Showing the first 20 results of {rows.length} rows</div>
            <div>
                <pre>
                    <code>{JSON.stringify(state.filters, null, 2)}</code>
                </pre>
            </div> */}
        </div>
    );
        }

        function FilterTableComponent() {
            const [selectedRowEmails, setSelectedRowEmails] = React.useState(new Set());
            const toggleRowSelected = (email) => {
                setSelectedRowEmails(prev => {
                    const newSet = new Set(prev);
                    if (newSet.has(email)) {
                        newSet.delete(email);
                    } else {
                        newSet.add(email);
                    }
                    return newSet;
                });
            };
            
            const columns = React.useMemo(
                () => [
                    {
                        Header: '', // 选择框列不需要标题
                        id: 'selection', // 为选择框列指定一个id
                        Cell: ({ row }) => (
                            <input
                                type="checkbox"
                                checked={selectedRowEmails.has(row.original.email)} // 检查当前行是否被选中
                                onChange={() => toggleRowSelected(row.original.email)} // 切换行选中状态
                            />
                        )
                    },
                    {
                        Header: 'Name',
                        columns: [
                            {
                                Header: 'Forename',
                                accessor: 'forename',
                            },
                            {
                                Header: 'Surname',
                                accessor: 'surname',
                            },
                        ],
                    },
                    {
                        Header: 'Info',
                        columns: [
                            {
                                Header: 'Email',
                                accessor: 'email',
                            },
                            {
                                Header: 'DoB',
                                accessor: 'dob',
                                // 格式化日期的单元格渲染方法
                                Cell: ({ cell }) => {
                                    // 将ISO日期字符串转换为 Date 对象
                                    const date = new Date(cell.value);
                                    // 使用 Intl.DateTimeFormat API 格式化日期
                                    const formattedDate = new Intl.DateTimeFormat('en-GB').format(date);
                                    return formattedDate; // 返回格式化后的日期字符串
                                },
                            },
                            {
                                Header: 'Gender',
                                accessor: 'gender',
                            },
                            {
                                Header: 'Is Admin',
                                accessor: 'is_admin',
                                Cell: ({ cell }) => cell.value ? 'Yes' : 'No', // 根据布尔值显示 "Yes" 或 "No"
                            },
                        ],
                    },
                ],
                [selectedRowEmails]
            );
            const { data, error } = useSWR("/api/selectAllUsers", fetcher);
        
            if (error) {
                return <div>Failed to load user data. </div>;
            }
            if (!data) {
                return <div className="">Loading...</div>;
            }
        
            if (data) {
                return (
                    <Table columns={columns} data={data} selectedRowEmails={selectedRowEmails} toggleRowSelected={toggleRowSelected} />
        
                );
            }


}

export default FilterTableComponent;