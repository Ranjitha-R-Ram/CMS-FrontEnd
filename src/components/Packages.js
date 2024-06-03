import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import { Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import RawMaterialService from "../ServiceLayer/RawMaterialService";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function Packages() {
  const win = sessionStorage.getItem("customerName");
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const [material, setMaterial] = React.useState([]);

  React.useEffect(() => {
    RawMaterialService.ViewAllMaterial()
      .then((res) => {
        setMaterial(res.data);
        console.log(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const [open, setOpen] = React.useState(false);

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
            <Link to="/grid" className="nav-link" onClick={closeMenu}>
              Back
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/packages" className="nav-link" onClick={closeMenu}>
              Welcome {win}
            </Link>
          </li>
        </ul>
      </nav>
      <br />
      <br />
      <br />
      <Box
        sx={{
          display: "flex",
          justifyContent: "right",
          alignItems: "right",
          height: "5vh",
        }}></Box>
      <Box sx={{ flexGrow: 1 }}>
        <br />
        <br />
        <Grid container spacing={2} justifyItems="center" borderRadius={"18px"}>
          {material.map((material) => (
            <Grid item xs={4} key={material.id}>
              <Card sx={{ maxWidth: 345 }}>
                <CardHeader
                  avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                      CMS
                    </Avatar>
                  }
                  action={
                    <IconButton aria-label="settings">
                      <MoreVertIcon />
                    </IconButton>
                  }
                  title="CMS Construction "
                  subheader={material.packageType}
                />
                <CardMedia
                  component="img"
                  height="300"
                  width="20"
                  src={`data:image/jpeg;base64,${material.destImage}`}
                  // image="https://i2.wp.com/homishome.com/wp-content/uploads/2018/09/Amazing-Apartment-Building-Facade-Architecture-Design29.jpg?fit=1024%2C1024&ssl=1"
                  alt="Paella dish"
                />
                <CardContent>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    style={{ textAlign: "justify", justifyContent: "initial" }}>
                    Our Construction Package is our mid-tier offering, designed
                    to provide a balance between affordability and
                    quality,taking into account your specific needs,
                    preferences, and budget.
                  </Typography>
                </CardContent>
                <CardActions disableSpacing>
                  <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                  </IconButton>
                  <IconButton aria-label="share">
                    <ShareIcon />
                  </IconButton>
                  <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more">
                    <ExpandMoreIcon />
                  </ExpandMore>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                  <CardContent>
                    <div className="row d-flex">
                      <div>
                        <div className="row">
                          <>
                            <div className="card">
                              <div className="card-body d-flex flex-column align-items-center">
                                <Grid
                                  item
                                  xs={12}
                                  className="d-flex justify-content-between">
                                  <Typography paragraph>
                                    <span>
                                      <b>PACKAGE:</b>
                                    </span>
                                    <span>{material.packageType}</span>
                                    {""}
                                    {/* </Typography> */}
                                    {/* </Grid>

                                <Grid item xs={12} className="d-flex justify-content-between"> */}
                                    {/* <Typography paragraph> */}

                                    <span>
                                      ---<b> CEMENT:</b>
                                    </span>
                                    <span> {material.cement}</span>
                                  </Typography>
                                </Grid>

                                <Grid
                                  item
                                  xs={12}
                                  className="d-flex justify-content-between">
                                  <Typography paragraph>
                                    <span>
                                      <b>HOUSE TYPE:</b>
                                    </span>
                                    <span>{material.houseType}</span>
                                    {/* </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                  <Typography paragraph> */}
                                    <span>
                                      --- <b> PAINT:</b>
                                    </span>
                                    <span> {material.paintBrand}</span>
                                  </Typography>
                                </Grid>

                                <Grid
                                  item
                                  xs={12}
                                  className="d-flex justify-content-between">
                                  <Typography paragraph>
                                    <span>
                                      <b> AGGREGATES:</b>
                                    </span>
                                    <span>{material.aggregates}</span>
                                    {/* </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                  <Typography paragraph> */}
                                    <span>
                                      --- <b> STEEL:</b>
                                    </span>
                                    <span>{material.steel}</span>
                                  </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                  <Typography
                                    paragraph
                                    className="d-flex justify-content-between">
                                    <span>
                                       <b>STORY BUILDER:</b>{" "}
                                    </span>
                                    <span>{material.storyBuilder}</span>
                                  </Typography>
                                </Grid>
                              </div>
                            </div>
                          </>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Collapse>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
}
