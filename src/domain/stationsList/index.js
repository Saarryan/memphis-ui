import './style.scss';

import React, { useEffect, useContext, useState, useRef } from 'react';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import CircularProgress from '@material-ui/core/CircularProgress';
import EditOutlined from '@material-ui/icons/EditOutlined';
import { InboxOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import { message } from 'antd';

import CreateStationDetails from './createStationDetails';
import { ApiEndpoints } from '../../const/apiEndpoints';
import Tooltip from '../../components/tooltip/tooltip';
import StationBoxOverview from './stationBoxOverview';
import loading from '../../assets/images/strech.gif';
import { httpRequest } from '../../services/http';
import Button from '../../components/button';
import { Context } from '../../hooks/store';
import Modal from '../../components/modal';
import pathContainers from '../../router';

const StationsList = () => {
    const [state, dispatch] = useContext(Context);
    const [editName, seteditName] = useState(false);
    const [editDescription, seteditDescription] = useState(false);
    const [modalIsOpen, modalFlip] = useState(false);
    const [factoryDetails, setFactoryDetails] = useState();
    const [factoryName, setFactoryName] = useState('');
    const [factoryDescription, setFactoryDescription] = useState('');
    const [isLoading, setisLoading] = useState(false);
    const history = useHistory();

    useEffect(() => {
        dispatch({ type: 'SET_ROUTE', payload: 'factories' });
        getFactoryDetails();
    }, []);

    const getFactoryDetails = async () => {
        const url = window.location.href;
        const factoryName = url.split('factories/')[1].split('/')[0];
        setisLoading(true);
        try {
            const data = await httpRequest('GET', `${ApiEndpoints.GEL_FACTORIES}?factory_name=${factoryName}`);
            setFactoryDetails(data);
            setFactoryName(data.name);
            setFactoryDescription(data.description);
            setisLoading(false);
        } catch (err) {
            return;
        }
    };

    const handleEditName = () => {
        seteditName(true);
    };

    const handleEditDescription = () => {
        seteditDescription(true);
    };

    const handleEditNameBlur = async (e) => {
        if (!e.target.value) {
            seteditName(false);
        } else {
            try {
                await httpRequest('PUT', ApiEndpoints.EDIT_FACTORY, {
                    factory_name: factoryDetails.name,
                    factory_new_name: e.target.value,
                    factory_new_description: factoryDetails.description
                });
                setFactoryDetails({ ...factoryDetails, name: e.target.value });
                seteditName(false);
            } catch (err) {
                setFactoryName(factoryDetails.name);
            }
        }
    };

    const handleEditNameChange = (e) => {
        setFactoryName(e.target.value);
    };

    const handleEditDescriptionBlur = async (e) => {
        if (!e.target.value) {
            seteditDescription(false);
        } else {
            try {
                await httpRequest('PUT', ApiEndpoints.EDIT_FACTORY, {
                    factory_name: factoryDetails.name,
                    factory_new_name: factoryDetails.name,
                    factory_new_description: e.target.value
                });
                setFactoryDetails({ ...factoryDetails, description: e.target.value });
                seteditDescription(false);
            } catch (err) {
                setFactoryDescription(factoryDetails.description);
            }
        }
    };

    const handleEditDescriptionChange = (e) => {
        setFactoryDescription(e.target.value);
    };

    const handleCreateStation = () => {};

    return (
        <div className="factory-details-container">
            <div className="factory-details-header">
                <div className="left-side">
                    {!editName && (
                        <h1 className="main-header-h1">
                            {!isLoading ? factoryName || 'Inser Factory name' : <CircularProgress className="circular-progress" size={18} />}
                            <EditOutlined className="edit-icon" onClick={() => handleEditName()} />
                        </h1>
                    )}
                    {editName && (
                        <ClickAwayListener onClickAway={handleEditNameBlur}>
                            <div className="edit-input-name">
                                <input onBlur={handleEditNameBlur} onChange={handleEditNameChange} value={factoryName} />
                            </div>
                        </ClickAwayListener>
                    )}
                    {!editDescription && (
                        <div className="description">
                            {!isLoading ? <p>{factoryDescription || 'Insert your description...'}</p> : <CircularProgress className="circular-progress" size={12} />}
                            <EditOutlined className="edit-icon" onClick={() => handleEditDescription()} />
                        </div>
                    )}
                    {editDescription && (
                        <ClickAwayListener onClickAway={handleEditDescriptionBlur}>
                            <div>
                                <textarea onBlur={handleEditDescriptionBlur} onChange={handleEditDescriptionChange} value={factoryDescription} />
                            </div>
                        </ClickAwayListener>
                    )}
                    <div className="factories-length">
                        <h1>Stations ({factoryDetails?.stations?.length})</h1>
                    </div>
                </div>
                <div className="right-side">
                    <Button
                        className="modal-btn"
                        width="150px"
                        height="36px"
                        placeholder="Create a station"
                        colorType="lightPurple"
                        radiusType="circle"
                        backgroundColorType="darkPurple"
                        fontSize="14px"
                        fontWeight="bold"
                        aria-controls="usecse-menu"
                        aria-haspopup="true"
                        onClick={() => modalFlip(true)}
                    />
                </div>
            </div>
            <div className="factories-content">
                {isLoading && (
                    <div className="loader-uploading">
                        <div></div>
                        <img src={loading} alt="loading"></img>
                    </div>
                )}
                {factoryDetails?.stations?.length > 0 && factoryDetails?.stations?.map((station, key) => <StationBoxOverview key={station.id} station={station} />)}
                {!isLoading && factoryDetails?.stations.length === 0 && (
                    <div className="no-station-to-display">
                        <InboxOutlined style={{ fontSize: '40px', color: '#6557FF' }} theme="outlined" />
                        <p className="nodata">No factories to display</p>
                        <Button
                            className="modal-btn"
                            width="240px"
                            height="36px"
                            placeholder="Create your first station"
                            colorType="white"
                            radiusType="circle"
                            backgroundColorType="orange"
                            fontSize="14px"
                            fontWeight="bold"
                            aria-controls="usecse-menu"
                            aria-haspopup="true"
                            onClick={() => handleCreateStation()}
                        />
                    </div>
                )}
            </div>
            <Modal
                header="Your station details"
                height="600px"
                minWidth="550px"
                rBtnText="Add"
                lBtnText="Cancel"
                closeAction={() => modalFlip(false)}
                lBtnClick={() => {
                    modalFlip(false);
                }}
                clickOutside={() => modalFlip(false)}
                rBtnClick={() => {
                    modalFlip(false);
                    history.push(`${pathContainers.factoriesList}/${factoryDetails._id}/1`);
                }}
                open={modalIsOpen}
            >
                <CreateStationDetails />
            </Modal>
        </div>
    );
};

export default StationsList;
