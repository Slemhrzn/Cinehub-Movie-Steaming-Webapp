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
          fontFamily: "var(--mainfont)",
          fontSize: "25px",
          fontWeight:"bold",
          color: "black",
          backgroundClip: "text",
         
        }}
      >
        Recommended Movies Based On Rating !!
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
                    backgroundColor: "#5B7DA6",
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
                    backgroundColor: " #5B7DA6",
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
            {fontFamily: "var(--mainfont)",
            fontSize: "25px",
            fontWeight:"bold",
            backgroundClip: "text",
            color: "black",
            }
        }
        >No Movies Recommended!!</div>
        )}
      </div>
    </div>
  );
};

export default Recommendation;
