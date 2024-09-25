import React, { useEffect, useState } from "react";
import "./Homepage.css";
import NavBar from "../../components/NavBar";
import CarouselShow from "../../components/Carousel";
import axios from "axios";
import { Link } from "react-router-dom";

const Homepage = () => {
  const [movie, setMovie] = useState([]); // for storing and displaying data
  const [searchedMovie, setSearchedMovie] = useState([]); // for storing searched movies

  const user = JSON.parse(localStorage.getItem("user"));
  // console.log(user);

  useEffect(() => {
    axios
      .get("http://localhost/cinehub/movies/getmovies.php")
      .then((response) => {
        setMovie(response?.data);
        setSearchedMovie(response?.data); // Initially set searchedMovie to the full movie list
      });
  }, []);

  const searchedMovies = (search) => {
    // console.log(search);
    // Convert both the movie name and the search term to lowercase for case-insensitive matching
    const filteredMovies = movie.filter((i) =>
      i.name.toLowerCase().includes(search.toLowerCase())
    );
    // console.log(filteredMovies);
    setSearchedMovie(filteredMovies); // Update the searchedMovie list based on the search
  };

  return (
    <div className="homepage_container">
      <div className="homepage_box">
        <NavBar searchedMovies={searchedMovies} />
        <div>
          <CarouselShow movie={searchedMovie} />
        </div>

        <div
          style={{
            marginTop: "30px",
            fontFamily: "cursive",
            color: "black",
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Link to={"/recommendation"} style={{ textDecoration: "none",color:"black" }}>
            <span
              style={{
                border: "2px solid white",
                borderRadius: "10px",
                backgroundColor: "#cec0f5",
                width: "120px",
                padding: "2px",
              }}
            >
              You might like
            </span>
          </Link>
          <button
            style={{
              border: "2px solid whitesmoke",
              borderRadius: "10px",
              width: "80px",
              backgroundColor: "#cec0f5",
              color: "black",
            }}
          >
            See all
          </button>
        </div>

        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-evenly",
            flexWrap: "wrap",
          }}
        >
          {searchedMovie.length > 0 ? (
            searchedMovie.map((movie) => (
              <div className="card" key={movie.id}>
                <div className="card_background">
                  <div
                    style={{
                      height: "170px",
                      width: "190px",
                      marginBottom: "5px",
                      backgroundColor: "rgb(200, 200, 239)",
                    }}
                  >
                    <img
                      width={"100%"}
                      height={"100%"}
                      style={{
                        objectFit: "contain",
                      }}
                      src={movie?.image}
                      alt={movie.name}
                    />
                  </div>

                  <div
                    style={{
                      height: "170px",
                      width: "190px",
                      backgroundColor: " #a0a5da",
                    }}
                  >
                    <span
                      style={{
                        color: "black",
                      }}
                    >
                      {movie.name}
                      <div style={{ width: "100%", height: "100%" }}>
                        <Link to={"/viewmovie/" + movie.id}>
                          <button
                            style={{
                              borderRadius: "20px",
                              border: "2px solid white",
                              padding: "5px",
                              fontFamily: "cursive",
                            }}
                          >
                            Watch
                          </button>
                        </Link>
                      </div>
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <span style={{ fontWeight: "bold", fontFamily: "cursive" }}>
              No Result Found !
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Homepage;
