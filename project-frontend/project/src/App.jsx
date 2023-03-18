import { Route, Switch } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import useAutoLogin from "hooks/useAutoLogin";
import Navbar from "components/Navbar";
import HomePage from "./pages/Home";
import AboutusPage from "pages/AboutUs";
import Register from "pages/Register";
import Categories from "./pages/Categories";
import ProductDetails from "./pages/productDetails/ProductDetails";
import Login from "pages/Login";
import Loading from "pages/Loading";
import CreateProduct from "./pages/CreateProduct";
import ProductImagesUpload from "./components/ProductImagesUpload";
import UpdateProfilePic from "./pages/ProfilePic";
import MyShop from "./pages/myshop/MyShop";
import EditProduct from "./pages/EditProduct";
import FavoriteProducts from "./pages/FavoriteProducts";
import AuthGuard from "components/AuthGuard";
import AdminAuthGuard from "components/AdminAuthGuard";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Admin from "./pages/admin/Admin";
import PageNotFound from "pages/PageNotFound";
import { ToastContainer } from "react-toastify";
import UserInterface from "./pages/userAccount/UserInterface";

const App = () => {
  const autoLoginFunction = useAutoLogin();
  const loggedIn = useSelector((state) => state.auth.loggedIn);
  const [tryToLogin, setTryToLogin] = useState(true);

  useEffect(() => {
    (async () => {
      let status = await autoLoginFunction(localStorage.getItem("token"));

      if (status === false) {
        setTryToLogin(false);
      }
    })();
  }, []);

  useEffect(() => {
    if (loggedIn === true && tryToLogin === true) {
      setTryToLogin(false);
    }
  }, [loggedIn]);

  return (
    <div className="container">
      <Navbar />
      {!tryToLogin && (
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/categories/:category" component={Categories} />
          <Route path="/card-details/:id" component={ProductDetails} />
          <AuthGuard path="/create-product" component={CreateProduct} />
          <AuthGuard path="/my-shop/:id" component={MyShop} />
          <AuthGuard path="/edit-product/:id" component={EditProduct} />
          <AuthGuard
            path="/favorite-products/:id"
            component={FavoriteProducts}
          />
          <AuthGuard
            path="/product-images/:id"
            component={ProductImagesUpload}
          />

          <AuthGuard
            path="/update-profile-pic/:id"
            component={UpdateProfilePic}
          />
          <Route path="/aboutus" component={AboutusPage} />
          <Route path="/login" component={Login} />
          <AdminAuthGuard path="/admin" component={Admin} />
          <Route path="/forgot-password" component={ForgotPassword} />
          <Route path="/resetpassword/:token" component={ResetPassword} />
          <Route path="/register" component={Register} />
          <Route path="/loading" component={Loading} />
          <AuthGuard path="/my-account/:id" component={UserInterface} />
          <Route path="*" component={PageNotFound}></Route>
        </Switch>
      )}
      <ToastContainer />
    </div>
  );
};

export default App;
