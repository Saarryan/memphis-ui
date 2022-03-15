import './genericDetails.scss'
import React, { useState } from 'react'
import liveMessagesIcon from '../../../../assets/images/liveMessagesIcon.svg';
import factoryActionIcon from '../../../../assets/images/factoryActionIcon.svg';
import factoryIdleIcon from '../../../../assets/images/factoryIdleIcon.svg';

const GenericDetails = () => {


    return (
        <div className='generic-container'>
            <div className='dashboard-wrapper data-box'>
                <img src={liveMessagesIcon} width={45} height={45} alt="liveMessagesIcon" />
                <div className='data-wrapper'>
                    <b>Live messages</b>
                    <p>100</p>
                </div>
            </div>
            <div className='dashboard-wrapper data-box'>
                <img src={factoryActionIcon} width={45} height={45} alt="liveMessagesIcon" />
                <div className='data-wrapper'>
                    <b>Live messages</b>
                    <p>90 <span>in action</span></p>
                </div>
            </div>
            <div className='dashboard-wrapper data-box'>
                <img src={factoryIdleIcon} width={45} height={45} alt="liveMessagesIcon" />
                <div className='data-wrapper'>
                    <b>Live messages</b>
                    <p>3 <span>on idle</span></p>
                </div>
            </div>
        </div>
    );
}

export default GenericDetails;