import React from "react";
import {Button, Col, Container, Row, Table} from "react-bootstrap";
import {formatDate, getLastFourCharacters} from "../../utils/field.formatters";
import {formatPhoneNumberIntl} from "react-phone-number-input";
import {FaEdit, FaTrash} from "react-icons/fa";
import {useDeleteUserMutation, useGetUsersQuery} from "../../redux/slices/userSlice";
import {Preloader} from "../shared/Preloader/Preloader";
import {useNavigate} from "react-router-dom";



const StudentUsers = ({ users }) => {
    const navigate = useNavigate();

    const { data, isLoading, error, refetch } = useGetUsersQuery();
    const [deleteUser, {isLoading: loadingDelete}] = useDeleteUserMutation();

    const handleDeleteUser = async (userId) => {
        if(window.confirm("Are you sure you want to delete this User? This action cannot be undone.")) {
            try {
                await deleteUser(userId);
                refetch();
            } catch(err) {
                console.error(err);
            }
        }
    }

    const handleFetchUserById = async (userId) => {
        try {
            return navigate(`/admin/users/${userId}`);
        } catch(err) {
            console.error(err);
        }
    }

    return (
        <>
            {loadingDelete && <Preloader />}
            <div className={"userScreenContent"}>
                <h1 className={"mb-5"}>{users.length} BDXCEU Student{users.length > 1 ? "s" : ""}</h1>
                <Table striped hover responsive className={"table-sm"}>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th className={"text-center"}>Phone</th>
                        <th className={"text-center"}>Created On</th>
                        <th className={"text-center"}>Last Login</th>
                        <th className={"text-center"}>Enrollments</th>
                        <th className={"text-center"}>IPv4</th>
                        <th className={"text-center"}>Status</th>
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
                            <td className={"text-center"}>{formatDate(user.createdAt)}</td>
                            <td className={"text-center"}>{user.lastLoggedIn === undefined ? "Never Logged In" : formatDate(user.lastLoggedIn)}</td>
                            <td className={"text-center"}>{user.subscribedModules.length > 0 ? `${user.subscribedModules.length} Course${user.subscribedModules.length === 1 ? "" : "s"}` : "No Enrollments"}</td>
                            <td className={"text-center"}>70.172.61.154</td>
                            <td className={"text-center"}>{user.accountIsLocked ? "Locked" : "Active"}</td>
                            <td>
                                <Button variant={"danger"} className={"btn-sm mx-2"} onClick={() => handleDeleteUser(user._id)}>
                                    <FaTrash/>
                                </Button>
                                <Button variant={"light"} className={"btn-sm"} onClick={() => handleFetchUserById(user._id)}>
                                    <FaEdit/> Update
                                </Button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            </div>
        </>
    );
}

export default StudentUsers;