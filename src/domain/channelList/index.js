import './style.scss';

import React, { useEffect, useContext, useState, useRef } from 'react';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import CircularProgress from '@material-ui/core/CircularProgress';
import { InboxOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import { message } from 'antd';

import CreateChannelDetails from './createChannelDetails';
import Tooltip from '../../components/tooltip/tooltip';
import loading from '../../assets/images/strech.gif';
import { httpRequest } from '../../services/http';
import { ApiEndpoints } from '../../apiEndpoints';
import ChannelOverview from './channelOverview';
import edit from '../../assets/images/edit.svg';
import config from '../../config/config.json';
import Button from '../../components/button';
import { Context } from '../../hooks/store';
import Modal from '../../components/modal';
import pathContainers from '../../router';

const ChannelList = () => {
    const [state, dispatch] = useContext(Context);
    const [channelList, setChannelList] = useState([
        {
            _id: 1,
            name: 'Strech',
            retention: '3 days',
            max_throughput: '1000 message',
            status: 'healthy',
            functions: [
                {
                    _id: 1,
                    name: 'sveta',
                    type: 'blabl'
                },
                {
                    _id: 2,
                    name: 'sveta2',
                    type: 'blabl'
                },
                {
                    _id: 3,
                    name: 'sveta3',
                    type: 'blabl'
                }
            ]
        },
        {
            _id: 2,
            name: 'Strech',
            retention: '3 hours',
            max_throughput: '15 Mb/s',
            status: 'unhealthy'
        },
        {
            _id: 3,
            name: 'Strech',
            retention: 'channel',
            max_throughput: 'default',
            status: 'healthy'
        },
        {
            _id: 4,
            name: 'Strech',
            retention: 'channel',
            max_throughput: 'default',
            status: 'unhealthy'
        },
        {
            _id: 5,
            name: 'Strech',
            retention: 'channel',
            max_throughput: 'default',
            status: 'healthy'
        }
    ]);
    const [editName, seteditName] = useState(false);
    const [editDescription, seteditDescription] = useState(false);
    // const [functionModalIsOpen, functionModalFlip] = useState(false);
    const [modalIsOpen, modalFlip] = useState(false);
    const [applicationDetails, setapplicationDetails] = useState({
        id: 1,
        name: 'test',
        description: 'desc'
    });
    const [isLoading, setisLoading] = useState(false);
    const history = useHistory();

    useEffect(() => {
        dispatch({ type: 'SET_ROUTE', payload: 'applications' });
        //GetApplicationDetails();
    }, []);

    const GetApplicationDetails = async () => {
        const url = window.location.href;
        const applicationId = url.split('applications/')[1].split('/')[0];
        if (applicationId !== 'newApplication') {
            setisLoading(true);
            try {
                const data = await httpRequest('GET', `${ApiEndpoints.GET_USER_USECASE_BY_ID}?applicationId=${applicationId}`);
                setapplicationDetails({
                    ...applicationDetails,
                    id: 1,
                    name: 'data.name',
                    description: 'data.description'
                });
                dispatch({ type: 'UPDATE_USECASES_NAME', payload: data });
                getChannels(data._id);
            } catch (err) {
                return;
            }
        }
    };

    const getChannels = async (applicationId) => {
        try {
            const data = await httpRequest('GET', `${ApiEndpoints.GET_USECASE_PIPELINES}?applicationId=${applicationId || state.application?._id}`);
            // setTimeout(() => {
            setisLoading(false);
            setChannelList(data);
            // }, 1000);
        } catch (err) {}
    };

    const handleEditName = () => {
        seteditName(true);
    };

    const handleEditDescription = () => {
        seteditDescription(true);
    };

    const handleEditNameBlur = async (e) => {
        if (e.target.value === undefined) {
            seteditName(false);
        } else {
            try {
                const data = await httpRequest('PUT', ApiEndpoints.CHANGE_USECASE_NAME, {
                    name: e.target.value,
                    applicationId: state.useCaseBuilder?._id
                });
                dispatch({ type: 'UPDATE_USECASES_NAME', payload: data });
                setapplicationDetails({ ...applicationDetails, name: e.target.value });
                seteditName(false);
            } catch (err) {}
        }
    };

    const handleEditNameChange = (e) => {
        setapplicationDetails({ ...applicationDetails, name: e.target.value });
    };

    const handleEditDescriptionBlur = async (e) => {
        if (e.target.value === undefined) {
            seteditDescription(false);
        } else {
            try {
                const data = await httpRequest('PUT', ApiEndpoints.CHANGE_USECASE_DESCRIPTION, { description: e.target.value, applicationId: state.useCaseBuilder?._id });
                dispatch({ type: 'UPDATE_USECASES_DESCRIPTION', payload: data });
                setapplicationDetails({
                    ...applicationDetails,
                    description: e.target.value
                });
                seteditDescription(false);
            } catch (err) {}
        }
    };

    const handleEditDescriptionChange = (e) => {
        setapplicationDetails({ ...applicationDetails, description: e.target.value });
    };

    const popupMessage = (content) => {
        message.success({
            key: 'strechSuccessMessage',
            content: content,
            duration: 3,
            style: { cursor: 'pointer' },
            onClick: () => message.destroy('strechSuccessMessage')
        });
    };

    const removeApplication = async () => {
        try {
            await httpRequest('DELETE', `${ApiEndpoints.REMOVE_USECASE}?applicationId=${state.application?._id}`);
            history.push(pathContainers.applicationList);
        } catch (err) {
            modalFlip(true);
        }
    };

    const handleCreateChannel = () => {};

    return (
        <div className="application-details-container">
            <div className="application-details-header">
                <div className="left-side">
                    {!editName && (
                        <h1 className="main-header-h1">
                            {!isLoading ? (
                                state.useCaseBuilder?.name || applicationDetails.name || 'Inser application name'
                            ) : (
                                <CircularProgress className="circular-progress" size={18} />
                            )}
                            <img src={edit} width="20" height="20" alt="edit" className="edit-icon" onClick={() => handleEditName()} />
                        </h1>
                    )}
                    {editName && (
                        <ClickAwayListener onClickAway={handleEditNameBlur}>
                            <div className="edit-input-name">
                                <input onBlur={handleEditNameBlur} onChange={handleEditNameChange} value={applicationDetails?.name} />
                            </div>
                        </ClickAwayListener>
                    )}
                    {!editDescription && (
                        <div className="description">
                            {!isLoading ? (
                                <p>{state.useCaseBuilder?.description || applicationDetails.description || 'Insert your description...'}</p>
                            ) : (
                                <CircularProgress className="circular-progress" size={12} />
                            )}

                            <img src={edit} width="15" height="15" alt="edit" className="edit-icon" onClick={() => handleEditDescription()} />
                        </div>
                    )}
                    {editDescription && (
                        <ClickAwayListener onClickAway={handleEditDescriptionBlur}>
                            <div>
                                <textarea onBlur={handleEditDescriptionBlur} onChange={handleEditDescriptionChange} value={applicationDetails.description} />
                            </div>
                        </ClickAwayListener>
                    )}
                    <div className="channels-length">
                        <h1>Channels ({channelList?.length})</h1>
                    </div>
                </div>
                <div className="right-side">
                    <Button
                        className="modal-btn"
                        width="150px"
                        height="36px"
                        placeholder="Create a channel"
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
            <div className="channels-content">
                {isLoading && (
                    <div className="loader-uploading">
                        <div></div>
                        <img src={loading} alt="loading"></img>
                    </div>
                )}
                {channelList?.length > 0 && channelList?.map((channel) => <ChannelOverview key={channel._id} channel={channel} />)}
                {!isLoading && channelList.length === 0 && (
                    <div className="no-channel-to-display">
                        <InboxOutlined style={{ fontSize: '40px', color: '#5D4AEE' }} theme="outlined" />
                        <p className="nodata">No Channels to display</p>
                        <Button
                            className="modal-btn"
                            width="240px"
                            height="36px"
                            placeholder="Create your first channel"
                            colorType="white"
                            radiusType="circle"
                            backgroundColorType="orange"
                            fontSize="14px"
                            fontWeight="bold"
                            aria-controls="usecse-menu"
                            aria-haspopup="true"
                            onClick={() => handleCreateChannel()}
                        />
                    </div>
                )}
            </div>
            <Modal
                header="Your channel details"
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
                    history.push(`${pathContainers.applicationList}/${applicationDetails._id}/1`);
                }}
                open={modalIsOpen}
            >
                <CreateChannelDetails />
            </Modal>
        </div>
    );
};

export default ChannelList;
