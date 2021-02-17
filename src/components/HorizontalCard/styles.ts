import styled from 'styled-components'

export const SCard = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  height: 250px;
  width: 100%;
  border-radius: 5px;
  border: 1px solid;
  border-color: #D6DBDF;
`;

export const SImage = styled.div`
  height: 100%;
  width: 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 5px 0 0 5px;
  border-right: 1px solid;
  border-color: #D6DBDF;
`;

export const SInfo = styled.div`
  height: 100%;
  width: 95%;
  padding: 0 0 0 10px;
`;

export const STitle = styled.p`
    font-size: 20px;
    font-weight: bold;
    color: #00077F;
`;

export const SText = styled.p`
    font-size: 14px;
    height: 110px;
    color: #00077F;
`;