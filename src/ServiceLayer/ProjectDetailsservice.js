import axios from "axios";
import React, { Component } from "react";
const AddProjectDetails = "http://localhost:9999/ProjectDetailsInsert";
const GetProjectDetails = "http://localhost:9999/GetAllProject";
const UpdateProjectDetails="http://localhost:9999/updateProjectDetails";
const GetAllCustomerById="http://localhost:9999/getallcustomerids";
class ProjectDetailsservice extends Component {
  AddProjectDetails = (formData) => {
    return axios.post(AddProjectDetails, formData);
  };
  GetProjectDetails = () => {
    return axios.get(GetProjectDetails);
  };
  UpdateProjectDetails = (formData) => {
    return axios.put(UpdateProjectDetails, formData);
  };
  getAllCustomerIds=()=>{
    return axios.get(GetAllCustomerById);
  }
}
export default new ProjectDetailsservice();
