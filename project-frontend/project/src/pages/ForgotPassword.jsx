import { useState, useRef, useEffect, Fragment } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import validate from "../validation/validation";
import emailSchema from "../validation/email_Validation";
const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);

  const showErrMsgEmail = useRef();
  const emailRef = useRef();
  useEffect(() => {
    emailRef.current.focus();
  }, []);
  const handleEmailChange = (ev) => {
    setEmail(ev.target.value);
    if (email) {
      setIsFormValid(true);
    }
  };
  const handleSubmit = (ev) => {
    ev.preventDefault();
    const { error } = validate(email, emailSchema);
    emailRef.current.className = " form-control is-valid ";
    showErrMsgEmail.current.className = "visually-hidden";
    showErrMsgEmail.current.innerText = "Please enter a valid Email !";

    if (error) {
      let errorMsgs = "";
      for (let errorItem of error.details) {
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
            errorMsgs += ` ${errorItem.context.label} Failed to match the required pattern ,`;
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
      .post("/auth/forgotpassword", { email })
      .then(({ data }) => {
        toast.success("Check email / spam email ", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
       
      })
      .catch((err) => {
        toast.error("an error has occurd", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        console.log(err);
      });
  };
  return (
    <Fragment>
      <form onSubmit={handleSubmit}>
        <h2>Reset password</h2>
        <div className="form-floating mb-3">
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="Enter your Email adress"
            onChange={handleEmailChange}
            ref={emailRef}
          />
          <div ref={showErrMsgEmail} className="visually-hidden">
            Please enter a valid Email !
          </div>
          <label htmlFor="email">Email address</label>
        </div>
        <button
          disabled={!isFormValid}
          type="submit"
          className="btn btn-primary"
        >
          Send mail
        </button>
      </form>
    </Fragment>
  );
};

export default ForgotPassword;
