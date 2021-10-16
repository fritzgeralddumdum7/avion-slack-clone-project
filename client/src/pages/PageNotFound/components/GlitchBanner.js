import React from 'react'
import { VscWarning } from 'react-icons/vsc';

import '../PageNotFound.scoped.css';

function GlitchBanner () {
    return (
        <div className="d-flex flex-column glitch-banner">
            <div className="d-flex align-middle" style={{ gap: '10px' }}>
                <VscWarning />
                <h1>There's been a glitch...</h1>
            </div>
            <p>We’re not quite sure what went wrong. You can go back, or try looking on our Help Center if you need a hand.</p>
        </div>
    )
}

export default GlitchBanner;
