import { useState, useRef, useEffect, Fragment } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const history = useHistory();
  const showErrMsgEmail = useRef();
  const emailRef = useRef();
  useEffect(() => {
    emailRef.current.focus();
  }, []);
  const handleEmailChange = (ev) => {
    setEmail(ev.target.value);
  };
  const handleSubmit = (ev) => {
    ev.preventDefault();
    axios
      .post("/auth/forgotpassword", { email })
      .then(({ data }) => {
        console.log(data);
      })
      .catch((err) => {
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
            placeholder="name@example.com"
            onChange={handleEmailChange}
            ref={emailRef}
          />
          <div ref={showErrMsgEmail} className="visually-hidden">
            Please enter a valid Email !
          </div>
          <label htmlFor="email">Email address</label>
        </div>
        <button type="submit" className="btn btn-primary">
          Send mail
        </button>
      </form>
    </Fragment>
  );
};

export default ForgotPassword;
