"use client"
import React, { useState, useEffect } from 'react';
import { useTable, useFilters, useGlobalFilter, useAsyncDebounce, useSortBy, usePagination } from 'react-table';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import '../app/tailwind.css';
import Button from './Button';

import useSWR from "swr";

const getFetcher = (...args) =>
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

// const toggleFetcher = (email) =>
//     fetch(
//         email,
//         {
//             method: "POST",
//             headers: {
//                 Accept: "application/json",
//                 "Content-Type": "application/json",
//             },
//             body: { email: email }
//         },

//         { next: { revalidate: 3600 } }
//     ).then((res) => res.json());



// 定义全局过滤器组件
function GlobalFilter({
    preGlobalFilteredRows,
    globalFilter,
    setGlobalFilter,
}) {
    const count = preGlobalFilteredRows.length;
    const [value, setValue] = React.useState(globalFilter);
    const debounceTimeoutRef = React.useRef(null); // 用于存储 setTimeout 的引用

    const onChange = (value) => {
        // 清除上一个 setTimeout（如果有）
        if (debounceTimeoutRef.current) {
            clearTimeout(debounceTimeoutRef.current);
        }
        // 设置新的 setTimeout
        debounceTimeoutRef.current = setTimeout(() => {
            setGlobalFilter(value || undefined);
        }, 200); // 200ms 后执行 setGlobalFilter
    };

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

const toggleIsAdminForSelectedRows = (selectedEmails, tableData) => {
    if (selectedEmails == null || selectedEmails.size === 0) {
        alert("Please select the person whose permissions you want to change.");
        return; // 直接返回，不执行任何更改
    }
    // 获取被选中的用户名称，假设每个 row.original 都有一个 name 字段
    const selectedNames = tableData
        .filter(row => selectedEmails.has(row.email))
        .map(row => row.forename + " " + row.surname) // 假设用户的姓名由 forename 和 surname 字段组成
        .join(", ");

    // 弹出确认对话框
    const isConfirmed = confirm(`Are you sure you want to change the permissions of ${selectedNames} `);

    // 如果用户点击了确定
    if (isConfirmed) {
        /* There is always going to be an email. */
        // console.log(selectedEmails.entries())
        selectedEmails.forEach((email) => {
            // console.log(email);
            useSWR("/api/updateUserData", getFetcher(email));

        })
        // for (let index = 0; index < selectedEmails.length; index++) {
        //     useSWR("/api/updateUserData", getFetcher(selectedEmails[index].row.email));

        // }

        // setData(newData); // 更新状态以反映更改
    }

};


// 定义表格组件
function Table({ columns, data, toggleIsAdminForSelectedRows, selectedRowEmails, toggleRowSelected }) {
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
    } = useTable(
        {
            columns,
            data,
            defaultColumn,
            initialState: { pageIndex: 0, pageSize: 5 },
        },
        useFilters,
        useGlobalFilter,
        useSortBy,
        usePagination

    );

    // const [selectedEmail, setSelectedEmail] = useState(null);
    // const handleRowClick = (email) => {
    //     setSelectedEmail(prev => {
    //         const newSet = new Set(prev);
    //         if (newSet.has(email)) {
    //             newSet.delete(email);
    //         } else {
    //             newSet.add(email);
    //         }
    //         return newSet;
    //     });
    // };


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
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" {...column.getHeaderProps(column.getSortByToggleProps())}>
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
                <tbody  {...getTableBodyProps()} className="bg-white divide-y divide-gray-200">
                    {page.map(row => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()} className="hover:bg-gray-50">
                                {row.cells.map(cell => {
                                    return (
                                        <td {...cell.getCellProps()}>
                                            {cell.column.id === 'selection' ? (
                                                <input
                                                    type="checkbox"
                                                    checked={selectedRowEmails.has(row.original.email)}
                                                    onChange={() => toggleRowSelected(row.original.email)}
                                                />
                                            ) : (
                                                cell.render('Cell')
                                            )}
                                        </td>
                                    );
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <div className="flex justify-end">
            <Button onClick={async () => {
                const emailUpdates = Array.from(selectedRowEmails).map(email =>
                    fetch("../api/updateUserData", {
                    method: "POST",
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ email })
                    }).then(res => res.json())
                );

                Promise.all(emailUpdates)
                    .then(responses => {
                    // 处理所有响应，例如更新状态或重新获取数据
                    console.log("All updates successful", responses);
                    // 可能需要调用setData或类似的函数来更新UI
                    })
                    .catch(error => {
                    console.error("Error updating user data", error);
                    });
                }} className="mt-4">Toggle Is Admin for Selected</Button>

            </div>
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

        </div>
    );
}

function FilterTableComponent() {
    // 添加数据状态和设置函数
    const { data: swrData, error } = useSWR("/api/selectAllUsers", getFetcher);
    const [data, setData] = useState([]);
    const [selectedRowEmails, setSelectedRowEmails] = React.useState(new Set());

    // 当 SWR 数据加载完成时更新组件状态
    useEffect(() => {
        if (swrData) setData(swrData);
    }, [swrData]);

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
                        Cell: ({ cell }) => cell.value ? 'True' : 'False',
                    },
                ],
            },
        ],
        [selectedRowEmails]
    );





    // const { data, error } = useSWR("/api/selectAllUsers", fetcher);

    if (error) {
        return <div>Failed to load user data. </div>;
    }
    if (!data) {
        return <div className="">Loading...</div>;
    }

    if (data) {
        return (
            <Table columns={columns} data={data} toggleIsAdminForSelectedRows={toggleIsAdminForSelectedRows} selectedRowEmails={selectedRowEmails} toggleRowSelected={toggleRowSelected} />

        );
    }


}

export default FilterTableComponent;