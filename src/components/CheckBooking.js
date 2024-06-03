import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect } from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import Stack from "@mui/material/Stack";
import { Box } from "@mui/material";
import { Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import axios from "axios";
import Swal from "sweetalert2";
import BookingService from "../ServiceLayer/BookingService";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const booking = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

export default function CheckBooking() {
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

  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const closeMenu = () => {
    setOpen(false);
  };

  const win = sessionStorage.getItem("customerName");

  
  // const handleExpandClick = () => {
  //   Swal.fire({
  //     title: "Payment Successfull!!!",
  //     text: "You will Receive furthur update soon!!!",
  //     icon: "success",
  //   });
  // };

  return (
    <>
      <nav className="navbar">
        <i class="bi bi-buildings-fill">
          <Link to="/" className="nav-logo">
            CMS
          </Link>
        </i>
        <div onClick={handleClick} className="nav-icon">
          {open ? <FiX /> : <FiMenu />}
        </div>
        <ul className={open ? "nav-links active" : "nav-links"}>
          <li className="nav-item">
            <Link to="/grid" className="nav-link" onClick={closeMenu}>
              Back
            </Link>
          </li>
          <li className="nav-item">
            <Link to="#" className="nav-link" onClick={closeMenu}>
              Welcome {win}
            </Link>
          </li>
        </ul>
      </nav>
      <>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "40vh",
            width: "200vh",
            marginTop: "10vh",
            
          }}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  
                  <StyledTableCell align="right">Project Type</StyledTableCell>
                  <StyledTableCell align="right">Room Size</StyledTableCell>
                  <StyledTableCell align="right">
                    Parking Facility
                  </StyledTableCell>
                  <StyledTableCell align="right">Kitchen</StyledTableCell>
                  <StyledTableCell align="right">StoreRoom</StyledTableCell>
                  <StyledTableCell align="right">
                    Interior Design
                  </StyledTableCell>
                  <StyledTableCell align="right">Swimming Pool</StyledTableCell>
                  <StyledTableCell align="right">status</StyledTableCell>
                  <StyledTableCell align="right"> Square Feet</StyledTableCell>
                  <StyledTableCell align="right">Package Type</StyledTableCell>
                  <StyledTableCell>Total Cost</StyledTableCell>
                  <StyledTableCell align="right">Action</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {booking &&
                  booking.map((booking) => (
                    <StyledTableRow key={booking.bookindId}>
                  
                    <StyledTableCell align="right">
                      {booking.projectType}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {booking.roomSize}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {booking.parking}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {booking.kitchen}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {booking.storeRoom}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {booking.interiorDesign}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {booking.swimmingPool}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {booking.status}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {booking.squareFeet}
                    </StyledTableCell>
                    <StyledTableCell align="right"> 
                      {booking.packageType}
                    </StyledTableCell> 
                    <StyledTableCell component="th" scope="row">
                      {booking.totalCost}
                    </StyledTableCell>

                      <StyledTableCell align="right">
                        <PaymentButton
                          booking={booking}
                          // handleExpandClick={handleExpandClick}
                        />
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </>
    </>
  );
}

function PaymentButton({ booking, handleExpandClick }) {
  const [status, setStatus] = useState(booking.status);

  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);
  };

  return (
    <Stack direction="row" spacing={1}>
      <Link to="/payment">
     
      <Button
        variant="contained"
        endIcon={<SendIcon />}
        // onClick={handleExpandClick}
        disabled={booking.status !== "Approved"}>
        Payment
      </Button>
      </Link>
    </Stack>
  );
}
