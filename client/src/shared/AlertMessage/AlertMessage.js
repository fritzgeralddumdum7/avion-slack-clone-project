import React from 'react';

import './AlertMessage.scoped.css';

function AlertMessage ({ message }) {
    return <p className="error-message">{ message }</p>
}

export default AlertMessage;
