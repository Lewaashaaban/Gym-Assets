import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import "../styles/ReactCarousel.css";

const ReactCarousel = () => {
  return (
    <div className="carousel">
      <Carousel>
        <div className="carousel_innerDiv">
          <img src="https://www.fitalo.net/wp-content/uploads/2020/09/FITALO-WB-0001.jpg" />
        </div>
        <div className="carousel_innerDiv">
          <img src="https://www.acmefitness.com//assets/homebanner/Ue0HQaditya-multiply.jpg" />
        </div>

        <div className="carousel_innerDiv">
          <img src="https://www.fitalo.net/wp-content/uploads/2020/07/FITALO-WB-002.jpg" />
        </div>
        <div className="carousel_innerDiv">
          <img src="https://westwon.co.uk/wp-content/uploads/2018/02/iStock-597959750.jpg" />
        </div>
      </Carousel>
    </div>
  );
};

export default ReactCarousel;
