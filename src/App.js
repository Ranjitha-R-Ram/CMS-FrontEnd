import "./App.css";
import { Route, Routes } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import ResponsiveGrid from "./components/ResponsiveGrid";
import Registration from "./common/Registration";
import HomePage from "./common/HomePage";
import SignUp from "./Registration/SignUp";
import Booking from "./components/Booking";
import BuilderLandingPage from "./Builder/BuilderLandingPage";
import SignIn from "./Registration/SignIn";
import AddRawMaterial from "./Builder/AddRawMaterial";
import AllRawMaterial from "./Builder/RawMaterial/AllRawMaterial";
import AllBookingDetails from "./Builder/BookingPage/AllBookingDetails";
import Packages from "./components/Packages";
import AllProjectDetails from "./Builder/ProjectDetails/AllProjectDetails";
import AddProjectDetails from "./Builder/ProjectDetails/AddProjectDetails";
import CheckBooking from "./components/CheckBooking";
import UpdateProject from "./Builder/ProjectDetails/UpdateProject";
import Estimate from "./components/Estimate";
import ProjectDetails from "./components/ProjectDetails";
import PaymentForm from "./components/PaymentForm";
import BookingForm from "./components/BookingForm";
import AdvancePayment from "./components/AdvancePayment";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/grid" element={<ResponsiveGrid />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/landing-page" element={<BuilderLandingPage />} />
          <Route path="/material" element={<AddRawMaterial />} />
          <Route path="/allmaterial" element={<AllRawMaterial />} />
          <Route path="/allbooking" element={<AllBookingDetails />} />
          <Route path="/packages" element={<Packages />} />
          <Route path="/allproject" element={<AllProjectDetails />} />
          <Route path="/addproject" element={<AddProjectDetails />} />
          <Route path="/bookingstatus" element={<CheckBooking />} />
          <Route path="/updateproject/:projectId" element={<UpdateProject />} />
          <Route path="/estimate" element={<Estimate />} />
          <Route path="/project" element={<ProjectDetails />} />
          <Route path="/payment" element={<PaymentForm />} />
          <Route path="/advancepayment" element={<AdvancePayment/>}/>
          <Route path="/bookingform/:customerId" element={<BookingForm />} />
         
        </Routes>
      </Router>
    </div>
  );
}

export default App;
