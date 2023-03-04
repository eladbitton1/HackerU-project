import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useHistory } from "react-router-dom";
import "./avatarImgStyle.scss";

const AvatarImg = () => {
  const [data, setData] = useState([]);
  let { id } = useParams();
  const history = useHistory();
  const userInfo = useSelector((state) => state.auth.userData);

  useEffect(() => {
    axios
      .get(`/images/avatarImg/${id}`)
      .then((res) => {
        setData(res.data);
        // history.push(`/my-account/${id}`);
        
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
