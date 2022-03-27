import './style.scss';

import React, { useState } from 'react';
import { InputNumber } from 'antd';

import RadioButton from '../../../components/radioButton';
import Input from '../../../components/Input';

const CreateStationDetails = () => {
    const [formFields, setFormFields] = useState({
        name: '',
        retention_type: 0,
        retention_value: '',
        throughput_type: 0,
        throughput_value: ''
    });
    const retanionOptions = [
        {
            id: 1,
            value: 0,
            label: 'Time'
        },
        {
            id: 2,
            value: 1,
            label: 'Size'
        },
        {
            id: 3,
            value: 2,
            label: 'Station'
        }
    ];
    const throughputOptions = [
        {
            id: 1,
            value: 0,
            label: 'Messages'
        },
        {
            id: 2,
            value: 1,
            label: 'Size'
        }
    ];
    const handleStationNameChange = (e) => {
        setFormFields({ ...formFields, name: e.target.value });
    };

    const retentionTypeChange = (e) => {
        setFormFields({ ...formFields, retention_type: e.target.value });
    };
    const handleRetentionChange = (e) => {
        setFormFields({ ...formFields, retention_value: e.target.value });
    };
    const throughputTypeChange = (e) => {
        setFormFields({ ...formFields, throughput_type: e.target.value });
    };
    const handleThroughputChange = (e) => {
        setFormFields({ ...formFields, throughput_value: e.target.value });
    };

    return (
        <div className="create-station-form">
            <div className="station-name">
                <p>Station name</p>
                <Input
                    placeholder="Type station name"
                    type="text"
                    radiusType="semi-round"
                    colorType="black"
                    backgroundColorType="none"
                    borderColorType="gray"
                    width="500px"
                    height="40px"
                    onBlur={handleStationNameChange}
                    onChange={handleStationNameChange}
                    value={formFields.name}
                />
            </div>
            <div className="retention">
                <p>Retention</p>
                <RadioButton options={retanionOptions} radioValue={formFields.retention_type} onChange={(e) => retentionTypeChange(e)} />
                {formFields.retention_type === 0 && (
                    <div className="time-value">
                        <div className="days-section">
                            <InputNumber bordered={false} min={0} max={100} keyboard={true} defaultValue={7} />
                            <p>days</p>
                        </div>
                        <p className="separator">:</p>
                        <div className="hours-section">
                            <InputNumber bordered={false} min={0} max={24} keyboard={true} defaultValue={0} />
                            <p>hours</p>
                        </div>
                        <p className="separator">:</p>
                        <div className="minutes-section">
                            <InputNumber bordered={false} min={0} max={60} keyboard={true} defaultValue={0} />
                            <p>minutes</p>
                        </div>
                        <p className="separator">:</p>
                        <div className="seconds-section">
                            <InputNumber bordered={false} min={0} max={60} keyboard={true} defaultValue={0} />
                            <p>seconds</p>
                        </div>
                    </div>
                )}
                {formFields.retention_type === 1 && (
                    <div className="size-value">
                        <Input
                            placeholder="Type"
                            type="number"
                            radiusType="semi-round"
                            colorType="black"
                            backgroundColorType="none"
                            borderColorType="gray"
                            width="90px"
                            height="38px"
                            onBlur={handleRetentionChange}
                            onChange={handleRetentionChange}
                            value={formFields.retention_value}
                        />
                        <p>/s</p>
                    </div>
                )}
            </div>
            <div className="throughput">
                <p>Max throughput</p>
                <RadioButton options={throughputOptions} radioValue={formFields.throughput_type} onChange={(e) => throughputTypeChange(e)} />
                <div className="size-value">
                    <Input
                        placeholder="Type"
                        type="number"
                        radiusType="semi-round"
                        colorType="black"
                        backgroundColorType="none"
                        borderColorType="gray"
                        width="90px"
                        height="38px"
                        onBlur={handleThroughputChange}
                        onChange={handleThroughputChange}
                        value={formFields.throughput_value}
                    />
                    {formFields.throughput_type === 0 && <p>/s</p>}
                    {formFields.throughput_type === 1 && <p>/Mb</p>}
                </div>
            </div>
        </div>
    );
};

export default CreateStationDetails;
