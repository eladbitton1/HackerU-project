import SideNavbar from "components/sideNavbar/SideNavbar";
import Profile from "components/profile/Profile";

import "./UserInterface.scss";
const UserInterface = () => {
  return (
    <div className="style">
      <div>
        <SideNavbar />
      </div>

      <Profile />
    </div>
  );
};

export default UserInterface;
