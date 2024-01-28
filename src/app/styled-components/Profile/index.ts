import styled from 'styled-components';

export const StyledProfile = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid rgba(18, 18, 18, 1);
  .form-container {
    width: calc(100vw - 320px);
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .main-info {
    display: flex;
    flex-direction: column;
    margin-left: 1em;
    @media (max-width: 786px) {
      align-items: center;
    }
  }
  .form-row {
    display: flex;
    justify-content: space-around;
    align-items: center;
    gap: 1em;
  }
  .form-column {
    display: flex;
    flex-direction: column;
  }
  form {
    max-width: 640px;
    margin: 1em;
    display: flex;
    flex-direction: column;
    align-items: center;
    .conteiner-file-input {
      margin: 0 90px;
    }
  }
  @media (max-width: 984px) {
    padding: 2em;
    flex-direction: column;
    align-items: center;
    border-bottom: 0;
  }

  @media (max-width: 786px) {
    .form-row {
      flex-direction: column;
      align-items: center;
      gap: 1em;
    }
  }
`;
