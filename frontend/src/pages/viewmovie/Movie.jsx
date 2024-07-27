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
            <div className='viewmovie_image'></div>
        </div>
      
    </div>
  )
}

export default Movie
