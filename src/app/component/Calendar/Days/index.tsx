import React from 'react';
import Swiper from '../../Swiper';
import SwiperItem from '../../Swiper/SwiperItem';
import { DaysStyled } from '../../../styled-components/Booking';
import moment from 'moment';

const Days: React.FC<{
  amountSlides: number;
  getDay: (day: string) => void;
  slideProps?: {
    count: number;
  };
}> = ({ amountSlides, getDay, slideProps }) => {
  const day = moment().clone().locale('ru');
  const calendar = [...Array(amountSlides)].map(() => {
    const midObj = {
      dayName: day.format('dddd'),
      dayInNumber: day.format('L'),
      day: day.format('YYYY-MM-DD'),
      time: '00:00',
    };
    day.add(1, 'day');
    return midObj;
  });

  const getCurrentDay = (index: number) => {
    getDay(calendar[index].day);
  };

  return (
    <DaysStyled>
      <Swiper
        amountSlides={calendar.length}
        getSlideIndex={getCurrentDay}
        slideProps={slideProps}
      >
        {calendar.map((item) => (
          <SwiperItem key={item.dayInNumber} {...item} />
        ))}
      </Swiper>
    </DaysStyled>
  );
};

export default Days;
