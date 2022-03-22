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

const FactoryOverview = (props) => {
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
        <div className="factory-container">
            <HubMarketplace open={functionModalIsOpen} closeModal={() => functionModalFlip(false)} />
            <div className="factory-overview-header">
                <div className="info-fields">
                    <div className="action factory-menu">
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
                    <div className="field-wrapper">
                        <h3>Name: </h3>
                        <p>{props.factory.name}</p>
                    </div>
                    <div className="field-wrapper">
                        <h3>Retention: </h3>
                        <p>{props.factory.retention}</p>
                    </div>
                    <div className="field-wrapper">
                        <h3>Max throughput: </h3>
                        <p>{props.factory.max_throughput}</p>
                    </div>
                </div>
                <div className="actions-side">
                    <div
                        className="action overview"
                        onClick={() => {
                            history.push(`${pathContainers.applicationsList}/${props.factory._id}/1`);
                        }}
                    >
                        <p>Overview </p>
                    </div>
                    <div className="action edit">
                        <p onClick={() => functionModalFlip(true)}>Edit functions</p>
                    </div>
                    <div className="action">
                        <HealthyBadge status={props.factory.status} />
                    </div>
                </div>
            </div>
            {props.factory.functions && (
                <div className="functions-overview">
                    <FunctionsOverview functions={props.factory.functions} horizontal={true} editable={false}></FunctionsOverview>
                </div>
            )}
        </div>
    );
};

export default FactoryOverview;
