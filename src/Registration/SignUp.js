import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/material";
import { FiMenu, FiX } from "react-icons/fi";
import "../Navbar.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CustomerService from "../ServiceLayer/CustomerService";
import Swal from "sweetalert2";

export default function SignUp() {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const closeMenu = () => {
    setOpen(false);
  };
  const navigate = useNavigate();
  const [signUp, setSignUp] = useState({
    customerName: "",
    emailId: "",
    password: "",
    phoneNumber: "",
    address: "",
  });

  const handleInputChange = (e) => {
    setSignUp({ ...signUp, [e.target.name]: e.target.value });
  };

  const saveCustomer = async (e) => {
    e.preventDefault();
    console.log(signUp);
    await CustomerService.AddCustomer(signUp).then((response) => {
      if (response.data) {
        setSignUp(response.data);
        alert("Registered Successfully!!!");
        navigate("/signin");
      } else {
        alert("Login Failed");
        window.location.reload();
      }
    });
  };

  const [errors, setErrors] = useState({});

  const handleBlur = (event) => {
    const { name, value } = event.target;
    const error = validateField(name, value);
    setErrors({ ...errors, [name]: error });
  };

  const validateField = (name, value) => {
    let error = "";

    if (name === "customerName" || name === "address") {
      if (!value || !/^[a-zA-Z ]*$/.test(value)) {
        error = "Please enter a valid details.";
      }
    } else if (name === "password") {
      if (
        !value ||
        !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,15}$/.test(
          value
        )
      ) {
        error = "Please enter a valid password.";
      }
    } else if (name === "emailId") {
      if (
        !value ||
        !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)
      ) {
        error = "Please enter a valid emailId.";
      }
    } else if (name === "phoneNumber") {
      if (!value || !/^\\d{10}$/.test(value)) {
        error = "Please enter a valid phone number.";
      }
    }

    return error;
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
            <Link to="/" className="nav-link" onClick={closeMenu}>
              Back to Home
            </Link>
          </li>
        </ul>
      </nav>
      <Container component="main" maxWidth="lg" maxHeight>
        <Box
          sx={{
            marginTop: 8,
            maxHeight: "800px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: 4,
            border: "2px solid grey",
            borderRadius: 2,
            boxShadow: 2,
          }}>
          <Grid container>
            <CssBaseline />
            <Grid
              item
              xs={false}
              sm={4}
              md={7}
              sx={{
                backgroundImage:
                  "url(https://wallpapercave.com/wp/wp2464232.jpg)",
                backgroundRepeat: "no-repeat",
                backgroundColor: (t) =>
                  t.palette.mode === "light"
                    ? t.palette.grey[50]
                    : t.palette.grey[900],
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
            <Grid
              item
              xs={12}
              sm={8}
              md={5}
              component={Paper}
              elevation={6}
              square>
              <Box
                sx={{
                  my: 8,
                  mx: 4,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}>
                <Typography component="h1" variant="h5">
                  CUSTOMER-SIGN UP
                </Typography>
                <form onSubmit={saveCustomer}>
                  <TextField
                    margin="normal"
                    required
                    size="medium"
                    fullWidth
                    id="customerName"
                    label="Customer Name"
                    name="customerName"
                    autoComplete="customerName"
                    onChange={(e) => handleInputChange(e)}
                    autoFocus
                    error={!!errors.customerName}
                    helperText={errors.customerName}
                    onBlur={handleBlur}
                  />
                  <TextField
                    margin="normal"
                    required
                    size="medium"
                    fullWidth
                    id="emailId"
                    label="Email Address"
                    name="emailId"
                    autoComplete="emailId"
                    onChange={(e) => handleInputChange(e)}
                    autoFocus
                    error={!!errors.emailId}
                    helperText={errors.emailId}
                    onBlur={handleBlur}
                  />
                  <TextField
                    margin="normal"
                    required
                    size="medium"
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    onChange={(e) => handleInputChange(e)}
                    autoComplete="password"
                    error={!!errors.password}
                    helperText={errors.password}
                    onBlur={handleBlur}
                  />
                  <TextField
                    margin="normal"
                    required
                    size="medium"
                    fullWidth
                    name="phoneNumber"
                    label="Phone Number"
                    type="text"
                    id="phoneNumber"
                    onChange={(e) => handleInputChange(e)}
                    autoComplete="phoneNumber"
                    error={!!errors.phoneNumber}
                    helperText={errors.phoneNumber}
                    onBlur={handleBlur}
                  />
                  <TextField
                    margin="normal"
                    required
                    size="medium"
                    fullWidth
                    name="address"
                    label="Address"
                    type="text"
                    id="address"
                    onChange={(e) => handleInputChange(e)}
                    autoComplete="address"
                    error={!!errors.address}
                    helperText={errors.address}
                    onBlur={handleBlur}
                  />
                  {/* <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                */}
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}>
                    Sign Up
                  </Button>

                  <Grid container>
                    <Grid item alignContent={"right"}>
                      <Link to="/signin" variant="body2">
                        {"Already have an account? Sign In"}
                      </Link>
                    </Grid>
                  </Grid>
                </form>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
}
