import './style.scss';

import React, { useState, useContext, useEffect, useRef } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import PersonIcon from '@material-ui/icons/Person';
import { useMediaQuery } from 'react-responsive';
import LockIcon from '@material-ui/icons/Lock';
import { Form, Checkbox } from 'antd';

import logoGrayText from '../../assets/images/logoGrayText.png';
import { httpRequest } from '../../services/http';
import { ApiEndpoints } from '../../const/apiEndpoints';
import Button from '../../components/button';
import Loader from '../../components/loader';
import { Context } from '../../hooks/store';
import Input from '../../components/Input';
import useAuth from '../../hooks/useAuth';
import {
    LOCAL_STORAGE_ALREADY_LIGGED_IN,
    LOCAL_STORAGE_AVATAR_ID,
    LOCAL_STORAGE_CREATION_DATE,
    LOCAL_STORAGE_TOKEN,
    LOCAL_STORAGE_EXPIRED_TOKEN,
    LOCAL_STORAGE_USER_ID,
    LOCAL_STORAGE_USER_NAME,
    LOCAL_STORAGE_USER_TYPE
} from '../../const/localStorageConsts';

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
    const [isKeepMeSignin, setisKeepMeSignin] = useState(true);
    const history = useHistory();
    const [loginForm] = Form.useForm(); // form controller
    const [formFields, setFormFields] = useState({
        username: '',
        password: ''
    });
    const { loginUser, error } = useAuth();

    const saveToLocalStorage = (userData) => {
        localStorage.setItem(LOCAL_STORAGE_ALREADY_LIGGED_IN, userData.already_logged_in);
        localStorage.setItem(LOCAL_STORAGE_AVATAR_ID, userData.avatar_id);
        localStorage.setItem(LOCAL_STORAGE_CREATION_DATE, userData.creation_date);
        localStorage.setItem(LOCAL_STORAGE_TOKEN, userData.jwt);
        localStorage.setItem(LOCAL_STORAGE_EXPIRED_TOKEN, userData.expires_in);
        localStorage.setItem(LOCAL_STORAGE_USER_ID, userData.user_id);
        localStorage.setItem(LOCAL_STORAGE_USER_NAME, userData.user_Name);
        localStorage.setItem(LOCAL_STORAGE_USER_TYPE, userData.user_type);
    };

    useEffect(() => {}, []);

    const handleUserNameChange = (e) => {
        setFormFields({ ...formFields, username: e.target.value });
    };

    const handlePasswordChange = (e) => {
        setFormFields({ ...formFields, password: e.target.value });
    };

    const handleKeepMeSignin = (e) => {
        setisKeepMeSignin(e.target.checked);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const values = await loginForm.validateFields();
        if (values?.errorFields) {
            return;
        } else {
            const bodyRequest = formFields;
            await loginUser(bodyRequest, isKeepMeSignin);
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
            <div className="login-background">
                <Desktop>
                    <div className="desktop-login-content">
                        <div className="logoImg">
                            <img alt="logo" src={logoGrayText}></img>
                        </div>
                        <div className="title">
                            <p>
                                Hey <span className="change-color"> Strecher</span>, Welcome Back
                            </p>
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
                                    <Input
                                        placeholder="Username"
                                        type="text"
                                        radiusType="circle"
                                        colorType="black"
                                        backgroundColorType="white-login"
                                        borderColorType="none"
                                        width="19vw"
                                        height="43px"
                                        boxShadowsType="login-input"
                                        iconComponent={<PersonIcon />}
                                        onBlur={handleUserNameChange}
                                        onChange={handleUserNameChange}
                                        value={formFields.username}
                                    />
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
                                    <Input
                                        placeholder="Password"
                                        type="password"
                                        radiusType="circle"
                                        colorType="black"
                                        backgroundColorType="white-login"
                                        boxShadowsType="login-input"
                                        borderColorType="none"
                                        width="19vw"
                                        height="43px"
                                        iconComponent={<LockIcon />}
                                        onChange={handlePasswordChange}
                                        onBlur={handlePasswordChange}
                                        value={formFields.password}
                                    />
                                </Form.Item>
                                <div className="checkBox">
                                    <div>
                                        <Form.Item {...tailLayout} name="remember" valuePropName="checked">
                                            <Checkbox onChange={handleKeepMeSignin}>Keep me signed in</Checkbox>
                                        </Form.Item>
                                    </div>
                                </div>
                                <Form.Item {...tailLayout} className="button-container">
                                    <Button
                                        width="19vw"
                                        height="43px"
                                        placeholder="Sign in"
                                        colorType="lightPurple"
                                        radiusType="circle"
                                        backgroundColorType="loginPurple"
                                        fontSize="16px"
                                        fontWeight="bold"
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
                </Desktop>
                <Mobile>
                    <div className="mobile-login">
                        <div className="logo-mobile">
                            <img width="170" height="auto" alt="logo-mobile" src={logoGrayText}></img>
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
                                    <Input
                                        placeholder="Username"
                                        type="email"
                                        radiusType="circle"
                                        colorType="black"
                                        backgroundColorType="lightPurple"
                                        borderColorType="none"
                                        width="60vw"
                                        height="35px"
                                        iconComponent={<PersonIcon />}
                                        onBlur={handleUserNameChange}
                                        onChange={handleUserNameChange}
                                        value={formFields.username}
                                    />
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
                                    <Input
                                        placeholder="Password"
                                        type="password"
                                        radiusType="circle"
                                        colorType="black"
                                        backgroundColorType="lightPurple"
                                        borderColorType="none"
                                        width="60vw"
                                        height="35px"
                                        iconComponent={<LockIcon />}
                                        onChange={handlePasswordChange}
                                        onBlur={handlePasswordChange}
                                        value={formFields.password}
                                    />
                                </Form.Item>
                                <Form.Item className="checkbox-container" name="remember" valuePropName="checked">
                                    <Checkbox onChange={handleKeepMeSignin}>Keep me signed in</Checkbox>
                                </Form.Item>
                                <Form.Item className="button-container">
                                    <Button
                                        width="60vw"
                                        height="35px"
                                        placeholder="Sign in"
                                        colorType="lightPurple"
                                        radiusType="circle"
                                        backgroundColorType="loginPurple"
                                        fontSize="16px"
                                        fontWeight="bold"
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
            </div>
        </section>
    );
};

export default Login;
