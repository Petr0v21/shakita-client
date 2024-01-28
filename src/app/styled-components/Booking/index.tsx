import styled from 'styled-components';
import { StyledBookType } from '../../../types';
import { device } from '../size';

export const StyledBookingPage = styled.div<StyledBookType>`
  padding: 2% 10%;
  display: flex;
  gap: 10%;
  justify-content: space-between;

  @media (max-width: 1184px) {
    flex-direction: column;
    align-items: center;
  }

  .drawing {
    width: 50%;
    height: auto;
    max-height: 750px;
    min-width: 300px;
    @media (max-width: 1184px) {
      margin: auto;
      width: 80%;
      height: auto;
    }

    ${(props) =>
      props.places.map(({ placeId }) => {
        if (props.choosedPlaces === placeId) {
          return `
        .${placeId} {
          fill: yellow;
        }
        `;
        }
        if (props.placesActive.find((table) => table.place === placeId)) {
          return `
        .${placeId} {
          fill: red;
          cursor: not-allowed;
        }
        `;
        } else {
          return `
        .${placeId} {
          fill: green;
          cursor: pointer;
          transition: all 0.5s ease;
          &:hover {
            fill: yellow;
          }
          &:focus {
            fill: yellow;
          }
        }
        `;
        }
      })}
  }
  .form-booking {
    width: 40%;
    @media (max-width: 1028px) {
      width: 80%;
    }
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1em;
    p {
      margin: 0;
      color: red;
      text-align: center;
    }
    .inputs-form {
      padding-top: 2em;
      display: flex;
      flex-direction: column;
      align-items: center;
      // gap: 1em;
    }
    @media ${device.mobileS} {
      h2 {
        font-size: 1em
      }
      div p {
        font-size: 0.85em;
      }
    }

    @media ${device.tablet} {
      h2 {
      font-size: 1.25em
      }
      div p {
        font-size: 1em;
      }
    }
    @media ${device.laptop} {
      h2 {
      font-size: 1.5em
      }
    }
    @media ${device.laptopL} {
      h2 {
      font-size: 2em
    }
  }
`;

const SwiperDiv = styled.div`
width: 300px;
border: 1px solid white;
@media ${device.mobileS} {
  width: 200px;
  label {
    font-size: 0.75em;
  }
  .swiper-content{
    h3 {
      font-size: 1em;
      margin: 0.5em;
    }
  }
}

@media ${device.mobileL} {
  width: 250px;
    label {
      font-size: 1em;
    }
  }

@media ${device.tablet} {
  width: 300px;
  .swiper-content{
    h3 {
    font-size: 1.25em;
    }
  }
}
@media ${device.laptop} {
  // label {
  //   font-size: 1.25em;
  // }
  .swiper-content{
    h3 {
    font-size: 1.5em;
  }
}
`;

export const DaysStyled = styled(SwiperDiv)`
  height: 85px;
}
`;

export const HoursStyled = styled(SwiperDiv)`
  height: 50px;
}
`;

export const ButtonCalendarStyled = styled.div`
  width: 100px;
  height: 150px;
  border: 1px solid white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  img {
    width: 60px;
    height: auto;
  }
  @media ${device.mobileS} {
    width: 75px;
      img {
        width: 40px;
        height: auto;
      }
    }
  }
  @media ${device.mobileL} {
    width: 100px;
      img {
        width: 60px;
        height: auto;
      }
    }
`;

export const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  background-color: #4d4c4d;
  @media (min-width: 925px) {
    grid-gap: 1px;
    border: 1px solid #4d4c4d;
  }
`;
