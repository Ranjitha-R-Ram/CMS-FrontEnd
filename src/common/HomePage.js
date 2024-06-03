import React, { useEffect, useState } from "react";
import { Button, Typography, Box } from "@mui/material";
import { ResponsiveNavbar } from "../components/ResponsiveNavBar";
import { FiMenu, FiX } from "react-icons/fi";
import { Link } from "react-router-dom";
import "../Navbar.css";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { CardActionArea, CardActions, Grid, Stack } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import ProjectDetailsservice from "../ServiceLayer/ProjectDetailsservice";

const HomePage = () => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const closeMenu = () => {
    setOpen(false);
  };

  const images = [
    "https://wallpaperaccess.com/full/2315968.jpg",
    "https://www.pixelstalk.net/wp-content/uploads/images1/House-Wallpapers-HD-Free-download.jpg",
    "https://w.wallha.com/ws/7/vuG8tcgX.jpg",
  ];
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const intervalId = setInterval(() => {
      setIndex((index + 1) % images.length);
    }, 12000);

    return () => {
      clearInterval(intervalId);
    };
  }, [index]);

  const win = sessionStorage.getItem("customerName");
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
        <Link to="/" className="nav-logo">
          <b>CMS</b>
        </Link>

        <div onClick={handleClick} className="nav-icon">
          {open ? <FiX /> : <FiMenu />}
        </div>
        <ul className={open ? "nav-links active" : "nav-links"}>
          <li className="nav-item">
            <Link to="/signup" className="nav-link" onClick={closeMenu}>
              Cutomer Login
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/registration" className="nav-link" onClick={closeMenu}>
              Builder Login
            </Link>
          </li>
        </ul>
      </nav>

      <div>
        {/* <h2 style={{ marginTop: "5vh" }}>
          <b>CMS CONSTRUCTION</b>
        </h2> */}
        {/* <img
          style={{ height: "60vh", width: "100vh" ,marginTop:"5vh"}}
          className="d-block w-100"
          src="https://wallpaperaccess.com/full/2315968.jpg"
          alt="Second slide"
        /> */}
        <TransitionGroup>
          <CSSTransition
            key={index}
            timeout={300}
            classNames="fade"
            unmountOnExit
            onEnter={(node) => node.classList.add("fade-enter")}
            onExited={(node) => node.classList.add("fade-exit")}>
            <img
              style={{ height: "80vh", width: "199vh" }}
              className="d-block w-100"
              src={images[index]}
              alt="Second slide"
            />
          </CSSTransition>
        </TransitionGroup>

        {/* <Box> */}
        {/* <ResponsiveNavbar/> */}
        {/* <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              // height: "100vh",
              marginTop: "50px",
              flexDirection: "column",
            }}>
            <Typography variant="h4" gutterBottom>
              {/* Welcome to the Farming App! Our{" "} */}
        {/* <b>OUR PROJECTS !!!</b> */}
        {/* {window.sessionStorage.getItem("bidder")? "Bidder" : "Farmer"} */}
        {/* </Typography>
            <Typography variant="h6" gutterBottom>
              From a couple to a large Indian family,we have houses built with
              emotions for everyone.
            </Typography> */}
        {/* <MainCarousel /> */}
        {/* <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "20px",
                marginTop: "50px",
              }}> */}
        {/* <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                }}>
                <img
                  src="https://wallpaperaccess.com/full/1859246.jpg"
                  alt="Welcome Screen"
                  width="300"
                  height="200"
                />
              </Box> */}
        {/* <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                }}>
                <img
                  src="https://www.pixelstalk.net/wp-content/uploads/images1/House-Wallpapers-HD-Free-download.jpg"
                  alt="Smart Farming"
                  width="300"
                  height="200"
                />
              </Box> */}
        {/* <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                }}>
                <img
                  src="https://w.wallha.com/ws/7/vuG8tcgX.jpg"
                  alt="Main Carousel"
                  width="300"
                  height="200"
                />
              </Box>
            </Box> */}
        {/* </Box>  */}
        {/* </Box> */}
        <br />
        <br />
       <h2> <b>OUR PROJECTS</b></h2>
        <br/>
        <br/>
        <Typography variant="h6" gutterBottom>
              From a couple to a large Indian family,we have houses built with
              emotions for everyone.
            </Typography> 
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
                  </Typography> */}

                    <hr />
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Typography paragraph className="d-flex justify-content-between">
                          <span style={{alignContent:"flex-start"}}>
                           
                            <b>PROJECT NAME:</b>
                          </span>
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography paragraph className="d-flex justify-content-between">
                          <span style={{ justifyContent: "flex-end" }}>
                            {projectDetails.projectName}
                          </span>
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                      <Grid item xs={6} className="d-flex justify-content-between">
                        <Typography paragraph>
                          <span style={{alignContent:"flex-start"}}>
                           
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
                          <span style={{alignContent:"flex-start"}}>
                            
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
                      {/* <Grid>
                      <button onClick={signin}>View Project</button>
                    </Grid> */}
                    </Grid>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
      <footer
        style={{
          backgroundColor: "#333",
          color: "#fff",
          padding: "20px",
          marginTop: "20px",
        }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "column",
            textAlign: "center",
          }}>
          <div>
            <p style={{ marginBottom: "10px" }}>
              © 2023 CMS Construction. All rights reserved.
            </p>
            <p style={{ marginBottom: "10px" }}>
              Designed by{" "}
              <a href="https://www.yourwebsite.com/" style={{ color: "#fff" }}>
                Ranjitha Rajaram{" "}
              </a>
            </p>
          </div>
          <div>
            <p style={{ marginBottom: "10px" }}>Follow us:</p>
            <ul
              style={{
                listStyle: "none",
                padding: "0",
                display: "flex",
                justifyContent: "center",
              }}>
              <li style={{ marginRight: "10px" }}>
                <a href="https://www.facebook.com/" style={{ color: "#fff" }}>
                  <i className="fab fa-facebook-f"></i>
                </a>
              </li>
              <li style={{ marginRight: "10px" }}>
                <a href="https://www.twitter.com/" style={{ color: "#fff" }}>
                  <i className="fab fa-twitter"></i>
                </a>
              </li>
              <li style={{ marginRight: "10px" }}>
                <a href="https://www.instagram.com/" style={{ color: "#fff" }}>
                  <i className="fab fa-instagram"></i>
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/" style={{ color: "#fff" }}>
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </>
  );
};

export default HomePage;
