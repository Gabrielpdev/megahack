import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FiArrowLeftCircle } from 'react-icons/fi';

import avatar from '../../assets/avatar.png';
import Button from '../../components/Button';

import {
  Container,
  Content,
  AnimationContainer,
  Background,
  Historico,
} from './styles';

interface IUser {
  name: string;
  email: string;
}

const Profile: React.FC = () => {
  const history = useHistory();

  const [user] = useState(
    (): IUser => {
      const response = localStorage.getItem('@GoBarber:user');

      if (response) {
        return JSON.parse(response);
      }
      return {} as IUser;
    },
  );
  return (
    <Container>
      <Background />
      <Content>
        <FiArrowLeftCircle size={30} onClick={() => history.push('/')} />
        <AnimationContainer>
          <img src={avatar} alt="avatarimage" />
          <h2>{user.name}</h2>
          <Historico>
            <div className="local">
              <h3>Ultima Compra:</h3>
              <span>Bar do seu Zé</span>
              <span>Pack de 6 cervejas</span>
            </div>
            <div className="pontos">
              <h3>Pontos Ganhos:</h3>
              <span>+ 50 pontos</span>
            </div>
          </Historico>

          <div className="totalPontos">
            <h1>Total de pontos:</h1>
            <h2>1.345</h2>
          </div>

          <Button onClick={() => history.push('/profile/history')}>
            Ver Histórico
          </Button>
        </AnimationContainer>
      </Content>
    </Container>
  );
};

export default Profile;
