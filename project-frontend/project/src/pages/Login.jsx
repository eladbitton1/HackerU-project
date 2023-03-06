import { useState, useRef, useEffect,Fragment } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import validate from "../validation/validation";
import loginSchema from "../validation/login_Validation";
import useAutoLogin from "../hooks/useAutoLogin";
import { useHistory } from "react-router-dom";
import LoginWithGoogle from "../components/LoginWithGoogle"


const Login = () => {
  const [userInput, setUserInput] = useState({
    email: "",
    password: "",
  });

  const history = useHistory();

  const emailRef = useRef();
  const passwordRef = useRef();
  const showErrMsgEmail = useRef();
  const showErrMsgPassword = useRef();
  const autoLoginFunction = useAutoLogin();

  useEffect(() => {
    emailRef.current.focus();
  }, []);
  const handleUserInputChange = (ev) => {
    let newUserInput = JSON.parse(JSON.stringify(userInput));
    newUserInput[ev.target.id] = ev.target.value;
    setUserInput(newUserInput);
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    const { error } = validate(userInput, loginSchema);
    passwordRef.current.className = " form-control is-valid ";
    emailRef.current.className = " form-control is-valid ";
    showErrMsgEmail.current.className = "visually-hidden";
    showErrMsgPassword.current.className = "visually-hidden";
    showErrMsgEmail.current.innerText = "Please enter a valid Email !";
    if (error) {
      let errorMsgs = "";
      for (let errorItem of error.details) {
        if (errorItem.context.label === "Password") {
          passwordRef.current.className = " form-control is-invalid ";
          showErrMsgPassword.current.className = "text-danger";
        }
        if (errorItem.context.label === "Email") {
          emailRef.current.className = " form-control is-invalid ";
          showErrMsgEmail.current.className = "text-danger";
        }
      }
      for (let errorItem of error.details) {
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
    console.log(userInput)
    axios
      .post("/auth/login", userInput)
      .then(async (res) => {
        localStorage.setItem("token", res.data.token);
        autoLoginFunction(res.data.token);
        console.log(res)

        history.push("/loading");
      })
      .catch((err) => {
        console.log(err)
        if(err.response.data === "Invalid email or password."){
          passwordRef.current.className = " form-control ";
          emailRef.current.className = " form-control ";
        }
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
  const handleForgotPassWordBtnClick= ()=>{
    history.push("/forgot-password")
  }
  return ( <Fragment>
    <form onSubmit={handleSubmit}>
      <h2>Login page</h2>
      <div className="form-floating mb-3">
        <input
          type="email"
          className="form-control"
          id="email"
          placeholder="name@example.com"
          value={userInput.email}
          onChange={handleUserInputChange}
          ref={emailRef}
        />
        <div ref={showErrMsgEmail} className="visually-hidden">
          Please enter a valid Email !
        </div>
        <label htmlFor="email">Email address</label>
      </div>
      <div className="form-floating mb-3">
        <input
          type="password"
          className="form-control"
          id="password"
          placeholder="Password"
          value={userInput.password}
          ref={passwordRef}
          onChange={handleUserInputChange}
        />
        <div ref={showErrMsgPassword} className="visually-hidden">
          Please enter a valid Password !
        </div>
        <label htmlFor="password">Password</label>
      </div>
      <button type="submit" className="btn btn-primary">Login</button>
    </form>

<LoginWithGoogle/>
<button className="btn btn-primary " onClick={handleForgotPassWordBtnClick}>Forgot password?</button>
    </Fragment>
  );
};

export default Login;
