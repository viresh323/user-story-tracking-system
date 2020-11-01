import axios from "axios";
import COMMON_CONSTANTS from "../constants/common_constants.json";
import AUTH_SERVICE from "./auth";

const AXIOS_SERVICE = {
  getRequest: async (url, headers) => {
    try {
      const jwtToken = AUTH_SERVICE.GetAuthModel();
      if(headers===undefined)
      {
        headers = {}
      }
      
      if(jwtToken!==undefined)
      {
        headers["Authorization"] = jwtToken.token;
      }

      return await axios({
        method: "get",
        baseURL: COMMON_CONSTANTS.APPLICATION_URL,
        url: url,
        headers: headers
      })
        .then(function({ data, status, headers }) {
          return data;
        })
        .catch(function(error) {
          throw error;
        });
    } catch (error) {
        throw error;
    }
  }
  ,postRequest: (url, payload, headers) => {
    try {

      const jwtToken = AUTH_SERVICE.GetAuthModel();
      if(headers===undefined)
      {
        headers = {}
      }

      if(jwtToken!==undefined)
      {
        headers["Authorization"] = jwtToken.token;
      }

      return axios({
        method: "post",
        baseURL: COMMON_CONSTANTS.APPLICATION_URL,
        url: url,
        headers: headers,
        data: payload
      })
        .then(function({ data, status, headers }) {
          return data;
        })
        .catch(function(error) {
          throw error;
        });
    } catch (error) {
      throw error;
    }
  }
};

export default AXIOS_SERVICE;