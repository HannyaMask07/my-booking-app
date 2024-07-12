import styled from "styled-components";
import Wrapper from "../assets/wrappers/LandingPage";
import main from "../assets/images/main.svg";
import { Link } from "react-router-dom";
import { Logo } from "../components";

const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className="container page">
        <div className="info">
          <h1>
            Desk <span>Booking</span> App
          </h1>
          <p>
            The BookIn application is a revolutionary platform designed to
            streamline the process of booking appointments and reservations
            across various services. Whether you are scheduling a doctor's
            appointment, reserving a table at your favorite restaurant, or
            booking a spa session, BookIn provides a user-friendly interface
            that simplifies these tasks. The app integrates seamlessly with
            service providers' calendars, ensuring real-time availability...
          </p>
          <Link to="/register" className="btn register-link">
            Register
          </Link>
          <Link to="/login" className="btn ">
            Login / Demo User
          </Link>
        </div>
        <img src={main} alt="office img" className="img main-img"></img>
      </div>
    </Wrapper>
  );
};

export default Landing;
