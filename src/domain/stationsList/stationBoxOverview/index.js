import './style.scss';

import React, { useState, useContext, useEffect } from 'react';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import MenuItem from '@material-ui/core/MenuItem';
import Popover from '@material-ui/core/Popover';
import { useHistory } from 'react-router-dom';

import FunctionsOverview from '../../../components/functionsOverview';
import HealthyBadge from '../../../components/healthyBadge';
import HubMarketplace from '../../hubMarketplace';
import { Context } from '../../../hooks/store';
import pathDomains from '../../../router';
import { convertSecondsToDate } from '../../../services/dateConvertor';
import { ApiEndpoints } from '../../../const/apiEndpoints';
import Modal from '../../../components/modal';
import { httpRequest } from '../../../services/http';
import OverflowTip from '../../../components/tooltip/overflowtip';

const StationBoxOverview = (props) => {
    const [state, dispatch] = useContext(Context);
    const [modalIsOpen, modalFlip] = useState(false);
    const [functionModalIsOpen, functionModalFlip] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const history = useHistory();
    const [retentionValue, setRetentionValue] = useState('');

    useEffect(() => {
        switch (props.station.retention_type) {
            case 'message_age_sec':
                setRetentionValue(convertSecondsToDate(props.station.retention_value));
                break;
            case 'bytes':
                setRetentionValue(`${props.station.retention_value} bytes`);
                break;
            case 'messages':
                setRetentionValue(`${props.station.retention_value} messages`);
                break;
            default:
                break;
        }
    }, []);

    const handleClickMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const removeStation = async (stationName) => {
        try {
            await httpRequest('DELETE', ApiEndpoints.REMOVE_STATION, {
                station_name: stationName
            });
            props.removeStation();
        } catch (error) {}
    };

    return (
        <div className="station-box-container">
            <HubMarketplace open={functionModalIsOpen} closeModal={() => functionModalFlip(false)} />
            <div className="station-overview-header">
                <div className="info-fields">
                    <div className="field-wrapper">
                        <h3>Name: </h3>
                        {/* <p>{props.station.name}</p> */}
                        <OverflowTip text={props.station.name} width={'150px'}>
                            {props.station.name}
                        </OverflowTip>
                    </div>
                    <div className="field-wrapper">
                        <h3>Retention: </h3>
                        <OverflowTip text={retentionValue} width={'150px'}>
                            {retentionValue}
                        </OverflowTip>
                        {/* <p>{retentionValue}</p> */}
                    </div>
                    <div className="field-wrapper">
                        <h3>Replicas: </h3>
                        {/* <p>{props.station.replicas}</p> */}
                        <OverflowTip text={props.station.replicas} width={'20px'}>
                            {props.station.replicas}
                        </OverflowTip>
                    </div>
                    <div className="field-wrapper">
                        <h3>Storage Type: </h3>
                        {/* <p>{props.station.storage_type}</p> */}
                        <OverflowTip text={props.station.storage_type} width={'50px'}>
                            {props.station.storage_type}
                        </OverflowTip>
                    </div>
                    {/* <div className="field-wrapper">
                        <h3>Max throughput: </h3>
                        <p>{props.station.max_throughput || 'not detected'}</p>
                    </div> */}
                </div>
                <div className="actions-side">
                    <div className="hover-section">
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
                                }}
                            >
                                <DeleteOutline className="menu-item-icon" />
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
            <Modal
                header="Remove station"
                height="220px"
                minWidth="440px"
                rBtnText="Cancel"
                lBtnText="Remove"
                closeAction={() => modalFlip(false)}
                lBtnClick={() => {
                    removeStation(props.station.name);
                }}
                clickOutside={() => modalFlip(false)}
                rBtnClick={() => modalFlip(false)}
                open={modalIsOpen}
            >
                <label>Are you sure you want to delete {props.station.name} station?</label>
                <br />
            </Modal>
        </div>
    );
};

export default StationBoxOverview;
