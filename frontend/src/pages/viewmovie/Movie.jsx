import React from 'react'
import "./Movie.css"
import NavBar from '../../components/NavBar'

const Movie = () => {
  return (
    <div className='viewmovie_container'>
        <NavBar/>

        <div className='viewmovie_videotag_box'>

        </div>

        <div className='viewmovie_videodetail_box'>
            <div className='viewmovie_left'></div>
            <div className='viewmovie_middle'>
              <div style={{marginTop:"10px",fontFamily:"cursive"}} >Movie name</div>
              <div>Description</div>
            </div>
            <div className='viewmovie_right'>
              <div style={{marginTop:"10px"}} >Duration:</div>
              <div>Genre</div>
              <dir>Release</dir>
            </div>
            <div></div>
        </div>
      
    </div>
  )
}

export default Movie
