import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { Fragment, useState, useEffect } from "react";
import axios from "axios";
// import ProductImgs from "../../components/productImgs/productImgs";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faPenToSquare } from "@fortawesome/free-solid-svg-icons";

const Reviews = ()=>{
    const [productReview, setProductReview] = useState({
        reviewDescription: "",
      });
      const [reviewsArray, setReviewsArray] = useState([]);
      const [data, setData] = useState([]);
      const userInfo = useSelector((state) => state.auth.userData);
      let { id } = useParams();

      useEffect(() => {
        
    
        axios
          .get(`/reviews/getbyid/${id}`)
          .then(async (res) => {
            console.log(res.data)
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
          // console.log(productReview);
        }
      };

      const handleSubmitClick = (ev) => {
        // console.log("here");
        ev.preventDefault();
        // let formData = new FormData();
        // formData.append("productName", productData.productName );
        // formData.append("reviewDescription", productReview);
        // console.log(formData);
    // console.log(reviewsArray[0].productName)
        let data = {
          productName: reviewsArray[0].productName,
          reviewAuthor: userInfo.name,
          reviewDescription: productReview.reviewDescription,
        };
        // console.log(data);
        axios
          .post(`/reviews/${id} `, data)
          .then(async (res) => {
            console.log(res.data)
          })
          .catch((err) => {
            console.log(err);
          });
      };
      return <Fragment>
        <form method="POST" action="/" onSubmit={handleSubmitClick}>
        <div className="mb-3 my-5">
          <label htmlFor="review" className="form-label">
            Leave a review for {productReview.productName} :
          </label>
          <textarea
            className="form-control"
            id="reviewDescription"
            rows="3"
            onChange={handleUserInputChange}
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">
          Send Review
        </button>
      </form>

      {/* REVIEWS ! */}
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
}


export default Reviews;