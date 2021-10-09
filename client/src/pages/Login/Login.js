import React, { useState, useEffect } from 'react';
import { NavLink } from "react-router-dom";
import { FcGoogle } from 'react-icons/fc';
import { AiFillApple } from 'react-icons/ai';
import GoogleLogin from 'react-google-login';
import AppleSignin from 'react-apple-signin-auth';
import Banner from '../../shared/Banner/Banner';
import AlertMessage from '../../shared/AlertMessage/AlertMessage';

import Input from '../../shared/Input/Input';
import Button from '../../shared/Button/Button';

import AuthApi from '../../services/AuthApi';
import UserApi from '../../api/UserApi';

import { isValidEmail, isEmpty } from '../../utils';

import './Login.scoped.css';

function Login () {
    const [email, setEmail] = useState({
        valid: null,
        value: '',
        error: '' 
    });
    const [password, setPassword] = useState({
        valid: null, 
        value: '',
        error: ''
    });
    const [hasError, setHasError] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [disabled, setDisabled] = useState(false);

    useEffect(() => {
        handleAuthentication(email, password);
    }, [email, password])

    const handleLogin = () => {
        handleValidation();
    }

    const handleValidation = () =>{
        if (isEmpty(email.value)) {
            setEmail(email => ({ 
                    ...email,
                    valid: false,
                    error: 'Please enter email address'
                }
            ));
        } else if (!isValidEmail(email.value)) {
            setEmail({ 
                ...email, 
                valid: false, 
                error: 'Invalid email address' 
            });
        } else {
            setEmail({ 
                ...email, 
                valid: true, 
                error: '' 
            });
        }

        if (isEmpty(password.value)) {
            setPassword({ 
                ...password, 
                valid: false, 
                error: 'Please enter password' 
            });
        } else {
            setPassword({ 
                ...password, 
                valid: true, 
                error: ''  
            });
        }
    }

    const handleAuthentication = (email, password) => {
        if (email.valid && password.valid) {
            setDisabled(true);
            AuthApi.authenticate(email.value, password.value, res => {
                if (!res.result) {
                    setHasError(true);
                    setDisabled(false);
                    setErrorMsg(res.errors[0]);
                    setEmail({ ...email,  valid: false });
                    setPassword({ ...password, valid: false });
                }
            })
        }
    }

    const handleEmailChange = (e) => {
        setEmail({ ...email, value: e.target.value });
    }

    const handlePasswordChange = (e) => {
        setPassword({ ...password, value: e.target.value });
    }

    const responseGoogle = google => {
        if (!google.error) {
            const { profileObj } = google;
            const payload = {
                email: profileObj.email,
                password: profileObj.email,
                password_confirmation: profileObj.email
            }

            AuthApi.authenticate(profileObj.email, profileObj.email, res => {
                if (!res.result) {
                    UserApi.register(payload)
                        .then(() => AuthApi.authenticate(profileObj.email, profileObj.email, () => console.log('success')))
                        .catch(error => console.log(error.response.data.errors.full_messages))
                }
            })
        }
    }

    return (
        <div className="d-flex login-container">
            <div className="info-wrapper d-flex flex-column">
                New to Slack?
                <NavLink to="/signup" exact>Create an account</NavLink>
            </div>
            <div className='d-flex flex-column container-wrapper'>
                <Banner description='Sign in to Slack'/>
                <GoogleLogin 
                    clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                    buttonText="Sign in with Google" 
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    fullWidth
                    cookiePolicy={'single_host_origin'}
                    render={renderProps => (
                        <button onClick={renderProps.onClick} id="google-login-btn">
                            <FcGoogle className="fc-icon" /> Sign in with Google
                        </button>
                    )}
                />
                <AppleSignin 
                    authOptions={{
                        clientId: 'com.example.web',
                        scope: 'email name',
                        redirectURI: 'https://example.com',
                        state: '',
                        nonce: 'nonce',
                        usePopup: true,
                    }}
                    render={renderProps => (
                        <button onClick={renderProps.onClick} id="apple-login-btn">
                            <AiFillApple className="ai-icon" /> Sign in with Apple
                        </button>
                    )}
                />
                <div className="divider">
                    <small className="divider-text">OR</small>
                </div>
                <div className="text-center">
                    { hasError && <AlertMessage message={errorMsg} /> }
                </div>
                <Input 
                    placeholder='name@work-email.com'
                    isValid={email.valid}
                    type='text'
                    value={email.value}
                    handleChange={handleEmailChange}
                    message={email.error}
                    customClass='remove-padding'
                />
                <Input 
                    placeholder='Password'
                    isValid={password.valid}
                    type='password'
                    value={password.value}
                    handleChange={handlePasswordChange}
                    message={password.error}
                    customClass='remove-padding'
                />
                <Button 
                    text='Sign In with Email'
                    disabled={disabled}
                    handleClick={handleLogin}
                />
            </div>
        </div>
    );
}

export default Login;
