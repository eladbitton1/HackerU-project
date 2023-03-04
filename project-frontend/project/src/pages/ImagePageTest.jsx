import { Fragment, useEffect, useState } from "react";

import axios from "axios";

const ImagePageTest = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get("/images")
      .then((res) => setData(res.data))
      .catch((err) => {
        console.log("err", err);
      });
  },[]);
  return (
    <div className="img-container">
      {data.map((singleData, i) => {
        console.log(singleData.img.data.data)
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
          <img
            src={`data:image/png;base64 , ${base64String}`}
            alt="avatar-img"
            key={"img" + i}
          />
        );
      })}
    </div>
  );
};
export default ImagePageTest;
