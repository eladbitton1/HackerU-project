import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import passwordSchema from "validation/password_Validation";
import validate from "../validation/validation";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const history = useHistory();
  const [password, setPassword] = useState({ password: "" });
  const { token } = useParams();
  const passwordRef = useRef();
  const showErrMsgPassword = useRef();
  useEffect(() => {
    passwordRef.current.focus();
  }, []);
  const handlePasswordChange = (ev) => {
    let newUserInput = JSON.parse(JSON.stringify(password));
    newUserInput[ev.target.id] = ev.target.value;
    setPassword(newUserInput);
  };
  const handleSubmit = (ev) => {
    ev.preventDefault();
    const { error } = validate(password, passwordSchema);
    passwordRef.current.className = " form-control is-valid ";
    showErrMsgPassword.current.className = "visually-hidden";
    if (error) {
      let errorMsgs = "";
      for (let errorItem of error.details) {
        if (errorItem.context.label === "Password") {
          passwordRef.current.className = " form-control is-invalid ";
          showErrMsgPassword.current.className = "text-danger";
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
      .post(`/auth/resetpassword/${token}`, { password })
      .then(({ data }) => {
        toast.success("Password updated", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        history.push("/login");
      })
      .catch((err) => {
        toast.error("an error has occurd , please try again later", {
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
  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">
          New password
        </label>
        <input
          type="password"
          className="form-control"
          placeholder="New Password"
          id="password"
          ref={passwordRef}
          onChange={handlePasswordChange}
          value={password.password}
        />
        <div ref={showErrMsgPassword} className="visually-hidden">
          Please enter a valid Password !
        </div>
      </div>
      <button className="btn btn-primary">Submit</button>
    </form>
  );
};
export default ResetPassword;
