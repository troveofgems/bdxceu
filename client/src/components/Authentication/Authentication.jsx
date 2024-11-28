import React, {useState} from 'react';
import Modal from 'react-modal';

// Available Modal Forms
import {LoginForm} from "./Login/Login";
import {RegistrationForm} from "./Register/Register";
import {ForgotPassword} from "./ForgotPassword/ForgotPassword";

import "./Authentication.css";
export const AuthenticationModal = ({ modalType }) => {
    Modal.setAppElement('#root');

    const applyButtonStyle = () => {
        if(modalType.includes("registration")) {
            return "wow fadeInUp smoothScroll btn btn-default";
        } else if (modalType.includes("login")) {
            return "ctaLoginButton";
        }
    };

    const applyActionButtonLabel = () => {
        if(modalType.includes("registration")) {
            return "Login";
        } else if (modalType.includes("login")) {
            return "Sign-Up";
        }
    };

    const applyFaceCTAButtonLabel = () => {
        if(modalType.includes("registration")) {
            return "Sign-Up Today!";
        } else if (modalType.includes("login")) {
            return "Login";
        }
    };

    const applyFormToShow = () => {
        if(modalType.includes("registration")) {
            return "registration";
        } else if (modalType.includes("login")) {
            return "login";
        }
    }

    const [modalIsOpen, setIsOpen] = useState(false);
    const [modalStyle, setModalStyle] = useState({
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: '-35%',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width: "fit-content",
            height: "fit-content",
            padding: "20px",
        }});
    const [openModalButtonClasses, setOpenModalButtonClasses] = React.useState(applyButtonStyle());
    const [faceCTAButtonLabel, setFaceCTAButtonLabel] = React.useState(applyFaceCTAButtonLabel());
    const [actionButton, setActionButton] = React.useState(applyActionButtonLabel());
    const [showForm, setShowForm] = React.useState(applyFormToShow());

    function openModal() {
        // Open The Modal With Configurations Set
        setIsOpen(true);
    }

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        //subtitle.style.color = '#f00';
    }

    function closeModal() {
        setIsOpen(false);
    }

    function changeFormView(actionButton) {
        if(actionButton === "Login") {
            console.log("Show the Login Form!");
            setActionButton("Sign-Up");
            setShowForm("login");
        } else if (actionButton === "Sign-Up") {
            setActionButton("Login");
            setShowForm("registration");
        }
    }

    const showForgotPasswordForm = () => {
        setActionButton("Login");
        setShowForm("forgotPassword");
    }

    return (
        <div>
            <button onClick={openModal} className={openModalButtonClasses}>{faceCTAButtonLabel}</button>
            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={modalStyle}
                contentLabel="Authentication Modal"
            >
                <div className="modalHeaderContent">
                    <button className={"modalButtonAuth"} onClick={() => changeFormView(actionButton)}>{actionButton}</button>
                    <button className={"modalButtonAuth"} onClick={closeModal}>Close</button>
                </div>
                <div className="session">
                    <div className="left">
                        <svg className={"st01"} enableBackground="new 0 0 300 302.5" version="1.1" viewBox="0 0 300 302.5"
                             xmlns="http://www.w3.org/2000/svg">
                            <path className="st01"
                                  d="m126 302.2c-2.3 0.7-5.7 0.2-7.7-1.2l-105-71.6c-2-1.3-3.7-4.4-3.9-6.7l-9.4-126.7c-0.2-2.4 1.1-5.6 2.8-7.2l93.2-86.4c1.7-1.6 5.1-2.6 7.4-2.3l125.6 18.9c2.3 0.4 5.2 2.3 6.4 4.4l63.5 110.1c1.2 2 1.4 5.5 0.6 7.7l-46.4 118.3c-0.9 2.2-3.4 4.6-5.7 5.3l-121.4 37.4zm63.4-102.7c2.3-0.7 4.8-3.1 5.7-5.3l19.9-50.8c0.9-2.2 0.6-5.7-0.6-7.7l-27.3-47.3c-1.2-2-4.1-4-6.4-4.4l-53.9-8c-2.3-0.4-5.7 0.7-7.4 2.3l-40 37.1c-1.7 1.6-3 4.9-2.8 7.2l4.1 54.4c0.2 2.4 1.9 5.4 3.9 6.7l45.1 30.8c2 1.3 5.4 1.9 7.7 1.2l52-16.2z"/>
                        </svg>
                    </div>
                    {showForm === "registration" && <RegistrationForm />}
                    {showForm === "login" && <LoginForm showForgotPasswordForm={showForgotPasswordForm} closeModal={closeModal}/>}
                    {showForm === "forgotPassword" && <ForgotPassword />}
                </div>
            </Modal>
        </div>
    );
}