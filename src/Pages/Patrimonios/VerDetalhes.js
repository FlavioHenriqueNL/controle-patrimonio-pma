import React, {useState} from 'react';
import {Container, Row, Col, Button, Modal} from 'react-bootstrap';
import {FaSearch} from 'react-icons/fa';
import api from '../../services/api';
import Relocar from './Relocar';


const VerDetalhes = ({patrimonio, patrimonios, setPatrimonios}) => {
  
  

  const [isOpen, setIsOpen] = useState(false);
  const abrirModal = () => setIsOpen(true);
  const fecharModal = () => setIsOpen(false);

  

  async function excluirPatrimonio(){
    if(window.confirm("Você realmente deseja excluir esse patrimônio?")){
      try{
        await api.delete(`patrimonios/${patrimonio.numero}`);
        setPatrimonios(patrimonios.filter(p => p.numero !== patrimonio.numero));
        alert("Patrimonio removido com sucesso!");
      }catch(e){
        alert(`Algum problema aconteceu, tente novamente mais tarde! ${e.message}`);
      }finally{
        fecharModal();
      }
    }
  }

  return(
    <>
      <Button variant="info" title="Ver Detalhes" onClick={abrirModal}><FaSearch/></Button>

      <Modal show={isOpen} onHide={fecharModal} size="xl">
        <Modal.Header closeButton>Detalhes do patrimonio {patrimonio.numero}</Modal.Header>
        <Modal.Body>
          <Container>
            <Row className="mb-3">
              <Col xs={3}><label htmlFor="">Nº Patrimonio</label><input type="text" className="form-control" value={patrimonio.numero}/></Col>
              <Col xs={6}><label htmlFor="">Descrição</label><input type="text" className="form-control" value={patrimonio.descricao}/></Col>
              <Col xs={3}><label htmlFor="">Marca</label><input type="text" className="form-control" value={patrimonio.marca}/></Col>
            </Row>
            <Row>
              <Col xs={4}><label htmlFor="">Locação</label><input type="text" className="form-control" value={patrimonio.origem}/></Col>
              <Col xs={4}><label htmlFor="">Setor</label><input type="text" className="form-control" value={patrimonio.setor}/></Col>
              <Col xs={4}><label htmlFor="">Responsável</label><input type="text" className="form-control" value={patrimonio.responsavel}/></Col>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={excluirPatrimonio}>Excluir Patrimonio</Button>
          <Relocar patrimonio={patrimonio} patrimonios={patrimonios} setPatrimonios={setPatrimonios} />
        </Modal.Footer>
      </Modal>

    </>

  )
}

export default VerDetalhes;