import {  useEffect, useState } from "react";

import { useSelector } from "react-redux";
import axios from "axios";
import "./productImg.scss"


const ProductImgs = ({productId}) => {
 
  const [data, setData] = useState([]);
  
  const userInfo = useSelector((state) => state.auth.userData);

  useEffect(() => {
    
    axios
      .get(`/images/productImg/${productId}`, {
        
      })
      .then((res) => {
        setData(res.data);
        
        
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, []);
  return (
    
    <div className="img-container">
      {
        data.map((singleData, i) => {
          if(!singleData){
            return [userInfo.name]
          }
          const base64String = btoa(
            new Uint8Array(singleData.img.data.data).reduce(function (
              data,
              byte
            ) {
              return data + String.fromCharCode(byte);
            },
            "")
          );
          return (
            data && (
              <img
                src={`data:image/png;base64 , ${base64String}`}
                alt={"userInfo.name"}
                key={"img" + i}
                className="productImg"
              />
            )
          );
        })}
    </div>
  );
};
export default ProductImgs;
