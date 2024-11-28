import React from "react";
import {Table} from "react-bootstrap";
import {formatDate, getLastFourCharacters} from "../../utils/field.formatters";

import "./Users.css";
import {formatPhoneNumberIntl} from "react-phone-number-input";
import {AuthenticationModal} from "../Admin/Authentication";

import {useDeleteUserMutation} from "../../redux/slices/userSlice";

import {Preloader} from "../shared/Preloader/Preloader";

const AdminUsers = ({ users }) => {
    const [deleteUser, {isLoading: loadingDelete}] = useDeleteUserMutation();

    const handleDeleteUser = (userId) => {
        console.log("Delete User: ", userId);
    }

    return (
        <div className={"userScreenContent"}>
            <h1 className={"mb-2"}>{users.length} BDXCEU Administrator{users.length > 1 ? "s" : ""}</h1>
            <Table striped hover responsive className={"table-responsive-xxl"}>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Created On</th>
                    <th>Last Logged In</th>
                    <th>Account Status</th>
                </tr>
                </thead>
                <tbody>
                {users.map(user => (
                    <tr key={user._id}>
                        <td>{getLastFourCharacters(user._id)}</td>
                        <td>{user.firstName} {user.lastName}</td>
                        <td>
                            {user.email === "" ? "No Data" : (
                                <a href={`mailto:${user.email}`}>{user.email}</a>
                            )}
                        </td>
                        <td>
                            {user.phone === "" ? "No Data" : (
                                <a href={`tel:${user.phone}`}>{formatPhoneNumberIntl(user.phone)}</a>
                            )}
                        </td>
                        <td>{formatDate(user.createdAt)}</td>
                        <td>{user.lastLoggedIn === undefined ? "Never Logged In" : formatDate(user.lastLoggedIn)}</td>
                        <td>{user.accountIsLocked ? "Inactive" : "Active"}</td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </div>
    );
}

export default AdminUsers;