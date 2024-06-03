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
import BuilderService from "../ServiceLayer/BuilderService";
import axios from "axios";
import Swal from "sweetalert2";

export default function Registration() {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const closeMenu = () => {
    setOpen(false);
  };

  let navigate = useNavigate();
  const [builderName, setBuilderName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    data.append("password", password);

    console.log({
      builderName: data.get("builderName"),
      password: data.get("password"),
    });

    await axios
      .get(
        `http://localhost:9999/loginBuilder/${data.get(
          "builderName"
        )}/${data.get("password")}`
      )
      .then((res) => {
        if (res.data) {
          console.log(builderName);
          console.log(password);
          console.log(res.data);
          setErrors({ ...errors, [builderName]: "" });
          setErrors({ ...errors, [password]: "" });
          alert("Login Successfull");
          sessionStorage.setItem("builderName", res.data.builderName);
          sessionStorage.setItem("builderId", res.data.builderId);
          navigate("/landing-page");
        } else {
          alert("Login Failed");
          window.location.reload();
        }
      })
      .catch((err) => console.log(err));
  };

  const [errors, setErrors] = useState({});

  const handleBlur = (event) => {
    const { name, value } = event.target;
    const error = validateField(name, value);
    setErrors({ ...errors, [name]: error });
  };

  const validateField = (name, value) => {
    let error = "";

    if (name === "builderName") {
      if (!value || !/^[a-zA-Z ]*$/.test(value)) {
        error = "Please enter a valid name.";
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
      <Container component="main" maxWidth="lg">
        <Box
          sx={{
            marginTop: 8,
            maxHeight: "500px",
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
                  BUILDER-SIGN IN
                </Typography>
                <form onSubmit={(event) => handleSubmit(event)}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="builderName"
                    label="Builder Name"
                    name="builderName"
                    onChange={(e) => setBuilderName(e.target.value)}
                    value={builderName}
                    autoFocus
                    onBlur={handleBlur}
                    error={!!errors.builderName}
                    helperText={errors.builderName}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    onBlur={handleBlur}
                    error={!!errors.password}
                    helperText={errors.password}
                  />

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}>
                    Sign In
                  </Button>
                </form>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
}
