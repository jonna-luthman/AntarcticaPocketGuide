import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/swiper.css'

interface ContainerProps {
  onFinish: () => void;
}

const Intro01: React.FC <ContainerProps> = () => {
  return (
    <div>
      <Swiper>
        <SwiperSlide>1</SwiperSlide>
        <SwiperSlide>2</SwiperSlide>
        <SwiperSlide>3</SwiperSlide>
      </Swiper>
    </div>
  )
}

export default Intro01;