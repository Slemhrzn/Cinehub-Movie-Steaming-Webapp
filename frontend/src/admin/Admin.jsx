import React, { useEffect, useState } from "react";
import Adminnavbar from "../components/Adminnavbar";
import { IoLogOut } from "react-icons/io5";
import { MdManageAccounts } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { BiSolidDashboard } from "react-icons/bi";

import "./Admin.css";
import axios from "axios";
const Admindashboard = () => {
  const navigate = useNavigate();

  const [movies, setMovies] = useState([]);

  let value = localStorage.getItem("user");
  //    console.log(value);
  let jValue = JSON.parse(value);
  //    console.log(jValue);

  useEffect(() => {
    axios.get("http://localhost/cinehub/movies/getmovies.php").then((res) => {
      // console.log(res);
      setMovies(res.data);
    });
  }, []);
  // console.log(movies);

  function handleLogout() {
    let userResponse = confirm("Do you want to log out?");
    if (userResponse) {
      localStorage.removeItem("user");
      navigate("/");
    } else {
      alert("Logout cancelled.");
    }
  }

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
            <h1 style={{ fontFamily: "cursive", color: "black" }}>
              Welcome , {jValue.name} !
            </h1>
          </div>
        </header>
        <section className="movies">
          <h2>Available Movies</h2>
          <div className="movies-grid">
            {movies.map((movies) => {
              return (
                <Link
                  style={{ textDecoration: "none" }}
                  to={"/viewmovie/" + movies.id}
                >
                  <div className="movie-card">
                    <img
                      width="300px"
                      height="150px"
                      style={{ objectFit: "cover" }}
                      src={movies.image}
                      alt="Movie Title"
                    />
                    <h5 style={{ color: "black", fontFamily: "cursive" }}>
                      {movies.name}
                    </h5>
                    <p style={{ color: "black", fontFamily: "cursive" }}>
                      {JSON.parse(movies.genre).map((i) => {
                        return <li>{i}</li>;
                      })}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Admindashboard;
