import './style.scss';

import React, { useEffect, useContext, useState, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';

import Button from '../../components/button';
import { Context } from '../../hooks/store';
import Modal from '../../components/modal';
import pathControllers from '../../router';
import Application from './application';
import CreateApplicationDetails from './createApplicationDetails';
import pathContainers from '../../router';
import { ApiEndpoints } from '../../const/apiEndpoints';
import { httpRequest } from '../../services/http';

function ApplicationsList() {
    const [state, dispatch] = useContext(Context);
    const history = useHistory();
    const [applicationsList, setApplicationsList] = useState([]);
    const [modalIsOpen, modalFlip] = useState(false);
    const createApplicationRef = useRef(null);

    useEffect(() => {
        dispatch({ type: 'SET_ROUTE', payload: 'applications' });
        getAllApplication();
    }, []);

    const getAllApplication = async () => {
        try {
            const data = await httpRequest('GET', ApiEndpoints.GEL_ALL_APPLICATION);
            if (data) {
                setApplicationsList(data);
            }
        } catch (error) {}
    };

    const removeApplication = (id) => {
        setApplicationsList(applicationsList.filter((item) => item.id !== id));
    };

    return (
        <div>
            <div className="applications-container">
                <div className="one-edge-shadow">
                    <h1 className="main-header-h1">Application</h1>
                    <div className="applications-header-flex">
                        <h3>Select an application to edit</h3>
                        <Button
                            className="modal-btn"
                            width="150px"
                            height="36px"
                            placeholder={'Create application'}
                            colorType="lightPurple"
                            radiusType="circle"
                            backgroundColorType="darkPurple"
                            fontSize="14px"
                            fontWeight="600"
                            aria-haspopup="true"
                            onClick={() => modalFlip(true)}
                        />
                    </div>
                </div>
                <div className="application-list">
                    {applicationsList.map((application) => {
                        return <Application key={application.id} content={application} removeApplication={() => removeApplication(application.id)}></Application>;
                    })}
                    {/* {isLoading && (
            <div className="loader-uploading">
              <img alt="loading" src={loading}></img>
            </div>
          )}
          {!isLoading && usecases.length === 0 && (
            <div className="no-pipline-to-display">
              <InboxOutlined
                style={{ fontSize: "40px", color: "#5D4AEE" }}
                theme="outlined"
              />
              <p className="nodata">No use cases to display</p>
              <Button
                className="modal-btn"
                width="240px"
                height="36px"
                placeholder={<Trans>Create your first use case</Trans>}
                colorType="white"
                radiusType="circle"
                backgroundColorType="orange"
                fontSize="14px"
                fontWeight="bold"
                aria-controls="usecse-menu"
                aria-haspopup="true"
                onClick={handleCreateNewUsecase}
              />
            </div>
          )} */}
                </div>
            </div>
            <Modal
                header="Your factory details"
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
                    createApplicationRef.current();
                    // modalFlip(false);
                }}
                open={modalIsOpen}
            >
                <CreateApplicationDetails createApplicationRef={createApplicationRef} />
            </Modal>
        </div>
    );
}

export default ApplicationsList;
