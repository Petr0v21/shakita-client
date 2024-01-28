import React from 'react';
import {
  isCurrentDay,
  isSelectedMonth,
} from '../../../../helpers/calendar-helpers';
import {
  CellWrapper,
  CurrentDay,
  DayWrapper,
  RowInCell,
  ShowDayWrapper,
} from '../../../../styled-components/Calendar';
import moment from 'moment';

export const MonthDay: React.FC<{
  dayItem: moment.Moment;
  today: moment.Moment;
  limitDay: moment.Moment;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
  setDay: (date: moment.Moment) => void;
}> = ({ dayItem, today, limitDay, setActive, setDay }) => {
  let active =
    !moment().isSameOrBefore(dayItem, 'day') || !limitDay.isAfter(dayItem);
  return (
    <CellWrapper
      isWeekday={dayItem.day() === 6 || dayItem.day() === 0}
      key={dayItem.unix()}
      isSelectedMonth={isSelectedMonth(dayItem, today)}
      onDoubleClick={() => {
        if (!active) {
          setDay(dayItem);
          setActive(false);
        }
      }}
    >
      <RowInCell justifyContent={'flex-end'}>
        <ShowDayWrapper isActiveDay={active}>
          <DayWrapper
            className="day-wrapper-desktop"
            active={active}
            onClick={() => {
              if (!active) {
                setDay(dayItem);
                setActive(false);
              }
            }}
          >
            {dayItem.format('dd')}
          </DayWrapper>
          <DayWrapper
            active={active}
            onClick={() => {
              if (!active) {
                setDay(dayItem);
                setActive(false);
              }
            }}
          >
            {isCurrentDay(dayItem) ? (
              <CurrentDay>{dayItem.format('D')}</CurrentDay>
            ) : (
              dayItem.format('D')
            )}
          </DayWrapper>
        </ShowDayWrapper>
      </RowInCell>
    </CellWrapper>
  );
};
