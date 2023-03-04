import { Fragment, useState, useEffect, useRef } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import registerSchema from "../validation/register_Validation";
import validate from "../validation/validation";
import { toast } from "react-toastify";

const Register = () => {
  const history = useHistory();
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const showErrMsgName = useRef();
  const showErrMsgEmail = useRef();
  const showErrMsgPassword = useRef();
  const [userInput, setUserInput] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    nameRef.current.focus();
  }, []);
  const handleSubmitClick = (ev) => {
    ev.preventDefault();

    const { error } = validate(userInput, registerSchema);
    nameRef.current.className = " form-control is-valid ";
    passwordRef.current.className = " form-control is-valid ";
    emailRef.current.className = " form-control is-valid ";
    showErrMsgName.current.className = "visually-hidden";
    showErrMsgEmail.current.className = "visually-hidden";
    showErrMsgPassword.current.className = "visually-hidden";
    showErrMsgEmail.current.innerText = "Please enter a valid Email !";
    if (error) {
      let errorMsgs = "";
      for (let errorItem of error.details) {
        if (errorItem.context.label === "First Name") {
          nameRef.current.className = " form-control is-invalid ";
          showErrMsgName.current.className = "text-danger";
        }
        if (errorItem.context.label === "Password") {
          passwordRef.current.className = " form-control is-invalid ";
          showErrMsgPassword.current.className = "text-danger";
        }
        if (errorItem.context.label === "Email") {
          emailRef.current.className = " form-control is-invalid ";
          showErrMsgEmail.current.className = "text-danger";
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
            errorMsgs += ` ${errorItem.context.label} must be from letters A-Z only ,`;
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

    axios
      .post("/auth/register", userInput)
      .then(async (res) => {
        console.log(res);
        history.push("/")
      })
      .catch((err) => {
        console.log(err);

        if (err.response.data === "User already registered.") {
          emailRef.current.className = " form-control is-invalid ";
          showErrMsgEmail.current.className = "text-danger";
          showErrMsgEmail.current.innerText = "Email already registered !";
          toast.error(`${err.response.data}`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      });
  };

  const handleUserInputChange = (ev) => {
    let newUserInput = JSON.parse(JSON.stringify(userInput));
    if (newUserInput.hasOwnProperty(ev.target.id)) {
      newUserInput[ev.target.id] = ev.target.value;
      setUserInput(newUserInput);
    }
  };
  return (
    <Fragment>
      <h1>Register</h1>
      <form
        method="POST"
        action="/register"
        encType="multipart/form-data"
        onSubmit={handleSubmitClick}
      >
        <div className="row">
          <div className="col">
            <label htmlFor="name" className="form-label">
              First name
            </label>
            <input
              type="text"
              className="form-control "
              placeholder="First name"
              aria-label="First name"
              id="name"
              value={userInput.name}
              onChange={handleUserInputChange}
              ref={nameRef}
            />
            <div ref={showErrMsgName} className="visually-hidden">
              Please enter a valid Name !
            </div>
          </div>
        </div>
        <div className="mb-3 my-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="Email"
            aria-describedby="emailHelp"
            ref={emailRef}
            value={userInput.email}
            onChange={handleUserInputChange}
          />
          <div ref={showErrMsgEmail} className="visually-hidden">
            Please enter a valid Email !
          </div>
          <div id="emailHelp" className="form-text">
            Your email adress will serve as your username
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            id="password"
            ref={passwordRef}
            value={userInput.password}
            onChange={handleUserInputChange}
          />
          <div ref={showErrMsgPassword} className="visually-hidden">
            Please enter a valid Password !
          </div>
          <div id="passwordlHelp" className="form-text">
            Password must be 6-21 characters long and must include an uppercase
            and lowercase letter and a number
          </div>
        </div>
        

        <button type="submit" className="btn btn-primary">
          Register
        </button>
      </form>
    </Fragment>
  );
};
export default Register;
