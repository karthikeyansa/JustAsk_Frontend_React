import axios from "axios";
import Baseurl from "../components/Baseurl";

const baseurl = Baseurl();
console.log(baseurl);

const googleLogin = async (accesstoken) => {
    let res = await axios.post(
      baseurl + "/rest-auth/google/",
      {
        access_token: accesstoken,
      }
    );
    console.log(res.data);
    return await res.data;
  };

export default googleLogin;