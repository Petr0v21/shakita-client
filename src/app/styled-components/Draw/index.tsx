`
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
`;
