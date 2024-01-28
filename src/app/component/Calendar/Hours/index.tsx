import Swiper from '../../Swiper';
import SwiperItem from '../../Swiper/SwiperItem';
import React from 'react';
import { observer } from 'mobx-react-lite';
import { HoursStyled } from '../../../styled-components/Booking';

const Hours: React.FC<{ getTime: (time: string) => void }> = ({ getTime }) => {
  const times = [
    {
      time: '12:00',
    },
    {
      time: '13:00',
    },
    {
      time: '14:00',
    },
    {
      time: '15:00',
    },
    {
      time: '16:00',
    },
    {
      time: '17:00',
    },
    {
      time: '18:00',
    },
    {
      time: '19:00',
    },
    {
      time: '20:00',
    },
    {
      time: '21:00',
    },
    {
      time: '22:00',
    },
    {
      time: '23:00',
    },
  ];
  const getCurrentTime = (index: number) => {
    getTime(times[index].time);
  };
  return (
    <HoursStyled>
      <Swiper amountSlides={times.length} getSlideIndex={getCurrentTime}>
        {times.map((item) => (
          <SwiperItem key={item.time} {...item} />
        ))}
      </Swiper>
    </HoursStyled>
  );
};

export default observer(Hours);
