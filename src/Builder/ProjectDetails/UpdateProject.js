import React, { useState } from "react";
import { TextField, Button, Typography, Box, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import { Link } from "react-router-dom";
import ProjectDetailsservice from "../../ServiceLayer/ProjectDetailsservice";
import { useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
export default function UpdateProject() {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const [projectDetails, setProjectDetails] = useState({
    projectId: "",
    projectName: "",
    projectDescription: "",
    status: "",
    destImage: null,
    customer: {
      customerId: "",
    },
  });

  const saveProjectDetails = async (e) => {
    e.preventDefault();
    console.log(projectDetails);
    const formData = new FormData();
    formData.append("projectId", projectDetails.projectId);
    formData.append("projectName", projectDetails.projectName);
    formData.append("projectDescription", projectDetails.projectDescription);
    formData.append("status", projectDetails.status);
    formData.append("destImage", projectDetails.destImage);
    formData.append("customerId", projectDetails.customer.customerId);
    console.log(formData);

    await ProjectDetailsservice.UpdateProjectDetails(formData).then(
      (response) => {
        // setProjectDetails(response.data);
        alert("Project Details Updated Successfully!..");
        navigate("/allproject");
      }
    );
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
      setProjectDetails({
        ...projectDetails,
        customer: { ...projectDetails.customer, customerId: e.target.value },
      });
    } else {
      setProjectDetails({ ...projectDetails, [e.target.name]: e.target.value });
    }
  };

  console.log(projectDetails);
  const loadProject = async (e) => {
    await axios
      .get(`http://localhost:9999/getProjectDetails/${projectId}`)
      .then((response) => {
        console.log(response.data);
        setProjectDetails(response.data);
      })
      .catch((error) => {
        // console.error("Error fetching data: ", error);
      });
  };
  useEffect(() => {
    loadProject(projectId);
  }, [projectId]);

  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const closeMenu = () => {
    setOpen(false);
  };

  // const winId = sessionStorage.getItem("customerId");

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
                width:"90vh",
                border: "2px solid grey",
                borderRadius: 2,
                boxShadow: 2,
              }}>
              <Typography variant="h5" gutterBottom>
                <b>UPDATE PROJECT DETAILS</b>
              </Typography>

              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Project Id"
                    name="projectId"
                    fullWidth
                    required
                    onChange={handleInputChange}
                    value={projectId}
                    margin="normal"
                    size="medium"></TextField>
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    label="Project Name"
                    name="projectName"
                    fullWidth
                    required
                    onChange={handleInputChange}
                    value={projectDetails.projectName}
                    margin="normal"
                    size="medium"></TextField>
                </Grid>
                <Grid container spacing={1}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      label="Project Description"
                      name="projectDescription"
                      fullWidth
                      onChange={handleInputChange}
                      value={projectDetails.projectDescription}
                      margin="normal"
                      required
                      size="medium"></TextField>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <TextField
                      label="Status"
                      name="status"
                      fullWidth
                      onChange={handleInputChange}
                      value={projectDetails.status}
                      margin="normal"
                      required
                      size="medium"></TextField>
                  </Grid>
                </Grid>
               
                    <TextField
                      label="Customer Id"
                      name="customerId"
                      fullWidth
                      onChange={handleInputChange}
                      value={projectDetails.customer.customerId}
                      margin="normal"
                      required
                      size="medium"></TextField>
  
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

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  spacing: 2,
                  marginTop: 2,
                }}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  style={{ marginRight: "8px" }}>
                  Submit
                </Button>
                <Button
                  type="button"
                  variant="contained"
                  color="warning"
                  onClick={() => navigate("/landing-page")}>
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
