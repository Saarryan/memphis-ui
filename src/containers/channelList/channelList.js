import "./channelList.scss";
import React, { useEffect, useContext, useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import { Button as ButtonDesign, message } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Context } from "../../hooks/store";
import { httpRequest } from "../../services/http";
import { ApiEndpoint } from "../../apiEndpoints.model";
import Tooltip from "../../components/tooltip/tooltip";
import edit from "../../assets/images/edit.svg";
import deleteIcon from "../../assets/images/deleteIcon.svg";
import Modal from "../../components/modal/modal";
import Button from "../../components/button/button";
import config from "../../config/config.json";
import loading from "../../assets/images/strech.gif";
import pathControllers from "../../router";

const ChannelList = () => {
    const [state, dispatch] = useContext(Context);
    const [usecasePipelines, setUsecasePipelines] = useState([]);
    const [editName, seteditName] = useState(false);
    const [editDescription, seteditDescription] = useState(false);
    const [modalIsOpen, modalFlip] = useState(false);
    const [modalInactivation, modalInactivationFlip] = useState(false);
    const [modalActivation, modalActivationFlip] = useState(false);
    const [useCaseDeatailes, setuseCaseDeatailes] = useState({
        id: 1,
        name: "test",
        description: "desc"
    });
    const [isLoading, setisLoading] = useState(false);
    const history = useHistory();

    useEffect(() => {
        dispatch({ type: "SET_ROUTE", payload: "applications" });
        //GetApplicationDetails();
    }, []);

    const GetApplicationDetails = async () => {
        const url = window.location.href;
        const useCaseId = url.split("usecases/")[1].split("/")[0];
        if (useCaseId !== "newUseCase") {
            setisLoading(true);
            try {
                const data = await httpRequest(
                    "GET",
                    `${ApiEndpoint.GET_USER_USECASE_BY_ID}?usecaseId=${useCaseId}`
                );
                setuseCaseDeatailes({
                    ...useCaseDeatailes,
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

    const getChannels = async (useCaseId) => {
        try {
            const data = await httpRequest(
                "GET",
                `${ApiEndpoint.GET_USECASE_PIPELINES}?usecaseId=${useCaseId || state.useCaseBuilder?._id
                }`
            );
            // setTimeout(() => {
            setisLoading(false);
            setUsecasePipelines(data);
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
                    usecaseId: state.useCaseBuilder?._id,
                });
                dispatch({ type: "UPDATE_USECASES_NAME", payload: data });
                setuseCaseDeatailes({ ...useCaseDeatailes, name: e.target.value });
                seteditName(false);
            } catch (err) { }
        }
    };

    const handleEditNameChange = (e) => {
        setuseCaseDeatailes({ ...useCaseDeatailes, name: e.target.value });
    };

    const handleEditDescriptionBlur = async (e) => {
        if (e.target.value === undefined) {
            seteditDescription(false);
        } else {
            try {
                const data = await httpRequest(
                    "PUT",
                    ApiEndpoint.CHANGE_USECASE_DESCRIPTION,
                    { description: e.target.value, usecaseId: state.useCaseBuilder?._id }
                );
                dispatch({ type: "UPDATE_USECASES_DESCRIPTION", payload: data });
                setuseCaseDeatailes({
                    ...useCaseDeatailes,
                    description: e.target.value,
                });
                seteditDescription(false);
            } catch (err) { }
        }
    };

    const handleEditDescriptionChange = (e) => {
        setuseCaseDeatailes({ ...useCaseDeatailes, description: e.target.value });
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
                `${ApiEndpoint.REMOVE_USECASE}?usecaseId=${state.useCaseBuilder?._id}`
            );
            dispatch({ type: "IS_USECASE_BUILDER_ACTIVE", payload: false });
            dispatch({ type: "IS_USECASE_EDIT_ACTIVE", payload: false });
            history.push(pathControllers.usecases);
        } catch (err) {
            modalFlip(true);
        }
    };

    const handleEditChannel = (stepNumber) => {
        dispatch({
            type: "IS_USECASE_EDIT_ACTIVE",
            payload: false,
        });
        dispatch({ type: "SET_WIZARD_STEP", payload: stepNumber });
        dispatch({
            type: "IS_USECASE_BUILDER_ACTIVE",
            payload: !state.isUsecaseBuliderActive,
        });
    };

    const handleCreateChannel = () => {
        dispatch({ type: "INITIAL_PIPELINE_DETAILS" });
        dispatch({ type: "SET_WIZARD_STEP", payload: 1 });
        dispatch({
            type: "IS_USECASE_BUILDER_ACTIVE",
            payload: !state.isUsecaseBuliderActive,
        });
    };

    return (
        <div className="use-case-editor-container">
            <div className="use-case-editor-header">
                {!editName && (
                    <h1 className="main-header-h1">
                        {!isLoading ? (
                            state.useCaseBuilder?.name ||
                            useCaseDeatailes.name ||
                            "Inser usecase name"
                        ) : (
                            <CircularProgress className="circular-progress" size={18} />
                        )}
                        <img
                            src={edit}
                            width="20"
                            height="20"
                            alt="edit"
                            className="edit-usecase-detailes"
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
                                value={useCaseDeatailes?.name}
                            />
                        </div>
                    </ClickAwayListener>
                )}
                <div className="usecase-editor-header-flex">
                    {!editDescription && (
                        <div className="p-header">

                            {!isLoading ? (
                                <p>{state.useCaseBuilder?.description ||
                                    useCaseDeatailes.description ||
                                    "Insert your description..."}</p>
                            ) : (
                                <CircularProgress className="circular-progress" size={12} />
                            )}

                            <img
                                src={edit}
                                width="15"
                                height="15"
                                alt="edit"
                                className="edit-usecase-detailes"
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
                                    value={useCaseDeatailes.description}
                                />
                            </div>
                        </ClickAwayListener>
                    )}
                    <Button
                        className="modal-btn"
                        width="150px"
                        height="36px"
                        placeholder="Create a channel"
                        colorType="lightPurple"
                        radiusType="circle"
                        backgroundColorType="darkPurple"
                        fontSize="12px"
                        fontWeight="bold"
                        aria-controls="usecse-menu"
                        aria-haspopup="true"
                        onClick={() => handleCreateChannel()}
                    />
                </div>
            </div>
            <div className="use-case-editor-action-button">
                <div className="delete-usecase-button">
                    <Tooltip text="Delete use case">
                        <ButtonDesign
                            onClick={() => {
                                !state.useCaseBuilder?.enabled && modalFlip(true);
                            }}
                            style={{
                                cursor: state.useCaseBuilder?.enabled
                                    ? "no-drop"
                                    : "pointer",
                                opacity: state.useCaseBuilder?.enabled ? 0.5 : 1,
                            }}
                        >
                            <img
                                src={deleteIcon}
                                width="15"
                                height="15"
                                alt="deleteIcon"
                            />
                        </ButtonDesign>
                    </Tooltip>
                </div>
            </div>
            <div className="use-case-editor-piplines">
                {isLoading && (
                    <div className="loader-uploading">
                        <div></div>
                        <img src={loading} alt="loading"></img>
                    </div>
                )}
                {/* {usecasePipelines &&
                    usecasePipelines.length > 0 &&
                    usecasePipelines?.map((pipline) => (
                        <PiplineOverview
                            key={pipline._id}
                            piplineStatus={pipline}
                            showPanelAction="true"
                            handleEditPipline={(stepNumber) =>
                                handleEditPipline(stepNumber)
                            }
                            handleRunPipline={(pipelineId) =>
                                handleRunPipline(pipelineId)
                            }
                            handleTerminatePipline={(pipelineId) =>
                                handleTerminatePipline(pipelineId)
                            }
                            handleRemovePipline={(pipelineId) =>
                                handleRemovePipline(pipelineId)
                            }
                            handleEnablePipline={(pipelineId) =>
                                handleEnablePipline(pipelineId)
                            }
                            handleDisablePipline={(pipelineId) =>
                                handleDisablePipline(pipelineId)
                            }
                            handleDuplicatePipeline={(pipelineId) =>
                                handleDuplicatePipeline(pipelineId)
                            }
                        />
                    ))} */}
                {!isLoading && usecasePipelines.length === 0 && (
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
