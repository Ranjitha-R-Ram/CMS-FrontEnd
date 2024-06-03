import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import "../Navbar.css";

const BuilderLandingPage = () => {
  let navigate = useNavigate();
  const win=sessionStorage.getItem("builderName");
  const myStyle = {
    backgroundImage: "url('https://wallpaperaccess.com/full/3434349.jpg')",
    height: "100vh",
    fontSize: "50px",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  };

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
            <Link to="/" className="nav-link" onClick={closeMenu}>
              Back to Home
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
      <br />
      <div className="alignItems:center">
        <Grid container spacing={0}>
          <Grid xs={4}>
            <Card sx={{ maxWidth: 345 }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image="https://th.bing.com/th/id/R.084fe695f96cabd3ad48fe964ef6f24b?rik=EuYuIiD2VcpufQ&riu=http%3a%2f%2ferusuconsultants.com%2fwp-content%2fuploads%2f2023%2f04%2fSTRUCTURAL-ENGINEERING-MATERIALS.webp&ehk=8O6P2c9bcvWutyeGq2Uf6deco8T7XufWcvfk%2bSPwxi0%3d&risl=&pid=ImgRaw&r=0"
                  alt="green iguana"
                />

                <CardContent style={{ textDecoration: "none" }}>
                  <Typography gutterBottom variant="h5" component="div" className="text-doc">
                    <Link to={"/allmaterial"}  style={{textDecoration:"none"}}> Raw Materials</Link>
                  </Typography>
                  <Typography variant="body2" color="text.secondary"   style={{ textAlign: "justify", justifyContent: "initial" }}>
                    At CMS, we offer a wide range of high-quality building
                    construction raw materials to help you build your dream home
                    or commercial property. Our raw materials are sourced from
                    trusted suppliers and manufacturers, ensuring that they meet
                    the highest standards of quality and durability. From cement
                    and steel to bricks and sand, we have everything you need to
                    get started on your construction project.
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>

          <Grid xs={4}>
            <Card sx={{ maxWidth: 345 }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image="https://th.bing.com/th/id/R.6742ed932599155709d0f0744bec6d9e?rik=vgSKRGXN97ZBAA&riu=http%3a%2f%2fwww.the-allen-group.com%2fsites%2fdefault%2ffiles%2f2017-05%2f2.A-PM-CM-Services---BART-HMC-Staff-On-Site.jpg&ehk=tanhUEimyQxTiALmfLfQVrt5KEz3TobL16D%2fkItteGk%3d&risl=&pid=ImgRaw&r=0"
                  alt="green iguana"
                />

                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    <Link to={"/allproject"} style={{textDecoration:"none"}}>Project Details</Link>
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    style={{ textAlign: "justify", justifyContent: "initial" }}
                    className="text">
                    At CMS, we have a wide range of projects to choose from,
                    ranging from small residential properties to large
                    commercial buildings. Our team of experienced architects and
                    engineers will work with you to design and build a property
                    that meets your specific needs and preferences. We use the
                    latest construction techniques and technologies to ensure
                    that your property is built to the highest standards of
                    quality and durability.
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>

          <Grid xs={4}>
            <Card sx={{ maxWidth: 345 }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image="https://th.bing.com/th/id/OIP.3LcJXFqGoLYg2jnbA7bf0AHaFj?rs=1&pid=ImgDetMain"
                  alt="green iguana"
                />

                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    <Link to={"/allbooking"} style={{textDecoration:"none"}}>Booking Details</Link>
                  </Typography>
                  <Typography variant="body2" color="text.secondary"   style={{ textAlign: "justify", justifyContent: "initial" }}>
                    Booking your construction project with CMS is easy and
                    convenient. Our online booking system allows you to schedule
                    your project at a time that works best for you. We offer
                    flexible scheduling options, so you can choose a time that
                    fits your busy schedule. Plus, our team of experienced
                    professionals will work with you every step of the way to
                    ensure that your project is completed on time and within
                    budget.
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default BuilderLandingPage;
