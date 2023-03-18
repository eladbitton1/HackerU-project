import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { Fragment, useRef, useState, useEffect } from "react";
import axios from "axios";
import ProductImgs from "../../components/productImgs/productImgs";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import Reviews from "../../components/Reviews";
import "./productDetails.scss";
const ProductDetails = () => {
  const history = useHistory();
  const [productData, setProductData] = useState({});
  const [data, setData] = useState([]);
  const [isUserTheOwnerOfProduct, setIsUserTheOwnerOfProduct] = useState(false);
  const editProductBtnRef = useRef();
  const deleteProductBtnRef = useRef();
  let { id } = useParams();
  const userInfo = useSelector((state) => state.auth.userData);
  let isOnFavorites = false;
  useEffect(() => {
    if (userInfo) {
      axios
        .get(`/auth/getfavproductsarray/${userInfo.id}`)
        .then(async (res) => {
          setData(res.data.favProducts);
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
  }, []);

  useEffect(() => {
    if (productData.ownerId === userInfo.id || userInfo.isAdmin) {
      setIsUserTheOwnerOfProduct(true);
    }
    if (!isUserTheOwnerOfProduct) {
      editProductBtnRef.current.className = "btn btn-warning visually-hidden";
      deleteProductBtnRef.current.className = "btn btn-danger visually-hidden";
    } else {
      editProductBtnRef.current.className = "btn btn-warning ";
      deleteProductBtnRef.current.className = "btn btn-danger ";
    }
  }, [productData, isUserTheOwnerOfProduct]);
  const handleAddOrRemoveProductFromFav = () => {
    if (!isOnFavorites) {
      axios
        .patch(`/auth/addtofav/${id} `, userInfo)
        .then(async (res) => {
          toast.success("Product added to Favorites ", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          history.push(`/favorite-products/${userInfo.id}`);
        })
        .catch((err) => {
          console.log(err);
          toast.warn(`${err.response.data.error}`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        });
    }
    if (isOnFavorites) {
      axios
        .patch(`/auth/removefromfav/${id} `, userInfo)
        .then(async (res) => {
          toast.info("Product removed from Favorites", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          history.push("/");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  const handleEditProductsBtnClick = () => {
    history.push(`/edit-product/${id}`);
  };

  const handleProductDelete = () => {
    axios
      .delete(`/products/${id} `)
      .then(async (res) => {
        toast.info("Product deleted", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        history.push("/");
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
          <h5 className="card-title">
            Product name : {productData.productName}
          </h5>
          <p className="card-text">
            Product Description : {productData.productDescription}
          </p>
          <p className="card-text">
            Product Price : {productData.productPrice} $
          </p>
          <button
            type="button"
            className="btn btn-warning"
            onClick={handleEditProductsBtnClick}
            ref={editProductBtnRef}
          >
            <FontAwesomeIcon icon={faPenToSquare} />
            &nbsp;Edit product
          </button>
          <button
            type="button"
            className="btn btn-danger "
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            ref={deleteProductBtnRef}
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

      <Reviews productName={productData.productName} />

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
                Delete Product
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
