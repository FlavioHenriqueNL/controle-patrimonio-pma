import React, { useEffect, useState } from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import Navbar from '../../Components/Navbar';
import api from '../../services/api';
import TabelaMovimentacoes from './TabelaMovimentacoes';

const Movimentacoes = () => {

  const [movimentacoes, setMovimentacoes] = useState([]);

  

  useEffect(()=>{
    async function getMovimentacoes(){
      try{
        let mov = await api.get('/movimentacoes');
        setMovimentacoes(mov.data);
      }catch(e){
        alert(`Não foi possível buscar as últimas movimentações: ${e.message}`);
      }
    }
    getMovimentacoes();
  },[])

  return(
    <>
      <Navbar/>
      <main>
        <Container>
          <Row>
            <div className="col-auto titulo">
              <h2>Últimas Movimentações</h2>
              <h1>Controle de patrimônio - SMS Arapiraca</h1>
            </div>
          </Row>
          <TabelaMovimentacoes lista={movimentacoes}/>
        </Container>
      </main>
    </>
  )
}

export default Movimentacoes;