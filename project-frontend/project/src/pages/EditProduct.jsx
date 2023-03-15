import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import validate from "../validation/validation";
import { toast } from "react-toastify";

import productSchema from "validation/product_Validation";
// import cardCreationSchema from "../validation/bizCardCreation_Validation";
// import validate from "validation/validation";
// import { toast } from "react-toastify";

const EditProduct = () => {
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
  let { id } = useParams();
  useEffect(() => {
    productNameRef.current.focus();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        let { data } = await axios.get(`/products/getbyid/${id}`);
        // console.log(data);
        // console.log(data);
        setProductInfo({
          productName: data.productName,
          productDescription: data.productDescription,
          productPrice: data.productPrice,
          productCategory: "",
        });
      } catch (err) {}
    })();
  }, []);

  const handleProductDetailsInputChange = (ev) => {
    let productDetailsinput = JSON.parse(JSON.stringify(productInfo));
    if (productDetailsinput.hasOwnProperty(ev.target.id)) {
      productDetailsinput[ev.target.id] = ev.target.value;
      setProductInfo(productDetailsinput);
    }
  };

  const handleFormSubmit = async (ev) => {
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
        // console.log(errorItem);
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

    try {
      console.log(productInfo)
      let { data } = await axios.put(`/products/${id}`, {
        productInfo,
      });
      toast.success("Product updated", {
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
      // console.log(data);
      // history.push("/cardspanel");
    } catch (err) {
      toast.error(`${err.response.data}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      // console.log(err);
      // toast.error("Something went wrong", {
      //   position: "top-right",
      //   autoClose: 5000,
      //   hideProgressBar: false,
      //   closeOnClick: true,
      //   pauseOnHover: true,
      //   draggable: true,
      //   progress: undefined,
      // });
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <h1>Edit your product</h1>
      <div className="mb-3 my-5">
        <label htmlFor="title" className="form-label">
          Product name
        </label>
        <input
          type="text"
          className="form-control"
          id="productName"
          value={productInfo.productName}
          onChange={handleProductDetailsInputChange}
          ref={productNameRef}
          // ref={titleRef}
        />
        <div ref={showErrMsgProductName} className="visually-hidden">
          Please enter a valid product Name !
        </div>
        {/* <div ref={showErrMsgTitle} className="visually-hidden">
          Please enter a valid Title !
        </div> */}
      </div>

      <div className="mb-3">
        <label htmlFor="subTitle" className="form-label">
          Product Description
        </label>
        <input
          type="text"
          className="form-control"
          id="productDescription"
          value={productInfo.productDescription}
          onChange={handleProductDetailsInputChange}
          ref={productDescriptionRef}
          // ref={subTitleRef}
        />
        <div ref={showErrMsgProductDescription} className="visually-hidden">
          Please enter a valid Product Description !
        </div>
        {/* <div ref={showErrMsgSubTitle} className="visually-hidden">
          Please enter a valid sub-title !
        </div> */}
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
          onChange={handleProductDetailsInputChange}
          value={productInfo.productPrice}
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
          onChange={handleProductDetailsInputChange}
          ref={productCategoryRef}
          // onChange={handleUserInputChange}
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
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

export default EditProduct;
