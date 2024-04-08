'use client'
import React,  { useState }from 'react';
import '../app/globals.css';
import { useTable,useGlobalFilter } from 'react-table';
import Button from './Button';



function ChronicDiseaseTable() {
    const [data, setData]= useState([
        
            {
                id:1,
                disease: 'diabetes',
                blogName: 'diabetes management',
                blogLink: 'https://example.com/diabetes-management',
            },
            {
                id:2,
                disease: 'hypertension',
                blogName: 'Miraculous cure for high blood pressure',
                blogLink: 'https://example.com/hypertension',
            },
            {
                id:3,
                disease: 'hypertension',
                blogName: 'Miraculous cure for high blood pressure',
                blogLink: 'https://example.com/hypertension',
            },{
                id:4,
                disease: 'hypertension',
                blogName: 'Miraculous cure for high blood pressure',
                blogLink: 'https://example.com/hypertension',
            }
    ]);

    const [addingEntry, setAddingEntry] = useState(false);
    const [newEntry, setNewEntry] = useState({ id: null, disease: '', blogName: '', blogLink: '' });

    const columns = React.useMemo(
        () => [
            {
                Header: 'chronic',
                accessor: 'disease', 
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
            {
                Header: 'Actions',
                id: 'actions', // Adding an ID for actions column
                Cell: ({ row }) => (
                    <div>
                        {/* <Button onClick={() => editRow(row.original)}>Edit</Button> */}
                        <Button onClick={() => deleteRow(row.original.id)}>Delete</Button>
                    </div>
                ),
            },
        ],
        []
    );
    //Handling delete
    const deleteRow = (id) => {
        const updatedData = data.filter((item) => item.id !== id);
        setData(updatedData);
    };

    const addRow = () => {
        setAddingEntry(true);
    };

    const saveNewEntry = () => {
        const newId = data.length ? data[data.length - 1].id + 1 : 1;
        setData([...data, { ...newEntry, id: newId }]);
        setAddingEntry(false);
        setNewEntry({ disease: '', blogName: '', blogLink: '' }); //重置新条目
    };

    
   


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
            
            <Button onClick={addRow}>Add New Entry</Button>
        
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

{addingEntry && (
                        <tr>
                            <td><input value={newEntry.disease} onChange={(e) => setNewEntry({ ...newEntry, disease: e.target.value })} placeholder="Disease" /></td>
                            <td><input value={newEntry.blogName} onChange={(e) => setNewEntry({ ...newEntry, blogName: e.target.value })} placeholder="Blog Name" /></td>
                            <td><input value={newEntry.blogLink} onChange={(e) => setNewEntry({ ...newEntry, blogLink: e.target.value })} placeholder="Blog Link" /></td>
                            <td><Button onClick={saveNewEntry}>Save</Button></td>
                        </tr>
                    )}
            </tbody>
        </table>
    );
}

export default ChronicDiseaseTable;
