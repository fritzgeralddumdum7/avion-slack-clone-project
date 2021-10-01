import React, { useState, useEffect } from 'react';
import { isValidEmail, isEmpty } from '../../utils'

import Input from '../../shared/Input/Input';
import Button from '../../shared/Button/Button';
import Container from '../../shared/Container/Container';
import GoogleLogin from 'react-google-login';
import AppleSignin from 'react-apple-signin-auth';
import { FcGoogle } from 'react-icons/fc';
import { AiFillApple } from 'react-icons/ai';

import authApi from '../../services/AuthApi';
import userApi from '../../api/UserApi';

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
            authApi.authenticate(email.value, password.value, res => {
                if (!res.result) {
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

            authApi.authenticate(profileObj.email, profileObj.email, res => {
                if (!res.result) {
                    userApi.register(payload)
                        .then(() => authApi.authenticate(profileObj.email, profileObj.email, () => console.log('success')))
                        .catch(error => console.log(error.response.data.errors.full_messages))
                }
            })
        }
    }

    return (
        <div className="d-flex content-center text-center content">
            <Container>
                <img alt="Slack" src="https://a.slack-edge.com/bv1-9/slack_logo-ebd02d1.svg" height="34" title="Slack" />
                <h1>Sign in to Slack</h1>
                <div className="description">We suggest using the <strong>email address you use at work.</strong></div>
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
                    handleClick={handleLogin}
                />
            </Container>
        </div>
    );
}

export default Login;
