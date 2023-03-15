import { Fragment, useState, useEffect, useRef } from "react";
import axios from "axios";

const GetAllUsers = () => {
  const [queries, setQueries] = useState([]);

  useEffect(() => {
    axios
      .get("/auth/all-users")
      .then(async (res) => {
        setQueries(res.data);

        // localStorage.setItem("token", res.data.token);
        // autoLoginFunction(res.data.token);
        // history.push("/");
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <Fragment>
      {queries.map((item, idx) => (
        <div key={"query-" + idx}>
          <p className="d">
            <a
              className="btn btn-primary"
              data-bs-toggle="collapse"
              href={"#query-" + idx}
              role="button"
              aria-expanded="false"
              aria-controls="collapseExample"
            >
              {item[0].email}
            </a>
          </p>

          <div className="collapse" id={"query-" + idx}>
            <div className="card card-body">
                <p>Username : {item[0].name}</p>
                <p>UserID : {item[0]._id}</p>
              
            </div>
          </div>
        </div>
      ))}
    </Fragment>
  );
};

export default GetAllUsers;
