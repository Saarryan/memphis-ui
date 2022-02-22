import './genericList.scss';
import React from 'react';
import { Table } from 'antd';


const GenericList = (props) => {
    const {
        columns,
        rows
    } = props


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
                />
            </div>
            <div className='separator'></div>
            <div className='row data'>

            </div>
        </div>
    );
}

export default GenericList;