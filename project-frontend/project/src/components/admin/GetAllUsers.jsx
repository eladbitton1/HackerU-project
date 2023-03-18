import { Fragment, useState, useEffect, useRef } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./admin.scss";
let initialUsersArray = [];
const GetAllUsers = () => {
  const [queries, setQueries] = useState(initialUsersArray);
  const [findUserInput, setFindUserInput] = useState("");
  useEffect(() => {
    axios
      .get("/auth/all-users")
      .then(async (res) => {
        initialUsersArray = res.data;

        setQueries(initialUsersArray);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  useEffect(() => {
    let regex = new RegExp(findUserInput, "i");
    let usersArrayCopy = JSON.parse(JSON.stringify(initialUsersArray));

    usersArrayCopy = usersArrayCopy.filter((item) => regex.test(item.email));

    setQueries(usersArrayCopy);
  }, [findUserInput]);

  const handleDeleteUserBtnClick = (ev) => {
    let userId = ev.target.value;

    axios
      .delete(`/auth/delete-user/${userId}`)
      .then(async (res) => {
        toast.info("User Deleted", {
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
        console.log(err);
      });
  };
  const handleAppointAdminBtnClick = (ev) => {
    let userId = ev.target.value;
    axios
      .patch(`/auth/appoint-admin/${userId}`)
      .then(async (res) => {
        toast.info("User Appointed as Admin", {
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
        console.log(err);
      });
  };
  const handleFindInputChange = (ev) => {
    setFindUserInput(ev.target.value);
  };
  return (
    <Fragment>
      <div className="form-floating mb-3 my-5">
        <input
          type="text"
          className="form-control"
          id="input"
          value={findUserInput}
          onChange={handleFindInputChange}
        />
        <label htmlFor="floatingInput">Search a user</label>
      </div>
      {queries.map((item, idx) => (
        <div key={"query-" + idx}>
          <div>
            <p className="d">
              <a
                className="btn btn-primary"
                data-bs-toggle="collapse"
                href={"#query-" + idx}
                role="button"
                aria-expanded="false"
                aria-controls="collapseExample"
              >
                {item.email}
              </a>
            </p>

            <div className="collapse " id={"query-" + idx}>
              <div className=" card card-body ">
                <div className="card-body-style">
                  <div>
                    <p>Username : {item.name}</p>
                    <p>Admin : {`${item.isAdmin}`} </p>
                    <p>UserID : {item._id}</p>
                  </div>
                  <div className="btn-style">
                    <div>
                      {item.isAdmin ? (
                        ""
                      ) : (
                        <button
                          value={item._id}
                          onClick={handleDeleteUserBtnClick}
                          className="btn btn-danger btn-style "
                        >
                          Delete user
                        </button>
                      )}

                      {item.isAdmin ? (
                        ""
                      ) : (
                        <button
                          value={item._id}
                          onClick={handleAppointAdminBtnClick}
                          className="btn btn-warning my-1"
                        >
                          Appoint Admin
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </Fragment>
  );
};

export default GetAllUsers;
