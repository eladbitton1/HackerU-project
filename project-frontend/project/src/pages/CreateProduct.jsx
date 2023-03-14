import { useState, useRef, useEffect, Fragment } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import axios from "axios";
// import cardCreationSchema from "../validation/bizCardCreation_Validation";
import validate from "../validation/validation";
import { toast } from "react-toastify";

const CreateProduct = () => {
  const history = useHistory();
  const productNameRef = useRef();
  const [productInfo, setProductInfo] = useState({
    productName: "",
    productDescription: "",
    productPrice:"",
    productCategory: "",
  });

  useEffect(() => {
    // productNameRef.current.focus();
  }, []);

  const handleUserInputChange = (ev) => {
    
    let newProductInfo = JSON.parse(JSON.stringify(productInfo));
    newProductInfo[ev.target.id] = ev.target.value;
    setProductInfo(newProductInfo);
  };

  const handleSubmitClick = (ev) => {
    ev.preventDefault();

    axios
      .post("/products/", productInfo)
      .then(async (res) => {
        console.log(res.data._id);
        history.push(`/product-images/${res.data._id}`)
      })
      .catch((err) => {
        toast.error(`${err.response.data}`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };

  return (
    <Fragment>
      <form onSubmit={handleSubmitClick}>
        <h1>Create New Product</h1>
        <div className="mb-3 my-5">
          <label htmlFor="productName" className="form-label">
            Product name
          </label>
          <input
            type="text"
            className="form-control"
            id="productName"
            placeholder="Product Name"
            onChange={handleUserInputChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="productDescription" className="form-label">
            Product Description
          </label>
          <input
            type="text"
            className="form-control"
            id="productDescription"
            placeholder="Product Description"
            onChange={handleUserInputChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="productPrice" className="form-label">
            Product Price
          </label>
          <input
            type="number"
            className="form-control"
            id="productPrice"
            placeholder="Product Price"
            onChange={handleUserInputChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="productCategory" className="form-label">
            Product Category
          </label>

          <select
            id="productCategory"
            className="form-select"
            aria-label="Default select example"
            onChange={handleUserInputChange}
          >
            <option defaultValue>Choose a Category</option>
            <option value="Household supply">Household supply</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Electronics">Electronics</option>
            <option value="Pet supply">Pet supply</option>
            <option value="Fashion">Fashion</option>
            <option value="Others">Others</option>
          </select>
          {/* <input
            type="text"
            className="form-control"
            id="productCategory"
            placeholder="Product Category"
            onChange={handleUserInputChange}
          /> */}
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </Fragment>
  );
};

export default CreateProduct;
