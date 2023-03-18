import { Fragment} from "react";
import ShowCategoryCards from "../components/ShowCategoryCards";

import GetAllProducts from "../components/admin/GetAllProducts"

const HomePage = () => {
 
  return (
    <Fragment>
      <div className="header">
        <h1>Welcome to eShop !</h1>
        <ShowCategoryCards />
        <GetAllProducts></GetAllProducts>
       
      </div>
    </Fragment>
  );
};

export default HomePage;
