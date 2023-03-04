import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { Fragment } from "react";
import  "./cardsStyle.scss"

const CategoryCards = ({ label, image, desc, url }) => {
  
  return (
    <Fragment>
      <div className="col">
        <div className="card">
          <img src={image} className="card-img-top" alt={label} />
          <div className="card-body">
            <h5 className="card-title">{label}</h5>
            <p className="card-text">{desc}</p>
          </div>
          <div className="card-body">
            <Link to={url} className="btn btn-primary ms-2">
              Browse Category
            </Link>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default CategoryCards;
