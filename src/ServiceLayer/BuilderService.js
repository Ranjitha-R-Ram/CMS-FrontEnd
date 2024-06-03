import axios from "axios";
import React, { Component } from "react";
const GetBuilder = "http://localhost:9999/GetName/";
class BuilderService extends Component {
  GetBuilder = (name) => {
    return axios.get(GetBuilder + name);
  };
}
export default new BuilderService();
