import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import {
  Button,
  CardActionArea,
  CardActions,
  Grid,
  Stack,
} from "@mui/material";
import { Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";

import { useEffect } from "react";
import axios from "axios";
export default function ProjectDetails() {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const closeMenu = () => {
    setOpen(false);
  };
  const [projectDetails, setProjectDetails] = React.useState([]);

  const winId = sessionStorage.getItem("customerId");
  useEffect(() => {
    loadProject();
  }, []);

  const loadProject = async (customerId) => {
    await axios
      .get(`http://localhost:9999/getProjectById/${winId}`)
      .then((response) => {
        console.log(response.data);
        setProjectDetails(response.data);
        loadProject();
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
        <div onClick={handleClick} className="nav-icon">
          {open ? <FiX /> : <FiMenu />}
        </div>
        <ul className={open ? "nav-links active" : "nav-links"}>
          <li className="nav-item">
            <Link to="/grid" className="nav-link" onClick={closeMenu}>
              Back
            </Link>
          </li>
        </ul>
      </nav>
      <br />
      <br />
      {/* <Stack direction="row" spacing={2} sx={{ justifyContent: "flex-end" }}>
        <Link to="/addproject">
          <Button variant="outlined">Track Project Details</Button>
        </Link>
      </Stack> */}
      <br />
      <br />
      <br />
      <b><h3>YOUR PROJECTS DETAILS</h3></b>
      <br/>
      <Grid container spacing={2} justifyItems="center">
        {projectDetails.map((projectDetails) => (
          <Grid item xs={12} sm={6} md={4} key={projectDetails.projectName}>
            <Card sx={{ maxWidth: 345}}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  src={`data:image/jpeg;base64,${projectDetails.destImage}`}
                  style={{ width: "450px", height: "180px" }}
                />

                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    <b> CMS CONSTRUCTION</b>
                  </Typography>
                  {/* <Typography
                    variant="body2"
                    color="text.secondary"
                    style={{ textAlign: "justify", justifyContent: "initial" }}>
                    Our Construction Package is our mid-tier offering, designed
                    to provide a balance between affordability and quality,
                    taking into account your specific needs, preferences, and
                    budge.
                  </Typography>
                   */}
                  <hr />
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Typography
                        paragraph
                        className="d-flex justify-content-between">
                        <span style={{ justifyContent: "flex-start" }}>
                          <b>PROJECT NAME</b>
                        </span>
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography paragraph>
                        <span style={{ justifyContent: "flex-end" }}>
                          {projectDetails.projectName}
                        </span>
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Typography
                        paragraph
                        className="d-flex justify-content-between">
                        <span style={{ justifyContent: "flex-start" }}>
                          <b>DESCRIPTION</b>
                        </span>
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography paragraph>
                        <span style={{ justifyContent: "flex-end" }}>
                          {projectDetails.projectDescription}
                        </span>
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Typography
                        paragraph
                        className="d-flex justify-content-between">
                        <span style={{ justifyContent: "flex-start" }}>
                          <b>STATUS</b>
                        </span>
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography paragraph>
                        <span style={{ justifyContent: "flex-end" }}>
                          {projectDetails.status}
                        </span>
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
