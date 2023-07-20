import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import React from 'react';
import Slider from 'react-slick';
import MediaCard from '../media/MediaCard';

export default function CarouselCard() {
  var settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: 'linear'
  };
  return (
    <Slider {...settings}>
      <MediaCard
        src={
          'https://images.squarespace-cdn.com/content/v1/5e7edd655234e75594647807/1591421691215-JIJX1LPVPJHHS5V14EQN/STEM+home+kits.jpg?format=1500w'
        }
      />
      <MediaCard
        src={
          'https://images.squarespace-cdn.com/content/v1/5e7edd655234e75594647807/ce28d1ab-38f8-4496-a484-082faffa4894/PXL_20220102_071724339.jpg?format=1500w'
        }
      />
      <MediaCard
        src={
          'https://images.squarespace-cdn.com/content/v1/5e7edd655234e75594647807/1593240830439-6BLGFYS8PH2LYC1B050Y/Yr+11+Science+Experience+201955.jpg?format=1500w'
        }
      />
    </Slider>
  );
}
