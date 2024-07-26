import React, { useEffect, useState } from "react";
import "./Homepage.css";
import NavBar from "../../components/NavBar";
import Carousel from "../../components/Carousel";
import axios from "axios";

const Homepage = () => {
  const [movie, setMovie] = useState([
    {
      id: "",
      name: "",
      description: "",
      url: "",
      image: "",
    },
  ]); //for storing and  displaying data

  useEffect(() => {
    axios
      .get("http://localhost/cinehub/movies/getmovies.php")
      .then((response) => {
        console.log(response.data);
        setMovie(response.data);
      });
  }, []);

  return (
    <div className="homepage_container">
      <div className="homepage_box">
        <NavBar />
        <div>
          <Carousel />
        </div>

        <div>
          <button className="watch_button" type="submit">
            Watch
          </button>
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
          <span>You might like</span>
          <button
            style={{
              border: "2px solid black",
              borderRadius: "10px",
              width: "80px",
              background: "#69589e",
              color: "white",
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
          {movie.map((movie) => (
            <div class="card">
              <div class="card_background">
                <div
                  style={{
                    height: "170px",
                    width: "190px",
                    marginBottom: "5px",
                    backgroundColor: "#8568b9",
                  }}
                >
                  <img
                    style={{
                      objectFit: "contain",
                    }}
                    src={movie.image}
                  />
                </div>

                <div
                  style={{
                    height: "170px",
                    width: "190px",
                    backgroundColor: "skyblue",
                  }}
                >
                  <span
                    style={{
                      color: "black",
                    }}
                  >
                    {movie.name}
                    <button
                      style={{
                        borderRadius: "20px",
                        border: "2px solid white",
                        marginTop: "20px",
                        padding: "5px",
                       
                      }}
                    >
                      watch
                    </button>
                  </span>
                </div>
              </div>
              <div class="blob"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Homepage;
