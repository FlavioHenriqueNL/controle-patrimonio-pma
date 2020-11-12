import React, {useEffect, useState} from 'react';
import {Col, Container, Row, Table} from 'react-bootstrap';
import TableFilter from 'react-table-filter';
import 'react-table-filter/lib/styles.css';

import VerDetalhes from './VerDetalhes';
import AdicionarPatrimonio from './AdicionarPatrimonio';

import api from '../../services/api';



const Patrimonio = () => {

  const [listaPatrimonio, setListaPatrimonio] = useState([]);
  const [auxPatrimonios, setAuxPatrimonios] = useState([]);
  
  const _filterUpdated = (newData, filtersObject) => setListaPatrimonio(newData); 
  
  async function getPatrimonios(){
    const patrimonios = await api.get('patrimonios');
    setListaPatrimonio(patrimonios.data);
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
          <Table className="tabela-patrimonios" striped bordered hover size="sm">
            <thead>
              <TableFilter rows={listaPatrimonio} onFilterUpdate={_filterUpdated}>
                <th filterkey="numero" casesensitive={'true'} showsearch={'true'}>Nº Patrimônio</th>
                <th filterkey="descricao" casesensitive={'true'} showsearch={'true'}>Descrição</th>
                <th filterkey="origem" casesensitive={'true'} showsearch={'true'}>Locação</th>
                <th filterkey="origem_dataLocacao" casesensitive={'true'} showsearch={'true'}>Data Locação</th>
                <th>Ver detalhes</th>
              </TableFilter>
            </thead>
            <tbody>
              {listaPatrimonio.map((patrimonio, index)=>(
                <tr key={index}>
                  <td>{patrimonio.numero}</td>
                  <td>{patrimonio.descricao !== "" ? patrimonio.descricao : "Não informado"}</td> 
                  <td>{patrimonio.origem !== "" ? patrimonio.origem : "Não informado"}</td> 
                  <td>{patrimonio.origem_dataLocacao !== "" ? patrimonio.origem_dataLocacao : "Não informado"}</td> 
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
          </Table>
        </Container>
      </main>
    </>
  )
}

export default Patrimonio;