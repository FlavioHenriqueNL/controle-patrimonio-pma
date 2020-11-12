import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return(
    <>

      <main id="dashboard">
        <Container>
          <Row>
            <div className="col-auto titulo">
              <h2>Dashboard</h2>
              <h1>Controle de patrimônio - SMS Arapiraca</h1>
            </div>
          </Row>
          <Row className="lista-abas justify-content-center">
            <Col md={6} xs={12} className="mb-3">
              <Link className="links" to="/patrimonios">Lista de Patrimônios</Link>
            </Col>
            <Col md={6} xs={12} className="mb-3">
              <Link className="links" to="/movimentacoes">Movimentações</Link>
            </Col>
          </Row>
        </Container>
      </main>
    
    </>
  )
}

export default Dashboard;