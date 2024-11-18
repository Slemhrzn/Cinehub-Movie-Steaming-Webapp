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
            border: "2px solid black",
            borderRadius: "10px",
            backgroundColor: "var(--mainbuttoncolor)",
            padding: "5px 20px  ",
            color:"whitesmoke",
            boxShadow: "rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px"
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
            border: "2px solid black",
            boxShadow: "rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px",
            borderRadius: "10px",
            backgroundColor: "var(--mainbuttoncolor)",
            padding: "5px 20px  ",
            color:"whitesmoke"
          }}
        >
          Manage movies
        </div>
      </Link>

      <div style={{ cursor: "pointer",filter: "drop-shadow(5px 5px 10px #555)" }} onClick={handleLogout}>
        <FaUserCircle size={30} color="black" />
      </div>
    </div>
  );
};

export default Adminnavbar;
