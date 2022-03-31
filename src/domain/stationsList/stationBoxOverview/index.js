import './style.scss';

import React, { useState, useContext, useEffect } from 'react';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import DeleteIcon from '@material-ui/icons/Delete';
import MenuItem from '@material-ui/core/MenuItem';
import Popover from '@material-ui/core/Popover';
import { useHistory } from 'react-router-dom';

import FunctionsOverview from '../../../components/functionsOverview';
import HealthyBadge from '../../../components/healthyBadge';
import HubMarketplace from '../../hubMarketplace';
import { Context } from '../../../hooks/store';
import pathContainers from '../../../router';

const StationBoxOverview = (props) => {
    const [state, dispatch] = useContext(Context);
    const [modalIsOpen, modalFlip] = useState(false);
    const [functionModalIsOpen, functionModalFlip] = useState(false);
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
        <div className="station-box-container">
            <HubMarketplace open={functionModalIsOpen} closeModal={() => functionModalFlip(false)} />
            <div className="station-overview-header">
                <div className="info-fields">
                    <div className="field-wrapper">
                        <h3>Name: </h3>
                        <p>{props.station.name}</p>
                    </div>
                    <div className="field-wrapper">
                        <h3>Retention: </h3>
                        <p>{props.station.retention_value}</p>
                    </div>
                    <div className="field-wrapper">
                        <h3>Replicas: </h3>
                        <p>{props.station.replicas}</p>
                    </div>
                    {/* <div className="field-wrapper">
                        <h3>Max throughput: </h3>
                        <p>{props.station.max_throughput || 'not detected'}</p>
                    </div> */}
                </div>
                <div className="actions-side">
                    <div
                        className="action overview"
                        onClick={() => {
                            history.push(`${window.location.pathname}/${props.station.name}`);
                        }}
                    >
                        <p>Overview </p>
                    </div>
                    <div className="action edit">
                        <p onClick={() => functionModalFlip(true)}>Add functions</p>
                    </div>
                    {/* <div className="action">
                        <HealthyBadge status={props.station.status || 'healthy'} />
                    </div> */}
                    <div className="action station-menu">
                        <MoreVertIcon
                            aria-controls="long-button"
                            aria-haspopup="true"
                            onClick={(e) => {
                                e.preventDefault();
                                handleClickMenu(e);
                            }}
                            className="threedots-menu"
                        />
                        <Popover id="long-menu" classes={{ paper: 'Menu c' }} anchorEl={anchorEl} onClose={handleCloseMenu} open={open}>
                            <MenuItem
                                onClick={() => {
                                    modalFlip(true);
                                    handleCloseMenu();
                                }}
                            >
                                <DeleteIcon style={{ fontSize: 14 }} className="menu-item-icon" />
                                <label className="menu-item-label">Remove</label>
                            </MenuItem>
                        </Popover>
                    </div>
                </div>
            </div>
            {props.station.functions.length !== 0 && (
                <div className="functions-overview">
                    <FunctionsOverview functions={props.station.functions} horizontal={true} editable={false}></FunctionsOverview>
                </div>
            )}
        </div>
    );
};

export default StationBoxOverview;
