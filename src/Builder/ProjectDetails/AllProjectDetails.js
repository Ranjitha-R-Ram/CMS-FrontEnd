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
import ProjectDetailsservice from "../../ServiceLayer/ProjectDetailsservice";
export default function AllProjectDetails() {
  const [open, setOpen] = React.useState(false);

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
      <br />
      <br />
      <Stack direction="row" spacing={2} sx={{ justifyContent: "flex-end" }}>
        <Link to="/addproject">
          <Button variant="outlined">Add Project Details</Button>
        </Link>
      </Stack>
      <br />
      <br />
      <br />
      <Grid container spacing={2} justifyItems="center">
        {projectDetails.map((projectDetails) => (
          <Grid item xs={12} sm={6} md={4} key={projectDetails.projectId}>
            <Card >
              <CardActionArea>
                <CardMedia
                  component="img"
                  src={`data:image/jpeg;base64,${projectDetails.destImage}`}
                  style={{ width: "450px", height: "180px" ,objectFit: "contain"}}
                />

                <CardContent>
                  {/* <Typography gutterBottom variant="h5" component="div">
                    CMS Contruction
                  </Typography> */}
                  {/* <Typography
                    variant="body2"
                    color="text.secondary"
                    style={{ textAlign: "justify", justifyContent: "initial" }}>
                    Our Construction Package is our mid-tier offering, designed
                    to provide a balance between affordability and quality,
                    taking into account your specific needs, preferences, and
                    budge.
                  </Typography> */}

                  {/* <hr /> */}
                  {/* <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Typography paragraph className="d-flex justify-content-between">
                        <span>
                         
                          <b>Project Id</b>
                        </span>
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography paragraph>
                        <span style={{ justifyContent: "flex-end" }}>
                          {projectDetails.projectId}
                        </span>
                      </Typography>
                    </Grid>
                  </Grid> */}
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Typography paragraph className="d-flex justify-content-between">
                        <span style={{justifyItems:"flex-start"}}>
                          
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
                  {/* <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Typography paragraph className="d-flex justify-content-between">
                        <span
                          style={{
                            marginLeft: "-52px",
                            justifyContent: "flex-start",
                          }}>
                          <b>Customer Id</b>
                        </span>
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography paragraph>
                        <span style={{ justifyContent: "flex-end" }}>
                          {projectDetails.customer.customerId}
                        </span>
                      </Typography>
                    </Grid>
                  </Grid> */}
                  <Stack
                    direction="row"
                    spacing={2}
                    sx={{ justifyContent: "flex-start" }}>
                    <Link to={`/updateproject/${projectDetails.projectId}`}>
                      <Button
                        variant="contained"
                        color="primary"
                        sx={{
                          backgroundColor: " #555555",
                          color: "white",
                          "&:hover": {
                            backgroundColor: " #555555",
                          },
                        }}>
                        Update
                      </Button>
                    </Link>
                  </Stack>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
