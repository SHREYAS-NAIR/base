import React from 'react';
import Slider from "react-slick";
import './Chats.css'
import AD1 from '../pics/AD1.jpg'
import AD2 from '../pics/AD2.jpg'
import AD3 from '../pics/AD3.jpg'
import AD4 from '../pics/AD4.jpg'

function Chats() {
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: false
  };
  
  return (
    <div className='InsideChat'>
        <div className='Advertisement'>
            <Slider {...settings}>
                <div>
                    <img src="/AD1.jpg" alt="Advertisement 1"/>
                </div>
                <div>
                    <img src="https://raw.githubusercontent.com/SHREYAS-NAIR/Fraud-Detection/master/AD1.jpg" alt="Advertisement 2"/>
                </div>
                <div>
                    <img src="/AD3.jpg" alt="Advertisement 3"/>
                </div>
                <div>
                    <img src="/AD4.jpg" alt="Advertisement 4"/>
                </div>
            </Slider>
        </div>
    </div>
  )
}

export default Chats;
