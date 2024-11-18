import React, { useEffect, useState } from "react";
import Adminnavbar from "../components/Adminnavbar";
import { IoLogOut } from "react-icons/io5";
import { MdManageAccounts } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { BiSolidDashboard } from "react-icons/bi";
import axios from "axios";

import "./Admin.css";

const Admindashboard = () => {

  const user = localStorage.getItem("user");
  const navigate = useNavigate();
  if (!user) {
    navigate("/");
    
  }

  const [movies, setMovies] = useState([]);

  let jValue = user ? JSON.parse(user) : null;
 

  useEffect(() => {
    axios
      .get("http://localhost/cinehub/movies/getmovies.php")
      .then((res) => {
        setMovies(res.data);
      })
      .catch((err) => {
        console.error("Failed to fetch movies:", err);
      });
  }, [user, navigate]);

  const handleLogout = () => {
    const userResponse = confirm("Do you want to log out?");
    if (userResponse) {
      localStorage.removeItem("user");
      navigate("/");
    } else {
      alert("Logout cancelled.");
    }
  };

  return (
    <div className="admin_home_container">
      {/* <Adminnavbar/> */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <h2>Cinehub</h2>
        </div>
        <nav className="sidebar-nav">
          <Link to="/admin" className="active">
            Dashboard <BiSolidDashboard size={25} />
          </Link>
          <Link to="/admin/managemovie">
            Manage Movie <MdManageAccounts size={25} />
          </Link>
          <div style={{ cursor: "pointer" }} onClick={handleLogout}>
            Log out <IoLogOut size={25} />
          </div>
        </nav>
      </aside>
      <main className="main-content">
        <header className="header">
          <div className="header-title">
            <h1 style={{ fontFamily: "var(--mainfont)", color: "black" }}>
              Welcome, {jValue?.name}!
            </h1>
          </div>
        </header>
        <section className="movies">
          <h2>Available Movies</h2>
          <div className="movies-grid">
            {movies.map((movie) => (
              <Link
                key={movie.id}
                style={{ textDecoration: "none" }}
                to={`/viewmovie/${movie.id}`}
              >
                <div className="movie-card">
                  <img
                    width="300px"
                    height="150px"
                    style={{ objectFit: "cover" }}
                    src={movie.image}
                    alt={movie.name}
                  />
                  <h5
                    style={{
                      color: "whitesmoke",
                      fontWeight: "bold",
                      fontFamily: "var(--mainfont)",
                    }}
                  >
                    {movie.name}
                  </h5>
                  <p
                    style={{
                      color: "whitesmoke",
                      fontFamily: "var(--mainfont)",
                    }}
                  >
                    {Array.isArray(JSON.parse(movie.genre))
                      ? JSON.parse(movie.genre).map((genre, index) => (
                          <li key={index}>{genre}</li>
                        ))
                      : JSON.parse(movie.genre)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Admindashboard;
