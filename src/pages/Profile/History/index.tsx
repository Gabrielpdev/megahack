import React from 'react';
import { useHistory } from 'react-router-dom';
import { FiArrowLeftCircle } from 'react-icons/fi';

import {
  Container,
  Content,
  AnimationContainer,
  Background,
  Historico,
} from './styles';

const History: React.FC = () => {
  const history = useHistory();

  return (
    <Container>
      <Background />
      <Content>
        <FiArrowLeftCircle size={30} onClick={() => history.push('/profile')} />
        <AnimationContainer>
          <Historico>
            <thead>
              <tr>
                <th>Local</th>
                <th>Produto</th>
                <th>Valor</th>
                <th>Pontos</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Bar do Suvaco</td>
                <td>
                  <div className="produto">
                    <img
                      src="https://emporiodacerveja.vtexassets.com/arquivos/ids/174971-800-auto?width=800&height=auto&aspect=true"
                      alt="Pack de 6 cervejas"
                    />
                    <span>Pack de 6 cervejas</span>
                  </div>
                </td>
                <td>R$ 15,99 </td>
                <td>+ 50 pontos </td>
              </tr>

              <tr>
                <td>Bar do seu Zé</td>
                <td>
                  <div className="produto">
                    <img
                      src="https://lh3.googleusercontent.com/proxy/ECZlu1Rg3vouw88BE_eILAdPaEiknNHm9UiS5U-GL-K8CjzLP1-Y86jIDKD4ZuPuXy24mkj8kn4n2RFCgFFqngrg7bnMmnbvBrwVy_jf-1ndBIn-aY8fuuq6mfgTOPxgIDdTHQ"
                      alt="Porcao de batata"
                    />
                    <span>Porcao de batata</span>
                  </div>
                </td>
                <td>R$ 18,99 </td>
                <td>+ 65 pontos </td>
              </tr>

              <tr>
                <td>Quero Bim Bar</td>
                <td>
                  <div className="produto">
                    <img
                      src="https://espetinhodesucesso.com.br/wp-content/uploads/2018/02/petiscos-de-boteco.jpg"
                      alt="petico com cerveja"
                    />
                    <span>Petico com cerveja</span>
                  </div>
                </td>
                <td>R$ 25,99 </td>
                <td>+ 100 pontos </td>
              </tr>

              <tr>
                <td>Bar tô no trabalho</td>
                <td>
                  <div className="produto">
                    <img
                      src="data:image/jpeg;base64,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"
                      alt="2 skol beats"
                    />
                    <span>2 skol beats</span>
                  </div>
                </td>
                <td>R$ 10,99 </td>
                <td>+ 35 pontos </td>
              </tr>

              <tr>
                <td>Bar do seu Zé</td>
                <td>
                  <div className="produto">
                    <img
                      src="https://www.pontofrio-imagens.com.br/agro-industria-comercio/UtensiliosIndustriais/torreparachopp/10622618/1030683286/torre-de-chopp-e-cerveja-35-litros-marchesoni-marcbeer-mb2350-10622618.jpg"
                      alt="torre de cerveja"
                    />
                    <span>1 torre de cerveja</span>
                  </div>
                </td>
                <td>R$ 70,99 </td>
                <td>+ 275 pontos </td>
              </tr>

              <tr>
                <td>Botecaria Mineira</td>
                <td>
                  <div className="produto">
                    <img
                      src="https://static.carrefour.com.br/medias/sys_master/images/images/hf3/h58/h00/h00/15165695361054.jpg"
                      alt="pack de 6 cervejas"
                    />
                    <span>Pack de 12 cervejas</span>
                  </div>
                </td>
                <td>R$ 22,99 </td>
                <td>+ 125 pontos </td>
              </tr>
            </tbody>
          </Historico>
        </AnimationContainer>
      </Content>
    </Container>
  );
};

export default History;
