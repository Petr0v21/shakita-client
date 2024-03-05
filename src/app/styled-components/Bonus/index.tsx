import styled from 'styled-components';

export const StyledBonusItem = styled.div`
  padding: 1em;
  width: calc(320px - 2em);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1em;
  background: rgba(253, 48, 48, 1);
  color: white;
  cursor: pointer;
  span {
    width: calc(320px - 3em - 24px);
    overflow: hidden;
    text-align: center;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 14px;
    font-weight: 450;
  }
  img {
    width: 24px;
    height: 24px;
  }
`;

export const StyledPersonalBonus = styled.div`
  padding: 2em 1em 10em 1em;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1em;
  position: relative;
  h5 {
    max-width: 648px;
    color: white;
    font-size: 12px;
    font-weight: 500;
    text-align: center;
  }

  .all-bonuses {
    margin-top: 1em;
    max-width: 840px;
    color: white;
    font-size: 14px;
    font-weight: 500;
    text-align: center;
  }

  .advice {
    margin-top: 4em;
    max-width: 840px;
    color: white;
    font-size: 12px;
    font-weight: 500;
    text-align: center;
    opacity: 0.6;
  }
  @media (max-width: 984px) {
    h5 {
      max-width: 320px;
    }
    .advice {
      max-width: 320px;
    }
  }

  .preview-fon-image {
    position: absolute;
    height: auto;
    width: 620px;
    top: -225px;
    z-index: -2;
  }

  @media (max-width: 1180px) {
    .preview-fon-image {
      width: 420px;
      top: -50px;
    }
  }
  @media (max-width: 780px) {
    .preview-fon-image {
      width: 200px;
      top: 50px;
    }
  }
`;

export const StyledBonusPopUp = styled.div`
  padding: 1em;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1em;
  width: calc(320px - 2em);
  border-radius: 12px;
  background: rgb(18, 18, 18);
  color: white;
  max-height: calc(100vh - 12em);
  overflow-y: auto;
  .qr-code {
    width: 280px;
    height: 280px;
    background: white;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .error-icon {
    width: 80px;
    height: 80px;
  }
  .level {
    font-size: 18px;
    font-weight: 700;
  }
  .description {
    font-size: 12px;
  }
  .discount {
    font-size: 16px;
    font-weight: 700;
    strong {
      color: rgba(253, 48, 48, 1);
      font-size: 24px;
      font-weight: 900;
    }
  }
`;
