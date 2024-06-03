import axios from "axios";
import React, { Component } from "react";
const AddMaterial = "http://localhost:9999/RawMaterialInsert";
const FindAllMaterial = "http://localhost:9999/GetAllRawMaterial";
const PackageType="http://localhost:9999/GetPackageType";
class RawMaterialService extends Component {
  AddMaterial = (formData) => {
    return axios.post(AddMaterial, formData);
  };
  ViewAllMaterial = () => {
    return axios.get(FindAllMaterial);
  };
  PackageType = () => {
    return axios.get(PackageType);
  };

}
export default new RawMaterialService();
