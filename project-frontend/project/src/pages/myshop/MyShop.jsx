import { Fragment, useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "../../components/productCard/productCard";
import {
  useParams,
  useHistory,
} from "react-router-dom/cjs/react-router-dom.min";
import SideNavbar from "components/sideNavbar/SideNavbar";

import "./myShop.scss";
let initialProductCardsArray = [];

const MyShop = () => {
  const history = useHistory();
  const [productCardsArray, setProductCardsArray] = useState(
    initialProductCardsArray
  );

  let { id } = useParams();
  useEffect(() => {
    axios
      .get(`/products/my-products/${id}`)
      .then(async (res) => {
        initialProductCardsArray = res.data;
        setProductCardsArray(initialProductCardsArray);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Fragment>
      <div className="d-flex flex-style">
        <div className="">
          <SideNavbar />
        </div>

        <div className="row row-cols-1 row-cols-md-2 g-4 my-5  ">
          {productCardsArray.map((item) => (
            <ProductCard
              key={"product" + item._id}
              name={item.productName}
              desc={item.productDescription}
              price={item.productPrice}
              id={item._id}
            />
          ))}
        </div>
      </div>
    </Fragment>
  );
};

export default MyShop;
