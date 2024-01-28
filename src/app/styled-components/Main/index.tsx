import styled from 'styled-components';

export const StyledMainPage = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  h2 {
    text-align: end;
  }

  .preview {
    color: white;
    height: 100vh;
    width: 100vw;

    .preview-content {
      display: flex;
      flex-direction: column;
      gap: 4em;
      padding-top: 6em;

      @media (max-width: 984px) {
        padding-top: 1em;
      }

      .preview-button-link {
        padding: 1em 2em;
        border: 1px solid white;
        border-radius: 12px;
        width: 280px;
        text-decoration: none;
        color: white;
        background: rgba(253, 48, 48, 1);
        text-align: center;
        font-weight: 600;
      }
      .preview-row-first {
        display: flex;
        text-align: end;
      }
      .preview-row-second {
        display: flex;
        text-align: start;
        justify-content: flex-end;
      }
      .preview-row-content {
        width: 50%;
        max-width: 600px;
        padding: 0 8em;
      }
    }

    @media (max-width: 1180px) {
      gap: 2em;
      padding-top: 1em;
      height: auto;
      h2 {
        text-align: center;
      }
      .preview-content {
        text-align: center;
        align-items: center;
        .preview-row-first {
          text-align: center;
          justify-content: center;
        }
        .preview-row-second {
          text-align: center;
          justify-content: center;
        }
        div {
          .preview-row-content {
            width: 80%;
            padding: 0;
            text-align: center;
          }
        }
      }
    }

    .preview-main-image {
      position: absolute;
      width: 620px;
      height: auto;
      right: calc(50% - 310px);
      z-index: -3;
      top: 20%;
    }
    .preview-fon-image {
      position: absolute;
      height: auto;
      width: 620px;
      top: 400px;
      z-index: -2;
    }

    @media (max-width: 1180px) {
      .preview-main-image {
        width: 480px;
        right: calc(50% - 240px);
      }
      .preview-fon-image {
        width: 420px;
        top: 500px;
      }
    }
    @media (max-width: 780px) {
      .preview-main-image {
        top: 160px;
        width: 320px;
        right: calc(50% - 160px);
      }
      .preview-fon-image {
        width: 200px;
        top: 500px;
      }
    }
  }

  .about-us {
    padding: 2em 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: white;
    .about-us-content {
      display: flex;
      align-items: center;
      justify-content: center;
      @media (max-width: 1160px) {
        flex-direction: column;
        .about-us-content-item {
          text-align: center;
        }
        .about-us-content-item-owner-container {
          flex-direction: column;
        }
      }
      gap: 2em;
      span {
        font-size: 14px;
      }
      .about-us-content-item {
        min-width: calc(280px + 2em);
        max-width: calc(480px + 2em);
        padding: 0 2em;
      }
      .about-us-content-item-owner-container {
        display: flex;
        align-items: center;
        gap: 2em;
        strong {
          color: rgba(253, 48, 48, 1);
        }
        img {
          width: 160px;
          height: auto;
        }
      }
    }
  }
`;
