import "./healthyBadge.scss"
import React from "react"
import CheckCircleSharpIcon from "@material-ui/icons/CheckCircleSharp";
import ErrorSharpIcon from "@material-ui/icons/ErrorSharp";

const HealthyBadge = (props) => {
    return (
        <div className="healthy-badge-container">
            {props.healthy ? (
                <div className="healthy">
                    <CheckCircleSharpIcon
                        className="healthy-icon"
                        theme="outlined"
                    />
                    <p>Healthy</p>
                </div>
            ) : (
                <div className="unhealthy">
                    <ErrorSharpIcon
                        className="unhealthy-icon"
                        theme="outlined"
                    />
                    <p>UnHealthy</p>
                </div>
            )}
        </div>
    );
}

export default HealthyBadge;