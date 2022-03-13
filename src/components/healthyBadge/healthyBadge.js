import "./healthyBadge.scss"
import React from "react"
import CheckCircleSharpIcon from "@material-ui/icons/CheckCircleSharp";
import ErrorSharpIcon from "@material-ui/icons/ErrorSharp";
import Cancel from "@material-ui/icons/Cancel";

const HealthyBadge = (props) => {
    return (
        <div className="healthy-badge-container">
            {props.status === "healthy" && (
                <div className="healthy">
                    <CheckCircleSharpIcon
                        className="badge-icon"
                        theme="outlined"
                    />
                    <p>Healthy</p>
                </div>
            )}
            {props.status === "unhealthy" && (
                <div className="unhealthy">
                    <Cancel
                        className="badge-icon"
                        theme="outlined"
                    />
                    <p>UnHealthy</p>
                </div>
            )}
            {props.status === "risky" && (
                <div className="risky">
                    <ErrorSharpIcon
                        className="badge-icon"
                        theme="outlined"
                    />
                    <p>Risky</p>
                </div>
            )}
        </div>
    );
}

export default HealthyBadge;