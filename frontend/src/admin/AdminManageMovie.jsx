import React, { useEffect, useState } from "react";
import "./AdminManageMovie.css";
import axios from "axios";
import { Link } from "react-router-dom";
import Adminnavbar from "../components/Adminnavbar";

const AdminManageMovie = () => {
  const [movies, setMovies] = useState([]);

const[reload,setReload]=useState(1)

  useEffect(() => {
    axios
      .get("http://localhost/cinehub/movies/getmovies.php")
      .then((response) => {
        setMovies(response.data);
      });
  }, [reload]);
  
    console.log(reload)

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost/cinehub/movies/deletemovie.php?id=${id}`)
      .then((response) => {
        // setMovies(movies.filter());
        setReload(reload + 1)  
      })
      .catch((error) => {
        console.error("There was an error deleting the movie!", error);
      });
  };

  return (
    <div className="admin_container">
      <Adminnavbar/>
      
      <div className="adminaddmovie">
          <Link to="/admin/addmovies">
            <button
              style={{
                border: "2px solid white",
                padding: "5px",
                borderRadius: "10px",
                width: "70px",
                fontFamily:"cursive",
                backgroundColor:"#cec0f5"
                

              }}
            >
              Add
            </button>
          </Link>
        </div>

      <table className="table" style={{ height:"80%", width:"70%", marginTop:"7rem", backgroundColor:"whitesmoke" }}>
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
  );
};

export default AdminManageMovie;
