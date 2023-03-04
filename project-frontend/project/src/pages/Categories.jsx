import { Fragment, useState, useEffect } from "react";
import ShowCategoryCards from "../components/ShowCategoryCards";
import axios from "axios";
import ProductCard from "../components/productCard/productCard";
import ProductImgs from "../components/productImgs/productImgs";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
let initialProductCardsArray = [];
const Categories = () => {
  const [productCardsArray, setProductCardsArray] = useState(
    initialProductCardsArray
  );
  const [findInput, setFindInput] = useState("");
  let { category } = useParams();

  useEffect(() => {
    axios
      .get(`/products/catergories/${category}`)
      .then(async (res) => {
        initialProductCardsArray = res.data;
        setProductCardsArray(initialProductCardsArray);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    let regex = new RegExp(findInput, "i");
    let productCardsArrayCopy = JSON.parse(
      JSON.stringify(initialProductCardsArray)
    );

    productCardsArrayCopy = productCardsArrayCopy.filter((item) =>
    // console.log(item)
      regex.test(item.productName)
    );

    setProductCardsArray(productCardsArrayCopy);
  }, [findInput]);
  const handleFindInputChange = (ev) => {
    setFindInput(ev.target.value);
  };
  return (
    <Fragment>
      <div className="header">
        <div className="form-floating mb-3 my-5">
          <input
            type="text"
            className="form-control"
            id="input"
            value={findInput}
            onChange={handleFindInputChange}
          />
          <label htmlFor="floatingInput">Search a product in this category</label>
        </div>
        <div className="row row-cols-1 row-cols-md-2 g-4 my-5">
          {productCardsArray.map((item) => (
            <ProductCard
              key={"product" + item._id}
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

export default Categories;
