import axios from "axios";
import React, { Component } from "react";
const AddCustomer = "http://localhost:9999/AddCustomer";
const GetBookingByCustomerId="http://localhost:9999/getBookingDetailsById/";
class CustomerService extends Component {
  AddCustomer = (customer) => {
    return axios.post(AddCustomer, customer);
  };
  GetBookingByCustomerId=(customerId)=>{
    return axios.get(GetBookingByCustomerId+customerId)
  };

}
export default new CustomerService();
