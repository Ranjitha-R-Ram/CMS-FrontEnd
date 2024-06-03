import React, { useEffect, useState } from "react";
import { TextField, Button, Typography, Box, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import { Link } from "react-router-dom";
import ProjectDetailsservice from "../../ServiceLayer/ProjectDetailsservice";

export default function AddProjectDetails() {
  const navigate = useNavigate();
  const [projectDetails, setProjectDetails] = useState({
    projectName: "",
    projectDescription: "",
    status: "",
    destImage: null,
    customer:{
      customerId:"",
    }
  });

  const saveProjectDetails = async (e) => {
    e.preventDefault();
    console.log(projectDetails);
    const formData = new FormData();
    formData.append("projectName", projectDetails.projectName);
    formData.append("projectDescription", projectDetails.projectDescription);
    formData.append("status", projectDetails.status);
    formData.append("destImage", projectDetails.destImage);
    formData.append("customerId",projectDetails.customer.customerId)
    console.log(formData);

    await ProjectDetailsservice.AddProjectDetails(formData).then((response) => {
      setProjectDetails(response.data);
      alert("Project Details Inserted Successfully!..");
      navigate("/allproject");
    });
  };
  const handleFileChange = (e) => {
    if (e.target.name === "destImage") {
      setProjectDetails({
        ...projectDetails,
        [e.target.name]: e.target.files[0],
      });
    }
  };

  const handleInputChange = (e) => {
    if (e.target.name === "customerId") {
      setProjectDetails({ ...projectDetails, customer: { customerId: e.target.value } });
    } else
    setProjectDetails({ ...projectDetails, [e.target.name]: e.target.value });
  };

  const [customerIds, setCustomerIds] = useState([]);

  const fetchCustomerIds = async () => {
    const response = await ProjectDetailsservice.getAllCustomerIds();
    setCustomerIds(response.data);
  };

  useEffect(() => {
    fetchCustomerIds();
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

    if (name === "projectName" || name==="projectDescription" || name==="status") {
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
        <i className="bi bi-buildings-fill">
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
        </ul>
      </nav>
      <Grid
        container
        spacing={2}
        justifyContent="center"
        alignItems="center"
        height="100vh">
        <Grid item xs={12} sm={8} md={6} lg={4}>
          <form onSubmit={(e) => saveProjectDetails(e)}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: 4,
                border: "2px solid grey",
                borderRadius: 2,
                boxShadow: 2,
              }}>
              <Typography variant="h5" gutterBottom>
               <b>Add Project Details</b> 
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    label="Project Name"
                    name="projectName"
                    fullWidth
                    required
                    onChange={handleInputChange}
                    value={projectDetails.projectName}
                    margin="normal"
                    size="medium"
                    onBlur={handleBlur}
                    error={!!errors.projectName}
                    helperText={errors.projectName}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Project Description"
                    name="projectDescription"
                    fullWidth
                    onChange={handleInputChange}
                    value={projectDetails.projectDescription}
                    margin="normal"
                    required
                    size="medium"
                    onBlur={handleBlur}
                    error={!!errors.projectDescription}
                    helperText={errors.projectDescription}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Status"
                    name="status"
                    fullWidth
                    onChange={handleInputChange}
                    value={projectDetails.status}
                    margin="normal"
                    required
                    size="medium"
                    onBlur={handleBlur}
                    error={!!errors.status}
                    helperText={errors.status}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Customer Id"
                    name="customerId"
                    fullWidth
                    onChange={handleInputChange}
                    value={projectDetails.customer.customerId}
                    margin="normal"
                    required
                    size="medium"
                    select
                    SelectProps={{ native: true }}
                  >
                     <option value="">Select Customer ID</option>
                    {customerIds.map((id) => (
                      <option key={id} value={id}>
                        {id}
                      </option>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12}>
                  <input
                    label="Attach Project Image"
                    type="file"
                    name="destImage"
                    required
                    // value={destImage}
                    onChange={handleFileChange}
                    margin="normal"
                    size="medium"
                  />
                </Grid>
                
              </Grid>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  spacing: 2,
                  marginTop: 2,
                }}>
                <Button type="submit" variant="contained" color="primary" style={{marginRight: '8px'}}>
                  Submit
                </Button>
                <Button
                  type="button"
                  variant="contained"
                  color="warning"
                  onClick={() => navigate("/allproject")}>
                  Back
                </Button>
              </Box>
            </Box>
          </form>
        </Grid>
      </Grid>
    </>
  );
}
