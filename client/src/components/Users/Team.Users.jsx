import React from "react";
import {Table, Button, Col, Container, Row} from "react-bootstrap";
import {formatDate, formattedList, getLastFourCharacters} from "../../utils/field.formatters";
import {formatPhoneNumberIntl} from "react-phone-number-input";
import {AuthenticationModal} from "../Admin/Authentication";
import {FaEdit, FaTrash} from "react-icons/fa";
import {useDeleteTeamMemberMutation, useGetUsersQuery} from "../../redux/slices/userSlice";
import {Preloader} from "../shared/Preloader/Preloader";
import {useNavigate} from "react-router-dom";

const TeamUsers = ({ users }) => {
    const navigate = useNavigate();
    const { refetch } = useGetUsersQuery();
    const [deleteTeamMember, {isLoading: loadingDelete}] = useDeleteTeamMemberMutation();

    const handleDeleteTeamMember = async (teamMemberId) => {
        console.log("Delete TeamMember: ", teamMemberId, refetch);
        if(window.confirm("Are you sure you want to delete this Team Member? This action cannot be undone.")) {
            try {
                await deleteTeamMember(teamMemberId);
                refetch();
            } catch(err) {
                console.error(err);
            }
        }
    }

    const handleFetchUserById = async (userId) => {
        try {
            return navigate(`/admin/team/${userId}`);
        } catch(err) {
            console.error(err);
        }
    }

    return (
        <>
            {loadingDelete && <Preloader/>}
            <div className={"userScreenContent"}>
                <h1 className={"mb-2"}>The BDXCEU Team</h1>
                <div className={"mb-5 mt-0"}>
                    <AuthenticationModal modalType={"add-team-member"}/>
                </div>
                <Table striped hover responsive className={"table-sm"}>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Certifications</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Created On</th>
                        <th>Last Modified On</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.length > 0  && users.map(user => (
                        <tr key={user._id}>
                            <td>{getLastFourCharacters(user._id)}</td>
                            <td>{user.firstName} {user.lastName}</td>
                            <td>{formattedList(user.certificationList)}</td>
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
                            <td>{formatDate(user.updatedAt)}</td>
                            <td>
                                <Button variant={"danger"} className={"btn-sm mx-2"}
                                        onClick={() => handleDeleteTeamMember(user._id)}>
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
                {users.length === 0  && (<h4 className={"text-center mt-3"}>No Data Yet!</h4>)}
            </div>
        </>

    );
}

export default TeamUsers;