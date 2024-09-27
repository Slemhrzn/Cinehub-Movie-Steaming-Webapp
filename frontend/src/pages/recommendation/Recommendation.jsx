import React, { useEffect, useState } from "react";
import NavBar from "../../components/NavBar";
import { Link } from "react-router-dom";
import axios from "axios";

const Recommendation = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user);

  const [movies, setMovies] = useState([]);

  console.log(movies);

  useEffect(() => {
    axios
      .get(`http://localhost/CINEHUB/algorithm.php?user_id=${user.id}`)
      .then((res) => {
        console.log(res.data.recommendations ?? []);
        setMovies(res.data.recommendations ?? [])
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="viewmovie_container">
      <NavBar />
      <div
        style={{
          fontFamily: "cursive",
          fontSize: "3em",
          background: "linear-gradient(to bottom right, #B76E79, #5D3FD3)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          color: "transparent",
          fontSize:"40px"
        }}
      >
        Recommended Movies based on Rating !!
      </div>
      <div
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-evenly",
        }}
      >
        {movies?.length > 0 ? (
          movies.map((m, i) => (
            <div key={i} className="card">
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
                    src={m?.image}
                    alt={m?.name}
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
                    {m.name}
                    <div style={{ width: "100%", height: "100%" }}>
                      <Link to={"/viewmovie/" + m.id}>
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
          <div style={
            {fontFamily: "cursive",
            fontSize: "3em",
            background: "linear-gradient(to bottom right, #B76E79, #5D3FD3)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            color: "transparent",
            fontSize:"40px"}
        }
        >No movies Recommended!!</div>
        )}
      </div>
    </div>
  );
};

export default Recommendation;
