import { Fragment, useState, useEffect } from "react";
import ProductImgs from "../productImgs/productImgs";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
const ShowAllProducts = ({ name, desc, price, id }) => {
  const history = useHistory();
  const [data, setData] = useState([]);
  const userInfo = useSelector((state) => state.auth.userData);
  const handleMoreDetailsBtnClick = () => {
    history.push(`card-details/${id}`);
  };
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
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleMoreDetailsBtnClick}
            >
              More details
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ShowAllProducts;
