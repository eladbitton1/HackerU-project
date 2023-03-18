
import { useSelector } from "react-redux";

import NavlinksHandler from "partial/NavlinksHandler";
import AvatarImg from "components/avatarImg/AvatarImg";
import jwt_decode from "jwt-decode";
import "./sideNavbar.scss";

let links = [
  {
    label: "My Shop",
    url: "/my-shop",
  },
  {
    label: "Add Product",
    url: "/create-product",
  },
  {
    label: "My Favorites",
    url: "/favorite-products",
  },
];

const SideNavbar = () => {
  
  
  const userInfo = useSelector((state) => state.auth.userData);
  let tokenFromLS = localStorage.getItem("token");
  let userObj = jwt_decode(tokenFromLS);
 
  

  return (
    <nav className="navbar  navbar-expand-lg bg-light sideNavBar w-100">
      <div className="container">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav flex-column my-3 ">
            <li className="mb-5 ">
              {userObj.picture ? (
                <img className="picFromGoogle" src={userObj.picture} alt={userObj.given_name} />
              ) : (
                <AvatarImg />
              )}
            </li>
            {links.map((item, idx) => (
              <NavlinksHandler
                key={"Navlink" + idx}
                label={item.label}
                link={
                  item.url === "/my-shop" || item.url === "/favorite-products"
                    ? item.url + "/" + userInfo.id
                    : item.url
                }
              />
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default SideNavbar;
