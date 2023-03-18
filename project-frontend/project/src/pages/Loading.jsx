import { useEffect } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useSelector } from "react-redux";
const Loading = () => {
  let history = useHistory();
  const dataFromToken = useSelector((state) => state.auth.userData);
  useEffect(() => {
    setTimeout(() => {
      if (dataFromToken) {
        if (dataFromToken.biz === true) {
          history.push("/createcard");
        } else {
          history.push("/");
        }
      } else {
        history.push("/");
      }
    }, 1000);
  });

  return <h1>Redirecting in 1 seconds</h1>;
};

export default Loading;
