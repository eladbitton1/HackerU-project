import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
const ResetPassword = () => {
  const [password, setPassword] = useState({ password: "" });
  const { token } = useParams();
  const handlePasswordChange = (ev) => {
    let newUserInput = JSON.parse(JSON.stringify(password));
    newUserInput[ev.target.id] = ev.target.value;
    setPassword(newUserInput);
  };
  const handleSubmit = (ev) => {
    console.log(password)
    ev.preventDefault();
    axios
      .post(`/auth/resetpassword/${token}`, { password })
      .then(({ data }) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
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
          id="password"
          onChange={handlePasswordChange}
          value={password.password}
        />
      </div>
      <button className="btn btn-primary">Submit</button>
    </form>
  );
};
export default ResetPassword;
