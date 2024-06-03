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

export default function TotalEstimate() {
  const win = sessionStorage.getItem("customerName");
  const wins = sessionStorage.getItem("customerId");
  const navigate = useNavigate();
  const [booking, setBooking] = useState({
    accountHolderName: "",
    accountNumer: "",
    ifscCode: "",
    status: "",
    customer: {
      customerId: wins,
    },
    rawMaterials: [
      {
        id: "",
        packageType:""
      },
    ],
  });


  const handleInputChange = (e) => {
    if (e.target.name === "customerId") {
      setBooking({ ...booking, customer: { customerId: e.target.value } });
    } else if (e.target.name === "id") {
      setBooking({ ...booking, rawMaterials: { id: e.target.value } });
    } else setBooking({ ...booking, [e.target.name]: e.target.value });
  };

  const saveBooking = async (e) => {
    e.preventDefault();
    
    console.log(booking);
    await BookingService.AddBooking(booking).then((response) => {
      setBooking(response.data);
      navigate("/grid");
      alert("Booked  Succesfully!..");
    });
  };

  const [pack, setPackage] = useState([]);
  const getPackageType = async () => {
    await BookingService.GetPackageType()
      .then((response) => setPackage(response.data))
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getPackageType();
  }, []);

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
        const response = await RawMaterialService.ViewAllMaterial().then((response)=>{
          setAllPack(response.data);
          console.log(response);
        });
       
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
            <Link to="/booking" className="nav-link" onClick={closeMenu}>
              Quote            </Link>
          </li>
          <li className="nav-item">
            <Link to="/packages" className="nav-link" onClick={closeMenu}>
              Raw Material
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/packages" className="nav-link" onClick={closeMenu}>
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
              height: "65vh",
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
                <Grid container spacing={1}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      select
                      label="Package Id"
                      name="id"
                      onChange={(e) => handleInputChange(e)}
                      fullWidth
                      required
                      value={booking.rawMaterials.id}
                      margin="normal">
                      {allpack.map((pack) => (
                        // <option key={packageType}>{packageType}</option>

                        <MenuItem  value={pack.id}>
                          {pack.packageType}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      label="Account Holder Name"
                      name="accountHolderName"
                      fullWidth
                      margin="normal"
                      size="medium"
                      required
                      onChange={(e) => handleInputChange(e)}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={1}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      label="Account Number"
                      name="accountNumer"
                      size="medium"
                      fullWidth
                      required
                      margin="normal"
                      onChange={(e) => handleInputChange(e)}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      label="IFSC Code"
                      name="ifscCode"
                      size="medium"
                      fullWidth
                      required
                      margin="normal"
                      onChange={(e) => handleInputChange(e)}
                    />
                  </Grid>
                </Grid>
                <TextField
                   value={wins}
                  label="Customer Id"
                  name="customerId"
                  // type="number"
                  fullWidth
                  required
                  margin="normal"
                  size="medium"
                  onChange={(e) => handleInputChange(e)}
                />

                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  style={{ marginRight: "9px" }}>
                  Submit
                </Button>
                <Button
                  type="button"
                  className="ms-2"
                  variant="contained"
                  color="warning"
                  onClick={() => navigate("/grid")}>
                  Back
                </Button>
              </form>
            </Box>
          </Box>
        </div>
      </Box>
    </>
  );
}
