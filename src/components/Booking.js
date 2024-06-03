import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  MenuItem,
  Stack,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import "../Navbar.css";
import { Link } from "react-router-dom";
import BookingService from "../ServiceLayer/BookingService";
import { Grid } from "@material-ui/core";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import { useParams } from "react-router-dom";
import RawMaterialService from "../ServiceLayer/RawMaterialService";

export default function Booking() {
  const win = sessionStorage.getItem("customerName");
  const wins = sessionStorage.getItem("customerId");
  const navigate = useNavigate();
  const [booking, setBooking] = useState({
    projectType: "",
    roomSize: "",
    parking: "",
    kitchen: "",
    storeRoom: "",
    interiorDesign: "",
    swimmingPool: "",
    status: "",
    squareFeet: "",
    packageType: "",
    totalCost: "",
    silverCostPerSqFt: "3000",
    goldCostPerSqFt: "5000",
    platinumCostPerSqFt: "10000",
    customer: {
      customerId: wins,
    },
    rawMaterials: [
      {
        id: "",
        packageType: "",
      },
    ],
  });

  const handleInputChange = (e) => {
    if (e.target.name === "customerId") {
      setBooking({ ...booking, customer: { customerId: e.target.value } });
    } else if (e.target.name === "id") {
      setBooking({ ...booking, rawMaterials: { id: e.target.value } });
    } else if (e.target.name === "packageType") {
      setBooking({ ...booking, packageType: e.target.value });
    } else if (e.target.name === "squareFeet") {
      setBooking({ ...booking, squareFeet: e.target.value });
    } else if (e.target.name === "totalCost") {
      setBooking({ ...booking, totalCost: e.target.value });
    } else setBooking({ ...booking, [e.target.name]: e.target.value });
  };

  const saveBooking = async (e) => {
    e.preventDefault();

    // Include squareFeet and totalCost in the booking object
    const bookingWithCosts = {
      ...booking,
      squareFeet: squareFeet,
      packageType: packageType,
      totalCost: calculateTotalCost(),
    };

    console.log(bookingWithCosts);
    await BookingService.AddBooking(bookingWithCosts).then((response) => {
      setBooking(response.data);
      // navigate("/grid");
      alert("Booked  Succesfully!..");
    });
  };
  // const [pack, setPackage] = useState([]);
  // const getPackageType = async () => {
  //   await BookingService.GetPackageType()
  //     .then((response) => setPackage(response.data))
  //     .catch((err) => console.log(err));
  // };
  // useEffect(() => {
  //   getPackageType();
  // }, []);

  const [packId, setPackageId] = useState([]);
  const getPackageId = async () => {
    await BookingService.GetPackageIds()
      .then((response) => setPackageId(response.data))
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getPackageId();
  }, []);

  const [allpack, setAllPack] = useState([]);

  useEffect(() => {
    const getAllPackage = async () => {
      const response = await RawMaterialService.ViewAllMaterial().then(
        (response) => {
          setAllPack(response.data);
          console.log(response);
        }
      );
    };

    getAllPackage();
  }, []);

  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const closeMenu = () => {
    setOpen(false);
  };

  const [errors, setErrors] = useState({});

  const handleBlur = (event) => {
    const { name, value } = event.target;
    const error = validateField(name, value);
    setErrors({ ...errors, [name]: error });
  };

  const validateField = (name, value) => {
    let error = "";

    if (
      name === "projectType" ||
      name === "parking" ||
      name === "kitchen" ||
      name === "storeRoom" ||
      name === "interiorDesign" ||
      name === "swimmingPool" ||
      name === "status"
    ) {
      if (!value || !/^[a-zA-Z ]*$/.test(value)) {
        error = "Please enter a valid details.";
      }
    } else if (name === "roomSize") {
      if (!value || !/^[a-zA-Z-0-9 ]*$/.test(value)) {
        error = "Please enter a valid room size.";
      }
    }

    return error;
  };

  const [squareFeet, setSquareFeet] = useState("");
  const [packageType, setPackageType] = useState("silver"); // Default to silver package
  const silverCostPerSqFt = 3000;
  const goldCostPerSqFt = 5000;
  const platinumCostPerSqFt = 10000;
  // Calculate the total cost based on user input
  const calculateTotalCost = () => {
    const sqFt = parseFloat(squareFeet);
    if (!isNaN(sqFt)) {
      let totalCost;
      switch (packageType) {
        case "silver":
          totalCost = sqFt * silverCostPerSqFt;
          break;
        case "gold":
          totalCost = sqFt * goldCostPerSqFt;
          break;
        case "platinum":
          totalCost = sqFt * platinumCostPerSqFt;
          break;
        default:
          totalCost = 0;
      }
      return totalCost.toFixed(2); // Display total cost with 2 decimal places
    }
    return ""; // If input is not a valid number, show an empty string
  };
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
            <Link to="/booking" className="nav-link" onClick={closeMenu}>
              Quote{" "}
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/packages" className="nav-link" onClick={closeMenu}>
              Raw Material
            </Link>
          </li>
          <li className="nav-item">
            <Link to="#" className="nav-link" onClick={closeMenu}>
              Welcome {win}
            </Link>
          </li>
        </ul>
      </nav>

      <Stack
        direction="row"
        spacing={1}
        style={{ justifyContent: "flex-end", marginTop: 20, marginRight: 60 }}>
        <Link to="/estimate">
          <Button variant="outlined">Estimate Cost</Button>
        </Link>
      </Stack>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "",
          height: "5vh",
        }}>
        <div className="d-flex justify-content-center align-items-center vh-100 ">
          <br />
          <br />
          <Box
            sx={{
              display: "flex",
              width: "700px",
              justifyContent: "center",
              alignItems: "center",
              height: "90vh",
              border: "2px solid grey ",
            }}
            className="border rounded shadow ">
            <Box sx={{ width: "80%" }}>
              <Typography
                variant="h5"
                style={{ textAlign: "center" }}
                gutterBottom>
                <b> BUILD YOUR DREAM HOUSE WITH US!!!</b>
              </Typography>
              <form onSubmit={(e) => saveBooking(e)}>
               
                
                  <Grid item xs={12} md={12}>
                    <TextField
                      select
                      label="Project Type"
                      name="projectType"
                      fullWidth
                      margin="normal"
                      size="medium"
                      onBlur={handleBlur}
                      onChange={(e) => handleInputChange(e)}
                      // error={!!errors.projectType}
                      // helperText={errors.projectType}
                      required>
                      <MenuItem value="House">House</MenuItem>
                      <MenuItem value="Villa">Villa</MenuItem>
                      <MenuItem value="Apartment">Apartment</MenuItem>
                    </TextField>
                  </Grid>

                <Grid container spacing={1}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      select
                      label="RoomSize"
                      name="roomSize"
                      size="medium"
                      fullWidth
                      required
                      margin="normal"
                      onBlur={handleBlur}
                      error={!!errors.roomSize}
                      helperText={errors.roomSize}
                      onChange={(e) => handleInputChange(e)}>
                      <MenuItem value="Two">Two</MenuItem>
                      <MenuItem value="Three">Three</MenuItem>
                      <MenuItem value="Four">Four</MenuItem>
                    </TextField>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      select
                      label="Parking"
                      name="parking"
                      size="medium"
                      fullWidth
                      required
                      margin="normal"
                      onBlur={handleBlur}
                      error={!!errors.parking}
                      helperText={errors.parking}
                      onChange={(e) => handleInputChange(e)}>
                      <MenuItem value="Yes">Yes</MenuItem>
                      <MenuItem value="No">No</MenuItem>
                    </TextField>
                  </Grid>
                </Grid>
                <Grid container spacing={1}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      select
                      label="Kitchen"
                      name="kitchen"
                      size="medium"
                      fullWidth
                      required
                      onBlur={handleBlur}
                      error={!!errors.kitchen}
                      helperText={errors.kitchen}
                      margin="normal"
                      onChange={(e) => handleInputChange(e)}>
                      <MenuItem value="One kitchen">One kitchen</MenuItem>
                      <MenuItem value="Two kitchen">Two kitchen</MenuItem>
                    </TextField>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <TextField
                      select
                      label="StoreRoom"
                      name="storeRoom"
                      size="medium"
                      fullWidth
                      required
                      onBlur={handleBlur}
                      error={!!errors.storeRoom}
                      helperText={errors.storeRoom}
                      margin="normal"
                      onChange={(e) => handleInputChange(e)}>
                      <MenuItem value="Yes">Yes</MenuItem>
                      <MenuItem value="No">No</MenuItem>
                    </TextField>
                  </Grid>
                </Grid>
                <Grid container spacing={1}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      select
                      label="InteriorDesign"
                      name="interiorDesign"
                      size="medium"
                      fullWidth
                      required
                      margin="normal"
                      onBlur={handleBlur}
                      error={!!errors.interiorDesign}
                      helperText={errors.interiorDesign}
                      onChange={(e) => handleInputChange(e)}>
                      <MenuItem value="Yes">Yes</MenuItem>
                      <MenuItem value="No">No</MenuItem>
                    </TextField>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      select
                      label="SwimmingPool"
                      name="swimmingPool"
                      size="medium"
                      fullWidth
                      required
                      onBlur={handleBlur}
                      error={!!errors.swimmingPool}
                      helperText={errors.swimmingPool}
                      margin="normal"
                      onChange={(e) => handleInputChange(e)}>
                      <MenuItem value="Yes">Yes</MenuItem>
                      <MenuItem value="No">No</MenuItem>
                    </TextField>
                  </Grid>
                </Grid>
                {/* <TextField
                  value={wins}
                  label="Customer Id"
                  name="customerId"
                  // type="number"
                  fullWidth
                  required
                  margin="normal"
                  size="medium"
                  onChange={(e) => handleInputChange(e)}
                /> */}
                 <Grid container spacing={1}>
                  <Grid item xs={12} md={6}>
                <TextField
                  label="Square Feet"
                  name="sqarefeet"
                  // type="number"
                  value={squareFeet}
                  onChange={(e) => setSquareFeet(e.target.value)}
                  fullWidth
                  required
                  margin="normal"
                  size="medium"
                />
                </Grid>
                <Grid item xs={12} md={6}>
                <TextField
                  select
                  label="packageType"
                  id="packageType"
                  value={packageType}
                  onChange={(e) => setPackageType(e.target.value)}
                  fullWidth
                  required
                  margin="normal"
                  size="medium">
                  <MenuItem value="silver">Silver</MenuItem>
                  <MenuItem value="gold">Gold</MenuItem>
                  <MenuItem value="platinum">Platinum</MenuItem>
                </TextField>
                </Grid>
                </Grid>
                <TextField
                  label="Total Cost"
                  name="sqare feet"
                  // type="number"
                  value={`$${calculateTotalCost()}`}
                  fullWidth
                  required
                  margin="normal"
                  size="medium"
                  id="totalCost"
                  onChange={(e) => handleInputChange(e)}
                />

                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  style={{ marginRight: "9px" }}>
                  Submit
                </Button>

                <Link to={`/bookingform/${booking.customer.customerId}`}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="success"
                    to="/bookingform"
                    style={{ marginRight: "9px" }}>
                    View Quotation
                  </Button>
                </Link>
              </form>
            </Box>
          </Box>
        </div>
      </Box>
    </>
  );
}
