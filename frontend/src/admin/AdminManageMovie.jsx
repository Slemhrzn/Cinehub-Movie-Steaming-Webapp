import React, { useEffect, useState } from "react";
import "./AdminManageMovie.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import Adminnavbar from "../components/Adminnavbar";

const AdminManageMovie = () => {
  const [movies, setMovies] = useState([]);

  const [reload, setReload] = useState(1);

  useEffect(() => {
    axios
      .get("http://localhost/cinehub/movies/getmovies.php")
      .then((response) => {
        setMovies(response.data);
      });
  }, [reload]);
  console.log(reload);

  const handleDelete = (id) => {
    const res = confirm("Are you sure you want to delete?");
    if (res) {
      axios
        .delete(`http://localhost/cinehub/movies/deletemovie.php?id=${id}`)
        .then((response) => {
          // setMovies(movies.filter());
          setReload(reload + 1);
        })
        .catch((error) => {
          console.error("There was an error deleting the movie!", error);
        });
    } else {
      return;
    }
  };

  return (
    <div className="admin_container">
      <Adminnavbar />

      <div>
        {" "}
        <Link to={"/admin/addmovies"}>
          <button className="addmovies-button">Add</button>
        </Link>
      </div>
      <table class="addmovies-table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Genre</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {movies.map((movie, i) => (
            <tr key={movie.id}>
              <td>{i + 1}</td>
              <td>{movie.name}</td>
              <td>
                {Array.isArray(JSON.parse(movie.genre)) ? JSON.parse(movie.genre).map((genre) => (
                  <span style={{ marginRight: "10px" }}>| {genre} |</span>
                )):(JSON.parse(movie.genre)) }
              </td> 
              <td
                style={{
                  display: "flex",
                  gap: "1rem",
                  alignItems: "center",
                }}
              >
                <div>
                  <Link to={`/editMovie/${movie.id}`}>
                    <FaEdit size={20}  style={{color:"black"}}/>
                  </Link>
                </div>
                <div onClick={() => handleDelete(movie.id)}>
                  <MdDeleteForever size={25} style={{color:"black"}} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminManageMovie;
