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

  svg {
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

export const ProductList = styled.table`
  width: 100%;
  border-spacing: 0;
  border-collapse: separate;
  border-spacing: 0px 10px;

  > thead th {
    color: #fff;
    font-size: 18px;
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
        font-size: 15px;
        height: 35px;

        &:first-of-type {
          border-radius: 4px 0 0 4px;
        }

        &:last-of-type {
          border-radius: 0 4px 4px 0;
        }

        img {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          margin-right: 5px;
          object-fit: cover;
        }
      }
    }
  }
`;

export const AnimationContainer = styled.div`
  width: 90%;
  padding-bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  animation: ${appearFromLeft} 1s;

  h1 {
    display: block;
    font-size: 30px;
    margin-top: 35px;
  }
`;

export const Background = styled.div`
  flex: 1;
  background: url(${signInBackgroundImg}) no-repeat center;
  background-size: cover;
`;
