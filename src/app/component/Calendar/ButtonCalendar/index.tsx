import React from 'react';
import CalendarSvg from '../../../../static/images/Calendar-icon.svg';
import { ButtonCalendarStyled } from '../../../styled-components/Booking';

const ButtonCalendar = (props: {
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <ButtonCalendarStyled
      onClick={() => {
        props.setActive(true);
      }}
    >
      <img alt="calendar" src={CalendarSvg} />
    </ButtonCalendarStyled>
  );
};

export default ButtonCalendar;
