import React, { useState } from "react";
import { TextField, Button, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import "../Navbar.css";
import { Link } from "react-router-dom";
import RawMaterialService from "../ServiceLayer/RawMaterialService";
import { Grid } from "@mui/material";

export default function AddRawMaterial() {
  const navigate = useNavigate();
  const [rawMaterial, setRawMaterial] = useState({
    packageType: "",
    storyBuilder: "",
    houseType: "",
    paintBrand: "",
    aggregates: "",
    cement: "",
    steel: "",
    destImage: null,
  });

  const {
    packageType,
    storyBuilder,
    houseType,
    paintBrand,
    aggregates,
    cement,
    steel,
  } = rawMaterial;
  

  const saveMaterial = async (e) => {
    e.preventDefault();
    console.log(rawMaterial);
    const formData=new FormData();
    formData.append("packageType",rawMaterial.packageType);
    formData.append("storyBuilder",rawMaterial.storyBuilder);
    formData.append("houseType",rawMaterial.houseType);
    formData.append("paintBrand",rawMaterial.paintBrand);
    formData.append("aggregates",rawMaterial.aggregates);
    formData.append("cement",rawMaterial.cement);
    formData.append("steel",rawMaterial.steel);
    formData.append("destImage", rawMaterial.destImage);
    await RawMaterialService.AddMaterial(formData).then((response) => {
      setRawMaterial(response.data);
      alert("Raw Material Inserted Succesfully!..");
      window.location.reload();
      navigate("/allmaterial");
    });
  };

  const handleInputChange = (e) => {
    setRawMaterial({ ...rawMaterial, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    if (e.target.name === "destImage") {
      setRawMaterial({
        ...rawMaterial,
        [e.target.name]: e.target.files[0],
      });
    }
  };
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

    if (name === "packageType" || name==="storyBuilder" || name==="paintBrand" || name==="aggregates" || name==="cement" || name==="steel") {
      if (!value || !/^[a-zA-Z ]*$/.test(value)) {
        error = "Please enter a valid details.";
      }
    }  if (name === "houseType") {
      if (!value || !/^[a-zA-Z-0-9 ]*$/.test(value)) {
        error = "Please enter a valid house type.";
      }
    }

    return error;
  };
  const win=sessionStorage.getItem("builderName");
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
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "",
          height: "5vh",
        }}>
        <div className="d-flex justify-content-center align-items-center vh-100  ">
          <br />
          <br />
          <form onSubmit={(e) => saveMaterial(e)}>
            <Box
              sx={{
                display: "flex",
                width: "600px",
                justifyContent: "center",
                alignItems: "center",
                height: "80vh",
                border: "2px solid grey ",
              }}
              className="border rounded shadow ">
              <Box sx={{ width: "70%" }}>
                <Typography
                  variant="h5"
                  style={{ textAlign: "center" }}
                  gutterBottom>
                 <b> ADD RAW MATERIALS</b>
                </Typography>

                <Grid container spacing={1}>
                  <Grid item xs={12} md={13}>
                    <TextField
                      label="Package Type"
                      fullWidth
                      onChange={(e) => handleInputChange(e)}
                      value={packageType}
                      type="text"
                      name="packageType"
                      required
                      margin="normal"
                      onBlur={handleBlur}
                      error={!!errors.packageType}
                      helperText={errors.packageType}
                      size="small"></TextField>
                  </Grid>
                

                <Grid container spacing={1}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      label="Stroy Builder"
                      name="storyBuilder"
                      fullWidth
                      onChange={(e) => handleInputChange(e)}
                      value={storyBuilder}
                      required
                      margin="normal"
                      size="small"
                      onBlur={handleBlur}
                      error={!!errors.storyBuilder}
                      helperText={errors.storyBuilder}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      label="House Type"
                      name="houseType"
                      onChange={(e) => handleInputChange(e)}
                      value={houseType}
                      required
                      margin="normal"
                      size="small"
                      onBlur={handleBlur}
                      error={!!errors.houseType}
                      helperText={errors.houseType}
                    />
                  </Grid>
                </Grid>

                <Grid container spacing={1}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      label="Paint Brand"
                      name="paintBrand"
                      type="text"
                      fullWidth
                      onChange={(e) => handleInputChange(e)}
                      value={paintBrand}
                      required
                      margin="normal"
                      size="small"
                      onBlur={handleBlur}
                      error={!!errors.small}
                      helperText={errors.small}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      label="Aggregates"
                      name="aggregates"
                      type="text"
                      fullWidth
                      onChange={(e) => handleInputChange(e)}
                      value={aggregates}
                      required
                      margin="normal"
                      size="small"
                      onBlur={handleBlur}
                      error={!!errors.aggregates}
                      helperText={errors.aggregates}
                    />
                  </Grid>
                </Grid>

                <Grid container spacing={1}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      label="Cement"
                      name="cement"
                      type="text"
                      fullWidth
                      onChange={(e) => handleInputChange(e)}
                      value={cement}
                      margin="normal"
                      required
                      size="small"
                      flex="center"
                      onBlur={handleBlur}
                      error={!!errors.cement}
                      helperText={errors.cement}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      label="Steel"
                      name="steel"
                      type="text"
                      fullWidth
                      required
                      onChange={(e) => handleInputChange(e)}
                      value={steel}
                      margin="normal"
                      size="small"
                      onBlur={handleBlur}
                      error={!!errors.steel}
                      helperText={errors.steel}
                    />
                  </Grid>
                </Grid>
               
                 <Grid item xs={12}>
                  <input
                    label="Attach Project Image"
                    type="file"
                    name="destImage"
                    required
                    onChange={handleFileChange}
                    margin="normal"
                    size="large"
                  />
                  <br/>
                  <br/>
                  <Grid>
                <Button type="submit" variant="contained" color="primary" style={{marginRight: '13px'}}>
                  Submit
                </Button>
                <Button
                  type="button"
               
                  className="ms-2"
                  variant="contained"
                  color="warning"
                  onClick={() => navigate("/allmaterial")}>
                  Back
                </Button>
                </Grid>
                </Grid>
                </Grid>
              </Box>
            </Box>
          </form>
        </div>
      </Box>
    </>
  );
}
