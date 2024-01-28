import React, {
  FunctionComponent,
  ReactNode,
  useEffect,
  useState,
} from 'react';
import { useSwipeable } from 'react-swipeable';
import {
  Wrapper,
  CarouselContainer,
  CarouselSlot,
  SlideButton,
  SwiperStyled,
} from '../../styled-components/Swiper';
import { Direction, NEXT, PREV } from '@/types';

interface CarouselState {
  pos: number;
  sliding: boolean;
  dir: Direction;
}

type CarouselAction =
  | { type: Direction; numItems: number }
  | { type: 'stopSliding' };

export const getOrder = (index: number, pos: number, numItems: number) => {
  return index - pos < 0 ? numItems - Math.abs(index - pos) : index - pos;
};

const getInitialState = (numItems: number): CarouselState => ({
  pos: numItems - 1,
  sliding: false,
  dir: NEXT,
});

const Swiper: FunctionComponent<{
  children: ReactNode;
  amountSlides: number;
  getSlideIndex: (index: number) => void;
  countToSlide?: number;
  slideProps?: { count: number };
}> = (props) => {
  useEffect(() => {
    if (props.slideProps) {
      corectSlide(
        Math.abs(props.slideProps.count),
        props.slideProps.count > 0 ? 'NEXT' : 'PREV',
      );
    }
  }, [props.slideProps]);

  const [cuurentSlide, setCurrentSlide] = useState(0);

  const numItems = React.Children.count(props.children);
  const [state, dispatch] = React.useReducer(
    reducer,
    getInitialState(numItems),
  );

  const slide = (dir: Direction, activeIf: boolean = true) => {
    if (activeIf) {
      if (
        (cuurentSlide === 0 && dir === 'PREV') ||
        (cuurentSlide === props.amountSlides - 1 && dir === 'NEXT')
      ) {
        console.log('Not ver'); //TODO infinity scroll
      } else {
        if (dir === 'NEXT') {
          setCurrentSlide(cuurentSlide + 1);
          props.getSlideIndex(cuurentSlide + 1);
        } else {
          setCurrentSlide(cuurentSlide - 1);
          props.getSlideIndex(cuurentSlide - 1);
        }
        dispatch({ type: dir, numItems });
        setTimeout(() => {
          dispatch({ type: 'stopSliding' });
        }, 50);
      }
    } else {
      dispatch({ type: dir, numItems });
      setTimeout(() => {
        dispatch({ type: 'stopSliding' });
      }, 50);
    }
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => slide(NEXT),
    onSwipedRight: () => slide(PREV),
    swipeDuration: 500,
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

  const corectSlide = (amount: number, dir: Direction) => {
    for (let i = 0; i < amount; i++) {
      slide(dir);
    }
    setCurrentSlide(
      dir === 'NEXT' ? cuurentSlide + amount : cuurentSlide - amount,
    );
    props.getSlideIndex(
      dir === 'NEXT' ? cuurentSlide + amount : cuurentSlide - amount,
    );
  };

  return (
    <SwiperStyled {...handlers}>
      <SlideButton onClick={() => slide(PREV)} float="left">
        {'<'}
      </SlideButton>
      <Wrapper>
        <CarouselContainer dir={state.dir} sliding={state.sliding}>
          {React.Children.map(props.children, (child, index) => {
            return (
              <CarouselSlot order={getOrder(index, state.pos, numItems)}>
                {child}
              </CarouselSlot>
            );
          })}
        </CarouselContainer>
      </Wrapper>
      <SlideButton onClick={() => slide(NEXT)} float="right">
        {'>'}
      </SlideButton>
    </SwiperStyled>
  );
};

function reducer(state: CarouselState, action: CarouselAction): CarouselState {
  switch (action.type) {
    case PREV:
      return {
        ...state,
        dir: PREV,
        sliding: true,
        pos: state.pos === 0 ? action.numItems - 1 : state.pos - 1,
      };
    case NEXT:
      return {
        ...state,
        dir: NEXT,
        sliding: true,
        pos: state.pos === action.numItems - 1 ? 0 : state.pos + 1,
      };
    case 'stopSliding':
      return { ...state, sliding: false };
    default:
      return state;
  }
}

export default Swiper;
