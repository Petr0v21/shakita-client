import React, { useEffect, useState } from 'react';
import Days from './Days';
import Hours from './Hours';
import ButtonCalendar from './ButtonCalendar';
import { CalendarStyled } from '../../styled-components/Calendar';
import moment from 'moment';

const Calendar = (props: {
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
  amountSlidesDays: number;
  slideProps?: { count: number };
  setDate?: React.Dispatch<React.SetStateAction<moment.Moment>>;
}) => {
  const [currentTime, setCurrentTime] = useState<string>('12:00');
  const [currentDay, setCurrentDay] = useState<string>(
    moment().clone().locale('ru').format('YYYY-MM-DD'),
  );

  useEffect(() => {
    if (props.setDate) {
      props.setDate(
        moment(new Date(`${currentDay}T${currentTime}:00`).toISOString()),
      );
    }
  }, [currentTime, currentDay]);

  return (
    <CalendarStyled>
      <div className="handChoose">
        <Hours getTime={setCurrentTime} />
        <Days
          amountSlides={props.amountSlidesDays}
          getDay={setCurrentDay}
          slideProps={props.slideProps}
        />
      </div>
      <ButtonCalendar setActive={props.setActive} />
    </CalendarStyled>
  );
};

export default Calendar;
