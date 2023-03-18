import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { authActions } from "store/auth";
import NavlinksHandler from "partial/NavlinksHandler";
import { useState, useEffect } from "react";

let links = [
  {
    label: "About us",
    url: "/aboutus",
  },
];

let authLinks = {
  isAdmin: [
    {
      label: "Admin",
      url: "admin",
    },
  ],
  isLoggedIn: [
    {
      label: "Welcome , ",
      url: "/my-account",
    },
    {
      label: "Logout",
      url: "/logout",
    },
  ],
  isLoggedOut: [
    {
      label: "Login",
      url: "/login",
    },
    {
      label: "Register",
      url: "/register",
    },
  ],
};

const Navbar = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const loggedIn = useSelector((state) => state.auth.loggedIn);
  const userInfo = useSelector((state) => state.auth.userData);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (loggedIn === true && userInfo.isAdmin === true) {
      setIsAdmin(true);
    }
  }, [loggedIn]);

  const handleLogoutBtnClick = () => {
    localStorage.clear();
    dispatch(authActions.logout());
    setIsAdmin(false);
    history.push("/");
  };
  const handleAdminBtnClick = () => {
    history.push("/admin");
  };
  return (
    <nav className="navbar navbar-expand-lg bg-light">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">
          Home
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            {links.map((item, idx) => (
              <NavlinksHandler
                key={"Navlink" + idx}
                label={item.label}
                link={item.url}
              />
            ))}
          </ul>
        </div>
        <form className="d-flex" role="search">
          {isAdmin
            ? authLinks.isAdmin.map((item, idx) => (
                <button
                  type="button"
                  key={"admin -" + idx}
                  className="btn"
                  onClick={handleAdminBtnClick}
                >
                  {item.label}
                </button>
              ))
            : ""}
          {loggedIn
            ? authLinks.isLoggedIn.map((item, idx) => (
                <button
                  type="button"
                  key={"loggedIn" + idx}
                  className="btn"
                  onClick={
                    item.label === "Logout"
                      ? handleLogoutBtnClick
                      : () => {
                          history.push(item.url + "/" + userInfo.id);
                        }
                  }
                >
                  {item.label === "Welcome , "
                    ? item.label + userInfo.name
                    : item.label}
                </button>
              ))
            : authLinks.isLoggedOut.map((item, idx) => (
                <button
                  type="button"
                  key={"loggedOut" + idx}
                  className="btn"
                  onClick={() => {
                    history.push(item.url);
                  }}
                >
                  {item.label}
                </button>
              ))}
        </form>
      </div>
    </nav>
  );
};

export default Navbar;
