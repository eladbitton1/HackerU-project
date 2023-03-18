import { Fragment, useState,  useRef } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

import { toast } from "react-toastify";

import { useParams } from "react-router-dom/cjs/react-router-dom.min";

const UpdateProfilePic = () => {
  // const nameRef = useRef();
  const history = useHistory();
  
  const imageRef = useRef();
  const showErrMsgImage = useRef();
  const [isFormValid, setIsFormValid] = useState(false);
  let { id } = useParams();
  const [image, setImage] = useState({});
  const handleFileChange = (ev) => {
    const file = ev.target.files[0];
    imageRef.current.className = " form-control is-valid ";
    showErrMsgImage.current.className = "visually-hidden";
    if (
      file.type !== "image/jpeg" &&
      file.type !== "image/png" &&
      file.type !== "image/webp"
    ) {
      imageRef.current.className = " form-control is-invalid ";
      showErrMsgImage.current.className = "text-danger";
      setIsFormValid(false)
    }else{
      setIsFormValid(true)
    }
    console.log(file.type);
    setImage(ev.target.files[0]);
  };

  

  const handleSubmitClick = (ev) => {
    ev.preventDefault();
    let formData = new FormData();
    formData.append("avatarImg", image);

    axios
      .delete(`images/deleteAvatarImg/${id}`)
      .then(async (res) => {
        

        history.push(`/my-account/${id}`);
      })
      .catch((err) => {
        
      });

    axios
      .post(`/images/${id}`, formData)
      .then(async (res) => {
        toast.success("Profile picture updated ! ", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      })
      .catch((err) => {
        toast.error(`${err.response.data.error}`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        
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
          ref={imageRef}
        />
        <div ref={showErrMsgImage} className="visually-hidden">
          Please enter a valid Image format : Image / jpeg / png / webp!
        </div>
        <button disabled={!isFormValid}  type="submit" className="btn btn-primary my-5">
          Update Profile Pic
        </button>
      </form>
    </Fragment>
  );
};
export default UpdateProfilePic;
