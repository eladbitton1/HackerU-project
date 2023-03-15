import { Fragment, useState, useEffect, useRef } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import registerSchema from "../validation/register_Validation";
import validate from "../validation/validation";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

const ProductImagesUpload = () => {
  // const nameRef = useRef();
  const history = useHistory()
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
    formData.append("productImgs" , image)
    

    

    axios
      .post(`/images/productImgs/${id}`, formData)
      .then(async (res) => {
        // console.log(res)
        toast.success('Product Created', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
        history.push(`/my-account/${id}`)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Fragment>
      <form
        method="post"
        action="/images/productImgs/:id"
        encType="multipart/form-data"
        onSubmit={handleSubmitClick}
      >
        <label htmlFor="avatar" className="form-label my-3">
          Upload Product Images
        </label>
        <input
          id="img"
          placeholder="images"
          className="form-control my-2"
          type="file"
          name="avatarImg"
          onChange={handleFileChange}
        />

        <button type="submit" className="btn btn-primary my-5">
        Upload Product Images
        </button>
      </form>
    </Fragment>
  );
};
export default ProductImagesUpload;
