import './style.scss';

import React, { useEffect, useState } from 'react';
import { Form } from 'antd';
import { CopyOutlined } from '@ant-design/icons';

import Input from '../../../components/Input';
import RadioButton from '../../../components/radioButton';
import { httpRequest } from '../../../services/http';
import { ApiEndpoints } from '../../../const/apiEndpoints';
import SelectComponent from '../../../components/select';
import Button from '../../../components/button';

const CreateUserDetails = ({ createUserRef, props }) => {
    const [creationForm] = Form.useForm();
    const [formFields, setFormFields] = useState({
        username: '',
        password: '',
        user_type: 'Managment'
    });
    const [passwordType, setPasswordType] = useState(0);
    const [copySuccess, setCopySuccess] = useState('');
    const [fadeProp, setFadeProp] = useState({ fade: 'fade-in-modal' });
    let generatePassword = '123456';

    const userTypeOptions = ['Managment', 'Application'];

    const passwordOptions = [
        {
            id: 1,
            value: 0,
            label: 'Default'
        },
        {
            id: 2,
            value: 1,
            label: 'Custom'
        }
    ];

    useEffect(() => {
        createUserRef.current = onFinish;
    }, []);

    const passwordTypeChange = (e) => {
        setPasswordType(e.target.value);
    };

    const handleUserNameChange = (e) => {
        setFormFields({ ...formFields, username: e.target.value });
    };

    const handlePasswordChange = (password) => {
        setFormFields({ ...formFields, password: password });
    };

    const handleSelectUserType = (e) => {
        setFormFields({ ...formFields, user_type: e.target.value });
    };

    const onFinish = async () => {
        const fieldsError = await creationForm.validateFields();
        if (fieldsError?.errorFields) {
            return;
        } else {
            try {
                debugger;
                const bodyRequest = creationForm.getFieldsValue();
                const data = await httpRequest('POST', ApiEndpoints.ADD_USER, bodyRequest);
                if (data) {
                    props.closeModal();
                }
            } catch (error) {}
        }
    };

    const copyToClipboard = (e) => {
        setFadeProp({
            fade: 'fade-in-modal'
        });
        navigator.clipboard.writeText(generatePassword);
        setCopySuccess('Copied!');
        setTimeout(() => {
            setFadeProp({
                fade: 'fade-out-modal'
            });
        }, 3000);
    };

    return (
        <div className="create-user-form">
            <Form name="form" form={creationForm} autoComplete="off">
                <Form.Item
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: 'Please input username!'
                        }
                    ]}
                >
                    <div className="field username">
                        <p>Username</p>
                        <Input
                            placeholder="Type username"
                            type="text"
                            radiusType="semi-round"
                            colorType="black"
                            backgroundColorType="none"
                            borderColorType="gray"
                            width="508px"
                            height="40px"
                            fontSize="12px"
                            onBlur={handleUserNameChange}
                            onChange={handleUserNameChange}
                            value={formFields.name}
                        />
                    </div>
                </Form.Item>
                <Form.Item name="user_type">
                    <div className="field user-type">
                        <p>Type</p>
                        <SelectComponent
                            value={formFields.user_type}
                            colorType="black"
                            backgroundColorType="none"
                            borderColorType="gray"
                            radiusType="semi-round"
                            width="508px"
                            height="40px"
                            options={userTypeOptions}
                            onChange={(e) => handleSelectUserType(e)}
                            dropdownClassName="functions-field"
                        />
                    </div>
                </Form.Item>
                <div className="password-section">
                    <p>Password</p>
                    <RadioButton options={passwordOptions} radioValue={passwordType} onChange={(e) => passwordTypeChange(e)} />

                    {passwordType === 0 && (
                        <Form.Item name="password">
                            {/* <div className="field password">
                                <Input
                                    type="text"
                                    disabled
                                    radiusType="semi-round"
                                    colorType="black"
                                    backgroundColorType="none"
                                    borderColorType="gray"
                                    width="508px"
                                    height="40px"
                                    fontSize="12px"
                                    value={generatePassword}
                                />
                            </div> */}
                            <div className="api-key-url-container">
                                <div className="AK-url">
                                    <span className="api-key">{generatePassword}</span>
                                    <div className="copy-button">
                                        <Button
                                            className="copy-button"
                                            width="4vh"
                                            height="4vh"
                                            placeholder={<CopyOutlined className="copy-button-icon" />}
                                            radiusType="semi-round"
                                            backgroundColorType="none"
                                            fontSize="14px"
                                            minWidth="30px"
                                            minHeight="30px"
                                            fontWeight="bold"
                                            marginBottom="unset"
                                            boxShadowStyle="gray"
                                            onClick={copyToClipboard}
                                        ></Button>
                                    </div>
                                </div>
                                <span className={fadeProp.fade}>{copySuccess}</span>
                            </div>
                        </Form.Item>
                    )}
                    {passwordType === 1 && (
                        <div>
                            <div className="field password">
                                <p>Type password</p>
                                <Form.Item
                                    name="password"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Password can not be empty'
                                        }
                                    ]}
                                >
                                    <Input
                                        placeholder="Type Password"
                                        type="password"
                                        radiusType="semi-round"
                                        colorType="black"
                                        backgroundColorType="none"
                                        borderColorType="gray"
                                        width="508px"
                                        height="40px"
                                        fontSize="12px"
                                    />
                                </Form.Item>
                            </div>
                            <div className="field description">
                                <p>Confirm Password</p>
                                <Form.Item
                                    name="confirm"
                                    validateTrigger="onChange"
                                    dependencies={['password']}
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Confirm password can not be empty'
                                        },
                                        ({ getFieldValue }) => ({
                                            validator(rule, value) {
                                                if (!value || getFieldValue('password') === value) {
                                                    handlePasswordChange(value);
                                                    return Promise.resolve();
                                                }
                                                return Promise.reject('Passwords do not match');
                                            }
                                        })
                                    ]}
                                >
                                    <Input
                                        placeholder="Type Password"
                                        type="password"
                                        radiusType="semi-round"
                                        colorType="black"
                                        backgroundColorType="none"
                                        borderColorType="gray"
                                        width="508px"
                                        height="40px"
                                        fontSize="12px"
                                    />
                                </Form.Item>
                            </div>
                        </div>
                    )}
                </div>
            </Form>
        </div>
    );
};

export default CreateUserDetails;
