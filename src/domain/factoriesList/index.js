import './style.scss';

import React, { useEffect, useContext, useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';

import CreateFactoryDetails from './createFactoryDetails';
import emptyList from '../../assets/images/emptyList.svg';
import { ApiEndpoints } from '../../const/apiEndpoints';
import loading from '../../assets/images/strech.gif';
import { httpRequest } from '../../services/http';
import Button from '../../components/button';
import { Context } from '../../hooks/store';
import Modal from '../../components/modal';
import Factory from './factory';

function FactoriesList() {
    const [state, dispatch] = useContext(Context);
    const history = useHistory();
    const [factoriesList, setFactoriesList] = useState([]);
    const [modalIsOpen, modalFlip] = useState(false);
    const createFactoryRef = useRef(null);
    const [isLoading, setisLoading] = useState(false);

    useEffect(() => {
        dispatch({ type: 'SET_ROUTE', payload: 'factories' });
        getAllFactories();
    }, []);

    const getAllFactories = async () => {
        setisLoading(true);
        try {
            const data = await httpRequest('GET', ApiEndpoints.GEL_ALL_FACTORIES);
            if (data) {
                setFactoriesList(data);
            }
        } catch (error) {}
        setisLoading(false);
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
                            colorType="white"
                            radiusType="circle"
                            backgroundColorType="purple"
                            fontSize="14px"
                            fontWeight="600"
                            aria-haspopup="true"
                            onClick={() => modalFlip(true)}
                        />
                    </div>
                </div>
                <div className="factories-list">
                    {isLoading && (
                        <div className="loader-uploading">
                            <div></div>
                            <img alt="loading" src={loading}></img>
                        </div>
                    )}
                    {factoriesList.map((factory) => {
                        return <Factory key={factory.id} content={factory} removeFactory={() => removeFactory(factory.id)}></Factory>;
                    })}
                    {!isLoading && factoriesList.length === 0 && (
                        <div className="no-factory-to-display">
                            <img src={emptyList} width="100" height="100" alt="emptyList" />
                            <p>There are no factories yet</p>
                            <p className="sub-title">Get started by creating a factory</p>
                            <Button
                                className="modal-btn"
                                width="240px"
                                height="50px"
                                placeholder="Create your first factory"
                                colorType="white"
                                radiusType="circle"
                                backgroundColorType="purple"
                                fontSize="12px"
                                fontWeight="600"
                                aria-controls="usecse-menu"
                                aria-haspopup="true"
                                onClick={() => modalFlip(true)}
                            />
                        </div>
                    )}
                </div>
            </div>
            <Modal
                header="Create factory"
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
