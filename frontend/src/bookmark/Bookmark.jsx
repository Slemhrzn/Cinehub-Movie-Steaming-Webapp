import React, { useEffect, useState } from "react";
import "./Bookmark.css";
import NavBar from "../components/NavBar";
import axios from "axios";
import { Link } from "react-router-dom";

const Bookmark = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [movie, setMoive] = useState([]);
  useEffect(() => {
    axios
      .get(
        "http://localhost/cinehub/user/getBookmarkByUserID.php?id=" + user?.id
      )
      .then((res) => {
        console.log(res.data.message);
        setMoive(res.data.message);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <>
      <div className="bookmark_container">
        <div className="bookmark_box">
          <NavBar />
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-evenly",
            }}
          >
            {movie.length > 0 ? (
              movie?.map((m) => (
                <div className="card" key={m?.movie_id}>
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
                        backgroundColor: "#5B7DA6",
                      }}
                    >
                      <span
                        style={{
                          color: "black",
                        }}
                      >
                        {m?.name}
                        <div style={{ width: "100%", height: "100%" }}>
                          <Link to={"/viewmovie/" + m?.movie_id}>
                            <button
                              style={{
                                borderRadius: "20px",
                                border: "2px solid white",
                                padding: "2px 4px 2px;",
                                fontFamily: "var(--mainfont)",
                                fontWeight: "bold",
                                padding: "6px",
                                background: "var(--mainbuttoncolor)",
                                color: "whitesmoke",

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
              <div
                style={{
                  width: "100%",
                  height: "60vh",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  color: "whitesmoke",
                  fontWeight: "bold",
                  fontFamily:"var(--mainfont)",
                  fontSize:"25px"
                  
                }}
              >
                No Bookmarks !!
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Bookmark;
