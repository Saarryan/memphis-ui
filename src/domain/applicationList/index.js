import './style.scss';

import React, { useEffect, useContext, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';

import Application from './application';
import Button from '../../components/button';
import { Context } from '../../hooks/store';
import pathControllers from '../../router';

function ApplicationList() {
    const [state, dispatch] = useContext(Context);
    const history = useHistory();
    const [applicationList, setApplicationList] = useState([
        {
            _id: 1,
            name: 'Strech',
            description: 'bla bla'
        }
    ]);

    useEffect(() => {
        dispatch({ type: 'SET_ROUTE', payload: 'applications' });
    }, []);

    const createApplication = () => {
        //Here we need to implement creation new app and return appId with empty queues
        history.push(`${pathControllers.applicationList}/newApplication`);
    };

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
                            onClick={openModal}
                        />
                    </div>
                </div>
                <div className="application-list">
                    {applicationList.map((application) => {
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
                {/* <Application
          createNewUsecase={() => {
            handleCloseMenu();
            handleCreateUseCaseClicked();
          }}
        /> */}
            </div>
        </div>
    );
}

export default ApplicationList;
