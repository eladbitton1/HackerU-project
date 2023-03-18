import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import "./profileStyle.scss";

const Profile = () => {
  const history = useHistory();
  const userInfo = useSelector((state) => state.auth.userData);

  const handleUpdateProfilePicBtnClick = () => {
    history.push("/update-profile-pic/" + userInfo.id);
  };
  return (
    <div className="profile">
      <h1>My Profile</h1>
      <h2>Name : {userInfo.name}</h2>
      <h2>email : {userInfo.email} </h2>

      <button
        onClick={handleUpdateProfilePicBtnClick}
        className="btn btn-primary"
      >
        <h3>Update profile pic</h3>
      </button>
    </div>
  );
};

export default Profile;
