import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import NavBar from '../../components/NavBar';
import "./Movie.css";

const Movie = () => {
  const { id } = useParams();

  const [movie, setMovie] = useState({
    id: "",
    name: "",
    description: "",
    url: "",
    image: "",
    genre: []
  });

  useEffect(() => {
    axios.get(`http://localhost/cinehub/movies/getmoviesbyId.php?id=${id}`)
      .then((res) => {
        console.log(res.data.message);
        const movieData = res.data.message;
        // Parse genre if it is a valid JSON string
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

  return (
    <div className='viewmovie_container'>
      <NavBar />
      
      <div className='viewmovie_videotag_box'>
        <video style={{width:"100%", height:"100%"}} controls src={movie.url}></video>
      </div>

      <div className='viewmovie_videodetail_box'>
        <div className='viewmovie_left'>
          <img width={"100%"} height={"100%"} src={movie.image} alt={movie.name} />
        </div>
        <div className='viewmovie_middle'>
          <div style={{marginTop:"10px", fontFamily:"cursive"}}>{movie.name}</div>
          <div>Description: {movie.description}</div>
        </div>
        <div className='viewmovie_right'>
          <div style={{marginTop:"10px"}}>Duration:</div>
          <div>Genre: {movie.genre.map((g, index) => <li key={index}>{g}</li>)}</div>
          <div>Release</div>
        </div>
      </div>
    </div>
  );
};

export default Movie;
