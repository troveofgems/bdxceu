import {createBrowserRouter} from "react-router-dom";
import {Landing} from "../components/Landing/Landing";
import ErrorPage404 from "../components/Errors/e404/E404";
import {ExamPage} from "../components/Exam/Exam";
import {Product} from "../components/Product/Product";

const ApplicationRouter = createBrowserRouter([
    {
        path: "/",
        element: <Landing />,
        errorElement: <ErrorPage404 />,
    },
    {
        path: "product",
        element: <Product />
    },
    {
        path: "exam",
        element: <ExamPage />
    }
]);

export default ApplicationRouter;