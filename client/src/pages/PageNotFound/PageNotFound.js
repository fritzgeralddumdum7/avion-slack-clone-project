import React from 'react'

import Navbar from './components/Navbar';
import GlitchBanner from './components/GlitchBanner';
import Links from './components/Links';

import './PageNotFound.scoped.css';

function PageNotFound () {
    return (
        <div  style={{ maxHeight: '100vh', overflow: 'scroll'}}>
            <div className="d-flex flex-column">
                <Navbar />
                <div className="d-flex not-found-container">
                    <GlitchBanner />
                </div>
            </div>
            <Links />
        </div>
    )
}

export default PageNotFound;
