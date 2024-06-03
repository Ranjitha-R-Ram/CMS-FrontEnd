import axios from "axios";
import React, { Component } from "react";
const SendMail = "http://localhost:9999/send";

class EmailService extends Component {
  SendMail = (mail) => {
    return axios.post(SendMail, mail);
  };
}
export default new EmailService();
