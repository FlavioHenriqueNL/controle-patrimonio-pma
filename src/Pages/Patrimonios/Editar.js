import React from 'react';
import {Container, Row} from 'react-bootstrap';
import api from '../../services/api';
import Navbar from '../../Components/Navbar';
import TabelaPatrimonios from './TabelaPatrimonios';
import PatrimonioContext from './Context';

const Editar = () => {


  return(
    <>
      <Navbar/>
      <PatrimonioContext>
        <main id="patrimonio_index">
          <Container>
            <Row className="justify-content-between align-items-center">
              <div className="col-auto titulo">
                <h2>Editar Patrimônio</h2>
                <h1>Controle de patrimônio - SMS Arapiraca</h1>
              </div>
            </Row>
            <TabelaPatrimonios isPage="editar"/>
          </Container>
        </main>
      </PatrimonioContext>
    </>
  )
}

export default Editar;