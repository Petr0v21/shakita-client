import styled from 'styled-components';

export const StyledHeader = styled.div`
  border-bottom: 1px solid white;
  padding: 1em 4em;
  background: black;
  width: calc(100% - 8em);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .logo-container {
    display: flex;
    align-items: center;
    gap: 1em;
    .header-logo {
      width: 42px;
      height: auto;
    }
  }

  h1 {
    font-size: 1.25em;
  }
  a {
    color: white;
  }
  .header-links-container {
    display: flex;
    align-items: center;
    gap: 2em;
  }
  .auth-container {
    display: flex;
    align-items: center;
    gap: 1em;
    span {
      color: white;
      font-size: 18px;
      font-weight: 500;
      cursor: pointer;
    }
    .header-profile-icon {
      width: 24px;
      height: auto;
    }
  }

  .auth-container-logout {
    display: flex;
    align-items: center;
    gap: 4px;
    background: rgb(18, 18, 18);
    border: 1px solid #5f6368;
    border-radius: 8px;
    padding: 0.5em;
    cursor: pointer;
    span {
      color: white;
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
    }
    .header-profile-icon {
      width: 16px;
      height: auto;
    }
  }
  .header-links-container-mobile {
    display: none;
    img {
      width: 42px;
      height: auto;
      cursor: pointer;
    }
  }

  .header-mobile {
    display: none;
    height: calc(100vh - 90px);
    width: 320px;
    position: fixed;
    top: 91px;
    transition: all 0.2s linear;
    background: black;
    border-left: 1px solid white;
    .header-mobile-font-logo {
      position: absolute;
      width: 240px;
      height: auto;
      opacity: 0.2;
      bottom: calc(50% - 160px);
      right: 40px;
      z-index: -1;
    }
    .header-mobile-content {
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 2em;
      font-size: 18px;
      font-weight: 450;
    }
  }

  @media (max-width: 982px) {
    padding: 1em 2em;
    width: calc(100% - 4em);
    position: fixed;
    .header-mobile {
      display: block;
    }
    .header-links-container {
      display: none;
    }
    .header-links-container-mobile {
      display: block;
    }
  } ;
`;
