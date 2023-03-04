import { NavLink } from "react-router-dom";

const NavlinksHandler = ({ label, link }) => {
  return (
    <li className="nav-item">
      <NavLink
        className="nav-link"
        to={link}
        isActive={(match, location) => match && match.isExact}
      >
        {label}
      </NavLink>
    </li>
  );
};
export default NavlinksHandler;