import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import BookingService from "../../ServiceLayer/BookingService";
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

function AllBookingDetails() {
  const [booking, setBooking] = useState([]);
  const [rejectedIds, setRejectedIds] = useState([]);
  const [approvedIds, setApprovedIds] = useState([]);

  const [disabled, setDisabled] = useState(false);
  const handleApproveClick = (bookingId) => {
    setDisabled(true);
    onClickApprove(bookingId);
  };

  const handleRejectClick = (bookingId) => {
    setDisabled(true);
    onClickReject(bookingId);
  };
  useEffect(() => {
    loadBooking();
  }, []);

  const loadBooking = async () => {
    await BookingService.ViewAllBooking().then((response) => {
      setBooking(response.data);
    });
  };

  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const closeMenu = () => {
    setOpen(false);
  };

  const onClickApprove = async (bookingId) => {
    setApprovedIds((prevIds) => [...prevIds, bookingId]);
    await axios
      .put(`http://localhost:9999/Approved/${bookingId}`)
      .then((response) => {
        console.log(response.data);
        alert(" Request Approved ");
        // Swal.fire({
        //   title: "Approved!!!",
        //   icon: "success",
        // });
        loadBooking();
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  };

  const onClickReject = async (bookingId) => {
    setRejectedIds((prevIds) => [...prevIds, bookingId]);
    await axios
      .put(`http://localhost:9999/rejected/${bookingId}`)
      .then((response) => {
        console.log(response.data);
        alert(" Request Rejected ");
        // Swal.fire({
        //   title: "Oops!!!",
        //   text: "Rejected",
        //   icon: "warning",
        // });
        loadBooking();
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  };

  const win = sessionStorage.getItem("builderName");
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
            <Link to="/landing-page" className="nav-link" onClick={closeMenu}>
              Back
            </Link>
          </li>
          <li className="nav-item">
            <Link to="#" className="nav-link" onClick={closeMenu}>
              {win}
            </Link>
          </li>
        </ul>
      </nav>
      <br />
      <br />
      <br />
      <br />
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
          <Table sx={{ minWidth: 900 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Booking Id</StyledTableCell>
                <StyledTableCell align="right">Project Type</StyledTableCell>
                <StyledTableCell align="right">Room Size</StyledTableCell>
                <StyledTableCell align="right">
                  Parking Facility
                </StyledTableCell>
                <StyledTableCell align="right">Kitchen</StyledTableCell>
                <StyledTableCell align="right">StoreRoom</StyledTableCell>
                <StyledTableCell align="right">Interior Design</StyledTableCell>
                <StyledTableCell align="right">Swimming Pool</StyledTableCell>
                <StyledTableCell align="right">status</StyledTableCell>
                <StyledTableCell align="right">Customer Id</StyledTableCell>
                <StyledTableCell align="right">Package Type</StyledTableCell>
                <StyledTableCell align="left">Action</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {booking.map((booking) => (
                <StyledTableRow key={booking.bookingId}>
                  <StyledTableCell component="th" scope="row">
                    {booking.bookingId}
                  </StyledTableCell>
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
                    {booking.customer.customerId}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {booking.packageType}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <Stack direction="row" spacing={1}>
                      {booking.status === "pending" ? (
                        <Button
                          variant="outlined"
                          startIcon={<DeleteIcon />}
                          onClick={() => onClickReject(booking.bookingId)}>
                          Reject
                        </Button>
                      ) : (
                        <Button
                          variant="outlined"
                          startIcon={<DeleteIcon />}
                          onClick={() => onClickReject(booking.bookingId)}>
                          Reject
                        </Button>
                      )}

                      {booking.status === "pending" ? (
                        <Button
                          variant="contained"
                          endIcon={<SendIcon />}
                          id="approve"
                          onClick={() => onClickApprove(booking.bookingId)}>
                          Approve
                        </Button>
                      ) : (
                        <Button
                          variant="contained"
                          endIcon={<SendIcon />}
                          id="approve"
                          onClick={() => onClickApprove(booking.bookingId)}
                          disabled>
                          Approve
                        </Button>
                      )}
                    </Stack>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
}
export default AllBookingDetails;
