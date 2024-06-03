import React, { useState } from "react";
import { Grid, Paper, Typography, TextField, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import "../Navbar.css";

const Package = ({ name, defaultAmount, squareFeet }) => {
  const [userSquareFeet, setUserSquareFeet] = useState(0);
  const [open, setOpen] = React.useState(false);
  const win = sessionStorage.getItem("customerName");

  const estimateCost = () => {
    if (userSquareFeet < squareFeet[0]) {
      return "Square feet is too small for this package";
    } else if (userSquareFeet > squareFeet[1]) {
      return "Square feet is too large for this package";
    } else {
      return defaultAmount * userSquareFeet;
    }
  };

  return (
    <>
      <br />
      <Grid
        item
        xs={12}
        sm={6}
        md={4}
        lg={3}
        style={{ justifyContent: "flex-end", marginTop: 50, marginLeft: 60 }}>
        <br />
        <br />
        <Paper elevation={3} style={{ padding: 16 }}>
          <Typography variant="h5" component="h2">
            {name} Package
          </Typography>
          <Typography variant="body1" component="p">
            Default amount: Rs:{defaultAmount}
          </Typography>
          <Typography variant="body1" component="p">
            Square feet range: {squareFeet[0]}-{squareFeet[1]}
          </Typography>
          <TextField
            type="number"
            value={userSquareFeet}
            onChange={(e) => setUserSquareFeet(e.target.value)}
            placeholder="Enter square feet"
            fullWidth
            margin="normal"
          />
          <Button
            variant="contained"
            color="primary"
            onClick={estimateCost}
            fullWidth>
            Estimate Cost
          </Button>
          <Typography variant="body1" component="p">
            Estimated cost: Rs:{estimateCost()}
          </Typography>
        </Paper>
      </Grid>
    </>
  );
};

const Estimate = () => {
  const win = sessionStorage.getItem("customerName");
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
        <div className="nav-icon">{open ? <FiX /> : <FiMenu />}</div>
        <ul className={open ? "nav-links active" : "nav-links"}>
          <li className="nav-item">
            <Link to="/booking" className="nav-link">
              Back
            </Link>
          </li>

          <li className="nav-item">
            <Link to="#" className="nav-link">
              Welcome {win}
            </Link>
          </li>
        </ul>
      </nav>
      <Grid container spacing={2}>
        <Package name="Silver" defaultAmount={3000} squareFeet={[500, 2000]} />
        <Package name="Gold" defaultAmount={5000} squareFeet={[500, 3000]} />
        <Package
          name="Platinum"
          defaultAmount={10000}
          squareFeet={[500, 4000]}
        />
      </Grid>
    </>
  );
};

export default Estimate;
