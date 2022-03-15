import './style.scss';

import React, { useState, useContext, useEffect, useRef } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import PersonIcon from '@material-ui/icons/Person';
import { useMediaQuery } from 'react-responsive';
import LockIcon from '@material-ui/icons/Lock';
import { Form, Checkbox } from 'antd';

import logoGrayText from '../../assets/images/logoGrayText.png';
import LocalStorageService from '../../services/auth';
import { httpRequest } from '../../services/http';
import { ApiEndpoints } from '../../apiEndpoints';
import config from '../../config/config.json';
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
    const [isKeepMeSignin, setisKeepMeSignin] = useState(true);
    const history = useHistory();
    const [loginForm] = Form.useForm(); // form controller
    const [formFields, setFormFields] = useState({
        email: '',
        password: ''
    });

    // const saveToLocalStorage = (jwt_token, user_id, keepSingedIn, username, creation_date, already_logged_in, avatar_id, user_type) => {
    //     localStorage.setItem(LOCAL_STORAGE_TOKEN, jwt_token);
    //     localStorage.setItem(LOCAL_STORAGE_USER_ID, user_id);
    //     localStorage.setItem(LOCAL_STORAGE_KEEP_ME_SIGN_IN, keepSingedIn);
    //     localStorage.setItem(LOCAL_STORAGE_USER_NAME, full_name);
    //     localStorage.setItem(LOCAL_STORAGE_USER_EMAIL, email);
    //     localStorage.setItem(LOCAL_STORAGE_IMAGE_URL, image_url);
    //     localStorage.setItem(LOCAL_STORAGE_REGISTER_DATE, register_date);
    // };

    useEffect(() => {}, []);

    const handleUserNameChange = (e) => {
        setFormFields({ ...formFields, email: e.target.value });
    };

    const handlePasswordChange = (e) => {
        setFormFields({ ...formFields, password: e.target.value });
    };

    const handleKeepMeSignin = (e) => {
        setisKeepMeSignin(e.target.checked);
    };

    const handleSubmit = async () => {
        const values = await loginForm.validateFields();
        if (values?.errorFields) {
            return;
        } else {
            //handleLoginSubmit();
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
                                        type="email"
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
                                        onClick={() => handleSubmit}
                                    />
                                </Form.Item>
                                {/* 
                                {isError && timerForRetry.length === 0 && (
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
