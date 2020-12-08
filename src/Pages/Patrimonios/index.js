import React, {useEffect, useState} from 'react';
import {Col, Container, Row, Table} from 'react-bootstrap';
import AdicionarPatrimonio from './AdicionarPatrimonio';
import TabelaPatrimonios from './TabelaPatrimonios';
import Navbar from '../../Components/Navbar';
import '../../../node_modules/@fortawesome/fontawesome-free/css/all.css'

import PatrimonioContext from './Context';

const Patrimonio = () => {
  return(
    <>
      <Navbar/>
      <PatrimonioContext>
        <main id="patrimonio_index">
          <Container>
            <Row className="justify-content-between align-items-center">
              <div className="col-auto titulo">
                <h2>Lista de Patrimônios</h2>
                <h1>Controle de patrimônio - SMS Arapiraca</h1>
              </div>
              <Col xs="auto"><AdicionarPatrimonio /></Col>
            </Row>
            <TabelaPatrimonios/>
          </Container>
        </main>
      </PatrimonioContext>
    </>
  )
}

//COLOCAR O ADICIONAR PATRIMONIO DENTRO DA TABELA PATRIMONIOS PRA FICAR AO LADO DO SEARCH.

export default Patrimonio;