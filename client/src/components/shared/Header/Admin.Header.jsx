import React from 'react';
import {Container, Nav, Navbar} from "react-bootstrap";
import {Link} from "react-router-dom";

import "./Admin.Header.css";
const AdminHeader = ({ subsection, onChangeUserList }) => {
    return (
        <header className={"header admin-header"}>
            <Navbar className={`navbar`} expand={"md"} collapseOnSelect>
                <Container>
                    <Navbar.Toggle aria-controls={"basic-navbar-nav"}/>
                    <Navbar.Collapse id={"basic-navbar-nav"}>
                        <Nav className={"ms-auto"}>
                            {
                                subsection === "product" && (
                                    <>
                                        <Link to={"/admin/products"}>
                                            <button className={"nav-link"}>
                                                New Product
                                            </button>
                                        </Link>
                                    </>
                                )
                            }
                            {
                                subsection === "exam" && (
                                    <>
                                        <Link to={"/admin/exam"}>
                                            <button className={"nav-link"}>
                                                New Exam
                                            </button>
                                        </Link>
                                    </>
                                )
                            }
                            {
                                subsection === "user" && (
                                    <>
                                        <Nav.Link>
                                            <button className={"nav-link"} onClick={() => onChangeUserList("admin")}>Admins</button>
                                        </Nav.Link>
                                        <Nav.Link>
                                            <button className={"nav-link"} onClick={() => onChangeUserList("team")}>Team</button>
                                        </Nav.Link>
                                        <Nav.Link>
                                            <button className={"nav-link"} onClick={() => onChangeUserList("student")}>Students</button>
                                        </Nav.Link>
                                    </>
                                )
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
}

export default AdminHeader;