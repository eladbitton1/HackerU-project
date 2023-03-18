import { Fragment} from "react";
import GetAllUsers from "../../components/admin/GetAllUsers";

import GetAllProducts from "../../components/admin/GetAllProducts";
const Admin = () => {
  return (
    <Fragment>
      <h1>Registered users :</h1>
      <GetAllUsers></GetAllUsers>
       <h1>All products:</h1>
      <GetAllProducts></GetAllProducts>
    </Fragment>
  );
};

export default Admin;
