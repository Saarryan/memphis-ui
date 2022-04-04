import './style.scss';

import React, { useState, useEffect } from 'react';
import { Form, InputNumber } from 'antd';

import RadioButton from '../radioButton';
import Input from '../Input';
import Select from '../select';
import { httpRequest } from '../../services/http';
import { ApiEndpoints } from '../../const/apiEndpoints';
import { convertDateToSeconds } from '../../services/dateConvertor';
import { useHistory } from 'react-router';
import pathDomains from '../../router';

const CreateStationDetails = (props) => {
    const { chooseFactoryField = false, createStationRef, factoryName = '' } = props;
    const [factoryNames, setFactoryNames] = useState([]);
    const [creationForm] = Form.useForm();
    const history = useHistory();
    const [formFields, setFormFields] = useState({
        name: '',
        factory_name: '',
        retention_type: 'message_age_sec',
        retention_value: '',
        storage_type: 'file',
        replicas: 1
    });
    const [timeSeparator, setTimeSeparator] = useState({
        days: 7,
        hours: 0,
        minutes: 0,
        seconds: 0
    });
    const [retentionMessagesValue, setRetentionMessagesValue] = useState('10');
    const [retentionSizeValue, setRetentionSizeValue] = useState('1000');

    const retanionOptions = [
        {
            id: 1,
            value: 'message_age_sec',
            label: 'Time'
        },
        {
            id: 2,
            value: 'bytes',
            label: 'Size'
        },
        {
            id: 3,
            value: 'messages',
            label: 'Messages'
        }
    ];
    const storageOptions = [
        {
            id: 1,
            value: 'file',
            label: 'File'
        },
        {
            id: 2,
            value: 'memory',
            label: 'Memory'
        }
    ];

    useEffect(() => {
        createStationRef.current = onFinish;
        setFormFields({ ...formFields, factory_name: factoryName });
        if (chooseFactoryField) {
            getAllFactories();
        }
    }, []);

    const getAllFactories = async () => {
        try {
            const data = await httpRequest('GET', ApiEndpoints.GEL_ALL_FACTORIES);
            if (data) {
                if (data.length === 0) {
                    setFormFields({ ...formFields, factory_name: 'General' });
                } else {
                    setFormFields({ ...formFields, factory_name: data[0].name });
                }
                const factories = data.map((factory) => factory.name);
                setFactoryNames(factories);
            }
        } catch (error) {}
    };

    const handleFactoryNamesChange = (e) => {
        setFormFields({ ...formFields, factory_name: e });
    };
    const handleStationNameChange = (e) => {
        setFormFields({ ...formFields, name: e.target.value });
    };
    const retentionTypeChange = (e) => {
        setFormFields({ ...formFields, retention_type: e.target.value });
    };
    const handleRetentionSizeChange = (e) => {
        setRetentionSizeValue(e.target.value);
    };
    const handleRetentionMessagesChange = (e) => {
        setRetentionMessagesValue(e.target.value);
    };
    const storageTypeChange = (e) => {
        setFormFields({ ...formFields, storage_type: e.target.value });
    };
    const handleReplicasChange = (e) => {
        setFormFields({ ...formFields, replicas: e });
    };
    const handleDaysChange = (e) => {
        setTimeSeparator({ ...timeSeparator, days: e });
    };
    const handleHoursChange = (e) => {
        setTimeSeparator({ ...timeSeparator, hours: e });
    };
    const handleMinutesChange = (e) => {
        setTimeSeparator({ ...timeSeparator, minutes: e });
    };
    const handleSecondsChange = (e) => {
        setTimeSeparator({ ...timeSeparator, seconds: e });
    };

    const onFinish = async () => {
        const fieldsError = creationForm.validateFields();
        if (fieldsError?.errorFields) {
            return;
        } else {
            let formFields = creationForm.getFieldsValue();
            if (formFields.retention_type === 'message_age_sec') {
                formFields['retention_value'] = convertDateToSeconds(formFields.days, formFields.hours, formFields.minutes, formFields.seconds);
            } else if (formFields.retention_type === 'bytes') {
                formFields['retention_value'] = Number(formFields.retentionSizeValue);
            } else {
                formFields['retention_value'] = Number(formFields.retentionMessagesValue);
            }
            try {
                const bodyRequest = {
                    name: formFields.name,
                    factory_name: formFields.factory_name || factoryName,
                    retention_type: formFields.retention_type,
                    retention_value: formFields.retention_value,
                    storage_type: formFields.storage_type,
                    replicas: formFields.replicas
                };
                const data = await httpRequest('POST', ApiEndpoints.CREATE_STATION, bodyRequest);
                if (data) {
                    history.push(`${pathDomains.factoriesList}/${bodyRequest.factory_name}/${data.name}`);
                }
            } catch (error) {}
        }
    };

    return (
        <div className="create-station-form">
            <Form name="form" form={creationForm} autoComplete="off" onFinish={onFinish}>
                <Form.Item
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: 'Please input station name!'
                        }
                    ]}
                    style={{ height: '90px', marginBottom: '0' }}
                >
                    <div className="station-name">
                        <p className="field-title">Station name</p>
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
                </Form.Item>
                <div className="retention">
                    <p className="field-title">Retention</p>
                    <Form.Item name="retention_type" initialValue={formFields.retention_type}>
                        <RadioButton options={retanionOptions} radioValue={formFields.retention_type} onChange={(e) => retentionTypeChange(e)} />
                    </Form.Item>
                    {formFields.retention_type === 'message_age_sec' && (
                        <div className="time-value">
                            <div className="days-section">
                                <Form.Item name="days" initialValue={timeSeparator.days}>
                                    <InputNumber bordered={false} min={0} max={100} keyboard={true} onChange={(e) => handleDaysChange(e)} value={timeSeparator.days} />
                                </Form.Item>
                                <p>days</p>
                            </div>
                            <p className="separator">:</p>
                            <div className="hours-section">
                                <Form.Item name="hours" initialValue={timeSeparator.hours}>
                                    <InputNumber bordered={false} min={0} max={24} keyboard={true} onChange={(e) => handleHoursChange(e)} value={timeSeparator.hours} />
                                </Form.Item>
                                <p>hours</p>
                            </div>
                            <p className="separator">:</p>
                            <div className="minutes-section">
                                <Form.Item name="minutes" initialValue={timeSeparator.minutes}>
                                    <InputNumber
                                        bordered={false}
                                        min={0}
                                        max={60}
                                        keyboard={true}
                                        onChange={(e) => handleMinutesChange(e)}
                                        value={timeSeparator.minutes}
                                    />
                                </Form.Item>
                                <p>minutes</p>
                            </div>
                            <p className="separator">:</p>
                            <div className="seconds-section">
                                <Form.Item name="seconds" initialValue={timeSeparator.seconds}>
                                    <InputNumber
                                        bordered={false}
                                        min={0}
                                        max={60}
                                        keyboard={true}
                                        onChange={(e) => handleSecondsChange(e)}
                                        value={timeSeparator.seconds}
                                    />
                                </Form.Item>
                                <p>seconds</p>
                            </div>
                        </div>
                    )}
                    {formFields.retention_type === 'bytes' && (
                        <Form.Item name="retentionSizeValue" initialValue={retentionSizeValue}>
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
                                    onBlur={(e) => handleRetentionSizeChange(e)}
                                    onChange={(e) => handleRetentionSizeChange(e)}
                                    value={retentionSizeValue}
                                />
                                <p>byts</p>
                            </div>
                        </Form.Item>
                    )}
                    {formFields.retention_type === 'messages' && (
                        <Form.Item name="retentionMessagesValue" initialValue={retentionMessagesValue}>
                            <div className="messages-value">
                                <Input
                                    placeholder="Type"
                                    type="number"
                                    radiusType="semi-round"
                                    colorType="black"
                                    backgroundColorType="none"
                                    borderColorType="gray"
                                    width="90px"
                                    height="38px"
                                    onBlur={(e) => handleRetentionMessagesChange(e)}
                                    onChange={(e) => handleRetentionMessagesChange(e)}
                                    value={retentionMessagesValue}
                                />
                                <p>messages</p>
                            </div>
                        </Form.Item>
                    )}
                </div>
                <div className="storage">
                    <p className="field-title">Storage Type</p>
                    <Form.Item name="storage_type" initialValue={formFields.storage_type}>
                        <RadioButton options={storageOptions} radioValue={formFields.storage_type} onChange={(e) => storageTypeChange(e)} />
                    </Form.Item>
                </div>
                <div className="replicas">
                    <p className="field-title">Replicas</p>
                    <div className="replicas-value">
                        <Form.Item name="replicas" initialValue={formFields.replicas}>
                            <InputNumber bordered={false} min={1} max={5} keyboard={true} value={formFields.replicas} onChange={(e) => handleReplicasChange(e)} />
                        </Form.Item>
                        <p>replicas</p>
                    </div>
                </div>
                <div className="replicas-and-storage"></div>
                {chooseFactoryField && (
                    <div className="factory-name">
                        <p className="field-title">Factory name</p>
                        <Form.Item name="factory_name" initialValue={factoryNames[0] || formFields.factory_name || 'General'}>
                            <Select
                                value={factoryNames[0] || formFields.factory_name || 'General'}
                                colorType="navy"
                                backgroundColorType="none"
                                borderColorType="gray"
                                radiusType="semi-round"
                                width="500px"
                                height="40px"
                                options={factoryNames || 'General'}
                                onChange={(e) => handleFactoryNamesChange(e)}
                                dropdownClassName="select-options"
                            />
                        </Form.Item>
                    </div>
                )}
            </Form>
        </div>
    );
};

export default CreateStationDetails;
