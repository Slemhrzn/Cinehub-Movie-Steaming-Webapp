import React from "react";

const Carousel = ({ movie }) => {
  return (
    <div className="carousel_box">
      <div id="carouselExampleIndicators" className="carousel slide">
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
        </div>
        <div className="carousel-inner" style={{ height: "22rem" }}>
          {movie.map((movie, i) => (
            <div
              key={i}
              className="carousel-item active"
              style={{ width: "100%", height: "100%" }}
            >
              <div
                style={{
                  position: "absolute",
                  bottom: "3rem",
                  color: "black",
                  zIndex: "50",
                  border: "1px",
                  backgroundColor:"rgba(255, 255, 255, 0.5)",
                  width:"70%",
                  left:"10rem",
                  borderRadius:"10px",
                  padding:"20px",
                  fontFamily:"cursive"
                }}
              >
                <div
                  style={{
                    fontSize: "22px",
                    fontWeight: "bold",
                   

                  }}
                >
                  {movie.name}
                </div>
                <div>{movie.description}</div>
                <div></div>
              </div>
              <img
                src={movie?.image}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  opacity: "90%",
                }}
                className="d-block w-100"
                alt="..."
              />
            </div>
          ))}
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
};

export default Carousel;
