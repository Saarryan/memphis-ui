import './genericDetails.scss'
import React, { useState } from 'react'
import liveMessagesIcon from '../../../../assets/images/liveMessagesIcon.svg';
import factoryActionIcon from '../../../../assets/images/factoryActionIcon.svg';
import factoryIdleIcon from '../../../../assets/images/factoryIdleIcon.svg';

const GenericDetails = () => {


    return (
        <div className='generic-container'>
            <div className='dashboard-wrapper data-box'>
                <img src={liveMessagesIcon} width={25} height={25} alt="liveMessagesIcon" />
                <div className='data-wrapper'>
                    <p>Live messages</p>
                    <p>100</p>
                </div>
            </div>
            <div className='dashboard-wrapper data-box'>
                <img src={factoryActionIcon} width={25} height={25} alt="liveMessagesIcon" />
                <div className='data-wrapper'>
                    <p>Live messages</p>
                    <p>100</p>
                </div>
            </div>
            <div className='dashboard-wrapper data-box'>
                <img src={factoryIdleIcon} width={25} height={25} alt="liveMessagesIcon" />
                <div className='data-wrapper'>
                    <p>Live messages</p>
                    <p>100</p>
                </div>
            </div>
        </div>
    );
}

export default GenericDetails;