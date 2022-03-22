import './style.scss';

import React, { useEffect, useState } from 'react';
import { Form } from 'antd';

import Input from '../../../components/Input';
import { httpRequest } from '../../../services/http';
import { ApiEndpoints } from '../../../const/apiEndpoints';

const CreateApplicationDetails = ({ createApplicationRef }) => {
    const [creationForm] = Form.useForm();
    const [formFields, setFormFields] = useState({
        name: '',
        description: ''
    });

    useEffect(() => {
        createApplicationRef.current = onFinish;
    }, []);
    const handleApplicationNameChange = (e) => {
        setFormFields({ ...formFields, name: e.target.value });
    };
    const handleDescriptionNameChange = (e) => {
        setFormFields({ ...formFields, description: e.target.value });
    };

    const onFinish = async () => {
        debugger;
        creationForm.submit();
        const fieldsError = creationForm.getFieldsError();
        if (fieldsError?.length > 0) {
            return;
        } else {
            const bodyRequest = formFields;
            try {
                const data = await httpRequest('POST', ApiEndpoints.CREATE_APPLICATION, bodyRequest);
                if (data) {
                    debugger;
                }
            } catch (error) {}
        }
        // console.log('Success:', values);
    };

    return (
        <div className="create-application-form">
            <Form name="form" form={creationForm} autoComplete="off">
                <Form.Item
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: 'Please input application name!'
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
