import { Fragment, useState, useEffect } from "react";
import axios from "axios";
import ShowAllProducts from "../showAllProducts/ShowAllProducts"
let initialProductCardsArray = [];
const GetAllProducts = () => {
  const [productCardsArray, setProductCardsArray] = useState(
    initialProductCardsArray
  );
  const [findInput, setFindInput] = useState("");
  useEffect(() => {
    axios
      .get(`/products`)
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
          <label htmlFor="floatingInput">Search a product</label>
        </div>
        <div className="row row-cols-1 row-cols-md-2 g-4 my-5">
          {productCardsArray.map((item) => (
            <ShowAllProducts
              key={item._id}
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

export default GetAllProducts;
