import React, { useState } from "react";
import "../styles.css";
import ReorderIcon from "@material-ui/icons/Reorder";
import SearchIcon from "@material-ui/icons/Search";

export function ResponsiveNavbar() {
  const [showLinks, setShowLinks] = useState(false);
  // const [fixedNav, setFixedNav] = useState(false);

  return (
    <div className="navbar">
      <div className="leftSide">
        <div className="links" id={showLinks ? "hidden" : ""}>
          <a href="/home">Home</a>
          <a href="/products">Products</a>
          <a href="/aboutUs">About Us</a>
          <a href="/contactUs">Contact</a>
        </div>
        <button onClick={() => setShowLinks(!showLinks)}>
          <ReorderIcon />
        </button>
      </div>
      <div className="rightSide">
        <input type="text" placeholder="search items" />
        <button>
          <SearchIcon />
        </button>
      </div>
    </div>
  );
}
