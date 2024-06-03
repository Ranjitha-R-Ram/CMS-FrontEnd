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
import ProjectDetailsservice from "../ServiceLayer/ProjectDetailsservice";

export default function ResponsiveGrid() {
  const [open, setOpen] = React.useState(false);
  const win = sessionStorage.getItem("customerName");
  const handleClick = () => {
    setOpen(!open);
  };

  const closeMenu = () => {
    setOpen(false);
  };
  const [projectDetails, setProjectDetails] = React.useState([]);

  React.useEffect(() => {
    ProjectDetailsservice.GetProjectDetails()
      .then((res) => {
        setProjectDetails(res.data);
        console.log(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

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
              Quote
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/project" className="nav-link" onClick={closeMenu}>
              My Projects
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/packages" className="nav-link" onClick={closeMenu}>
              Packages
            </Link>
          </li>
         
          <li className="nav-item">
            <Link to="/bookingstatus" className="nav-link" onClick={closeMenu}>
             Check Status
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
      <b><h2>ALL OUR PROJECTS DETAILS</h2></b>
      <br/>
      <br/>
      <Grid container spacing={2} justifyItems="center">
        {projectDetails.map((projectDetails) => (
          <Grid item xs={4} key={projectDetails.projectId}>
            <Card sx={{ maxWidth: 345 }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  src={`data:image/jpeg;base64,${projectDetails.destImage}`}
                  style={{ width: "450px", height: "180px",objectFit: "contain" }}
                />
             
                <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    <h4>CMS CONSTRUCTION</h4> 
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
                      <Typography paragraph className="d-flex justify-content-between">
                        <span style={{justifyContent:"flex-start"}}>
                         
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
                      <Typography paragraph className="d-flex justify-content-between">
                        <span style={{justifyContent:"flex-start"}}>
                         
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
                      <Typography paragraph className="d-flex justify-content-between">
                        <span style={{justifyContent:"flex-start"}}>
                        
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
