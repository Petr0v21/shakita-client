import React from 'react';
import { ItemType } from '../../../../types';

export type Props = ItemType;

const SwiperItem: React.FC = (props: Props) => {
  if (!props.day) {
    return (
      <label className="swiper-content" draggable={false}>
        {props.time}
      </label>
    );
  }
  return (
    <div className="swiper-content">
      <h3>{props.dayName}</h3>
      <label>{props.dayInNumber}</label>
    </div>
  );
};

export default SwiperItem;
