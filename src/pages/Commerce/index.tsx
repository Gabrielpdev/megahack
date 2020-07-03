import React, { useEffect, useState } from 'react';
import { FiArrowLeftCircle } from 'react-icons/fi';
import { useParams, useHistory } from 'react-router-dom';

import api from '../../services/api';

import logo from '../../assets/logo.svg';

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

interface ICommerce {
  name: string;
  image: string;
  bio: string;
  cardapio: IProduct[];
}

const Commerce: React.FC = () => {
  const { id } = useParams();
  const history = useHistory();

  const [commerce, setCommerce] = useState<ICommerce>({} as ICommerce);

  useEffect(() => {
    async function loadProducts(): Promise<void> {
      const response = await api.get(`/commerce/${id}`);

      setCommerce(response.data);
    }
    loadProducts();
  }, [id]);

  return (
    <Container>
      <Background />
      <Content>
        <FiArrowLeftCircle size={30} onClick={() => history.goBack()} />
        <AnimationContainer>
          <img src={logo} alt="GoBarber" />

          {commerce.cardapio ? (
            <>
              <h1>Cardápio</h1>
              <ProductList>
                <thead>
                  <tr>
                    <th>Imagem</th>
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
                      <td>{item.price}</td>
                    </tr>
                  ))}
                </tbody>
              </ProductList>
            </>
          ) : (
            <> </>
          )}
        </AnimationContainer>
      </Content>
    </Container>
  );
};

export default Commerce;
