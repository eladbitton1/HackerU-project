import SideNavbar from "components/sideNavbar/SideNavbar";
import Profile from "components/profile/Profile";
import { Fragment } from "react";
import "./UserInterface.scss";
const UserInterface = () => {
  return (
    <div className="style">
      <SideNavbar />
      <Profile />
    </div>
  );
};

export default UserInterface;
