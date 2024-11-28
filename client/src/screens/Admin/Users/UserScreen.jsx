import React, {useState} from "react";
import AdminHeader from "../../../components/shared/Header/Admin.Header";

import AdminUsers from "../../../components/Users/Admin.Users";
import TeamUsers from "../../../components/Users/Team.Users";
import StudentUsers from "../../../components/Users/Student.Users";

import { useGetUsersQuery } from "../../../redux/slices/userSlice";
import {Preloader} from "../../../components/shared/Preloader/Preloader";

const UserScreen = () => {
    const [currentUsersShown, setCurrentUsersShown] = useState("admin");
    const { data, isLoading, error, refetch } = useGetUsersQuery();

    return (
            <>
                <AdminHeader subsection={"user"} onChangeUserList={setCurrentUsersShown} />
                { isLoading ? <Preloader /> : (
                    <>
                        {currentUsersShown.includes("admin") && <AdminUsers users={data.data.adminList} refetch={refetch}/>}
                        {currentUsersShown.includes("team") && <TeamUsers users={data.data.teamList} />}
                        {currentUsersShown.includes("student") && <StudentUsers users={data.data.studentList} />}
                    </>
                ) }
            </>
    );
}

export default UserScreen;