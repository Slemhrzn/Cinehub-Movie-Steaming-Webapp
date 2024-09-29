import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const CarouselShow = ({ movie }) => {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 1,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <Carousel responsive={responsive}>
      {movie.slice(0,5).map((movie, i) => (
        <div
          key={i}
          className="carousel-item active"
          style={{ width: "100%", height: "60vh" }} // Set container height to 60vh
        >
          <div
            style={{
              position: "absolute",
              bottom: "2rem", // Adjust positioning as needed
              color: "black",
              zIndex: "50",
              border: "1px",
              backgroundColor: "rgba(255, 255, 255, 0.5)",
              width: "60%", // Adjust the width of the content box
              left: "2rem", // Adjust positioning of content box
              borderRadius: "10px",
              padding: "15px", // Adjust padding for better fit
              fontFamily: "var(--mainfont)",
              fontWeight:"bold"
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
          </div>
          <img
            src={movie?.image}
            style={{
              width: "100%", // Full width
              height: "60vh", // Set image height to 60% of viewport height
              objectFit: "contain", // Ensure the image fits within the box without stretching
              opacity: "90%",
            }}
            className="d-block w-100"
            alt="..."
          />
        </div>
      ))}
    </Carousel>
  );
};

export default CarouselShow;
