import styled, { keyframes } from 'styled-components';

import signInBackgroundImg from '../../assets/commerce.jpg';

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

export const Historico = styled.div`
  width: 90%;

  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  h3 {
    font-size: 14px;
  }
  span {
    font-size: 12px;
  }

  div.local {
    display: flex;
    flex-direction: column;
  }
  div.pontos {
    margin-bottom: auto;
  }
`;
