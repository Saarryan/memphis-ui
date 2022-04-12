import './style.scss';

import React from 'react';

import VerifiedUser from '../../../assets/images/verified.svg';

function VerifiedBedge() {
    return (
        <span className="verified-badge">
            <img src={VerifiedUser} alt="verified" />
            <p>Verified</p>
        </span>
    );
}
export default VerifiedBedge;
