/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useState, useEffect } from 'react';
import { TileLayer, Marker } from 'react-leaflet';
import { useHistory } from 'react-router-dom';
import api from '../../services/api';
import { useAuth } from '../../hooks/auth';

import getDistance from '../../utils/getDistance';

import { Container, Header, Map, Popup } from './styles';

interface IUser {
  name: string;
  email: string;
}

interface IProduct {
  id: string;
  name: string;
  price: string;
  description: string;
}

interface ICommerce {
  id: string;
  name: string;
  image: string;
  bio: string;
  latitude: string;
  longitude: string;
  cardapio: IProduct[];
}

const Dashboard: React.FC = () => {
  const history = useHistory();
  const { signOut } = useAuth();

  const [user] = useState(
    (): IUser => {
      const response = localStorage.getItem('@GoBarber:user');

      if (response) {
        return JSON.parse(response);
      }
      return {} as IUser;
    },
  );
  const [position, setPosition] = useState<[number, number]>([0, 0]);
  const [commerces, setCommerces] = useState<ICommerce[]>([]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(p => {
      const { latitude, longitude } = p.coords;

      setPosition([latitude, longitude]);
    });
  }, []);

  useEffect(() => {
    async function loadPositions(): Promise<void> {
      const response = await api.get('commerce');

      setCommerces(response.data);
    }

    loadPositions();
  }, []);

  function handleNavigateToUser(): void {
    history.push('profile');
  }

  return (
    <Container>
      <Header>
        <h1>Consum Beer</h1>
        <div className="profile">
          <h3 onClick={handleNavigateToUser}>{user.name}</h3>
          <button type="button" onClick={() => signOut()}>
            Sair
          </button>
        </div>
      </Header>

      <Map center={position} zoom={7}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.osm.org/{z}/{x}/{y}.png"
        />
        {commerces.map(commerce =>
          getDistance(
            position[0],
            position[1],
            commerce.latitude,
            commerce.longitude,
          ) > 10 ? (
            <Marker
              key={commerce.id}
              position={[Number(commerce.latitude), Number(commerce.longitude)]}
            >
              <Popup>
                <div className="header">
                  <button
                    type="button"
                    onClick={() => history.push(`/commerce/${commerce.id}`)}
                  >
                    {commerce.name}
                  </button>
                  <img src={commerce.image} alt={commerce.name} />
                </div>
                <span>{commerce.bio}</span>
              </Popup>
            </Marker>
          ) : (
            <> </>
          ),
        )}
      </Map>
    </Container>
  );
};

export default Dashboard;
