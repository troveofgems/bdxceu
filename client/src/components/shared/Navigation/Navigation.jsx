import React from 'react';
import {Link} from "react-router-dom";
import {AuthenticationModal} from "../../Authentication/Authentication";

class NavigationBar extends React.Component {
    render() {
        return (
            <div className="navbar navbar-default navbar-fixed-top sticky-navigation" role="navigation">
                <div className="container">
                    <div className="navbar-header">
                        <button className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                            <span className="icon icon-bar"></span>
                            <span className="icon icon-bar"></span>
                            <span className="icon icon-bar"></span>
                        </button>
                        <a href="#" className="navbar-brand">BodyDynamix</a>
                    </div>
                    <div className="collapse navbar-collapse">
                        <ul className="nav navbar-nav navbar-right main-navigation">
                            <li><Link to="/" className="smoothScroll">Home</Link></li>
                            <li>
                                <AuthenticationModal modalType={"login"} />
                            </li>
                            <li><Link to="/#overview" className="smoothScroll">About</Link></li>
                            <li><Link to="/#trainer" className="smoothScroll">Chiropractic Team</Link></li>
                            <li><Link to="#price" className="smoothScroll">Prices</Link></li>
                            <li><Link to="/#affiliates" className="smoothScroll">Affiliates</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

export default NavigationBar;