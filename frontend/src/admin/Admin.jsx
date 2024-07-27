import React, { useEffect, useState } from "react";
import "./Admin.css";
import axios from "axios";
import { Link } from "react-router-dom";

const Admin = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost/cinehub/movies/getmovies.php")
      .then((response) => {
        setMovies(response.data);
      });
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost/cinehub/movies/deletemovie.php?id=${id}`)
      .then((response) => {
        setMovies(movies.filter())
      })
      .catch((error) => {
        console.error("There was an error deleting the movie!", error);
      });
  };

  return (
    <div className="admin_container">
      <div className="left_box">
        <div className="top_left">
          <div
            style={{
              border: "2px solid black",
              padding: "20px",
              borderRadius: "10px",
            }}
          >
            Dashboard
          </div>

          <div
            style={{
              border: "2px solid black",
              padding: "20px",
              borderRadius: "10px",
              marginTop: "3rem",
            }}
          >
            Manage Movies
          </div>

          <div
            style={{
              border: "2px solid black",
              padding: "20px",
              borderRadius: "10px",
              marginTop: "1rem",
            }}
          >
            Manage Genre
          </div>

          <div
            style={{
              border: "2px solid black",
              padding: "20px",
              borderRadius: "10px",
              marginTop: "1rem",
            }}
          >
            Manage Cast
          </div>
        </div>

        <div className="bottom_left">
          <div
            style={{
              border: "2px solid black",
              padding: "5px",
              borderRadius: "20px",
              marginBottom: "1rem",
            }}
          >
            Logout
          </div>
        </div>
      </div>

      <div className="right_box">
        <div className="rightcenter_box">
          <div style={{ position: "absolute", right: 0, top: "-3rem" }}>
            <Link to="/admin/addmovies">
              <button
                style={{
                  border: "2px solid black",
                  padding: "5px",
                  borderRadius: "10px",
                  width: "55px",
                }}
              >
                Add
              </button>
            </Link>
          </div>

          <table className="table" style={{ borderRadius: "70px" }}>
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Genre</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {movies.map((movie) => (
                <tr key={movie.id}>
                  <td>{movie.id}</td>
                  <td>{movie.name}</td>
                  <td>{movie.genre}</td>
                  <td>
                    <button>edit</button>
                    <button onClick={() => handleDelete(movie.id)}>delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Admin;
