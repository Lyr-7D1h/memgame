import axios from "axios";

const baseUrl = "/api/";

const requester = {};

requester.get = (route) => {
  return new Promise((resolve, reject) => {
    axios
      .get(baseUrl + route)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        // Use error message from data if exists
        if (err.response && err.response.data && err.response.data.message) {
          err.message = err.response.data.message;
        }
        reject(err);
      });
  });
};

export default requester;
