/*
 ** Author: Santosh Kumar Dash
 ** Author URL: http://santoshdash.epizy.com/
 ** Github URL: https://github.com/quintuslabs/fashion-cube
 */

import Auth from "../modules/Auth";
import jumpTo from "../modules/Navigation";
import axios from "axios";
const URL = "/bp-techspace/api";

const API = (config) => {
  //header authorization
  if (Auth.user_token) {
    const token = Auth.getToken();
    config.headers = {
      authorization: token,
    };
  }
  //interceptors handle network error
  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    function (error) {
      if (!error.response) {
        error.response = {
          data: "net work error",
          status: 500,
        };
      }
      if (error.response.status === 401) {
        Auth.logout();
        // jumpTo("/login");
        throw error;
      }
      return Promise.reject(error);
    }
  );
  // Prevent double slashes when joining URL
  const path = config.url.startsWith('/') ? config.url.substring(1) : config.url;
  config.url = `${URL}/${path}`;
  return axios(config);
};
export default API;