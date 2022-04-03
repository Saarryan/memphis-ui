import './style.scss';

import React, { useEffect, useState } from 'react';
import { Form } from 'antd';

import Input from '../../../components/Input';
import { httpRequest } from '../../../services/http';
import { ApiEndpoints } from '../../../const/apiEndpoints';
import { useHistory } from 'react-router-dom';
import pathDomains from '../../../router';

const CreateFactoryDetails = (props) => {
    const { createFactoryRef } = props;
    const [creationForm] = Form.useForm();
    const [formFields, setFormFields] = useState({
        name: '',
        description: ''
    });
    const history = useHistory();

    useEffect(() => {
        createFactoryRef.current = onFinish;
    }, []);

    const handleFactoryNameChange = (e) => {
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
                const data = await httpRequest('POST', ApiEndpoints.CREATE_FACTORY, bodyRequest);
                if (data) {
                    history.push(`${pathDomains.factoriesList}/${data.name}`);
                }
            } catch (error) {}
        }
    };

    return (
        <div className="create-factory-form">
            <Form name="form" form={creationForm} autoComplete="off">
                <Form.Item
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: 'Please input factory name!'
                        }
                    ]}
                >
                    <div className="field name">
                        <p>Factory name</p>
                        <Input
                            placeholder="Type factory name"
                            type="text"
                            radiusType="semi-round"
                            colorType="black"
                            backgroundColorType="none"
                            borderColorType="gray"
                            width="395px"
                            height="40px"
                            fontSize="12px"
                            onBlur={handleFactoryNameChange}
                            onChange={handleFactoryNameChange}
                            value={formFields.name}
                        />
                    </div>
                </Form.Item>
                <Form.Item name="description">
                    <div className="field description">
                        <p>Factory description</p>
                        <Input
                            placeholder="Type factory name"
                            type="textArea"
                            radiusType="semi-round"
                            colorType="black"
                            backgroundColorType="none"
                            borderColorType="gray"
                            width="400px"
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

export default CreateFactoryDetails;
