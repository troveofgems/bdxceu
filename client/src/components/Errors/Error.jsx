import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";

import {error_401, error_404, error_410} from "../../constants/error.constants";

import "./Error.css";
const GenericErrorScreen = ({ errorCode = 404 }) => {
    const [error, setError] = useState(error_404);

    useEffect(() => {
        switch(errorCode) {
            case 401:
                setError(error_401);
                break;
            case 404:
                setError(error_404);
                break
            case 410:
                setError(error_410);
                break;
            default:
                setError(error_404);
        }
    }, [errorCode]);


    return (
        <div id="error-page-wrapper">
            <div className={`errorBackgroundLines lineDrop_err_${error.errorCode}`}>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <div className={`errorPageBody err_${error.errorCode}`}>
                <div className={`headerContainer_err_${error.errorCode}`}>
                    <h1>{error.errorCode}</h1>
                </div>
                <h2>{error.errorHeader}</h2>
                <p>{error.errorParagraph}</p>
                <Link className={"errorReroute"} to={error.errorRerouteToPath}>{error.errorRerouteLinkText}</Link>
            </div>
        </div>
    );
}

export default GenericErrorScreen;