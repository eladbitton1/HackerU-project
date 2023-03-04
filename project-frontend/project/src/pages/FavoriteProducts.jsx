import { Fragment, useState, useEffect } from "react";
// import ShowCategoryCards from "../../components/ShowCategoryCards";
// import axios from "axios";
import ProductCard from "../components/productCard/productCard";
// import ProductImgs from "../../components/productImgs/productImgs";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import SideNavbar from "components/sideNavbar/SideNavbar";
import axios from "axios";

let initialProductCardsArray = [];
let favProductsFromDB = [];
const FavoriteProducts = () => {
  const [productCardsArray, setProductCardsArray] = useState(
    initialProductCardsArray
  );
  const [favProducts, setFavProducts] = useState(favProductsFromDB);
  let { id } = useParams();

  useEffect(() => {
    axios
      .get(`/auth/getfavproductsarray/${id}`)
      .then(async (res) => {
        initialProductCardsArray = res.data;
        setProductCardsArray(initialProductCardsArray);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  useEffect(() => {
    axios
      .get(`/products/getfavproducts`, {
        params: { productCardsArray },
      })
      .then(async (res) => {
        favProductsFromDB = res.data;
        setFavProducts(favProductsFromDB);
      })
      .catch((err) => {
        console.log(err);
      });
  },[initialProductCardsArray]);
  //  console.log(productCardsArray)
  //   useEffect(() => {

  //   }, [productCardsArray]);

  return (
    <Fragment>
      <div className="flex">
        <SideNavbar />
        <div className="row row-cols-1 row-cols-md-2 g-4 my-5">
          {favProducts.map((item, i) => (
            <ProductCard
              key={"product " + i}
              name={item.productName}
              desc={item.productDescription}
              id={item._id}
            />
          ))}
        </div>
      </div>
    </Fragment>
  );
};

export default FavoriteProducts;
