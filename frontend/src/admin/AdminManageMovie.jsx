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
    axios
      .delete(`http://localhost/cinehub/movies/deletemovie.php?id=${id}`)
      .then((response) => {
        // setMovies(movies.filter());
        setReload(reload + 1);
      })
      .catch((error) => {
        console.error("There was an error deleting the movie!", error);
      });
  };

  return (
    <div className="admin_container">
      <Adminnavbar />

<div > <Link to={"/admin/addmovies"}><button className="addmovies-button" >Add</button></Link></div>
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
        {movies.map((movie,i) => (
              <tr key={movie.id}>
                <td>{i+1}</td>
                <td>{movie.name}</td>
                <td>
                  {JSON.parse(movie.genre).map((genre) => (
                    <span style={{ marginRight: "10px" }}>| {genre} |</span>
                  ))}
                </td>
                <td style={{
                  display:"flex",
                  gap:"1rem",
                  alignItems:"center"
                }}>
                  <div><FaEdit size={20} /></div>
                  <div onClick={() => handleDelete(movie.id)}><MdDeleteForever  size={25}/></div>
                </td>
              </tr>
            ))}
        </tbody>
    </table>

      </div>
  );
};

export default AdminManageMovie;
