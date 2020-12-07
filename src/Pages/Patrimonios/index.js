import React, {useEffect, useState} from 'react';
import {Col, Container, Row, Table} from 'react-bootstrap';
import VerDetalhes from './VerDetalhes';
import AdicionarPatrimonio from './AdicionarPatrimonio';
import TabelaPatrimonios from './TabelaPatrimonios';
import Navbar from '../../Components/Navbar';
import '../../../node_modules/@fortawesome/fontawesome-free/css/all.css'
import api from '../../services/api';



const Patrimonio = () => {

  const [listaPatrimonio, setListaPatrimonio] = useState([]); 
  async function getPatrimonios(){
    let pat = await api.get('patrimonios');
    return pat;
  }
  useEffect(async ()=>{
    let pat = await getPatrimonios();
    setListaPatrimonio(pat.data);   
  },[]);

  return(
    <>
      <Navbar/>
      <main id="patrimonio_index">
        <Container>
          <Row className="justify-content-between align-items-center">
            <div className="col-auto titulo">
              <h2>Lista de Patrimônios</h2>
              <h1>Controle de patrimônio - SMS Arapiraca</h1>
            </div>
            <Col xs="auto"><AdicionarPatrimonio patrimonios={listaPatrimonio} setListaPatrimonio={setListaPatrimonio}/></Col>
          </Row>
          <TabelaPatrimonios dataPatrimonios={listaPatrimonio} setListaPatrimonio={setListaPatrimonio}/>
        </Container>
      </main>
    </>
  )
}

//COLOCAR O ADICIONAR PATRIMONIO DENTRO DA TABELA PATRIMONIOS PRA FICAR AO LADO DO SEARCH.

export default Patrimonio;