import React, { useState, useEffect } from 'react';
import { isValidEmail, isEmpty } from '../../utils';
import { NavLink } from "react-router-dom";
import Input from '../../shared/Input/Input';
import Button from '../../shared/Button/Button';
import Banner from '../../shared/Banner/Banner';
import AlertMessage from '../../shared/AlertMessage/AlertMessage';

import UserApi from '../../api/UserApi';

import './Registration.scoped.css';

function Registration () {
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
    const [passwordConfirmation, setPasswordConfirmation] = useState({
        valid: null,
        value: '',
        error: ''
    });
    const [hasError, setHasError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        handleAuthentication(email, password, passwordConfirmation)
    }, [email, password, passwordConfirmation])

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
        } else if (password.value.length < 6) {
            setPassword({ 
                ...password, 
                valid: false, 
                error: 'Password is too short (minimum is 6 characters)' 
            });
        } else {
            setPassword({ 
                ...password, 
                valid: true, 
                error: ''
            });
        }

        if (isEmpty(passwordConfirmation.value)) {
            setPasswordConfirmation({ 
                ...passwordConfirmation, 
                valid: false, 
                error: 'Please enter password confirmation' 
            });
        } else if (passwordConfirmation.value != password.value) {
            setPasswordConfirmation({ 
                ...passwordConfirmation, 
                valid: false, 
                error: 'Password does not match' 
            });
        } else {
            setPasswordConfirmation({ 
                ...passwordConfirmation, 
                valid: true, 
                error: '' 
            });
        }
    }

    const handleRegistration = async () => {
        handleValidation();
    }

    const handleAuthentication = (email, password, passwordConfirmation) => {
        if (email.valid && password.valid && passwordConfirmation.valid) {
            const payload = {
                'email': email.value, 
                'password': password.value, 
                'password_confirmation': passwordConfirmation.value
            }
            
            UserApi.register(payload)
            .then(res => {
                window.location='/login';
            })
            .catch(error =>{
                const data = error.response.data

                if (data.status === 'error') {
                    setHasError(true);
                    setErrorMessage(data.errors.full_messages);
                    setEmail({ ...email,  valid: false });
                    setPassword({ ...password, valid: false });
                    setPasswordConfirmation({ ...passwordConfirmation, valid: false });
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

    const handlePasswordConfirmationChange = (e) => {
        setPasswordConfirmation({ ...passwordConfirmation, value: e.target.value });
    }

    return (
        <div className="d-flex flex-column signup-container">
            <div className="info-wrapper d-flex flex-column">
                Have an account already?
                <NavLink to="/login" exact>Click here to Login</NavLink>
            </div>
            <Banner description='First, enter your email'/>
            <div className="signup-wrapper">
                <div className="text-center">
                    { hasError && <AlertMessage message={errorMessage} /> }
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
                />
                <Input 
                    placeholder='Password Confirmation'
                    isValid={passwordConfirmation.valid}
                    type='password'
                    value={passwordConfirmation.value}
                    handleChange={handlePasswordConfirmationChange}
                    message={passwordConfirmation.error}
                />
                <div style={{ paddingTop: '5px'}}>
                    <Button 
                        text='Continue'
                        handleClick={handleRegistration}
                    />
                </div>
                <div className="checkbox">
                    <input type="checkbox" />It’s okay to send me emails about Slack.
                </div>
                <div className="desc">
                    By continuing, you’re agreeing to our 
                    <a href="#"> Customer Terms of Service</a>,  
                    <a href="#"> Privacy Policy</a>, and   
                    <a href="#"> Cookie Policy</a>.
                </div>
                <div className="footer">
                    <ul>
                        <li><a href="">Privacy & Terms</a></li>
                        <li><a href="">Contact Us</a></li>
                        <li>&#127760; <a href="">Change Region</a></li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Registration;
