import {  useEffect,  Fragment } from "react";
import jwt_decode from "jwt-decode";
import useAutoLogin from "../hooks/useAutoLogin";
import { useHistory } from "react-router-dom";
import axios from "axios";

const LoginWithGoogle = () => {
  const autoLoginFunction = useAutoLogin();
  const history = useHistory();
  const handleCallbackResponse = (response) => {
    
    let userObj = jwt_decode(response.credential);
    
    let userRegisterDetails = {
      name: userObj.given_name,
      email: userObj.email,
  
    };
    axios
      .post("/auth/register/google-account", userRegisterDetails)
      .then(async (res) => {
       
        localStorage.setItem("token", res.data.token);
        autoLoginFunction(res.data.token);
        history.push("/");
      })
      .catch((err) => {
        console.log(err);
      });

    history.push("/loading");
    return userObj
    
  };
  
  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id:
        "291363326579-22nl5i7shlpoie8p01254dnmt0jg9ddr.apps.googleusercontent.com",
      callback: handleCallbackResponse,
    });
    google.accounts.id.renderButton(document.getElementById("signInDiv"), {
      theme: "outline",
      size: "large",
    });
  }, []);
  
  return (
    <Fragment>
      <div id="signInDiv" className="my-5"></div>
    </Fragment>
  );
};

export default LoginWithGoogle;
