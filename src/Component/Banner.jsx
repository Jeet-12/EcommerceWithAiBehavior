import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
// import ExampleCarouselImage from 'components/ExampleCarouselImage';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
// import { Carousel } from 'react-responsive-carousel';
import slide3 from '../Assets/images/360_F_320461388_5Snqf6f2tRIqiWla.jpg';
import slide2 from '../Assets/images/paper-art-shopping-online-on-sma.jpg';
import slide1 from '../Assets/images/shopping-time-banner-with-realistic-map-cart-gift-bags-vector-illustration_548887-120.avif';

const Banner = () => {
  const imageStyle = {
    height: '300px', // specify your desired height here
    width: '100%', // set width to 100% for responsive images
    objectFit:'cover', // this ensures the image covers the container without stretching
  };
  return (
    <>
    <div className="car-banner" >
      <Carousel slide={false} >
      <Carousel.Item >
        {/* <ExampleCarouselImage text="First slide" /> */}
        <img src={slide1} style={imageStyle} />
       
      </Carousel.Item>
      <Carousel.Item >
        {/* <ExampleCarouselImage text="Second slide" /> */}
        <img src={slide2} style={imageStyle}/>
       </Carousel.Item>
      <Carousel.Item>
        {/* <ExampleCarouselImage text="Third slide" /> */}
        <img src={slide3} style={imageStyle}/>
       
      </Carousel.Item>
    </Carousel>
</div>
    </>
  )
}

export default Banner