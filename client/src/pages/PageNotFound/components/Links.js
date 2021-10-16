import React from 'react'

import '../PageNotFound.scoped.css';

function Links () {
    return (
        <div className="d-flex links">
            <ul>
                <li>Product</li>
                <li>Enterprise</li>
                <li>Pricing</li>
                <li>Support</li>
                <li>Slack Guides</li>
                <li>App Directory</li>
                <li>API</li>
            </ul>
            <ul>
                <li>Jobs</li>
                <li>Customers</li>
                <li>Developers</li>
                <li>Events</li>
                <li>Blog</li>
            </ul>
            <ul>
                <li>Privacy</li>
                <li>Security</li>
                <li>Terms of Service</li>
                <li>Policies</li>
            </ul>
            <ul>
                <li>Download desktop app</li>
                <li>Download mobile app</li>
                <li>Brand Guidelines</li>
                <li>Slack at Work</li>
                <li>Status</li>
            </ul>
        </div>
    )
}

export default Links;
