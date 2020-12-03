import React, {useEffect, useState} from 'react';
import {Col, Container, Row, Table} from 'react-bootstrap';
import VerDetalhes from './VerDetalhes';
import AdicionarPatrimonio from './AdicionarPatrimonio';
import TabelaPatrimonios from './TabelaPatrimonios';

import api from '../../services/api';



const Patrimonio = () => {

  const [listaPatrimonio, setListaPatrimonio] = useState([]);  
  async function getPatrimonios(){
    let patrimonios = await api.get('patrimonios');
    await setListaPatrimonio(patrimonios.data);    
  }

  useEffect(()=>{
    getPatrimonios();
  },[]);

  return(
    <>
      <main id="patrimonio_index">
        <Container>
          <Row className="justify-content-between align-items-center">
            <div className="col-auto titulo">
              <h2>Lista de Patrimônios</h2>
              <h1>Controle de patrimônio - SMS Arapiraca</h1>
            </div>
            <Col xs="auto"><AdicionarPatrimonio patrimonios={listaPatrimonio} setListaPatrimonio={setListaPatrimonio}/></Col>
          </Row>
          {/* <Table className="tabela-patrimonios" striped bordered hover size="sm">
            <thead>
              <th filterkey="auxPatrimonio.numero" >Nº Patrimônio</th>
              <th filterkey="auxPatrimonio.descricao" >Descrição</th>
              <th filterkey="auxPatrimonio.origem" >Locação</th>
              <th filterkey="auxPatrimonio.dataLocacao" >Data Locação</th>
              <th>Ver detalhes</th>
            </thead>
            <tbody>
            {listaPatrimonio.map((patrimonio, index)=>(
              <tr key={index}>
                <td>{patrimonio.numero}</td>
                <td>{patrimonio.descricao !== "" ? patrimonio.descricao : "Não informado"}</td> 
                <td>{patrimonio.origem !== "" ? patrimonio.origem : "Não informado"}</td> 
                <td>{new Date(patrimonio.dataLocacao).toLocaleDateString("pt-BR")}</td> 
                <td>
                  <VerDetalhes 
                    listaPatrimonios={listaPatrimonio}
                    setListaPatrimonio={setListaPatrimonio} 
                    patrimonio={patrimonio} 
                  />
                </td>
              </tr>
            ))}
            </tbody>
          </Table> */}
          <TabelaPatrimonios lista={listaPatrimonio} />
        </Container>
      </main>
    </>
  )
}

export default Patrimonio;