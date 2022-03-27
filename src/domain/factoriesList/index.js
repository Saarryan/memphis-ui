import './style.scss';

import React, { useEffect, useContext, useState, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';

import Button from '../../components/button';
import { Context } from '../../hooks/store';
import Modal from '../../components/modal';
import pathControllers from '../../router';
import Factory from './factory';
import CreateFactoryDetails from './createFactoryDetails';
import pathContainers from '../../router';
import { ApiEndpoints } from '../../const/apiEndpoints';
import { httpRequest } from '../../services/http';

function FactoriesList() {
    const [state, dispatch] = useContext(Context);
    const history = useHistory();
    const [factoriesList, setFactoriesList] = useState([]);
    const [modalIsOpen, modalFlip] = useState(false);
    const createFactoryRef = useRef(null);

    useEffect(() => {
        dispatch({ type: 'SET_ROUTE', payload: 'factories' });
        getAllFactories();
    }, []);

    const getAllFactories = async () => {
        try {
            const data = await httpRequest('GET', ApiEndpoints.GEL_ALL_FACTORIES);
            if (data) {
                setFactoriesList(data);
            }
        } catch (error) {}
    };

    const removeFactory = (id) => {
        setFactoriesList(factoriesList.filter((item) => item.id !== id));
    };

    return (
        <div>
            <div className="factories-container">
                <div className="one-edge-shadow">
                    <h1 className="main-header-h1">Factories</h1>
                    <div className="factories-header-flex">
                        <h3>Select an factory to edit</h3>
                        <Button
                            className="modal-btn"
                            width="160px"
                            height="36px"
                            placeholder={'Create new factory'}
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
                <div className="factories-list">
                    {factoriesList.map((factory) => {
                        return <Factory key={factory.id} content={factory} removeFactory={() => removeFactory(factory.id)}></Factory>;
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
                header="Create new factory"
                height="475px"
                minWidth="440px"
                rBtnText="Create"
                lBtnText="Cancel"
                closeAction={() => modalFlip(false)}
                lBtnClick={() => {
                    modalFlip(false);
                }}
                clickOutside={() => modalFlip(false)}
                rBtnClick={() => {
                    createFactoryRef.current();
                    // modalFlip(false);
                }}
                open={modalIsOpen}
            >
                <CreateFactoryDetails createFactoryRef={createFactoryRef} />
            </Modal>
        </div>
    );
}

export default FactoriesList;
