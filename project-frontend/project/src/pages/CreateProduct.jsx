import { useState, useRef, useEffect, Fragment } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import axios from "axios";
import validate from "../validation/validation";
import productSchema from "validation/product_Validation";
import { toast } from "react-toastify";
const CreateProduct = () => {
  const history = useHistory();
  const productNameRef = useRef();
  const productDescriptionRef = useRef();
  const productPriceRef = useRef();
  const productCategoryRef = useRef();
  const showErrMsgProductName = useRef();
  const showErrMsgProductDescription = useRef();
  const showErrMsgProductCategory = useRef();
  const showErrMsgProductPrice = useRef();
  const [productInfo, setProductInfo] = useState({
    productName: "",
    productDescription: "",
    productPrice: "",
    productCategory: "",
  });
  const [isFormValid, setIsFormValid] = useState(false);
  useEffect(() => {
    productNameRef.current.focus();
  }, []);

  const handleUserInputChange = (ev) => {
    let newProductInfo = JSON.parse(JSON.stringify(productInfo));
    newProductInfo[ev.target.id] = ev.target.value;
    setProductInfo(newProductInfo);
   
    if (productInfo.productPrice) {
      setIsFormValid(true);
    }
  };

  const handleSubmitClick = (ev) => {
    ev.preventDefault();
    const { error } = validate(productInfo, productSchema);

    productNameRef.current.className = " form-control is-valid ";
    productDescriptionRef.current.className = " form-control is-valid ";
    productPriceRef.current.className = " form-control is-valid ";
    productCategoryRef.current.className = " form-control is-valid ";
    showErrMsgProductName.current.className = "visually-hidden";
    showErrMsgProductDescription.current.className = "visually-hidden";
    showErrMsgProductPrice.current.className = "visually-hidden";
    showErrMsgProductCategory.current.className = "visually-hidden";

    if (error) {
      let errorMsgs = "";
      for (let errorItem of error.details) {
       
        if (errorItem.context.label === "productName") {
          productNameRef.current.className = " form-control is-invalid ";
          showErrMsgProductName.current.className = "text-danger";
        }
        if (errorItem.context.label === "productDescription") {
          productDescriptionRef.current.className = " form-control is-invalid ";
          showErrMsgProductDescription.current.className = "text-danger";
        }
        if (errorItem.context.label === "productPrice") {
          productPriceRef.current.className = " form-control is-invalid ";
          showErrMsgProductPrice.current.className = "text-danger";
        }
        if (errorItem.context.label === "productCategory") {
          productCategoryRef.current.className = " form-control is-invalid ";
          showErrMsgProductCategory.current.className = "text-danger";
        }

        switch (errorItem.type) {
          case "string.min":
            errorMsgs += ` ${errorItem.context.label} length must be at least ${errorItem.context.limit} characters long, `;
            break;
          case "string.max":
            errorMsgs += ` ${errorItem.context.label} length must be at least ${errorItem.context.limit} characters long, `;
            break;
          case "any.empty":
            errorMsgs += ` ${errorItem.context.label} cant be empty ,`;
            break;
          case "string.regex.base":
            errorMsgs += ` ${errorItem.context.label} Failed to match the required pattern ,`;
            break;
          case "string.email":
            errorMsgs += ` ${errorItem.context.label} is invalid ,`;
            break;
          default:
            errorMsgs += " something went wrong , ";
            break;
        }
      }

      toast.error(errorMsgs, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      return;
    }
    axios
      .post("/products/", productInfo)
      .then(async (res) => {
        toast.success("Please Upload a picture of the product", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        history.push(`/product-images/${res.data._id}`);
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
            ref={productNameRef}
          />
          <div ref={showErrMsgProductName} className="visually-hidden">
            Please enter a valid product Name !
          </div>
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
            ref={productDescriptionRef}
          />
          <div ref={showErrMsgProductDescription} className="visually-hidden">
            Please enter a valid Product Description !
          </div>
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
            ref={productPriceRef}
          />
          <div ref={showErrMsgProductPrice} className="visually-hidden">
            Please enter a valid Product Price !
          </div>
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
            ref={productCategoryRef}
          >
            <option defaultValue>Choose a Category</option>
            <option value="Household supply">Household supply</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Electronics">Electronics</option>
            <option value="Pet supply">Pet supply</option>
            <option value="Fashion">Fashion</option>
            <option value="Others">Others</option>
          </select>
          <div ref={showErrMsgProductCategory} className="visually-hidden">
            Please choose a Category !
          </div>
        </div>

        <button
          disabled={!isFormValid}
          type="submit"
          className="btn btn-primary"
        >
          Submit
        </button>
      </form>
    </Fragment>
  );
};

export default CreateProduct;
