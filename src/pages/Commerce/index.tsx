/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useEffect, useState } from 'react';
import { FiArrowLeftCircle } from 'react-icons/fi';
import { useParams, useHistory } from 'react-router-dom';

import api from '../../services/api';

import formatValue from '../../utils/formatValue';

import {
  Container,
  Content,
  ProductList,
  AnimationContainer,
  Background,
} from './styles';

interface IProduct {
  id: string;
  name: string;
  price: string;
  description: string;
  image: string;
}

interface IHours {
  hour: string;
  avalible: boolean;
}

interface ITable {
  id: string;
  avalible: boolean;
  hours: IHours[];
}

interface ICommerce {
  name: string;
  image: string;
  bio: string;
  start: string;
  finish: string;
  cardapio: IProduct[];
  tables: ITable[];
}

const Commerce: React.FC = () => {
  const { id } = useParams();
  const history = useHistory();

  const [commerce, setCommerce] = useState<ICommerce>({} as ICommerce);
  const [selected, setSelected] = useState<number>(1);

  const [tableSelected, setTableSelected] = useState<string>();
  const [tableHours, setTableHours] = useState<ITable>();

  useEffect(() => {
    async function loadProducts(): Promise<void> {
      const response = await api.get(`/commerce/${id}`);

      setCommerce(response.data);
    }
    loadProducts();
  }, [id]);

  useEffect(() => {
    async function loadHours(): Promise<void> {
      const response = await api.get(`commerce/${id}/table/${tableSelected}`);

      setTableHours(response.data);
    }
    loadHours();
  }, [id, tableSelected]);

  function handleTableSelected(table: string): void {
    setTableSelected(table);
  }
  console.log(tableSelected);
  return (
    <Container>
      <Background />
      <Content>
        <FiArrowLeftCircle size={30} onClick={() => history.push('/')} />
        <AnimationContainer>
          <img src={commerce.image} alt="GoBarber" />

          {commerce.cardapio ? (
            <>
              <div className="header">
                <h1
                  onClick={() => {
                    setSelected(1);
                    setTableSelected(undefined);
                  }}
                >
                  Sobre
                </h1>
                <h1
                  onClick={() => {
                    setSelected(2);
                    setTableSelected(undefined);
                  }}
                >
                  Cardápio
                </h1>
                <h1
                  onClick={() => {
                    setSelected(3);
                    setTableSelected(undefined);
                  }}
                >
                  Drivethru
                </h1>
                <h1
                  onClick={() => {
                    setSelected(4);
                    setTableSelected(undefined);
                  }}
                >
                  Reserva
                </h1>
              </div>
              {selected === 1 ? (
                <div className="bio">
                  <h2>Biografia</h2>
                  <span>{commerce.bio}</span>
                </div>
              ) : (
                <> </>
              )}

              {selected === 2 ? (
                <ProductList>
                  <thead>
                    <tr>
                      <th> </th>
                      <th>Nome</th>
                      <th>Descrição</th>
                      <th>Valor</th>
                    </tr>
                  </thead>
                  <tbody>
                    {commerce.cardapio.map(item => (
                      <tr key={item.id}>
                        <td>
                          <img src={item.image} alt={item.name} />
                        </td>
                        <td>{item.name}</td>
                        <td>{item.description}</td>
                        <td>{formatValue(Number(item.price))}</td>
                      </tr>
                    ))}
                  </tbody>
                </ProductList>
              ) : (
                <> </>
              )}

              {selected === 3 ? (
                <div className="drivethru">
                  <h2>Horário de funcionamento</h2>
                  <span>Aberto todos os dias !</span>
                  <span>
                    De:
                    {` `}
                    {commerce.start}
                  </span>
                  <span>
                    Até:
                    {` `}
                    {commerce.finish}
                  </span>
                </div>
              ) : (
                <> </>
              )}

              {selected === 4 ? (
                <div className="drivethru">
                  <h2>Mesas</h2>
                  {tableSelected === undefined
                    ? commerce.tables.map(item => (
                        <button
                        key={item.id}
                        type="button"
                        onClick={() => handleTableSelected(item.id)}
                      >
                        {item.avalible ? item.id : 'Mesa Indisponível'}
                      </button>
                      ))
                    : tableHours?.hours.map(hour => (
                        <button key={hour.hour} type="button">
                        {hour.hour}
                      </button>
                      ))}
                </div>
              ) : (
                <> </>
              )}
            </>
          ) : (
            <h1>Loading...</h1>
          )}
        </AnimationContainer>
      </Content>
    </Container>
  );
};

export default Commerce;
