import styled from 'styled-components';

export const StyledHistory = styled.div`
  width: 320px;
  // height: 75vh;
  border-left: 1px solid rgba(18, 18, 18, 1);
  display: flex;
  flex-direction: column;

  .history {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1em;
    max-height: 420px;
    overflow-y: auto;
  }
  @media (max-width: 984px) {
    border-left: 0;
    height: auto;
  }
`;
