import './style.scss';

import React, { useEffect, useState } from 'react';
import { Form } from 'antd';

import Input from '../../../components/Input';
import { httpRequest } from '../../../services/http';
import { ApiEndpoints } from '../../../const/apiEndpoints';
import { useHistory } from 'react-router-dom';
import pathContainers from '../../../router';

const CreateApplicationDetails = ({ createApplicationRef }) => {
    const [creationForm] = Form.useForm();
    const [formFields, setFormFields] = useState({
        name: '',
        description: ''
    });
    const history = useHistory();

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
        const fieldsError = await creationForm.validateFields();
        if (fieldsError?.errorFields) {
            return;
        } else {
            try {
                const bodyRequest = creationForm.getFieldsValue();
                const data = await httpRequest('POST', ApiEndpoints.CREATE_APPLICATION, bodyRequest);
                if (data) {
                    history.push(`${pathContainers.applicationsList}/${data.name}`);
                }
            } catch (error) {}
        }
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
                <Form.Item name="description">
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
                </Form.Item>
            </Form>
        </div>
    );
};

export default CreateApplicationDetails;
