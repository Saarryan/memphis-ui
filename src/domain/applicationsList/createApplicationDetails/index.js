import './style.scss';

import React, { useEffect, useState } from 'react';
import { Form } from 'antd';

import Input from '../../../components/Input';

const CreateApplicationDetails = ({ createApplicationRef }) => {
    const [creationForm] = Form.useForm();
    useEffect(() => {
        createApplicationRef.current = onFinish;
    }, []);

    const [formFields, setFormFields] = useState({
        name: '',
        description: ''
    });
    const handleApplicationNameChange = (e) => {
        setFormFields({ ...formFields, name: e.target.value });
    };
    const handleDescriptionNameChange = (e) => {
        setFormFields({ ...formFields, description: e.target.value });
    };

    const onFinish = () => {
        const isFieldsValidating = creationForm.isFieldsValidating();
        if (!isFieldsValidating) {
            return;
        } else {
        }
        // console.log('Success:', values);
    };

    return (
        <div className="create-application-form">
            <Form name="form" form={creationForm} autoComplete="off">
                <Form.Item
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your username!'
                        }
                    ]}
                >
                    <div className="field name">
                        <p>Application name</p>
                        <Input
                            placeholder="Type application name"
                            type="text"
                            radiusType="semi-round"
                            colorType="black"
                            backgroundColorType="none"
                            borderColorType="gray"
                            width="500px"
                            height="40px"
                            fontSize="12px"
                            onBlur={handleApplicationNameChange}
                            onChange={handleApplicationNameChange}
                            value={formFields.name}
                        />
                    </div>
                </Form.Item>
                <div className="field description">
                    <p>Description</p>
                    <Input
                        placeholder="Type application name"
                        type="textArea"
                        radiusType="semi-round"
                        colorType="black"
                        backgroundColorType="none"
                        borderColorType="gray"
                        width="500px"
                        numberOfRows="5"
                        fontSize="12px"
                        onBlur={handleDescriptionNameChange}
                        onChange={handleDescriptionNameChange}
                        value={formFields.description}
                    />
                </div>
            </Form>
        </div>
    );
};

export default CreateApplicationDetails;
