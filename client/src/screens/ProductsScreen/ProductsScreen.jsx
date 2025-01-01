import React from "react";
import Pricing from "../../components/Landing/Pricing/Pricing";
import AdminHeader from "../../components/shared/Header/Admin.Header";
import { useSelector } from "react-redux";
import { getUserInfo } from "../../utils/user.utils";

const ProductsScreen = () => {
  const { user } = useSelector((state) => state.auth),
    { isAdmin } = getUserInfo(user);

  return (
    <>
      {isAdmin && <AdminHeader subsection={"product"} />}
      <Pricing isAdmin={isAdmin} />
    </>
  );
};

export default ProductsScreen;
