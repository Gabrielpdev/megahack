/* eslint-disable array-callback-return */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useState, useEffect } from 'react';
import { FiStar, FiSearch } from 'react-icons/fi';

import { TileLayer, Marker } from 'react-leaflet';
import { useHistory } from 'react-router-dom';
import api from '../../services/api';
import { useAuth } from '../../hooks/auth';

import getDistance from '../../utils/getDistance';

import { Container, Header, Map, Popup, Busca, Bars } from './styles';

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
  distance: number;
  stars: number;
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
  const [distance, setDistance] = useState<number[]>([]);
  const [search, setSearch] = useState<boolean>(true);

  useEffect(() => {
    async function loadPositions(): Promise<void> {
      const response = await api.get('commerce');

      const commercio: ICommerce[] = [];
      response.data.map((commerce: ICommerce) => {
        const distancia = getDistance(
          position[0],
          position[1],
          commerce.latitude,
          commerce.longitude,
        );
        commercio.push({ ...commerce, distance: distancia });
      });
      setCommerces(commercio);
    }

    loadPositions();
  }, [position]);

  useEffect(() => {
    async function loadPositions(): Promise<void> {
      const distancia: number[] = [];
      commerces.map(commerce => {
        distancia.push(
          getDistance(
            position[0],
            position[1],
            commerce.latitude,
            commerce.longitude,
          ),
        );

        distancia.sort(function (a: number, b: number): number {
          return a - b;
        });

        setDistance(distancia);
      });
    }

    loadPositions();
  }, [commerces, position]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(p => {
      const { latitude, longitude } = p.coords;

      setPosition([latitude, longitude]);
    });
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

      <Busca>
        <input
          type="text"
          placeholder="Destino"
          onChange={() => setSearch(false)}
        />
        <FiSearch onClick={() => setSearch(true)} />
      </Busca>

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
          ) !== 10 ? (
            <Marker
              key={commerce.id}
              position={[Number(commerce.latitude), Number(commerce.longitude)]}
              interactive={search}
              opacity={search === true ? 1 : 0}
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

      <Bars>
        <h1>Comércios mais próximos de você</h1>
        {distance.map(item => {
          const commerce = commerces.filter(
            comercio => comercio.distance === item && comercio.distance > 10,
          );

          return commerce[0] === undefined ? (
            <> </>
          ) : (
            <button
              type="button"
              onClick={() =>
                history.push(`/commerce/${Number(commerce[0].id)}`)
              }
            >
              {' '}
              <img src={commerce[0].image} alt={commerce[0].name} />
              <span>{commerce[0].name}</span>
              <div className="esquerda">
                <div>
                  <span>{String(commerce[0].stars)}</span>
                  <FiStar />
                </div>
                <span>
                  {String(commerce[0].distance).substring(0, 4)}
                  Km
                </span>
              </div>
            </button>
          );
        })}
      </Bars>
    </Container>
  );
};

export default Dashboard;
