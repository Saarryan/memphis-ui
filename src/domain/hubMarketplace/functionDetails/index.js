import '../functionsList/style.scss';
import './style.scss';

import React, { useState } from 'react';

import Button from '../../../components/button';
import FunctionForm from '../functionForm';

function FunctionDetails(props) {
    const [isInstalled, setInstall] = useState(false); // Placeholder -  will be received from state
    const [openFunctionForm, setOpenFunctionForm] = useState(false);

    return (
        <div className="functions-details-container">
            <FunctionForm open={openFunctionForm} chosenFunction={props.chosenFunction} closeModal={() => setOpenFunctionForm(false)} />

            <div className="functions-details-header">
                <p>Details</p>
            </div>
            <div className="functions-details-body">
                {props.chosenFunction && (
                    <div>
                        <div className="function-details">
                            {props.chosenFunction.funcImg ? (
                                <img src={props.chosenFunction.funcImg} alt="function" width="50" height="50" className="img-placeholder" />
                            ) : (
                                <div className="img-placeholder" />
                            )}
                            <div>
                                <p className="function-name">{props.chosenFunction.funcName}</p>
                                <p className="data-type">Data type: {props.chosenFunction.inputDataType}</p>
                            </div>
                        </div>
                        <div className="functions-details-section">
                            <div className="func-description">{props.chosenFunction.funcDesc}</div>
                            <p className="visit-hub">Visit hub</p>
                        </div>
                    </div>
                )}
            </div>
            {props.chosenFunction && (
                <div className="functions-details-footer">
                    <Button
                        className="modal-btn"
                        width="90px"
                        height="32px"
                        placeholder={isInstalled ? 'Uninstall' : 'Install'}
                        colorType={isInstalled ? 'darkPurple' : 'lightPurple'}
                        backgroundColorType={isInstalled ? 'none' : 'darkPurple'}
                        border={isInstalled ? 'darkPurple' : null}
                        radiusType="circle"
                        fontSize="14px"
                        fontWeight="bold"
                        aria-haspopup="true"
                        onClick={() => setInstall(!isInstalled)}
                    />
                    <Button
                        className="modal-btn"
                        width="90px"
                        height="32px"
                        placeholder={'Use'}
                        colorType="lightPurple"
                        radiusType="circle"
                        backgroundColorType={'darkPurple'}
                        fontSize="14px"
                        fontWeight="bold"
                        aria-haspopup="true"
                        disabled={!isInstalled}
                        onClick={() => setOpenFunctionForm(true)}
                    />
                </div>
            )}
        </div>
    );
}
export default FunctionDetails;
