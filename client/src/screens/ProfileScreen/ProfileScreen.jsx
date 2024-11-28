import React from "react";
import {Row, Col} from "react-bootstrap";
import {ProfilePage} from "../../components/Profile/Profile";

// Page Sections
const ProfileScreen = () => {
    return (
        <Row>
            <Col>
                <ProfilePage />
            </Col>
        </Row>
    );
}

export default ProfileScreen;