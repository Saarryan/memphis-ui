import React from "react";
import VerifiedUser from "../../../../src/assets/images/verified.svg";
import "./verifiedBadge.scss"

function VerifiedBedge() {
    return (

        <span className="verified-badge">
            <img src={VerifiedUser} alt="verified" /> 
            <p>Verified</p>
        </span>

    );
}
export default VerifiedBedge;
