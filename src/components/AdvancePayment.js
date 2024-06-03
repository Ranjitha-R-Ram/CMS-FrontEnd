import React from "react";
import { Button, Grid, Typography, TextField, Box } from "@mui/material";
import CustomerService from "../ServiceLayer/CustomerService";
import { Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import "../Navbar.css";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
const AdvancePayment = () => {
  const [customer, setCustomer] = React.useState([]);
  const win = sessionStorage.getItem("customerName");

  React.useEffect(() => {
    CustomerService.GetBookingByCustomerId()
      .then((res) => {
        setCustomer(res.data);
        console.log(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const [booking, setBooking] = useState([]);
  const winId = sessionStorage.getItem("customerId");
  useEffect(() => {
    loadBooking();
  }, []);

  const loadBooking = async (customerId) => {
    await axios
      .get(`http://localhost:9999/getCustomerById/${winId}`)
      .then((response) => {
        // console.log(response.data);
        setBooking(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  };
  return (
    <>
    <nav className="navbar">
        <i class="bi bi-buildings-fill">
          <Link to="/" className="nav-logo">
            CMS
          </Link>
        </i>
        <div  className="nav-icon">
         
        </div>
        <ul className={"nav-links active,nav-links"}>
          <li className="nav-item">
            <Link to="/grid" className="nav-link" >
              Back
            </Link>
          </li>
          <li className="nav-item">
            <Link to="#" className="nav-link" >
              Welcome {win}
            </Link>
          </li>
        </ul>
      </nav>
      {booking &&
                  booking.map((booking) => (
    <Box
    sx={{
      display: "flex",
      width: "600px",
      justifyContent: "center",
      alignItems: "center",
      marginTop:"4vh",
      marginLeft:"60vh",
      height: "80vh",
      border: "2px solid grey ",
    }}
    className="border rounded shadow ">
    <Grid container spacing={2} sx={{ padding: "20px" }}>
   
      <Grid item xs={12}>
    
        <Typography variant="h5" sx={{ fontWeight: 600 }}>
         Advance Payment
        </Typography>
      </Grid>
  
      <Grid item xs={12} sm={6}>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Package Name
        </Typography>
        <Typography variant="body1">{booking.packageType}</Typography>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Project Type
        </Typography>
        <Typography variant="body1">{booking.projectType}</Typography>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Project Size
        </Typography>
        <Typography variant="body1">{booking.squareFeet} Squaree Feet</Typography>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Payment Method
        </Typography>
        <Typography variant="body1">
          Credit Card: **** **** **** 1234
        </Typography>
        <Typography variant="body1">Expiry Date: 12/24</Typography>
        <Typography variant="body1">Card Holder Name: <b>{win}</b></Typography>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Billing Address
        </Typography>
        <Typography variant="body1">123 Main St, Apt 456</Typography>
        <Typography variant="body1">Madurai</Typography>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Total Amount
        </Typography>
        <Typography variant="h4" sx={{ color: "#007bff" }}>
        {(booking.totalCost / 3).toFixed(3)}
        </Typography>
     
      </Grid>
   
      <Grid item xs={12}>
        <TextField
          label="Additional Notes"
          multiline
          rows={4}
          fullWidth
          variant="outlined"
        />
      </Grid>
      <Grid item xs={12}>
        <Button
          variant="contained"
          size="large"
          onClick={() => alert("Payment Successful")}
          sx={{ backgroundColor: "#28a745", color: "#ffffff" }}
        >
          Proceed to Checkout
        </Button>
      
      </Grid>
       
    </Grid>
    
    </Box>
    ))}
    </>
  );
};

export default AdvancePayment;
