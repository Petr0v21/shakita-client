import styled from 'styled-components';

export const StyledFooter = styled.div`
  border-top: 1px solid white;
  padding: 1em 8em;
  background: black;
  width: calc(100% - 16em);
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 1em;
  h1 {
    font-size: 1.25em;
  }
  a {
    color: white;
  }
  img {
    width: 42px;
    height: auto;
  }
  .row {
    display: flex;
    gap: 1em;
    align-items: center;
    justify-content: center;
  }
  .logo-container {
    display: flex;
    align-items: center;
    gap: 1em;
    .footer-logo {
      width: 42px;
      height: auto;
    }
  }
  .footer-links-container {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: 2em;
  }

  @media (max-width: 982px) {
    padding: 1em 2em;
    width: calc(100% - 4em);
    flex-direction: column;
  }
`;
