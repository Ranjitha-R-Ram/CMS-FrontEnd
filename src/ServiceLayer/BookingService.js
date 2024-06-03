import axios from "axios";
import { Component } from "react";
const AddBooking = "http://localhost:9999/AddBooking";
const AllBooking = "http://localhost:9999/GetAllBooking";
const GetPackageType = "http://localhost:9999/GetPackageType";
const ApproveRequest="http://localhost:9999/Approved/";
const GetCustomerById="http://localhost:9999/getCustomerById/"
const GetPackageTypeById="http://localhost:9999/getRawMaterialsById/";
const GetPackageIds="http://localhost:9999/getPackageIds";
const GetBookingByCustomerId="http://localhost:9999/getBookingDetailsById/";
class BookingService extends Component {
  AddBooking = (booking) => {
    return axios.post(AddBooking, booking);
  };
  ViewAllBooking = () => {
    return axios.get(AllBooking);
  };
  GetPackageType = () => {
    return axios.get(GetPackageType);
  };
  ApproveRequest=(bookingId)=>{
    return axios.get(ApproveRequest+bookingId)
  };
  GetCustomerById=(bookingId)=>{
    return axios.get(GetCustomerById+bookingId)
  };
  GetPackageTypeById=(bookingId)=>{
    return axios.get(GetPackageTypeById+bookingId)
  };
  GetPackageIds=()=>{
    return axios.get(GetPackageIds)
  };
  GetBookingByCustomerId=(customerId)=>{
    return axios.get(GetBookingByCustomerId+customerId)
  };

}
export default new BookingService();
