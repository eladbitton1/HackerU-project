import { Fragment, useState, useEffect, useRef } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import registerSchema from "../validation/register_Validation";
import validate from "../validation/validation";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

const UpdateProfilePic = () => {
  // const nameRef = useRef();
  const history = useHistory();
  const userInfo = useSelector((state) => state.auth.userData);
  let { id } = useParams();
  const [image, setImage] = useState({});
  const handleFileChange = (ev) => {
    setImage(ev.target.files[0]);
  };

  // const [userInput, setUserInput] = useState({});
  // const handleUserInputChange = (ev) => {
  //   const file = ev.target.files[0];
  //   setUserInput(file);
  //   console.log(file)
  // };

  const handleSubmitClick = (ev) => {
    ev.preventDefault();
    let formData = new FormData();
    formData.append("avatarImg" , image)

    axios
      .delete(`images/deleteAvatarImg/${id}`)
      .then(async (res) => {
        console.log(res);
        history.push(`/my-account/${id}`);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .post(`/images/${id}`, formData)
      .then(async (res) => {
        
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Fragment>
      <form
        method="post"
        action="/images/:id"
        encType="multipart/form-data"
        onSubmit={handleSubmitClick}
      >
        <label htmlFor="avatar" className="form-label my-3">
          Profile picture
        </label>
        <input
          id="img"
          placeholder="image"
          className="form-control my-2"
          type="file"
          name="avatarImg"
          onChange={handleFileChange}
        />

        <button type="submit" className="btn btn-primary my-5">
          Update Profile Pic
        </button>
      </form>
    </Fragment>
  );
};
export default UpdateProfilePic;
