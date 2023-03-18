import axios from "axios";

const autoLogin = async () => {
  try {
    let token = localStorage.getItem("token");
    let data;
    if (token) {
      data = await axios.get("/auth/userInfo");
    }

    return data;
  } catch (error) {
    console.log(error);
  }
};
export default autoLogin;
