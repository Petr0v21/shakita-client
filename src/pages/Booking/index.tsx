import FormBooking from '../../app/component/Booking/FormBooking';
import { StyledBookingPage } from '../../app/styled-components/Booking';
import React, { useEffect, useState } from 'react';
import { PlaceType, PlaceBookedType } from '../../types';
import CalendarOpen from '../../app/component/Calendar/CalendarOpen';
import Calendar from '../../app/component/Calendar';
import { observer } from 'mobx-react-lite';
import moment from 'moment';
import store from '@stores/bookingStore';
import Map from '@component/Map';

const BookingPage = () => {
  const [tables, setTables] = useState<PlaceType[]>([]);
  const [tablesActive, setTablesActive] = useState<PlaceBookedType[]>([]);
  const [tablesChoosed, setTablesChoosed] = useState<string>('');
  const [date, setDate] = useState<moment.Moment>(moment());
  const [swiperDate, setSwiperDate] = useState<moment.Moment>(
    moment(new Date(`${moment().format('YYYY-MM-DD')}T12:00`).toISOString()),
  );

  const [active, setActive] = useState(false);
  const [slideProps, setSlideProps] = useState<{ count: number }>();
  const [drawing, setDrawing] = useState<{
    name: string;
    _id: string;
    dataHTML: string;
  }>();
  const divRef = React.useRef<HTMLDivElement>(null);
  let limitDay = moment().clone().add(1, 'month').locale('ru');
  const daysInNextMonth = limitDay.daysInMonth();
  limitDay = limitDay.add(
    daysInNextMonth - Number(limitDay.format('DD')),
    'days',
  );
  const amountSlides =
    moment().daysInMonth() -
    Number(moment().format('DD')) +
    daysInNextMonth +
    1;
  const myClick = (place: string) => {
    const handler = () => {
      if (
        !tablesActive.find((table) => table.place === place) ||
        tablesActive.length === 0
      ) {
        setTablesChoosed(place);
      } else {
        document.getElementById(place)?.removeEventListener('click', handler);
      }
    };
    return handler;
  };

  const Teg = (data: string) =>
    new DOMParser()
      .parseFromString(data, 'image/svg+xml')
      .getElementsByTagName('svg')[0];

  const getDrawnig = async () => {
    setTables([
      { placeId: 'test1', name: 'test1', status_book: false },
      { placeId: 'test2', name: 'test2', status_book: false },
      { placeId: 'test3', name: 'test3', status_book: false },
      { placeId: 'test4', name: 'test4', status_book: false },
      { placeId: 'test5', name: 'test5', status_book: false },
      { placeId: 'test6', name: 'test6', status_book: false },
      { placeId: 'test7', name: 'test7', status_book: false },
      { placeId: 'test8', name: 'test8', status_book: false },
      { placeId: 'test9', name: 'test9', status_book: false },
      { placeId: 'test10', name: 'test10', status_book: false },
      { placeId: 'test11', name: 'test11', status_book: false },
      { placeId: 'test12', name: 'test12', status_book: false },
    ]);
    setDrawing({
      _id: '1',
      name: 'shakita',
      dataHTML: `<svg id="testsvg" class="drawing" width="650" height="650" viewBox="0 0 821 822" fill="black" xmlns="http://www.w3.org/2000/svg" > <path d="M2 820V2H53.1132V80.7163H724.076V2H769.509V454.01H819V496.208H604V820H562.623V779.425V496.208H527.736V463.748H724.076V123.726H452.283V296.577H321.66V123.726H139.925H44.1887V463.748H208.887V496.208H44.1887V779.425H483.113V820H2Z" stroke="#D9D9D9" stroke-width="3" /> <path d="M452.283 355.006H410.094V463.748H296.509V496.208H465.264V463.748H452.283V355.006Z" stroke="#D9D9D9" stroke-width="3" /> <rect x="124" y="122" width="49" height="200" fill="#D9D9D9" /> <circle cx="275" cy="167" r="25" fill="#D9D9D9" id="test1" class="test1" /> <circle cx="167" cy="727" r="25" fill="#D9D9D9" id="test2" class="test2" /> <circle cx="378" cy="722" r="25" fill="#D9D9D9" id="test3" class="test3" /> <rect x="173" y="532" width="50" height="85" transform="rotate(90 173 532)" fill="#D9D9D9" id="test7" class="test7" /> <rect x="701" y="386" width="50" height="85" transform="rotate(90 701 386)" fill="#D9D9D9" id="test8" class="test8" /> <rect x="536" y="230" width="50" height="85" transform="rotate(-180 536 230)" fill="#D9D9D9" id="test9" class="test9" /> <rect x="701" y="272" width="50" height="85" transform="rotate(90 701 272)" fill="#D9D9D9" id="test10" class="test10" /> <rect x="701" y="152" width="50" height="85" transform="rotate(90 701 152)" fill="#D9D9D9" id="test11" class="test11" /> <circle cx="353" cy="407" r="25" fill="#D9D9D9" id="test4" class="test4" /> <circle cx="104" cy="407" r="25" fill="#D9D9D9" id="test5" class="test5" /> <circle cx="378.5" cy="547.5" r="25" fill="#D9D9D9" id="test6" class="test6" /></svg>`,
    });
  };

  const getTables = async () => {
    try {
      setTablesActive([]);
      setTablesChoosed('');
    } catch (e) {
      console.error('Error', e);
    }
  };

  const addListeners = () => {
    tables.forEach(({ placeId }) => {
      document
        .getElementById(placeId)
        ?.addEventListener('click', myClick(placeId));
    });
  };

  useEffect(() => {
    getDrawnig();
    getTables();
    addListeners();
  }, []);

  useEffect(() => {
    const dateDay = moment(date.format('YYYY-MM-DD'));
    const dateSwiperDay = moment(swiperDate.format('YYYY-MM-DD'));
    const diff = dateDay.diff(dateSwiperDay, 'days', true);
    if (diff >= 1 || diff <= -1) {
      setSlideProps({
        count: diff > 0 ? Math.ceil(diff) : Math.floor(diff),
      });
    }
  }, [date]);

  useEffect(() => {
    store.addField(new Date(swiperDate.format()).toISOString(), 'date');
    store.find().then((res) => {
      setTablesActive(res as PlaceBookedType[]);
      setTablesChoosed('');
    });
  }, [swiperDate]);

  useEffect(() => {
    store.addField(tablesChoosed, 'place');
  }, [tablesChoosed]);

  useEffect(() => {
    addListeners();
  }, [tablesActive]);

  useEffect(() => {
    if (divRef.current && drawing?.dataHTML) {
      divRef.current.appendChild(Teg(drawing?.dataHTML));
    }
    addListeners();
  }, [drawing]);

  return (
    <>
      <StyledBookingPage
        ref={divRef}
        places={tables}
        placesActive={tablesActive}
        choosedPlaces={tablesChoosed}
      >
        <div className="form">
          <h2>Зарезервируй свой стол!</h2>
          <Calendar
            setActive={setActive}
            amountSlidesDays={amountSlides}
            setDate={setSwiperDate}
            slideProps={slideProps}
          />
          <FormBooking
            clearHandler={() => {
              setTablesChoosed('');
            }}
          />
        </div>
      </StyledBookingPage>
      <div className="booking-map">
        <h3>Где нас найти?</h3>
        <a
          href="https://maps.app.goo.gl/DEgPYKUWMXwGv6PU9"
          target="_blank"
          rel="noopener noreferrer"
          className="addres"
        >
          вулиця Незалежності, 10, Тульчин, Вінницька область, Украина, 23600
        </a>
        <Map />
      </div>

      <CalendarOpen
        active={active}
        limitDay={limitDay}
        setActive={setActive}
        setDay={setDate}
      />
    </>
  );
};

export default observer(BookingPage);
