import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel as ResponsiveCarousel } from 'react-responsive-carousel';

const CustomCarousel = () => {
  return (
    <ResponsiveCarousel>
      <div>
        <img src="./spiderman.jfif" alt="Slide 1"/>
        <p className="legend">Legend 1</p>
      </div>
      <div>
        <img src="assets/2.jpeg" alt="Slide 2"/>
        <p className="legend">Legend 2</p>
      </div>
      <div>
        <img src="assets/3.jpeg" alt="Slide 3"/>
        <p className="legend">Legend 3</p>
      </div>
    </ResponsiveCarousel>
  );
};

export default CustomCarousel;
