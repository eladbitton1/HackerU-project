import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { Fragment, useState, useEffect } from "react";
import axios from "axios";
import ProductImgs from "../../components/productImgs/productImgs";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import Reviews from "../../components/Reviews";
import "./productDetails.scss";
const ProductDetails = () => {
  const history = useHistory();
  const [productData, setProductData] = useState({});
  // const [productReview, setProductReview] = useState({
  //   reviewDescription: "",
  // });
  const [data, setData] = useState([]);
  const [reviewsArray, setReviewsArray] = useState([]);
  let { id } = useParams();
  const userInfo = useSelector((state) => state.auth.userData);
  let isOnFavorites = false;
  useEffect(() => {
    if (userInfo) {
      axios
        .get(`/auth/getfavproductsarray/${userInfo.id}`)
        .then(async (res) => {
          setData(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);
  for (let item of data) {
    if (item === id) {
      isOnFavorites = true;
    }
  }
  useEffect(() => {
    axios
      .get(`/products/getbyid/${id}`)
      .then(async (res) => {
        setProductData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get(`/reviews/getbyid/${id}`)
      .then(async (res) => {
        setReviewsArray(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // const handleUserInputChange = (ev) => {
  //   let newUserInput = JSON.parse(JSON.stringify(productReview));
  //   if (newUserInput.hasOwnProperty(ev.target.id)) {
  //     newUserInput[ev.target.id] = ev.target.value;
  //     setProductReview(newUserInput);
  //     // console.log(productReview);
  //   }
  // };

  // const handleSubmitClick = (ev) => {
  //   // console.log("here");
  //   ev.preventDefault();
  //   // let formData = new FormData();
  //   // formData.append("productName", productData.productName );
  //   // formData.append("reviewDescription", productReview);
  //   // console.log(formData);

  //   let data = {
  //     productName: productData.productName,
  //     reviewAuthor: userInfo.name,
  //     reviewDescription: productReview.reviewDescription,
  //   };
  //   // console.log(data);
  //   axios
  //     .post(`/reviews/${id} `, data)
  //     .then(async (res) => {})
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };
  const handleAddOrRemoveProductFromFav = () => {
    if (!isOnFavorites) {
      axios
        .patch(`/auth/addtofav/${id} `, userInfo)
        .then(async (res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    if (isOnFavorites) {
      axios
        .patch(`/auth/removefromfav/${id} `, userInfo)
        .then(async (res) => {
          // console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  const handleEditProductsBtnClick = () => {
    history.push(`/edit-product/${id}`);
  };
  // const handleOpenModalBtnClick = () => {};
  const handleProductDelete = () => {
    axios
      .delete(`/products/${id} `)
      .then(async (res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <Fragment>
      <div className="img-details my-5">
        <ProductImgs productId={id} key={id} />
      </div>
      <div className="col">
        <div className="card-body">
          <h5 className="card-title">{productData.productName}</h5>
          <p className="card-text">{productData.productDescription}</p>
          <p className="card-text">{productData.productPrice} $</p>
          <button
            type="button"
            className="btn btn-warning"
            onClick={handleEditProductsBtnClick}
          >
            <FontAwesomeIcon icon={faPenToSquare} />
            &nbsp;Edit product
            {/* {isOnFavorites ? "Remove from Favorites" : "Add to Favorites "} */}
          </button>
          <button
            type="button"
            className="btn btn-danger"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            // onClick={handleOpenModalBtnClick}
          >
            <FontAwesomeIcon icon={faTrashCan} />
            &nbsp;Delete
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleAddOrRemoveProductFromFav}
          >
            {isOnFavorites ? "Remove from Favorites" : "Add to Favorites "}
          </button>
          <div className="card-body"></div>
        </div>
      </div>

      {/* <form method="POST" action="/" onSubmit={handleSubmitClick}>
        <div className="mb-3 my-5">
          <label htmlFor="review" className="form-label">
            Leave a review for {productData.productName} :
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
      </form> */}
      <Reviews />
      {/* REVIEWS ! */}
      {/* {reviewsArray.map((item) => (
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
      ))} */}

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Delete Card
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              You are about to permanently delete {productData.productName} card
              , are you sure?
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                data-bs-dismiss="modal"
                onClick={handleProductDelete}
                type="button"
                className="btn btn-primary"
              >
                Yes , I`m sure !
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ProductDetails;
