import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";


const AuthGuard = ({ component: Page, ...rest }) => {
  const isLoggedIn = useSelector((state) => state.auth.loggedIn);
  return (
    <Route
      {...rest}
      render={(props) =>
        isLoggedIn ? <Page {...props}></Page> : <Redirect to="/"></Redirect>
      }
    ></Route>
  );
};

export default AuthGuard;
