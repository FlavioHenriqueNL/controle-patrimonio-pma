import React, {useState} from 'react';
import {Container, Row, Col, Button, Modal} from 'react-bootstrap';
import {FiEdit} from 'react-icons/fi';
import api from '../../services/api';

const EditarPatrimonio = ({patrimonio, patrimonios, setPatrimonios}) => {
  
  

  const [isOpen, setIsOpen] = useState(false);
  const abrirModal = () => setIsOpen(true);
  const fecharModal = () => setIsOpen(false);

  const [numero, setNumero] = useState(patrimonio.numero);
  const [descricao, setDescricao] = useState(patrimonio.descricao);
  const [marca, setMarca] = useState(patrimonio.marca);
  const [origem, setLocacao] = useState(patrimonio.origem);
  const [setor, setSetor] = useState(patrimonio.setor);
  const [responsavel, setResponsavel] = useState(patrimonio.responsavel);

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
  const editar = async () => {

    let data = [
      descricao,
      marca,
      origem,
      setor,
      responsavel
    ];
    try{
      await api.put(`/patrimonios/editar/${patrimonio.numero}`, data);
      alert("Editado com sucesso! \(Isso é só um teste blz?\)");
      fecharModal();
    }catch(e){
      alert(e.mensage);
    } 
  }

  return(
    <>
      <Button variant="info" title="Editar Patrimonio" onClick={abrirModal}><FiEdit/></Button>

      <Modal show={isOpen} onHide={fecharModal} size="xl">
        <Modal.Header closeButton>Detalhes do patrimonio {patrimonio.numero} - {patrimonio._id}</Modal.Header>
        <Modal.Body>
          <Container>
            <Row className="mb-3">
              <Col xs={3}><label htmlFor="">Nº Patrimonio</label><input type="text" className="form-control" value={patrimonio.numero}/></Col>
              <Col xs={6}><label htmlFor="">Descrição</label><input type="text" className="form-control" value={descricao} onChange={e => setDescricao(e.target.value)}/></Col>
              <Col xs={3}><label htmlFor="">Marca</label><input type="text" className="form-control" value={marca} onChange={e => setMarca(e.target.value)}/></Col>
            </Row>
            <Row>
              <Col xs={4}><label htmlFor="">Locação</label><input type="text" className="form-control" value={origem} onChange={e => setLocacao(e.target.value)}/></Col>
              <Col xs={4}><label htmlFor="">Setor</label><input type="text" className="form-control" value={setor} onChange={e => setSetor(e.target.value)}/></Col>
              <Col xs={4}><label htmlFor="">Responsável</label><input type="text" className="form-control" value={responsavel} onChange={e => setResponsavel(e.target.value)}/></Col>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={excluirPatrimonio}>Excluir Patrimonio</Button>
          <Button variant="success" onClick={editar}>Editar</Button>
        </Modal.Footer>
      </Modal>

    </>

  )
}

export default EditarPatrimonio;