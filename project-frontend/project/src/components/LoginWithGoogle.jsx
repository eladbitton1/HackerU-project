import { useState, useEffect, useRef, Fragment } from "react";
import jwt_decode from "jwt-decode";
import useAutoLogin from "../hooks/useAutoLogin";
import { useHistory } from "react-router-dom";
import axios from "axios";

const LoginWithGoogle = () => {
  const autoLoginFunction = useAutoLogin();
  const history = useHistory();
  const handleCallbackResponse = (response) => {
    // console.log( " Encoded JWT ID Token : " + response.credential )
    let userObj = jwt_decode(response.credential);
    // console.log(userObj);
    // localStorage.setItem("token", response.credential);
    // autoLoginFunction(response.credential);
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
    // console.log(userObj)
  };
  //   let googleSignInDiv = useRef()
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
  useEffect(()=>{

    // let userLoginDetails = {
    //   email: userObj.email,
    //   password: userObj.sub + "!Aa",
    // };
    // console.log(userLoginDetails);
    // axios
    //   .post("/auth/login", )
    //   .then(async (res) => {
    //     localStorage.setItem("token", res.data.token);
    //     autoLoginFunction(res.data.token);
    //     console.log(res);

    //     history.push("/loading");
    //   })
    //   .catch((err) => {
    //     console.log("ERR AUTO LOGIN", err);
    //   });
  },[])
  return (
    <Fragment>
      <div id="signInDiv" className="my-5"></div>
    </Fragment>
  );
};

export default LoginWithGoogle;
