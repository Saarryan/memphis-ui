import "./createChannelDetails.scss";
import React, { useState } from "react";
import Input from "../../../../components/Input/Input"
import RadioButton from "../../../../components/radioButton/radioButton";
import TextField from "@material-ui/core/TextField";
const CreateChannelDetails = () => {

    const [formFields, setFormFields] = useState({
        name: "", retention_type: 0, retention_value: "", throughput_type: 0, throughput_value: ""
    });
    const retanionOptions = [
        {
            "id": 1,
            "value": 0,
            "label": "Time"
        },
        {
            "id": 2,
            "value": 1,
            "label": "Size"
        },
        {
            "id": 3,
            "value": 2,
            "label": "Queue"
        }
    ];
    const throughputOptions = [
        {
            "id": 1,
            "value": 0,
            "label": "Messages"
        },
        {
            "id": 2,
            "value": 1,
            "label": "Size"
        }
    ];
    const handleUserNameChange = () => {

    }
    const retentionTypeChange = (e) => {
        setFormFields({ ...formFields, retention_type: e.target.value });
    }
    const throughputTypeChange = (e) => {
        setFormFields({ ...formFields, throughput_type: e.target.value });
    }

    return (
        <div className="create-channel-form">
            <div className="channel-name">
                <p>Channel name</p>
                <Input
                    placeholder="Type channel name"
                    type="email"
                    radiusType="semi-round"
                    colorType="black"
                    backgroundColorType="none"
                    borderColorType="gray"
                    width="500px"
                    height="40px"
                    onBlur={handleUserNameChange}
                    onChange={handleUserNameChange}
                    value={formFields.name}
                />
            </div>
            <div className="retention">
                <p>Retention</p>
                <RadioButton
                    options={retanionOptions}
                    radioValue={formFields.retention_type}
                    onChange={(e) => retentionTypeChange(e)}
                />
                <TextField InputLabelProps={{ shrink: true }} />
            </div>
            <div className="throughput">
                <p>Max throughput</p>
                <RadioButton
                    options={throughputOptions}
                    radioValue={formFields.throughput_type}
                    onChange={(e) => throughputTypeChange(e)}
                />
            </div>
        </div>
    )
}

export default CreateChannelDetails;