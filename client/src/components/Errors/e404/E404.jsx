/*import { useRouteError } from "react-router-dom";*/
import "./E404.css";

import React from 'react';
import {Link} from "react-router-dom";

class ErrorPage404 extends React.Component {
    render() {
        return (
            <div id="notfound">
                <div className="notfound-bg">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
                <div className="notfound">
                    <div className="notfound-404">
                        <h1>404</h1>
                    </div>
                    <h2>Page Not Found</h2>
                    <p>
                        The BodyDynamix page you are looking for might have been removed, had its name changed, or
                        is temporarily unavailable, or simply doesn't exist. Please reach out to support if you need
                        help.
                    </p>
                    <Link to={"/"}>Homepage</Link>
                </div>
            </div>
        );
    }
}

export default ErrorPage404;