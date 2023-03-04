import SideNavbar from "components/sideNavbar/SideNavbar";
import Profile from "components/profile/Profile";
import { Fragment } from "react";
import "./userAccountStyle.scss";
const UserAccount = () => {
  return (
    <div className="style">
      <SideNavbar />
      <Profile />
    </div>
  );
};

export default UserAccount;
