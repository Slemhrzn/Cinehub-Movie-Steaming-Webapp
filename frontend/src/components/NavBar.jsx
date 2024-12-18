import React, { useEffect, useState } from "react";
import "./NavBar.css";
import { FaUserCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const NavBar = ({ searchedMovies }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState(""); // State to store search term

  const user=JSON.parse(localStorage.getItem("user"));
  console.log(user);

  useEffect(()=>{
    if(!user){
      navigate("/")
      return
    }
  },[])
  function handleLogout() {
    let result = confirm("Do you want to log-out?");
    if (result == true) {
      navigate("/");
      localStorage.removeItem("user");
    } else {
      return;
    }
  }

  const handleSearch = (e) => {
    const searchValue = e.target.value;

    searchedMovies(searchValue); // Call the function if passed via props
  };

  return (
    <div className="navbar_container">
      {/* search */}{" "}
      <div className="group">
        <svg className="icon" aria-hidden="true" viewBox="0 0 24 24">
          <g>
            <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
          </g>
        </svg>
        <input
          placeholder="Search"
          onChange={(e) => handleSearch(e)}
          type="search"
          className="input"
        />
      </div>
      <Link to="/homepage" style={{ color: "whitesmoke", textDecoration: "none" }}>
        <div
          style={{
            border: "2px solid white",
            borderRadius: "10px",
            backgroundColor: "var(--mainbuttoncolor)",
            padding: "5px 20px  ",
          }}
        >
          Home
        </div>
      </Link>
      {
        <div
          style={{
            border: "2px solid white",
            borderRadius: "10px",
            backgroundColor: "var(--mainbuttoncolor)",
            padding: "5px 20px  ",
          }}
        >
          <Link to="/bookmark"  style={{ color: "whitesmoke", textDecoration: "none" }}>My bookmarks</Link>
        </div>
      }
      <div onClick={handleLogout}>
        <FaUserCircle size={30} color="white"/><span style={{color:"whitesmoke",marginLeft:"10px"}}>{user?.name}</span>
      </div>
    </div>
  );
};

export default NavBar;
