import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
// import cardCreationSchema from "../validation/bizCardCreation_Validation";
// import validate from "validation/validation";
// import { toast } from "react-toastify";

const EditProduct = () => {
  const history = useHistory();
  const [productData, setproductData] = useState({
    productName: "",
    productDescription: "",
    productPrice:"",
    productCategory: "",
  });
  let { id } = useParams();

  useEffect(() => {
    (async () => {
      try {
        let { data } = await axios.get(`/products/getbyid/${id}`);
        // console.log(data);
        setproductData({
          productName: data.productName,
          productDescription: data.productDescription,
          productPrice : data.productPrice,
          productCategory: "",
        });
      } catch (err) {}
    })();
  }, []);

  const handleProductDetailsInputChange = (ev) => {
    let productDetailsinput = JSON.parse(JSON.stringify(productData));
    if (productDetailsinput.hasOwnProperty(ev.target.id)) {
      productDetailsinput[ev.target.id] = ev.target.value;
      setproductData(productDetailsinput);
    }
  };

  const handleFormSubmit = async (ev) => {
    ev.preventDefault();

    try {
      let { data } = await axios.put(`/products/${id}`, {
        productData,
      });
      console.log(data);
      // history.push("/cardspanel");
    } catch (err) {
      console.log(err);
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
          value={productData.productName}
          onChange={handleProductDetailsInputChange}
          // ref={titleRef}
        />
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
          value={productData.productDescription}
          onChange={handleProductDetailsInputChange}
          // ref={subTitleRef}
        />
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
          onChange={handleProductDetailsInputChange}
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
      </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

export default EditProduct;
