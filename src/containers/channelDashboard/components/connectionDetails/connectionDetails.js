import "./connectionDetails.scss"
import React from "react"


const ConnectionDetails = () => {
    const connectionDetails = {
        'host': "https://stream-staging.strech.io/json/2a0f1f21-cd0d-4a1b-9538-f938e2eed8cd",
        'AuthType': "Api key",
        'jwt': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
    };
    return (
        <div className="connection-details-container">
            <p className="title">Connection details</p>
            <div className="connections-details">
                <h1>Host: <p>{connectionDetails.host}</p></h1>
                {/* <h1>Auth type: <p>{connectionDetails.AuthType}</p></h1> */}
                <h1>Jwt: <p>{connectionDetails.jwt}</p></h1>
            </div>
            <div></div>
        </div>
    );
}

export default ConnectionDetails;