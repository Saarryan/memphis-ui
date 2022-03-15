import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import { makeStyles } from "@material-ui/core/styles";
import { Divider } from 'antd';
import Close from "../../../../assets/images/close.svg"
import Input from "../../../../components/Input/Input"
import SelectComponent from "../../../../components/select/select";
import Button from "../../../../components/button/button"
import "./functionForm.scss";


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    dialogPaper: {
        height: "50vh",
        minHeight: "550px",
        width: "30vw",
        minWidth: "500px",
        borderRadius: "10px",
        paddingTop: "15px",
        paddingLeft: "15px",
        overflowX: "hidden"
    },
}));

function FunctionForm(props) {
    const classes = useStyles();
    const [formFields, setFormFields] = useState({
        fieldToAnalyze: "",
        outputField: "",
    });

    const handelChangeFieldToAnalyze = e => {
        setFormFields({ ...formFields, fieldToAnalyze: e.target.value })
    }

    const handelChangeOutputField = e => {
        setFormFields({ ...formFields, outputField: e })
    }

    const clearFormAndClose = () => {
        setFormFields({
            fieldToAnalyze: "",
            outputField: ""
        })
        props.closeModal(false)
    }

    return (
        <Dialog
            open={props.open}
            onClose={(_, reson) => {
                if (reson === "backdropClick")
                    clearFormAndClose()
            }}
            classes={{ paper: classes.dialogPaper }}
        >
            <DialogContent>
                {
                    props.chosenFunction && <div className="function-form">
                        <div className="function-form-header">
                            <div className="function-details">
                                {props.chosenFunction.funcImg ? <img src={props.chosenFunction.funcImg} alt="function" width="50" height="50" className="img-placeholder" /> : <div className="img-placeholder" />}
                                <div>
                                    <p className="function-name">{props.chosenFunction.funcName}</p>
                                    <p className="data-type">Data type: {props.chosenFunction.inputDataType}</p>
                                </div>
                            </div>
                            <img src={Close} alt="close" width="12" height="12" className="close-form" onClick={clearFormAndClose} />
                        </div>
                        <div className="input-section">
                            <div className="input-item">
                                <p>Field to analyze</p>
                                <Input
                                    value={handelChangeFieldToAnalyze.fieldToAnalyze}
                                    placeholder="Type password"
                                    type="text"
                                    radiusType="semi-round"
                                    borderColorType="none"
                                    boxShadowsType="gray"
                                    colorType="black"
                                    backgroundColorType="none"
                                    minWidth="12vw"
                                    width="220px"
                                    height="40px"
                                    iconComponent=""
                                    onChange={(e) => handelChangeFieldToAnalyze(e)}
                                />
                            </div>
                            <div className="input-item">
                                <p>Output field</p>
                                <SelectComponent
                                    value={handelChangeFieldToAnalyze.outputField}
                                    placeholder="Output field"
                                    colorType="navy"
                                    backgroundColorType="none"
                                    borderColorType="gray"
                                    radiusType="semi-round"
                                    minWidth="12vw"
                                    width="220px"
                                    height="40px"
                                    options={["op1", "op2"]}
                                    boxShadowsType="gray"
                                    onChange={(e) => handelChangeOutputField(e)}
                                    dropdownClassName="pipline-field" />
                            </div>
                        </div>
                    </div>
                }
            </DialogContent>
            <div className="function-form-footer">
                <Divider />
                <div>
                    <Button
                        className="modal-btn"
                        width="90px"
                        height="32px"
                        placeholder={"Add"}
                        colorType="lightPurple"
                        radiusType="circle"
                        backgroundColorType={"darkPurple"}
                        fontSize="14px"
                        fontWeight="bold"
                        aria-haspopup="true"
                        onClick={clearFormAndClose}
                    />
                </div>
            </div>

        </Dialog>);
}
export default FunctionForm;
