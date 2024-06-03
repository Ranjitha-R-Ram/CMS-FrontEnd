import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import BookingService from "../ServiceLayer/BookingService";
import jsPDF from "jspdf";
import { saveAs } from "file-saver";
import { FiMenu, FiX } from "react-icons/fi";
const BookingForm = () => {
  const win = sessionStorage.getItem("customerName");
  const { customerId } = useParams();
  console.log("Customer ID:", customerId);
  const [booking, setBooking] = useState({
    rawMaterials: {},
    customer: {},
  });

  useEffect(() => {
    const fetchBooking = async () => {
      const response = await BookingService.GetBookingByCustomerId(customerId);
      setBooking(response.data);
    };
    fetchBooking();
  }, [customerId]);

  const handleDownload = () => {
    // Create a new jsPDF document
    const doc = new jsPDF();

    // Set the document properties
    doc.setProperties({
      title: "CMS Construction",
      subject: "Quotation Details",
      author: "Your Name",
      keywords: "Quotation, PDF, Details",
      creator: "Your Name",
    });

    // Add some content to the PDF

    doc.text("Customer ID: " + customerId, 20, 20);
    doc.text("Project Type: " + booking.projectType, 20, 40);
    doc.text("Room Size: " + booking.roomSize, 20, 50);
    doc.text("Parking: " + booking.parking, 20, 60);
    doc.text("Kitchen: " + booking.kitchen, 20, 70);
    doc.text("Store Room: " + booking.storeRoom, 20, 80);
    doc.text("Interior Design: " + booking.interiorDesign, 20, 90);
    doc.text("Swimming Pool: " + booking.swimmingPool, 20, 100);
    doc.text("Square Feet: " + booking.squareFeet, 20, 110);
    doc.text("Package Type: " + booking.packageType, 20, 120);
    doc.text("totalCost: " + booking.totalCost, 20, 130);

    // Save the PDF as a Blob
    const pdfBlob = doc.output("blob");

    // Download the PDF using FileSaver.js
    saveAs(pdfBlob, "Quotation.pdf");
  };

  return (
    <>
    <nav className="navbar">
      <i class="bi bi-buildings-fill">
        <Link to="/" className="nav-logo">
          CMS
        </Link>
      </i>
      {/* <div className="nav-icon">
        {open ? <FiX /> : <FiMenu />}
      </div> */}
      <ul className={ "nav-links active,nav-links"}>
        <li className="nav-item">
          <Link to="/" className="nav-link">
           Back
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/packages" className="nav-link">
            Welcome {win}
          </Link>
        </li>
      </ul>
    </nav>
    <div
      style={{
        border: "2px solid grey",
        padding: "20px",
        width: "40%",
        margin: "0 auto",
        marginTop: "5vh",
      }}>
      <center>
        <h1>
          <b>CMS CONSTRUCTION</b>
        </h1>
        <h2 style={{ alignContent: "center", marginTop: "5vh" }}>
          Quotation Details
        </h2>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignContent: "center",
            flexWrap: "wrap",
            marginTop: "5vh",
            textAlign: "justify",
            justifyContent: "initial",
            marginLeft: "20vh",
          }}>
          <div style={{ width: "45%", alignContent: "center" }}>
            <p style={{ marginBottom: "10px" }}>
              <strong>Customer ID:</strong> {customerId}
            </p>
            <p style={{ marginBottom: "10px" }}>
              <strong>Project Type:</strong> {booking.projectType}
            </p>
            <p style={{ marginBottom: "10px" }}>
              <strong>Bed Rooms:</strong> {booking.roomSize}
            </p>
            {/* </div>
          <div style={{ width: "45%" }}> */}
            <p style={{ marginBottom: "10px" }}>
              <strong>Parking:</strong> {booking.parking}
            </p>
            <p style={{ marginBottom: "10px" }}>
              <strong>Kitchen:</strong> {booking.kitchen}
            </p>
            <p style={{ marginBottom: "10px" }}>
              <strong>Store Room:</strong> {booking.storeRoom}
            </p>
            <p style={{ marginBottom: "10px" }}>
              <strong>Interior Design:</strong> {booking.interiorDesign}
            </p>
            <p style={{ marginBottom: "10px" }}></p>
            <p style={{ marginBottom: "10px" }}>
              <strong>Swimming Pool:</strong> {booking.swimmingPool}
            </p>
            <p style={{ marginBottom: "10px" }}>
              <strong>Square Feet:</strong> {booking.squareFeet}
            </p>
            <p style={{ marginBottom: "10px" }}>
              <strong>Package Type:</strong> {booking.packageType}
            </p>
            <p style={{ marginBottom: "10px" }}>
              <strong>Total Cost:</strong> {booking.totalCost}
            </p>
          </div>
        </div>
        <button
          color="success"
          onClick={handleDownload}
          style={{
            marginTop: "20px",
            padding: "10px 20px",
            borderRadius: "5px",
            border: "none",
            cursor: "pointer",
            backgroundColor:"lightgray"
          }}>
          Download pdf
        </button>
      </center>
    </div>
    </>
  );
};

export default BookingForm;
