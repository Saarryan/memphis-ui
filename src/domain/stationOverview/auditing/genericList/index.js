import './style.scss';

import React, { useState } from 'react';

import OverflowTip from '../../../../components/tooltip/overflowtip';

const GenericList = (props) => {
    const { columns, rows } = props;

    const [selectedRowIndex, setSelectedRowIndex] = useState(0);

    const onSelectedRow = (rowIndex) => {
        setSelectedRowIndex(rowIndex);
    };

    return (
        <div className="generic-list-wrapper">
            <div className="list">
                <div className="coulmns-table">
                    {columns?.map((column, index) => {
                        return (
                            <span key={index} style={{ width: column.width }}>
                                {column.title}
                            </span>
                        );
                    })}
                </div>
                <div className="rows-wrapper">
                    {rows?.map((row, index) => {
                        return (
                            <div className={selectedRowIndex === index ? 'pubSub-row selected' : 'pubSub-row'} key={index} onClick={() => onSelectedRow(index)}>
                                <OverflowTip text={row.logData || row.publisher} width={'250px'}>
                                    {row.logData || row.publisher}
                                </OverflowTip>
                                <OverflowTip text={row.source || row.subscriber} width={'250px'}>
                                    {row.source || row.subscriber}
                                </OverflowTip>
                                <OverflowTip text={row.date} width={'200px'}>
                                    {row.date}
                                </OverflowTip>
                            </div>
                        );
                    })}
                </div>
            </div>
            <div className="row-data">
                <p>{rows[selectedRowIndex].logData || rows[selectedRowIndex].data}</p>
            </div>
        </div>
    );
};

export default GenericList;
