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
    genre: [],
    duration:"",
    releasedate:""
  });
 

 const time= movie.duration.split(":")
 let hour = time[0];
 let minute = time[1]
 


  if(hour.slice(0,1) == 0 ){
    hour = hour.slice(1,);
  }else{
    hour = hour
  }
  console.log( hour +" hours " +  minute + " minute")

  

 

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
    <div  className='viewmovie_container'>
      <NavBar />
      
      <div className='viewmovie_videotag_box'>
        <video style={{width:"100%", height:"100%"}} controls src={movie.url}></video>
      </div>

      <div className='viewmovie_videodetail_box'>
        <div className='viewmovie_left'>
          <img width={"100%"} height={"100%"} src={movie.image} alt={movie.name} />
        </div>

        <div className='viewmovie_middle'>
          <div style={{marginTop:"10px", fontSize:"20px", fontFamily:"cursive", fontWeight:"bold"}}>{movie.name}</div>

          <div>{movie.description}</div>
        </div>

        <div className='viewmovie_right'>
          <div style={{marginTop:"10px"}}><span style={{fontSize:"17px",fontWeight:"bold"}}>Duration:</span> 
          {hour} hour {minute} minutes</div>


          <div><span style={{fontSize:"17px",fontWeight:"bold"}} >Genre:</span> 
          {movie.genre.map((g, index) => <li key={index}>{g}</li>)}</div>

          <div><span style={{fontSize:"17px",fontWeight:"bold"}}>Release:</span>
          {movie.releasedate}</div>
        </div>
      </div>
    </div>
  );
};

export default Movie;
