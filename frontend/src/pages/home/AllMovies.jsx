// import React, { useEffect, useState } from "react";
// import "./AllMovies.css";
// import NavBar from "../../components/NavBar";
// import axios from "axios";

// import { Link, useNavigate } from "react-router-dom";
// const AllMovies = () => {
//   const navigate = useNavigate();

//   const [movies, setMovies] = useState([]);

//   let value = localStorage.getItem("user");
//   //    console.log(value);
//   let jValue = JSON.parse(value);
//   //    console.log(jValue);

//   useEffect(() => {
//     axios.get("http://localhost/cinehub/movies/getmovies.php").then((res) => {
//       // console.log(res);
//       setMovies(res.data);
//     });
//   }, []);

//   return (
//     <div className="allmovies_container">
//       <div className="allmovies_box">
//         <NavBar />
//       </div>


//       <div className="movie-card">
//         <img
//           width="300px"
//           height="150px"
//           style={{ objectFit: "cover" }}
//           src={movies.image}
//           alt="Movie Title"
//         />
//         <h5 style={{ color: "black", fontFamily: "cursive" }}>{movies.name}</h5>
//         <p style={{ color: "black", fontFamily: "cursive" }}>
//           {JSON.parse(movies.genre).map((i) => {
//             return <li>{i}</li>;
//           })}
//         </p>
//       </div>


//     </div>
//   );
// };

// export default AllMovies;
