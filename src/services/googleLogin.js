import axios from "axios";

const googleLogin = async (accesstoken) => {
    let res = await axios.post(
      "http://localhost:8000/rest-auth/google/",
      {
        access_token: accesstoken,
      }
    );
    console.log(res.data);
    return await res.data;
  };

export default googleLogin;