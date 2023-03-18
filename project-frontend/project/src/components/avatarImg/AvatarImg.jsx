import { useEffect, useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useSelector } from "react-redux";
import axios from "axios";

import "./avatarImgStyle.scss";

const AvatarImg = () => {
  const [data, setData] = useState([]);
  let { id } = useParams();

  const userInfo = useSelector((state) => state.auth.userData);

  useEffect(() => {
    axios
      .get(`/images/avatarImg/${id}`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log( err);
      });
  }, []);
  return (
    <div className="img-container">
      {data.map((singleData, i) => {
        if (!singleData) {
          return [userInfo.name];
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
              alt={userInfo.name}
              key={"img" + i}
              className="profileImg"
            />
          )
        );
      })}
    </div>
  );
};
export default AvatarImg;
