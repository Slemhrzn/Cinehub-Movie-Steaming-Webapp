import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import NavBar from "../../components/NavBar";
import "./Movie.css";
import { IoBookmarkOutline } from "react-icons/io5";
import { GoBookmarkFill } from "react-icons/go";
import { FaStar } from "react-icons/fa";

const Movie = () => {
  const { id } = useParams();

  const [movie, setMovie] = useState({
    id: "",
    name: "",
    description: "",
    url: "",
    image: "",
    genre: [],
    duration: "",
    releasedate: "",
  });

  const [isBookMarked, setIsBookMarked] = useState(false); // Initialize to false
  const user = JSON.parse(localStorage.getItem("user"));

  const [rating, setRating] = useState(1); // Initial rating

  useEffect(() => {
    axios
      .get(`http://localhost/cinehub/movies/getmoviesbyId.php?id=${id}`)
      .then((res) => {
        const movieData = res.data.message;
        if (movieData.genre) {
          try {
            movieData.genre = JSON.parse(movieData.genre);
          } catch (error) {
            console.error("Failed to parse genre:", error);
            movieData.genre = [];
          }
        }
        setMovie(movieData);
      })
      .catch((error) => {
        console.error("Error fetching movie data:", error);
      });
  }, [id]);

  useEffect(() => {
    if (movie.id) {
      const object = {
        movie_id: movie.id,
        user_id: user.id,
      };

      axios
        .post("http://localhost/cinehub/user/checkBookmark.php", object)
        .then((res) => {
          setIsBookMarked(res?.data?.isBookmark);
        })
        .catch((err) => console.log(err));
    }
  }, [movie.id, user.id]); // Only run when movie ID or user ID changes

  const handleBookMark = () => {
    const object = {
      movie_id: movie.id,
      user_id: user.id,
    };
    axios
      .post("http://localhost/cinehub/user/bookmark.php", object)
      .then((res) => {
        alert(res.data.message);
        setIsBookMarked(!isBookMarked); // Toggle the bookmark state
      })
      .catch((err) => console.log(err));
  };

  const time = movie.duration.split(":");
  let hour = time[0];
  let minute = time[1];

  if (hour.slice(0, 1) === "0") {
    hour = hour.slice(1);
  }

  const handleRating = (e) => {
    setRating(parseInt(e.target.value));
  };

  function handleSubmit(e) {
    e.preventDefault();
    const value = {
      rating: rating,
      movie_id: id,
      user_id: user?.id,
    };

    axios
      .post("http://localhost/CINEHUB/addRating.php", value)
      .then((res) => {
        console.log(res.data.message);
        alert(res.data.message);
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="viewmovie_container">
      <NavBar />

      <div className="viewmovie_videotag_box">
        <video
          style={{ width: "100%", height: "100%" }}
          controls
          src={movie.url}
        ></video>
      </div>

      <div className="viewmovie_videodetail_box">
        <div className="viewmovie_left">
          <img
            width={"100%"}
            height={"100%"}
            src={movie.image}
            alt={movie.name}
          />
        </div>

        <div
          className="viewmovie_middle"
          style={{ fontFamily: "var(--mainfont)", fontSize: "18px" }}
        >
          <div
            style={{
              marginTop: "10px",
              fontSize: "22px",
              fontFamily: "var(--mainfont)",
              fontWeight: "bold",
            }}
          >
            {movie.name}
          </div>

          <div>{movie.description}</div>
          <div>Rate Movie</div>
          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", gap: "10px" }}
          >
            <div>
              {Array.from({ length: rating }, (_, index) => (
                <FaStar key={index} />
              ))}
            </div>
            <select onChange={handleRating} value={rating}>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
            <button>Rate</button>
          </form>
        </div>

        <div
          className="viewmovie_right"
          style={{ fontFamily: "var(--mainfont)", fontSize: "18px" }}
        >
          <div style={{ marginTop: "10px" }}>
            <span style={{ fontSize: "17px", fontWeight: "bold" }}>
              Duration:
            </span>
            {hour} hour {minute} minutes
          </div>

          <div>
            <span style={{ fontSize: "17px", fontWeight: "bold" }}>Genre:</span>
            {Array.isArray(movie.genre) &&
              movie.genre.map((g, index) => <li key={index}>{g}</li>)}
          </div>

          <div>
            <span style={{ fontSize: "17px", fontWeight: "bold",marginRight:"5px" }}>
              Release:
            </span>
            {movie.releasedate}
          </div>

          {user.role === "ADMIN" ? (
            <div></div>
          ) : (
            <div onClick={handleBookMark}>
              {isBookMarked ? (
                <GoBookmarkFill size={25} />
              ) : (
                <IoBookmarkOutline size={25} />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Movie;
