import React from "react";
import { Link } from "react-router-dom";
import "./Adminnavbar.css";
import { FaUserCircle } from "react-icons/fa";

const Adminnavbar = () => {
  return (
    <div className="adminnavbar_container">
      <Link
        to="/admin"
        style={{ color: "black", textDecoration: "none" }}
      >
        <div
          style={{
            border: "2px solid white",
            borderRadius: "10px",
            backgroundColor: "#cec0f5",
            padding: "5px 20px  ",
          }}
        >
          Dashboard
        </div>
      </Link>
      <Link
        to="/admin/managemovie"
        style={{ color: "black", textDecoration: "none" }}
      >
        <div
          style={{
            border: "2px solid white",
            borderRadius: "10px",
            backgroundColor: "#cec0f5",
            padding: "5px 20px  ",
          }}
        >
          Manage movies
        </div>
      </Link>

      <div>
        <FaUserCircle size={30} color="white" />
      </div>
    </div>
  );
};

export default Adminnavbar;
