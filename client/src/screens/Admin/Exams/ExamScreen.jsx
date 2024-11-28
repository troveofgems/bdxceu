import React from "react";
import AdminHeader from "../../../components/shared/Header/Admin.Header";
import AdminExamListScreen from "../../../components/Exam/List/ExamList";

const ExamScreen = () => {
    return (
        <>
            <AdminHeader subsection={"exam"} />
            <AdminExamListScreen />
        </>
    );
}

export default ExamScreen;