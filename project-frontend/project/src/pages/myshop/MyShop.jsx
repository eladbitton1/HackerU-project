import { Fragment, useState, useEffect } from "react";
import ShowCategoryCards from "../../components/ShowCategoryCards";
import axios from "axios";
import ProductCard from "../../components/productCard/productCard";
import ProductImgs from "../../components/productImgs/productImgs";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import SideNavbar from "components/sideNavbar/SideNavbar";
import "./myShop.scss";
let initialProductCardsArray = [];

const MyShop = () => {
  const [productCardsArray, setProductCardsArray] = useState(
    initialProductCardsArray
  );
  let { id } = useParams();
  useEffect(() => {
    axios
      .get(`/products/my-products/${id}`)
      .then(async (res) => {
        // console.log(res.data)
        initialProductCardsArray = res.data;
        setProductCardsArray(initialProductCardsArray);
        
        

      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <Fragment>
      <div className="flex">
        <SideNavbar />
        <div className="row row-cols-1 row-cols-md-2 g-4 my-5">
          {productCardsArray.map((item) => (
            <ProductCard
              key={"product" + item._id}
              name={item.productName}
              desc={item.productDescription}
              price = {item.productPrice}
              id={item._id}
            />
          ))}
        </div>
      </div>
    </Fragment>
  );
};

export default MyShop;
