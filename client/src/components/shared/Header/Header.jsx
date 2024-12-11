import React, {useState, useEffect} from 'react';
import {Navbar, Nav, Container} from 'react-bootstrap';
import {LinkContainer} from "react-router-bootstrap";
import BDXCEU_HORIZONTAL_LOGO from "../../../assets/images/logos/horizontal-logo.png";

import { HashLink } from 'react-router-hash-link';

import {useLogoutMutation} from "../../../redux/slices/userSlice";

import "./Header.css";
import {AuthenticationModal} from "../../Authentication/Authentication";
import {useDispatch, useSelector} from "react-redux";
import {Link, useNavigate} from "react-router-dom";

import {logout} from "../../../redux/slices/authSlice";

const Header = () => {
    const
        { user } = useSelector((state) => state.auth),
        isLoggedIn = !!user,
        isAdmin = user?.authLevel === "admin" || false,
        isStudent = user?.authLevel === "student" || false;

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [logoutApiCall] = useLogoutMutation();

    const logoutHandler = async() => {
        try {
            await logoutApiCall().unwrap();
            dispatch(logout());
            navigate("/");
        } catch(err) {
            console.error(err);
        }
    }

    return (
        <header className={"header"}>
            <Navbar className={`navbar navbar-default`} expand={"md"} collapseOnSelect>
                <Container>
                    <LinkContainer to={"/"}>
                        <Navbar.Brand>
                            <img src={`${BDXCEU_HORIZONTAL_LOGO}`} alt={"BodyDynamix"} width={180} height={50} />
                        </Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls={"basic-navbar-nav"} />
                    <Navbar.Collapse id={"basic-navbar-nav"}>
                        <Nav className={"ms-auto"}>
                            { (!isLoggedIn) && (
                                <>
                                    <Nav.Link>
                                        <AuthenticationModal modalType={"login"} />
                                    </Nav.Link>
                                    <HashLink to="#overview">About</HashLink>
                                    <HashLink to="#chiropractic-team">Chiropractic Team</HashLink>
                                    <HashLink to="#pricing">Pricing</HashLink>
                                    <HashLink to="#affiliates">Affiliates</HashLink>
                                </>
                            )}
                            { (isLoggedIn) && (
                                <>
                                    <Link className={"nav-link"} to={"/user/profile"}>My Profile</Link>
                                    {isAdmin && (
                                        <>
                                            <Link className={"nav-link"} role={"button"} to={"/admin/users"}>Users</Link>
                                            <Link className={"nav-link"} role={"button"} to={"/admin/exams"}>Exams</Link>
                                        </>
                                    )}
                                    {isAdmin && (
                                        <>
                                            <Link className={"nav-link"} role={"button"} to={"/products"}>Products</Link>
                                            <Link className={"nav-link"} role={"button"} to={"/admin/orders"}>Orders</Link>
                                        </>
                                    )}
                                    {isStudent && (
                                        <>
                                            <Link className={"nav-link"} role={"button"} to={"/products"}>Products</Link>
                                            <Link className={"nav-link"} role={"button"} to={"/orders"}>Orders</Link>
                                        </>
                                    )}
                                    {isAdmin && (
                                        <>
                                            <Link className={"nav-link"} to={"/admin/app/settings"}>Settings</Link>
                                        </>
                                    )}
                                    <Nav.Link onClick={logoutHandler}>
                                        Logout
                                    </Nav.Link>
                                </>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header;