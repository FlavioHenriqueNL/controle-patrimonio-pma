import React from 'react';
import {withRouter} from 'react-router-dom';
import './style.css';

const Boletim = () => {


  return(
    <>
      <main>
        <section className="boletim">
          <div className="container">
            <header>
              <figure className="logo">
                <img src="./logo-brasao.png" alt="Prefeitura"/>
              </figure>
              <div className="titulo">
                <h1>Prefeitura Municipal de Arapiraca</h1>
                <h2>Boletim de Movimentação de Bens Patrimoniais</h2>
              </div>
            </header>
            <table className="table lista-patrimonios">
              <thead>
                <tr>
                  <th>Nº Patrimonio</th>
                  <th>Especificaçao (Marca, Modelo, Nº Serie, ETC. ...)</th>
                </tr>
              </thead>
              <tbody className="patrimonio">
                <tr>
                  <td>123456</td>
                  <td>Patrimonio de teste.</td>
                </tr>
                <tr>
                  <td>123456</td>
                  <td>Patrimonio de teste.</td>
                </tr>
                <tr>
                  <td>123456</td>
                  <td>Patrimonio de teste.</td>
                </tr>
              </tbody>
              <tbody id="local">
                <tr>
                  <th>
                    <h1>Origem</h1>
                  </th>
                  <td>
                    <label>(Nome da divisão)</label>
                    <input type="text" value="Origem de teste"/>
                  </td>
                </tr>
                <tr>
                  <th>
                    <h1>Destino</h1>
                  </th>
                  <td>
                    <label>(Nome da divisão)</label>
                    <input type="text" value="Origem de teste"/>
                  </td>
                </tr>
              </tbody>
            </table>
            <section className="responsavel">
              <div className="origem">
                <h1>Origem</h1>
                <p><span>Nome</span>: Flávio Henrique Nunes Leite </p>
                <p><span>CPF</span>: 105.123.104-32 </p>
                <p><span>Data</span>: 21/01/2020 </p>
              </div>
            
              <div className="destino">
                <h1>Destino</h1>
                <p><span>Nome</span>: Flávio Henrique Nunes Leite </p>
                <p><span>CPF</span>: 105.123.104-32 </p>
                <p><span>Data</span>: 21/01/2020 </p>
              </div>
            </section>
          </div>
        </section>
      </main>
    </>
  );
}

export default withRouter(Boletim);