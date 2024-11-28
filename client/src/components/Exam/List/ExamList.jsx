import React, {useEffect} from "react";
import { Table, Button, Col, Container, Row } from "react-bootstrap";
import { formatDate } from "../../../utils/field.formatters";
import { useGetExamListQuery } from "../../../redux/slices/examSlice";
import { Preloader } from "../../shared/Preloader/Preloader";
import { Link } from "react-router-dom";


const AdminExamListScreen = () => {
    const { data: exams, isLoading: loadingExams, refetch, error: examsError } = useGetExamListQuery();

    useEffect(() => {
        console.log("Exams? ", exams);
        refetch();
    }, [loadingExams, refetch, exams]);

    return (
        <>
            {loadingExams && <Preloader/>}
            <div className={"userScreenContent"}>
                <h1 className={"mb-4"}>Exams</h1>
                <Table striped hover responsive className={"table-sm"}>
                    <thead>
                    <tr>
                        <th>Product</th>
                        <th>Exam</th>
                        <th>Num. of Questions</th>
                        <th>Passing Grade</th>
                        <th>Created On</th>
                        <th>Last Modified On</th>
                    </tr>
                    </thead>
                    <tbody>
                    {exams?.data.length > 0  && exams?.data?.map(exam => (
                        <tr key={exam._id}>
                            <td>{exam.associatedProduct.productName}</td>
                            <td>{exam.examTitle}</td>
                            <td>{exam.nrOfQuestions}</td>
                            <td>{exam.examPassingGrade}</td>
                            <td>{formatDate(exam.createdAt)}</td>
                            <td>{formatDate(exam.updatedAt)}</td>
                            <td>
                                <Button variant={"light"} className={"btn-sm"}>
                                    <Link to={`/admin/exam/${exam._id}/edit`}>
                                        Update Exam
                                    </Link>
                                </Button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
                {(exams?.data?.length === 0 || exams === undefined)  && (<h4 className={"text-center mt-3"}>No Exams Yet!</h4>)}
            </div>
        </>
    );
}

export default AdminExamListScreen;