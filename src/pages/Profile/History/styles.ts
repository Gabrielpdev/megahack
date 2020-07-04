import styled, { keyframes } from 'styled-components';

import signInBackgroundImg from '../../../assets/commerce.jpg';

export const Container = styled.div`
  height: 100vh;

  display: flex;
  align-items: stretch;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 100%;
  max-width: 900px;

  > svg {
    position: relative;
    right: 40%;
    top: 20px;

    cursor: pointer;

    &:hover {
      color: #ff9900;
    }
  }
`;

const appearFromLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(50px);
  }
  to {
    opacity: 1;
    transform: translateX(0px);
  }
`;

export const AnimationContainer = styled.div`
  width: 90%;
  height: 100%;
  max-height: 820px;

  padding-bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;

  animation: ${appearFromLeft} 1s;

  img {
    width: 200px;
    height: 200px;
    border-radius: 50%;
  }

  > h2 {
    margin-top: 20px;
  }

  div.totalPontos {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin-top: 20px;
  }
`;

export const Background = styled.div`
  flex: 1;
  background: url(${signInBackgroundImg}) no-repeat center;
  background-size: cover;
`;

export const Historico = styled.table`
  width: 100%;
  border-spacing: 0;
  border-collapse: separate;
  border-spacing: 0px 10px;
  animation: ${appearFromLeft} 1s;
  > thead th {
    color: #ff9900;

    font-size: 16px;
    font-weight: 500;
    text-align: center;
    padding: 25px 0 0 0;
  }
  > tbody {
    tr {
      margin: 0;
      padding-top: 0;
      text-align: center;

      td {
        padding: 5px 15px;
        color: #fff;
        font-size: 12px;
        height: 35px;

        &:first-of-type {
          border-radius: 4px 0 0 4px;
        }

        &:last-of-type {
          border-radius: 0 4px 4px 0;
        }

        img {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          margin-right: 5px;
        }

        div.produto {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-direction: row;
        }
      }
    }
  }
`;
