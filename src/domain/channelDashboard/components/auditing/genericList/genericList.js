import './genericList.scss';
import React, { useState } from 'react';
import { Table } from 'antd';


const GenericList = (props) => {
    const {
        columns,
        rows
    } = props;

    const [selectedRowIndex, setSelectedRowIndex] = useState(0);

    const onSelectedRow = (rowIndex) => {
        setSelectedRowIndex(rowIndex);
    };

    return (
        <div className='generic-list-wrapper'>
            <div className='list'>
                <Table
                    className='audit-table'
                    columns={columns}
                    dataSource={rows}
                    size='small'
                    pagination={false}
                    tableLayout='auto'
                    scroll={{ y: 200 }}
                    
                    onRow={(record, rowIndex) => {
                        if (selectedRowIndex === rowIndex) {
                            return { className: "selected-row" }
                        }
                        return {
                            onClick: () => onSelectedRow(rowIndex)
                        };
                    }}
                />
            </div>
            <div className='row-data'>
                <p>{rows[selectedRowIndex].data}</p>
            </div>
        </div>
    );
}

export default GenericList;