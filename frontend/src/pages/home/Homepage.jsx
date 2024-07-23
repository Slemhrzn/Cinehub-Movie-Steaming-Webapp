import React from "react";
import "./Homepage.css";
import NavBar from "../../components/NavBar";
import Carousel from "../../components/Carousel";

const Homepage = () => {
  return (
    <div className="homepage_container">
      <div className="homepage_box">
        <NavBar />
        <div><Carousel/></div>
      </div>
    </div>
  );
};

export default Homepage;
