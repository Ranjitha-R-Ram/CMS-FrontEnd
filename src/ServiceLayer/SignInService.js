import axios from "axios";
import React, { Component } from "react";

const Login = "http://localhost:9999/GetEmailId/";
class SignInService extends Component {
  LoginList = (emailId) => {
    return axios.get(Login + emailId);
  };
}
export default new SignInService();
