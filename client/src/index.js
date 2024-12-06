import * as React from "react";
import * as ReactDOM from "react-dom/client";

import "bootstrap/dist/css/bootstrap.min.css";

import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";

import { Provider as ReduxProvider } from "react-redux";
import store from "./store";

import App from "./App";

// Route Components
import AdminRoute from "./components/shared/Routes/AdminRoute/AdminRoute";
import PrivateRoute from "./components/shared/Routes/PrivateRoute/PrivateRoute";

// Publicly Accessible Routes
import HomeScreen from "./screens/HomeScreen/HomeScreen";
import {ChangePasswordPage} from "./components/Authentication/ChangePassword/ChangePassword";
import ProductScreen from "./screens/ProductScreen/ProductScreen";

// Generic Error Screen Handler
import GenericErrorScreen from "./components/Errors/Error";

// Shared Screens: Administrator - Team Member - Student
import ProfileScreen from "./screens/ProfileScreen/ProfileScreen";
import CheckoutScreen from "./screens/CheckoutScreen/CheckoutScreen";
import ProductsScreen from "./screens/ProductsScreen/ProductsScreen";
import OrdersScreen from "./screens/OrdersScreen/OrdersScreen";

// Administrator Screens & Forms
import UserScreen from "./screens/Admin/Users/UserScreen";
import CreateProductForm from "./components/Product/Create/CreateProductForm";
import UpdateProductForm from "./components/Product/Update/UpdateProductForm";
import AdminOrdersScreen from "./components/Admin/OrdersScreen/OrdersScreen";
import AdminOrdersByIdScreen from "./components/Admin/AdminOrdersByIdScreen/AdminOrdersByIdScreen";
import AdminUserByIdScreen from "./components/Admin/UserByIdScreen/UserByIdScreen";
import AdminTeamMemberByIdScreen from "./components/Admin/TeamMemberByIdScreen/AdminTeamMemberByIdScreen";
import AdminSiteSettingsScreen from "./screens/Admin/SiteSettingsScreen/SiteSettingsScreen";
import ExamScreen from "./screens/Admin/Exams/ExamScreen";
import CreateExamForm from "./components/Exam/Create/CreateExamForm";
import UpdateExamForm from "./components/Exam/Update/UpdateExamForm";

// Paypal Provider
import { PayPalScriptProvider } from "@paypal/react-paypal-js"
import CheckoutSuccessScreen from "./screens/CheckoutSuccessScreen/CheckoutSuccessScreen";
import ClassroomScreen from "./screens/ClassroomScreen/ClassroomScreen";
import {ExamPage} from "./components/Exam/Exam";
import OrderByIdScreen from "./components/OrdersByIdScreen/OrdersByIdScreen";

const router = createBrowserRouter(createRoutesFromElements(
    <Route path={"/"} element={<App />}>
        {/* General Routes: PUBLIC */}
        <Route index={true} path={"/"} element={<HomeScreen />} />
        <Route path={"/product/:id"} element={<ProductScreen />} />
        <Route path={"/auth/change-password/:resetToken"} element={<ChangePasswordPage />} />

        {/* Student & Team Member Routes PROTECTED */}
        <Route path={''} element={<PrivateRoute />}>
            <Route path={"/products"} element={<ProductsScreen />} />
            <Route path={"/product/:id/checkout"} element={<CheckoutScreen />} />
            <Route path={"/user/profile"} element={<ProfileScreen />} />
            <Route path={"/orders"} element={<OrdersScreen />} />
            <Route path={"/orders/:orderId"} element={<OrderByIdScreen />} />
            <Route path={"/checkout-success/:oid"} element={<CheckoutSuccessScreen />} />
            <Route path={"/classroom/:productId"} element={<ClassroomScreen />} />
            <Route path={"/classroom/:productId/exam"} element={<ExamPage />} />
            <Route path={"/classroom/support"} element={<GenericErrorScreen errorCode={410} />} />
        </Route>

        {/* Administrator Routes: PROTECTED */}
        <Route path={"/admin"} element={<AdminRoute />}>
            <Route path={"/admin/users"} element={<UserScreen />} />
            <Route path={"/admin/users/:userId"} element={<AdminUserByIdScreen />} />
            <Route path={"/admin/team/:teamMemberId"} element={<AdminTeamMemberByIdScreen />} />
            <Route path={"/admin/exams"} element={<ExamScreen />} />
            <Route path={"/admin/exam"} element={<CreateExamForm />} />
            <Route path={"/admin/exam/:examId/edit"} element={<UpdateExamForm />} />
            <Route path={"/admin/products"} element={<CreateProductForm />} />
            <Route path={"/admin/products/:pid/edit"} element={<UpdateProductForm />} />
            <Route path={"/admin/orders"} element={<AdminOrdersScreen />} />
            <Route path={"/admin/orders/:orderId"} element={<AdminOrdersByIdScreen />} />
            <Route path={"/admin/app/settings"} element={<AdminSiteSettingsScreen />} />
        </Route>

        {/* Error Routes: PUBLIC */}
        <Route path={"/error401"} element={<GenericErrorScreen errorCode={401} />} />
        <Route path={"/error410"} element={<GenericErrorScreen errorCode={410} />} />
        <Route path={"*"} element={<GenericErrorScreen />} />
    </Route>
));

const rootAnchor = document.getElementById('root') || process.exit(1);

ReactDOM
    .createRoot(rootAnchor)
    .render(
        <React.StrictMode>
            <ReduxProvider store={store}>
                <PayPalScriptProvider deferLoading={true} options={{}}>
                    <RouterProvider router={router} />
                </PayPalScriptProvider>
            </ReduxProvider>
        </React.StrictMode>
    );