import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { Fragment, useState, useEffect } from "react";
import ProductImgs from "../productImgs/productImgs";
import { useHistory } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import "./productCard.scss";

const ProductCard = ({ name, desc,price , id, onDelete }) => {
  const history = useHistory();
  const [data, setData] = useState([]);
  const userInfo = useSelector((state) => state.auth.userData);
  let isOnFavorites = false;
  // const handleMoreDetailsBtnClick = () => {
  //   history.push(`card-details/${id}`);
  // };
  // const handleDeleteBtnClick = () => {
  //   onDelete(id);
  // };
  useEffect(() => {
    axios
      .get(`/auth/getfavproductsarray/${userInfo.id}`)
      .then(async (res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  for (let item of data) {
    if (item === id) {
      isOnFavorites = true;
    }
  }
  return (
    <Fragment>
      <div className="col">
        <div className="card cardstyle">
          <div className="productImgStyle">
            <div className="favorite-mark">{isOnFavorites ? "⭐" : ""}</div>

            <ProductImgs productId={id} key={id} />
          </div>

          <div className="card-body">
            <h5 className="card-title">{name}</h5>
            <p className="card-text">{desc}</p>
            <p className="card-text">{price} $</p>
          </div>
          <div className="card-body">
            <NavLink
              type="button"
              className="btn btn-primary"
              to={`/card-details/${id}`}
            >
              More Details
            </NavLink>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ProductCard;
