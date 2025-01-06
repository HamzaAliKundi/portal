import React from 'react';
import { Table } from 'rsuite';

const { Column, HeaderCell, Cell } = Table;

interface UsersTableProps {
    data: any[];
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
    getSequentialNumber: (index: number) => number;
}

const UsersTable: React.FC<UsersTableProps> = ({ data, onEdit, onDelete, getSequentialNumber }) => {
    return (
        <>
            <Table height={525} data={data}>
                <Column width={200} align="center" fixed>
                    <HeaderCell className='font-bold'>ID</HeaderCell>
                    <Cell>
                        {(_, index) => getSequentialNumber(index ?? 0)}
                    </Cell>
                </Column>

                <Column width={200} fixed>
                    <HeaderCell className='font-bold'>First Name</HeaderCell>
                    <Cell dataKey="name" />
                </Column>

                <Column width={100} flexGrow={1}>
                    <HeaderCell className='font-bold'>Email</HeaderCell>
                    <Cell dataKey="email" />
                </Column>

                <Column width={300}>
                    <HeaderCell className='font-bold'>Phone</HeaderCell>
                    <Cell dataKey="phoneNumber" />
                </Column>

                <Column width={300}>
                    <HeaderCell className='font-bold'>Role</HeaderCell>
                    <Cell>
                        {rowData => rowData.role?.title || 'N/A'}
                    </Cell>
                </Column>

                <Column width={200}>
                    <HeaderCell className='font-bold'>Actions</HeaderCell>
                    <Cell>
                        {rowData => (
                            <div>
                                <span
                                    className='text-blue-600 font-bold cursor-pointer mr-1'
                                    onClick={() => onEdit(rowData._id)}
                                >
                                    Edit
                                </span>
                                /
                                <span
                                    className='text-red-600 font-bold cursor-pointer ml-1'
                                    onClick={() => onDelete(rowData._id)}
                                >
                                    Delete
                                </span>
                            </div>
                        )}
                    </Cell>
                </Column>
            </Table>
        </>
    );
};

export default UsersTable;
