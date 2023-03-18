import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const AdminAuthGuard = ({ component: Page, ...rest }) => {
  const isAdmin = useSelector((state) => state.auth.userData.isAdmin);
  return (
    <Route
      {...rest}
      render={(props) =>
        isAdmin ? <Page {...props}></Page> : <Redirect to="/"></Redirect>
      }
    ></Route>
  );
};

export default AdminAuthGuard;
