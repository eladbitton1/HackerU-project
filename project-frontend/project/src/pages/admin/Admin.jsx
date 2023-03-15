import { Fragment, useState, useEffect, useRef } from "react";
import GetAllUsers from "../../components/admin/GetAllUsers";
// import ShowAllProducts from "../../components/showAllProducts/ShowAllProducts"
import GetAllProducts from "../../components/admin/GetAllProducts";
const Admin = () => {
  return (
    <Fragment>
      <GetAllUsers></GetAllUsers>
      <GetAllProducts></GetAllProducts>
    </Fragment>
  );
};

export default Admin;
