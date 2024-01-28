import moment from 'moment';
import React from 'react';
import { MonthDaysList } from '../MonthDaysList';
import { GridWrapper } from '../../../../styled-components/Booking';

const CalendarGrid: React.FC<{
  today: moment.Moment;
  limitDay: moment.Moment;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
  setDay: (date: moment.Moment) => void;
}> = ({ today, limitDay, setActive, setDay }) => {
  const startDay = today.clone().startOf('month').startOf('week');
  return (
    <>
      <GridWrapper>
        <MonthDaysList
          startDay={startDay}
          today={today}
          limitDay={limitDay}
          setActive={setActive}
          setDay={setDay}
        />
      </GridWrapper>
    </>
  );
};

export default CalendarGrid;
