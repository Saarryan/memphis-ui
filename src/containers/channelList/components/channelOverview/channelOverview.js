import "./channelOverview.scss";
import React, { useState, useContext, useEffect } from "react";
import { Context } from "../../../../hooks/store";


const ChannelOverview = (props) => {
  const [state, dispatch] = useContext(Context);

  return (
    <div className="channel-container">
      <div className="channel-overview-header">
        <div className="fields-side">
          <div className="field-wrapper">
            <h3>Name: </h3>
            <p>{props.content.name}</p>
          </div>
          <div className="field-wrapper">
            <h3>Retention: </h3>
            <p>{props.content.retention}</p>

          </div>
          <div className="field-wrapper">
            <h3>Max throughput: </h3>
            <p>{props.content.max_throughput}</p>
          </div>
        </div>
        <div className="actions-side">

        </div>
      </div>
    </div>
  );
};

export default ChannelOverview;
