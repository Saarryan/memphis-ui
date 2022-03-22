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

function ApplicationsList() {
    const [state, dispatch] = useContext(Context);
    const history = useHistory();
    const [applicationsList, setApplicationsList] = useState([
        {
            _id: 1,
            name: 'Strech',
            description: 'bla bla'
        }
    ]);
    const [modalIsOpen, modalFlip] = useState(false);
    const createApplicationRef = useRef(null);

    useEffect(() => {
        dispatch({ type: 'SET_ROUTE', payload: 'applications' });
    }, []);

    // const createApplication = () => {
    //     //Here we need to implement creation new app and return appId with empty queues
    //     history.push(`${pathControllers.applicationsList}/newApplication`);
    // };

    const openModal = () => {
        //Here we need a new modal with name and description fields
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
                            fontWeight="bold"
                            aria-haspopup="true"
                            onClick={() => modalFlip(true)}
                        />
                    </div>
                </div>
                <div className="application-list">
                    {applicationsList.map((application) => {
                        return <Application key={application._id} content={application}></Application>;
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
                    //history.push(`${pathContainers.applicationsList}/1`);
                }}
                open={modalIsOpen}
            >
                <CreateApplicationDetails createApplicationRef={createApplicationRef} />
            </Modal>
        </div>
    );
}

export default ApplicationsList;
