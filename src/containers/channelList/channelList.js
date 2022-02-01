import "./channelList.scss";
import React, { useEffect, useContext, useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import { message } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import CircularProgress from "@material-ui/core/CircularProgress";
import ChannelOverview from "./components/channelOverview/channelOverview";
import { Context } from "../../hooks/store";
import { httpRequest } from "../../services/http";
import { ApiEndpoint } from "../../apiEndpoints.model";
import edit from "../../assets/images/edit.svg";
import Tooltip from "../../components/tooltip/tooltip";
import Modal from "../../components/modal/modal";
import Button from "../../components/button/button";
import config from "../../config/config.json";
import loading from "../../assets/images/strech.gif";
import pathControllers from "../../router";

const ChannelList = () => {
    const [state, dispatch] = useContext(Context);
    const [channelList, setChannelList] = useState([
        {
            "_id": 1,
            "name": "Strech",
            "Retention": "3 days",
            "Max_throughput": "1000 message"
          },
          {
            "_id": 2,
            "name": "Strech",
            "Retention": "3 hours",
            "Max_throughput": "15 Mb/s"
          },
          {
            "_id": 3,
            "name": "Strech",
            "Retention": "channel",
            "Max_throughput": "default"
          }
    ]);
    const [editName, seteditName] = useState(false);
    const [editDescription, seteditDescription] = useState(false);
    const [modalIsOpen, modalFlip] = useState(false);
    const [modalInactivation, modalInactivationFlip] = useState(false);
    const [modalActivation, modalActivationFlip] = useState(false);
    const [applicationDetails, setapplicationDetails] = useState({
        id: 1,
        name: "test",
        description: "desc"
    });
    const [isLoading, setisLoading] = useState(false);
    const history = useHistory();

    useEffect(() => {
        dispatch({ type: "SET_ROUTE", payload: "channels" });
        //GetApplicationDetails();
    }, []);

    const GetApplicationDetails = async () => {
        const url = window.location.href;
        const applicationId = url.split("applications/")[1].split("/")[0];
        if (applicationId !== "newApplication") {
            setisLoading(true);
            try {
                const data = await httpRequest(
                    "GET",
                    `${ApiEndpoint.GET_USER_USECASE_BY_ID}?applicationId=${applicationId}`
                );
                setapplicationDetails({
                    ...applicationDetails,
                    id: 1,
                    name: "data.name",
                    description: "data.description",
                });
                dispatch({ type: "UPDATE_USECASES_NAME", payload: data });
                getChannels(data._id);
            } catch (err) {
                return;
            }
        }
    };

    const getChannels = async (applicationId) => {
        try {
            const data = await httpRequest(
                "GET",
                `${ApiEndpoint.GET_USECASE_PIPELINES}?applicationId=${applicationId || state.application?._id}`
            );
            // setTimeout(() => {
            setisLoading(false);
            setChannelList(data);
            // }, 1000);
        } catch (err) { }
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
                const data = await httpRequest("PUT", ApiEndpoint.CHANGE_USECASE_NAME, {
                    name: e.target.value,
                    applicationId: state.useCaseBuilder?._id,
                });
                dispatch({ type: "UPDATE_USECASES_NAME", payload: data });
                setapplicationDetails({ ...applicationDetails, name: e.target.value });
                seteditName(false);
            } catch (err) { }
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
                const data = await httpRequest(
                    "PUT",
                    ApiEndpoint.CHANGE_USECASE_DESCRIPTION,
                    { description: e.target.value, applicationId: state.useCaseBuilder?._id }
                );
                dispatch({ type: "UPDATE_USECASES_DESCRIPTION", payload: data });
                setapplicationDetails({
                    ...applicationDetails,
                    description: e.target.value,
                });
                seteditDescription(false);
            } catch (err) { }
        }
    };

    const handleEditDescriptionChange = (e) => {
        setapplicationDetails({ ...applicationDetails, description: e.target.value });
    };

    const popupMessage = (content) => {
        message.success({
            key: "strechSuccessMessage",
            content: content,
            duration: 3,
            style: { cursor: "pointer" },
            onClick: () => message.destroy("strechSuccessMessage"),
        });
    };

    const removeApplication = async () => {
        try {
            await httpRequest(
                "DELETE",
                `${ApiEndpoint.REMOVE_USECASE}?applicationId=${state.application?._id}`
            );
            history.push(pathControllers.applicationList);
        } catch (err) {
            modalFlip(true);
        }
    };

    const handleCreateChannel = () => {
    };

    return (
        <div className="application-details-container">
            <div className="application-details-header">
                <div className="left-side">
                    {!editName && (
                        <h1 className="main-header-h1">
                            {!isLoading ? (
                                state.useCaseBuilder?.name ||
                                applicationDetails.name ||
                                "Inser application name"
                            ) : (
                                <CircularProgress className="circular-progress" size={18} />
                            )}
                            <img
                                src={edit}
                                width="20"
                                height="20"
                                alt="edit"
                                className="edit-icon"
                                onClick={() => handleEditName()}
                            />
                        </h1>
                    )}
                    {editName && (
                        <ClickAwayListener onClickAway={handleEditNameBlur}>
                            <div className="edit-input-name">
                                <input
                                    onBlur={handleEditNameBlur}
                                    onChange={handleEditNameChange}
                                    value={applicationDetails?.name}
                                />
                            </div>
                        </ClickAwayListener>
                    )}
                    {!editDescription && (
                        <div className="description">

                            {!isLoading ? (
                                <p >{state.useCaseBuilder?.description ||
                                    applicationDetails.description ||
                                    "Insert your description..."}</p>
                            ) : (
                                <CircularProgress className="circular-progress" size={12} />
                            )}

                            <img
                                src={edit}
                                width="15"
                                height="15"
                                alt="edit"
                                className="edit-icon"
                                onClick={() => handleEditDescription()}
                            />
                        </div>
                    )}
                    {editDescription && (
                        <ClickAwayListener onClickAway={handleEditDescriptionBlur}>
                            <div>
                                <textarea
                                    onBlur={handleEditDescriptionBlur}
                                    onChange={handleEditDescriptionChange}
                                    value={applicationDetails.description}
                                />
                            </div>
                        </ClickAwayListener>
                    )}
                    <div className="channels-length">
                        <h1>Channels</h1>
                        <div className="len-num">
                            <p>{channelList.length}</p>
                        </div>

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
                        onClick={() => handleCreateChannel()}
                    />
                </div>
            </div>
            <div className="use-case-editor-piplines">
                {isLoading && (
                    <div className="loader-uploading">
                        <div></div>
                        <img src={loading} alt="loading"></img>
                    </div>
                )}
                {channelList?.length > 0 &&
                    channelList?.map((channel) => (
                        <ChannelOverview content={channel}/>
                    ))}
                {!isLoading && channelList.length === 0 && (
                    <div className="no-pipline-to-display">
                        <InboxOutlined
                            style={{ fontSize: "40px", color: "#5D4AEE" }}
                            theme="outlined"
                        />
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
                header="Remove use case"
                height="300px"
                width="650px"
                rBtnText="Confirm"
                lBtnText="Cancel"
                closeAction={() => modalFlip(false)}
                clickOutside={() => modalFlip(false)}
                lBtnClick={() => {
                    modalFlip(false);
                }}
                rBtnClick={() => {
                    modalFlip(false);
                    removeApplication();
                }}
                open={modalIsOpen}
            >
                Are you sure you want to remove this use case? This will remove all
                pipelines connected to this use case.
            </Modal>
            <Modal
                confirm={true}
                height="250px"
                width="500px"
                rBtnText="Confirm"
                lBtnText="Cancel"
                header="Pipeline activation"
                closeAction={() => modalActivationFlip(false)}
                clickOutside={() => {
                    modalActivationFlip(false);
                }}
                lBtnClick={() => modalActivationFlip(false)}
                rBtnClick={() => {
                    modalActivationFlip(false);
                }}
                open={modalActivation}
            >
                You chose to activate this pipeline, that means that this pipeline
                will be triggered according to its trigger.
            </Modal>
            <Modal
                warning={true}
                confirm={true}
                height="250px"
                width="500px"
                rBtnText="Confirm"
                lBtnText="Cancel"
                header="Pipeline inactivation"
                closeAction={() => modalInactivationFlip(false)}
                clickOutside={() => {
                    modalInactivationFlip(false);
                }}
                lBtnClick={() => modalInactivationFlip(false)}
                rBtnClick={() => {
                    modalInactivationFlip(false);
                }}
                open={modalInactivation}
            >
                You chose to inactivate this pipeline, that means that all future
                executions of this pipeline will be canceled.
            </Modal >
        </div >
    );
};

export default ChannelList;
