import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { Fragment, useState, useEffect, useRef } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import validate from "../validation/validation";
import reviewSchema from "../validation/review_Validation";
import { useSelector } from "react-redux";

const Reviews = (productName) => {
  const [productReview, setProductReview] = useState({
    reviewDescription: "",
  });
  const [reviewsArray, setReviewsArray] = useState([]);
  const reviewRef = useRef();
  const showErrMsgReview = useRef();
  const userInfo = useSelector((state) => state.auth.userData);
  let { id } = useParams();

  useEffect(() => {
    axios
      .get(`/reviews/getbyid/${id}`)
      .then(async (res) => {
        setReviewsArray(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const handleUserInputChange = (ev) => {
    let newUserInput = JSON.parse(JSON.stringify(productReview));
    if (newUserInput.hasOwnProperty(ev.target.id)) {
      newUserInput[ev.target.id] = ev.target.value;
      setProductReview(newUserInput);
    }
  };

  const handleSubmitClick = (ev) => {
    ev.preventDefault();

    let data = {
      productName: productName.productName,
      reviewAuthor: userInfo.name,
      reviewDescription: productReview.reviewDescription,
    };
    const { error } = validate(
      { reviewDescription: productReview.reviewDescription },
      reviewSchema
    );
    reviewRef.current.className = " form-control is-valid ";
    showErrMsgReview.current.className = "visually-hidden";
    if (error) {
      let errorMsgs = "";
      for (let errorItem of error.details) {
        if (errorItem.context.label === "productDescription") {
          reviewRef.current.className = " form-control is-invalid ";
          showErrMsgReview.current.className = "text-danger";
        }
      }
      for (let errorItem of error.details) {
        switch (errorItem.type) {
          case "string.min":
            errorMsgs += ` ${errorItem.context.label} length must be at least ${errorItem.context.limit} characters long, `;
            break;
          case "string.max":
            errorMsgs += ` ${errorItem.context.label} length must maximum  ${errorItem.context.limit} characters long, `;
            break;
          case "any.empty":
            errorMsgs += ` ${errorItem.context.label} cant be empty ,`;
            break;
          case "string.regex.base":
            errorMsgs += ` ${errorItem.context.label} Failed to match the required pattern ,`;
            break;
          case "string.email":
            errorMsgs += ` ${errorItem.context.label} is invalid ,`;
            break;
          default:
            errorMsgs += " something went wrong , ";
            break;
        }
      }
      toast.error(errorMsgs, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      return;
    }
   
    axios
      .post(`/reviews/${id} `, data)
      .then(async (res) => {
        window.location.reload(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Fragment>
      <form method="POST" action="/" onSubmit={handleSubmitClick}>
        <div className="mb-3 my-5">
          <label htmlFor="review" className="form-label">
            Leave a review :
          </label>
          <textarea
            className="form-control"
            id="reviewDescription"
            rows="3"
            onChange={handleUserInputChange}
            ref={reviewRef}
          ></textarea>
          <div ref={showErrMsgReview} className="visually-hidden">
            Please enter a valid Review Format !
          </div>
        </div>
        <button type="submit" className="btn btn-primary">
          Send Review
        </button>
      </form>

      {reviewsArray.map((item) => (
        <ul className="list-group my-5" key={item._id}>
          <li className="list-group-item d-flex justify-content-between align-items-start">
            <div className="ms-2 me-auto">
              <div className="fw-bold">{item.reviewAuthor}</div>
              {item.reviewDescription}
            </div>
            <span className="badge bg-primary rounded-pill">
              {item.productName}
            </span>
          </li>
        </ul>
      ))}
    </Fragment>
  );
};

export default Reviews;
