import "./channelOverview.scss";
import React, { useState, useContext, useEffect } from "react";
import { Context } from "../../../../hooks/store";
import FunctionsOverview from "../../../../components/functionsOverview/functionsOverview"
import { InboxOutlined } from "@ant-design/icons";
import Popover from "@material-ui/core/Popover";
import MenuItem from "@material-ui/core/MenuItem";
import DeleteIcon from "@material-ui/icons/Delete";
import CheckCircleSharpIcon from "@material-ui/icons/CheckCircleSharp";
import ErrorSharpIcon from "@material-ui/icons/ErrorSharp";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { useHistory } from "react-router-dom";
import pathContainers from "../../../../router";

const ChannelOverview = (props) => {
  const [state, dispatch] = useContext(Context);
  const [modalIsOpen, modalFlip] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const history = useHistory();


  const handleClickMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  return (
    <div className="channel-container">
      <div className="channel-overview-header">
        <div className="info-fields">
          <div className="field-wrapper">
            <h3>Name: </h3>
            <p>{props.channel.name}</p>
          </div>
          <div className="field-wrapper">
            <h3>Retention: </h3>
            <p>{props.channel.retention}</p>

          </div>
          <div className="field-wrapper">
            <h3>Max throughput: </h3>
            <p>{props.channel.max_throughput}</p>
          </div>
        </div>
        <div className="actions-side">
          <div className="action overview" onClick={() => { history.push(`${pathContainers.applicationList}/${props.channel._id}/1`) } }>
            <p>Overview</p>
          </div>
          <div className="action edit">
            <p>Edit functions</p>
          </div>
          {props.channel.healthy ? (
            <div className="action healthy">
              <CheckCircleSharpIcon
                className="healthy-icon"
                theme="outlined"
              />
              <p>Healthy</p>
            </div>
          ) : (
            <div className="action unhealthy">
              <ErrorSharpIcon
                className="unhealthy-icon"
                theme="outlined"
              />
              <p>UnHealthy</p>
            </div>
          )}
          <div className="action channel-menu">
            <MoreVertIcon
              aria-controls="long-button"
              aria-haspopup="true"
              onClick={(e) => {
                e.preventDefault();
                handleClickMenu(e);
              }}
              className="threedots-menu"

            />
            <Popover
              id="long-menu"
              classes={{ paper: "Menu c" }}
              anchorEl={anchorEl}
              onClose={handleCloseMenu}
              open={open}
            >
              <MenuItem
                onClick={() => {
                  modalFlip(true);
                  handleCloseMenu();
                }}
              >
                <DeleteIcon
                  style={{ fontSize: 14 }}
                  className="menu-item-icon"
                />
                <label className="menu-item-label">
                  Remove
                </label>
              </MenuItem>
            </Popover>
          </div>
        </div>
      </div>
      {props.channel.functions && (
        <div className="functions-overview">
          <FunctionsOverview functions={props.channel.functions} horizontal={true} editable={false}></FunctionsOverview>
        </div>
      )}
    </div>
  );
};

export default ChannelOverview;
