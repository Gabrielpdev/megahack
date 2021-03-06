/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-closing-bracket-location */
/* eslint-disable react/jsx-closing-tag-location */
/* eslint-disable react/jsx-indent-props */
/* eslint-disable react/jsx-indent */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useEffect, useState } from 'react';
import { FiArrowLeftCircle } from 'react-icons/fi';
import { useParams, useHistory } from 'react-router-dom';

import api from '../../services/api';
import { useToast } from '../../hooks/toast';
import formatValue from '../../utils/formatValue';

import {
  Container,
  Content,
  ProductList,
  AnimationContainer,
  Background,
  Icons,
  Star,
} from './styles';

const QRCode = require('qrcode.react');

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

interface ICupom {
  nome: string;
  codigo: string;
  image: string;
  description: string;
}

interface ICommerce {
  name: string;
  image: string;
  bio: string;
  start: string;
  finish: string;
  cardapio: IProduct[];
  tables: ITable[];
  cupom: ICupom[];
}

const Commerce: React.FC = () => {
  const { id } = useParams();
  const { addToast } = useToast();
  const history = useHistory();

  const [commerce, setCommerce] = useState<ICommerce>({} as ICommerce);
  const [selected, setSelected] = useState<number>(1);
  const [favorite, setFavorite] = useState<boolean>(false);

  const [tableSelected, setTableSelected] = useState<string>();
  const [tableHours, setTableHours] = useState<ITable>();
  const [hourSelected, setHourSelected] = useState<string>();

  const [cupomSelected, setCupomSelected] = useState<ICupom>();

  useEffect(() => {
    async function loadProducts(): Promise<void> {
      const response = await api.get(`/commerce/${id}`);

      setCommerce(response.data);
    }
    loadProducts();
  }, [id]);

  useEffect(() => {
    async function loadHours(): Promise<void> {
      if (tableSelected) {
        const response = await api.get(`commerce/${id}/table/${tableSelected}`);

        setTableHours(response.data);
      }
    }
    loadHours();
  }, [id, tableSelected]);

  function handleTableSelected(table: string): void {
    setTableSelected(table);
  }

  function handleCupomSelected(cupom: ICupom): void {
    setCupomSelected(cupom);
  }

  function handleConfirmHour(): void {
    addToast({
      type: 'success',
      title: 'Horário reservado!',
    });

    setHourSelected(undefined);
    setTableSelected(undefined);
    setSelected(1);
  }

  return (
    <Container>
      <Background />
      <Content>
        <Icons>
          <FiArrowLeftCircle
            className="back"
            size={30}
            onClick={() => history.push('/')}
          />
          <Star
            size={25}
            onClick={() => setFavorite(!favorite)}
            Favorite={favorite}
          />
        </Icons>
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
                <h1
                  onClick={() => {
                    setSelected(5);
                    setTableSelected(undefined);
                  }}
                >
                  Cupons
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
                  {tableSelected !== undefined ? <> </> : <h2>Mesas</h2>}
                  {tableSelected === undefined ? (
                    commerce.tables.map(item => (
                      <button
                        key={item.id}
                        type="button"
                        disabled={!item.avalible}
                        className={item.avalible ? 'disponivel' : 'ocupado'}
                        onClick={() => handleTableSelected(item.id)}
                      >
                        {item.avalible ? item.id : 'Mesa Indisponível'}
                      </button>
                    ))
                  ) : hourSelected ? (
                    <>
                      <h2>
                        Horário Selecionado:
                        {` `}
                        {hourSelected}
                      </h2>

                      <span>Confirmar Horário</span>
                      <div className="confirmar">
                        <button type="button" onClick={handleConfirmHour}>
                          Confirmar
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setHourSelected(undefined);
                          }}
                        >
                          Cancelar
                        </button>
                      </div>
                    </>
                  ) : (
                    tableHours?.hours.map(hour => (
                      <button
                        key={hour.hour}
                        disabled={!hour.avalible}
                        type="button"
                        onClick={() => setHourSelected(hour.hour)}
                        className={hour.avalible ? 'disponivel' : 'ocupado'}
                      >
                        {hour.avalible ? hour.hour : 'Horário Indisponível'}
                      </button>
                    ))
                  )}
                </div>
              ) : (
                <> </>
              )}

              {selected === 5 ? (
                <div className="drivethru">
                  {cupomSelected !== undefined ? (
                    <> </>
                  ) : (
                    <h2>Cupons de hoje !</h2>
                  )}
                  {cupomSelected === undefined ? (
                    commerce.cupom.map(item => (
                      <button
                        key={item.codigo}
                        type="button"
                        onClick={() => handleCupomSelected(item)}
                        className="cupomButton"
                      >
                        <img src={item.image} alt={item.description} />
                        <span>{item.nome}</span>
                      </button>
                    ))
                  ) : (
                    <>
                      <div className="cupomheader">
                        <FiArrowLeftCircle
                          size={30}
                          onClick={() => setCupomSelected(undefined)}
                        />
                        <h2>{cupomSelected.nome}</h2>
                      </div>

                      <div className="cupom">
                        <span>{cupomSelected.description}</span>
                        <h3>{cupomSelected.codigo}</h3>
                        <QRCode value="hey" />
                      </div>
                    </>
                  )}
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
