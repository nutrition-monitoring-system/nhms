"use client"
import React from "react";
import { useTable, useFilters, useGlobalFilter, useAsyncDebounce, useSortBy, usePagination } from 'react-table';
import 'bootstrap/dist/css/bootstrap.min.css';

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

            <table className="table" {...getTableProps()}>
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
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
                <tbody {...getTableBodyProps()}>
                    {page.map((row, i) => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map(cell => {
                                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <ul className="pagination" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <li className="page-item" onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                    <a className="page-link">First</a>
                </li>
                <li className="page-item" onClick={() => previousPage()} disabled={!canPreviousPage}>
                    <a className="page-link">{'<'}</a>
                </li>
                <li className="page-item" onClick={() => nextPage()} disabled={!canNextPage}>
                    <a className="page-link">{'>'}</a>
                </li>
                <li className="page-item" onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                    <a className="page-link">Last</a>
                </li>
                <li>
                    <a className="page-link">
                        Page{' '}
                        <strong>
                            {pageIndex + 1} of {pageOptions.length}
                        </strong>{' '}
                    </a>
                </li>
                <li>
                    <a className="page-link">
                        <input
                            className="form-control"
                            type="number"
                            defaultValue={pageIndex + 1}
                            onChange={e => {
                                const page = e.target.value ? Number(e.target.value) - 1 : 0
                                gotoPage(page)
                            }}
                            style={{ width: '100px', height: '20px' }}
                        />
                    </a>
                </li>{' '}
                <select
                    className="form-control"
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
    const columns = React.useMemo(
        () => [
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
        []
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
            <Table columns={columns} data={data} />
        );
    }
    // const data = [
    //     {
    //         "forename": "Yi",
    //         "surname": "Chen",
    //         "email": "example@example.com",
    //         "dob": "1990-01-01",
    //         "gender": "male",
    //         "is_admin": true
    //     },
    //     {
    //         "forename": "John",
    //         "surname": "Jo",
    //         "email": "john@example.com",
    //         "dob": "1985-05-15",
    //         "gender": "female",
    //         "is_admin": false
    //     },
    //     {
    //         "forename": "Marry",
    //         "surname": "Mar",
    //         "email": "example@example.com",
    //         "dob": "1990-01-01",
    //         "gender": "female",
    //         "is_admin": true
    //     },
    //     {
    //         "forename": "Jen",
    //         "surname": "Je",
    //         "email": "example@example.com",
    //         "dob": "1990-01-01",
    //         "gender": "female",
    //         "is_admin": true
    //     },
    //     {
    //         "forename": "2Yi",
    //         "surname": "Chen",
    //         "email": "example@example.com",
    //         "dob": "1990-01-01",
    //         "gender": "male",
    //         "is_admin": true
    //     },
    //     {
    //         "forename": "John",
    //         "surname": "Jo",
    //         "email": "john@example.com",
    //         "dob": "1985-05-15",
    //         "gender": "female",
    //         "is_admin": false
    //     },
    //     {
    //         "forename": "Marry2",
    //         "surname": "Mar",
    //         "email": "example@example.com",
    //         "dob": "1990-01-01",
    //         "gender": "female",
    //         "is_admin": true
    //     },
    //     {
    //         "forename": "Jen222",
    //         "surname": "Je",
    //         "email": "example@example.com",
    //         "dob": "1990-01-01",
    //         "gender": "female",
    //         "is_admin": true
    //     },
    //     {
    //         "forename": "Yi3333",
    //         "surname": "Chen",
    //         "email": "example@example.com",
    //         "dob": "1990-01-01",
    //         "gender": "male",
    //         "is_admin": true
    //     },
    //     {
    //         "forename": "John33",
    //         "surname": "Jo",
    //         "email": "john@example.com",
    //         "dob": "1985-05-15",
    //         "gender": "female",
    //         "is_admin": false
    //     },
    //     {
    //         "forename": "Marry33",
    //         "surname": "Mar",
    //         "email": "example@example.com",
    //         "dob": "1990-01-01",
    //         "gender": "female",
    //         "is_admin": true
    //     },
    //     {
    //         "forename": "Jen22",
    //         "surname": "Je",
    //         "email": "example@example.com",
    //         "dob": "1990-01-01",
    //         "gender": "female",
    //         "is_admin": true
    //     },

    // ];


}

export default FilterTableComponent;