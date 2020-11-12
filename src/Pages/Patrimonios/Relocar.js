import React, {useState} from 'react';
import {Container, Row, Col, Button, Modal} from 'react-bootstrap';
import {FaExchangeAlt, FaSave} from 'react-icons/fa';

import api from '../../services/api';


const Relocar = (props) => {

  const patrimonio = props.patrimonio;
  const [isOpen, setIsOpen] = useState(false);
  const abrirModal = () => setIsOpen(true);
  const fecharModal = () => setIsOpen(false);

  const [destino, setDestino] = useState('')
  const [setor, setSetor] = useState('')
  const [responsavel, setResponsavel] = useState('')
  const [dataLocacao, setDataLocacao] = useState('Data de hoje')

  async function realocarPatrimonio() {
    let data = {
      patrimonio_id: patrimonio.numero,
      origem: patrimonio.origem,
      origem_setor: patrimonio.origem_setor,
      origem_responsavel: patrimonio.origem_responsavel,
      destino,
      destino_setor: setor,
      destino_responsavel: responsavel,
      destino_dataLocacao: dataLocacao
    }
    let update = {
      origem: destino,
      setor,
      responsavel,
      origem_dataLocacao: dataLocacao
    }
    try{
      await api.post('/movimentacoes', data);
      alert("Movimentação cadastrada com sucesso!");
      await api.put(`/patrimonios/${patrimonio.numero}`, update);
      alert("Patrimonio realocado com sucesso!");      
    }catch(e){
      alert(`Não foi possível realizar a ação: ${e.message}`);
    }
  }

  return(
    <>
      <Button variant="info" title="Ver Detalhes" onClick={abrirModal}><FaExchangeAlt/> Realocar</Button>

      <Modal show={isOpen} onHide={fecharModal} size="xl">
        <Modal.Header closeButton>Relocação do patrimonio: {patrimonio.descricao} - {patrimonio.marca}</Modal.Header>
        <Modal.Body>
          <Container>
            <Row className="mb-4">
              <Col xs={3}><label htmlFor="">Nº Patrimonio</label><input type="text" className="form-control" value={patrimonio.numero}/></Col>
            </Row>
            <Row className="mb-5">
              <Col xs={12}><p>DE:</p></Col>
              <Col xs={4}><label htmlFor="">Origem</label><input type="text" className="form-control" value={patrimonio.origem}/></Col>
              <Col xs={4}><label htmlFor="">Setor</label><input type="text" className="form-control" value={patrimonio.origem_setor}/></Col>
              <Col xs={4}><label htmlFor="">Responsável</label><input type="text" className="form-control" value={patrimonio.origem_responsavel}/></Col>
            </Row>
            <Row className="mb-3">
              <Col xs={12}><p>PARA:</p></Col>
              <Col xs={4}><label htmlFor="">Destino</label><input type="text" className="form-control" onBlur={e => setDestino(e.target.value)}/></Col>
              <Col xs={4}><label htmlFor="">Setor</label><input type="text" className="form-control" onBlur={e => setSetor(e.target.value)}/></Col>
              <Col xs={4}><label htmlFor="">Responsável</label><input type="text" className="form-control" onBlur={e => setResponsavel(e.target.value)}/></Col>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={realocarPatrimonio}><FaSave/> Confirmar</Button> 
          <Button variant="danger" onClick={fecharModal}>Cancelar</Button> 
        </Modal.Footer>
      </Modal>

    </>

  )
}

export default Relocar;