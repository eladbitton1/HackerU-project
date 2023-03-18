import { useDispatch } from "react-redux";
import jwt_decode from "jwt-decode";
import autoLogin from "services/autoLogin";
import { authActions } from "store/auth";

const useAutoLogin = () => {
  const dispatch = useDispatch();
  const autoLoginFunction = async (token) => {
    try {
      let { data } = await autoLogin();

      let dataFromToken = jwt_decode(token);

      if (data) {
        dispatch(authActions.login(dataFromToken));
        dispatch(authActions.updateUserInfo(data));
        return true;
      }
    } catch (err) {
      return false;
    }
  };
  return autoLoginFunction;
};
export default useAutoLogin;
