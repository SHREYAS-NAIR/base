import React from "react";
import "./Advertisements.css";
import Slider from "react-slick";

function Advertisements() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: false,
  };
  return (
    <div className="Advertisement">
      <Slider {...settings}>
        <div>
          <img
            src="https://raw.githubusercontent.com/SHREYAS-NAIR/base/main/src/pics/AD1.jpg"
            alt="Advertisement 1"
          />
        </div>
        <div>
          <img
            src="https://raw.githubusercontent.com/SHREYAS-NAIR/base/main/src/pics/a2.jpg"
            alt="Advertisement 2"
          />
        </div>
        <div>
          <img
            src="https://raw.githubusercontent.com/SHREYAS-NAIR/base/main/src/pics/3.jpg"
            alt="Advertisement 3"
          />
        </div>
        <div>
          <img
            src="https://raw.githubusercontent.com/SHREYAS-NAIR/base/main/src/pics/4.jpg"
            alt="Advertisement 4"
          />
        </div>
      </Slider>
    </div>
  );
}

export default Advertisements;
