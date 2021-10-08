import React, { useState, useEffect } from 'react';
import { isValidEmail, isEmpty } from '../../utils'

import Input from '../../shared/Input/Input';
import Button from '../../shared/Button/Button';
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
        }else if (isEmpty(passwordConfirmation.value)) {
            setPassword({ 
                ...passwordConfirmation, 
                valid: false, 
                error: 'Please enter password' 
            });
        }else if (password.value !== passwordConfirmation.value) {
            setPassword({ 
                ...password, 
                valid: false, 
                error: 'Please make sure password matches confirmation' 
            });
            setPasswordConfirmation({ 
                ...passwordConfirmation, 
                valid: false, 
                error: 'Please make sure password matches confirmation' 
            });
        } else {
            setPassword({ 
                ...password, 
                valid: true, 
                error: '' 
            });
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
            const payload = {'email': email.value, 'password': password.value, 'password_confirmation': passwordConfirmation.value}
            
            UserApi.register(payload)
            .then((r) => {
                console.log(r)
                window.location='/login';
            })
            .catch(error =>{if (error){
                setEmail({ ...email,  valid: false });
                setPassword({ ...password, valid: false });
                setPasswordConfirmation({ ...passwordConfirmation, valid: false });
            }})
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
        <div className="container">
            <div className="d-flex flex-column ">
                <img alt="Slack" src="https://a.slack-edge.com/bv1-9/slack_logo-ebd02d1.svg" height="34" title="Slack" />
                <h1>First, enter your email</h1>
                <div className="description">We suggest using the <strong>email address you use at work.</strong></div>
               <div className="input">
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
                 <Button 
                    text='Continue'
                    handleClick={handleRegistration}
                />
            </div>
            <div className="checkbox">
                <li>
                <label for="checkid"  >
                <input id="checkid"  type="checkbox" value="test" />It’s okay to send me emails about Slack.
                </label>
                </li>
            </div>
                <div className="desc">By continuing, you’re agreeing to our <a href="">Customer Terms of Service</a>,  <a href="">Privacy Policy</a>, and  <a href="">Cookie Policy</a>.</div>
                <nav>
                    <ul>
                        <li><a href="">Privacy & Terms</a></li>
                        <li><a href="">Contact Us</a></li>
                        <li><a href="">&#127760; Change Region</a></li>
                    </ul>
                </nav>
            </div>
        </div>
    );
}

export default Registration;
