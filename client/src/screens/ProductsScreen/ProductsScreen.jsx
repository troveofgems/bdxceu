import React from 'react';
import Pricing from "../../components/Landing/Pricing/Pricing";
import AdminHeader from "../../components/shared/Header/Admin.Header";
import {useSelector} from "react-redux";

const ProductsScreen = () => {
    const
        { userInfo } = useSelector((state) => state.auth),
        isAdmin = userInfo?.data?.authLevel === "admin";

    return (
        <>
            {isAdmin && <AdminHeader subsection={"product"}/>}
            <Pricing isAdmin={isAdmin} />
        </>
    );
}

export default ProductsScreen;