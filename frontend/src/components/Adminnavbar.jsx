import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Adminnavbar.css";
import { FaUserCircle } from "react-icons/fa";

const Adminnavbar = () => {
  const navigate = useNavigate();

  function handleLogout() {
    let userResponse = confirm("Do you want to log out?");
    if (userResponse) {
      localStorage.removeItem("user");
      navigate("/");
    } else {
      console.log("Logout cancelled.");
    }
  }

  return (
    <div className="adminnavbar_container">
      <Link to="/admin" style={{ color: "black", textDecoration: "none" }}>
        <div
          style={{
            border: "2px solid white",
            borderRadius: "10px",
            backgroundColor: "var(--mainbuttoncolor)",
            padding: "5px 20px  ",
            color:"whitesmoke"
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
            backgroundColor: "var(--mainbuttoncolor)",
            padding: "5px 20px  ",
            color:"whitesmoke"
          }}
        >
          Manage movies
        </div>
      </Link>

      <div style={{ cursor: "pointer" }} onClick={handleLogout}>
        <FaUserCircle size={30} color="white" />
      </div>
    </div>
  );
};

export default Adminnavbar;
