import './style.scss';

import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import PersonIcon from '@material-ui/icons/Person';
import LockIcon from '@material-ui/icons/Lock';
import { Form } from 'antd';

import { handleRefreshTokenRequest, httpRequest } from '../../services/http';
import AuthService from '../../services/auth';
import { LOCAL_STORAGE_TOKEN } from '../../const/localStorageConsts';
import fullLogo from '../../assets/images/fullLogo.svg';
import sharps from '../../assets/images/sharps.svg';
import { ApiEndpoints } from '../../const/apiEndpoints';
import Button from '../../components/button';
import Loader from '../../components/loader';
import { Context } from '../../hooks/store';
import Input from '../../components/Input';

const Desktop = ({ children }) => {
    const isDesktop = useMediaQuery({ minWidth: 850 });
    return isDesktop ? children : null;
};

const Mobile = ({ children }) => {
    const isMobile = useMediaQuery({ maxWidth: 849 });
    return isMobile ? children : null;
};

const Login = (props) => {
    const [state, dispatch] = useContext(Context);
    const history = useHistory();
    const [loginForm] = Form.useForm(); // form controller
    const [formFields, setFormFields] = useState({
        username: '',
        password: ''
    });
    const [error, setError] = useState('');
    const referer = props?.location?.state?.referer || '/overview';

    useEffect(async () => {
        if (AuthService.isValidToken()) {
            history.push(referer);
        }
    }, []);

    const handleUserNameChange = (e) => {
        setFormFields({ ...formFields, username: e.target.value });
    };

    const handlePasswordChange = (e) => {
        setFormFields({ ...formFields, password: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const values = await loginForm.validateFields();
        if (values?.errorFields) {
            return;
        } else {
            try {
                const { username, password } = formFields;
                const data = await httpRequest('POST', ApiEndpoints.LOGIN, { username, password }, {}, {}, false);
                if (data) {
                    AuthService.saveToLocalStorage(data);
                    history.push(referer);
                    return data;
                }
                dispatch({ type: 'SET_USER_DATA', payload: data });
            } catch (err) {
                setError(err);
            }
        }
    };

    const layout = {
        labelCol: {
            span: 8
        },
        wrapperCol: {
            span: 16
        }
    };

    const tailLayout = {
        wrapperCol: {
            offset: 8,
            span: 16
        }
    };

    return (
        <section className="loginContainers">
            {state.loading ? <Loader></Loader> : ''}
            <Desktop>
                <div className="desktop-container">
                    <div className="desktop-content">
                        <div className="logoImg">
                            <img alt="logo" src={fullLogo}></img>
                        </div>
                        <div className="title">
                            <p>Hey Memphiser,</p>
                            <p>Welcome Back</p>
                        </div>
                        <div className="login-form">
                            <Form
                                {...layout}
                                name="basic"
                                initialValues={{
                                    remember: true
                                }}
                                form={loginForm}
                            >
                                <Form.Item
                                    name="username"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Username can not be empty'
                                        }
                                    ]}
                                >
                                    <div className="field name">
                                        <p>Username</p>
                                        <Input
                                            placeholder="Type username"
                                            type="text"
                                            radiusType="semi-round"
                                            colorType="gray"
                                            backgroundColorType="none"
                                            borderColorType="gray"
                                            width="19vw"
                                            height="43px"
                                            onBlur={handleUserNameChange}
                                            onChange={handleUserNameChange}
                                            value={formFields.username}
                                        />
                                    </div>
                                </Form.Item>
                                <Form.Item
                                    name="password"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Password can not be empty'
                                        }
                                    ]}
                                >
                                    <div className="field password">
                                        <p>Password</p>
                                        <Input
                                            placeholder="Password"
                                            type="password"
                                            radiusType="semi-round"
                                            colorType="gray"
                                            backgroundColorType="none"
                                            borderColorType="gray"
                                            width="19vw"
                                            height="43px"
                                            onChange={handlePasswordChange}
                                            onBlur={handlePasswordChange}
                                            value={formFields.password}
                                        />
                                    </div>
                                </Form.Item>
                                <Form.Item {...tailLayout} className="button-container">
                                    <Button
                                        width="19vw"
                                        height="43px"
                                        placeholder="Sign in"
                                        colorType="white"
                                        radiusType="circle"
                                        backgroundColorType="purple"
                                        fontSize="12px"
                                        fontWeight="600"
                                        onClick={handleSubmit}
                                    />
                                </Form.Item>

                                {error && (
                                    <div className="error-message">
                                        <p>An account with that sign-in information does not exist. Try again or create a new account.</p>
                                    </div>
                                )}
                                {/* {timerForRetry.length !== 0 && (
                                    <div className="error-message">
                                        <p>Your acount was blocked, please try again in {timerForRetry}</p>
                                    </div>
                                )} */}
                            </Form>
                        </div>
                    </div>
                    <div className="brand-shapes">
                        <img alt="sharps" src={sharps}></img>
                    </div>
                </div>
            </Desktop>
            <Mobile>
                <div className="mobile-login">
                    <div className="logo-mobile">
                        <img width="170" height="auto" alt="logo-mobile" src={fullLogo}></img>
                    </div>
                    <div className="mobile-form">
                        <Form
                            {...layout}
                            name="mobile-form"
                            initialValues={{
                                remember: true
                            }}
                            form={loginForm}
                        >
                            <Form.Item
                                name="username"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Username can not be empty'
                                    }
                                ]}
                            >
                                <div className="field name">
                                    <p>Username</p>
                                    <Input
                                        placeholder="Type username"
                                        type="text"
                                        radiusType="semi-round"
                                        colorType="gray"
                                        backgroundColorType="none"
                                        borderColorType="gray"
                                        width="60vw"
                                        height="35px"
                                        onBlur={handleUserNameChange}
                                        onChange={handleUserNameChange}
                                        value={formFields.username}
                                    />
                                </div>
                            </Form.Item>
                            <Form.Item
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Password can not be empty'
                                    }
                                ]}
                            >
                                <div className="field password">
                                    <p>Password</p>
                                    <Input
                                        placeholder="Password"
                                        type="password"
                                        radiusType="semi-round"
                                        colorType="gray"
                                        backgroundColorType="none"
                                        borderColorType="gray"
                                        width="60vw"
                                        height="35px"
                                        onChange={handlePasswordChange}
                                        onBlur={handlePasswordChange}
                                        value={formFields.password}
                                    />
                                </div>
                            </Form.Item>
                            <Form.Item className="button-container">
                                <Button
                                    width="60vw"
                                    height="35px"
                                    placeholder="Sign in"
                                    colorType="white"
                                    radiusType="circle"
                                    backgroundColorType="purple"
                                    fontSize="12px"
                                    fontWeight="600"
                                    onClick={handleSubmit}
                                />
                            </Form.Item>
                            {/* {isError && timerForRetry.length === 0 && (
                                    <div className="error-message">
                                        <p>An account with that sign-in information does not exist. Try again or create a new account.</p>
                                    </div>
                                )}
                                {timerForRetry.length !== 0 && (
                                    <div className="error-message">
                                        <p>Your acount was blocked, please try again in {timerForRetry}</p>
                                    </div>
                                )} */}
                        </Form>
                    </div>
                </div>
            </Mobile>
        </section>
    );
};

export default Login;
