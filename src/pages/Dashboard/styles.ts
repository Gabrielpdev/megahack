import styled from 'styled-components';
import { lighten } from 'polished';
import { Map as Mapa, Popup as texto } from 'react-leaflet';

export const Container = styled.div`
  width: 100%;

  h1 {
    display: flex;
    justify-content: center;

    font-size: 50px;
  }
`;

export const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  width: 80%;
  margin: 30px auto;

  button {
    margin-top: 5px;
    border: none;
    border-radius: 5px;
    background: #ff9900;
  }

  div.profile {
    margin: auto 0;
    display: flex;
    flex-direction: column;
    text-align: right;

    h3 {
      font-size: 14px;
    }
  }

  h3 {
    cursor: pointer;

    &:hover {
      color: #ff9900;
    }
  }

  h1 {
    font-size: 28px;
  }
`;

export const Busca = styled.div`
  background: #232129;
  display: flex;
  justify-content: space-between;

  margin: auto;

  width: 80%;

  border-radius: 10px;
  padding: 16px;

  border: 2px solid #232129;
  color: #666360;

  display: flex;
  align-items: center;

  svg {
    margin-right: 5px;
    cursor: pointer;
  }

  input {
    background: none;
    border: none;

    color: #666360;
  }
`;

export const Map = styled(Mapa)`
  margin: 40px auto;
  border-radius: 10px;
  height: 405px;
  width: 80%;
  border: 2px solid #312e38;

  &:hover {
    border: 2px solid #ff9000;
  }
`;

export const Popup = styled(texto)`
  display: flex;
  flex-direction: column;
  max-width: 220px;

  span {
    display: block;
    max-width: 200px;

    margin-top: 10px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  div.header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 5px;

    button {
      border: none;
      background: none;
      &:hover {
        color: #ff9000;
      }
    }
  }

  img {
    margin-left: 8px;
    width: 50px;
    height: 50px;
    border-radius: 25px;
  }
`;

export const Bars = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;

  h1 {
    margin-bottom: 10px;
    font-size: 18px;
  }

  button {
    width: 80%;
    display: flex;
    align-items: center;
    justify-content: space-between;

    margin: 3px 0;

    border: 1px solid #312e38;

    border-radius: 5px;

    background: #f4ede8;
    padding: 5px;

    > img {
      margin-left: 10px;
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
    span {
      font-size: 14px;
      margin: auto;
    }

    &:hover {
      background: ${lighten(0.4, '#ff9900')};
      border: 1px solid #ff9900;
    }
    div.esquerda {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;

      > div {
        display: flex;
        align-items: center;
        justify-content: center;

        margin-bottom: 3px;
        span {
          font-size: 14px;
          margin: auto;
          margin-right: 2px;
        }
      }
    }
  }
`;
