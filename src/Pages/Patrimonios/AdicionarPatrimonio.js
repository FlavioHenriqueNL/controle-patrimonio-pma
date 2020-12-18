import React,{useContext, useState} from 'react';
import { Button, Col, Container, Modal, Row } from 'react-bootstrap';
import {AiOutlinePlus} from 'react-icons/ai'

import api from '../../services/api';

import {Context} from './Context';

const AdicionarPatrimonio = () => {

  const [patrimonios, setPatrimonios] = useContext(Context);
  const [isOpen, setIsOpen] = useState(false);
  const abrirModal = () => {setIsOpen(true)}
  const fecharModal = () => {setIsOpen(false)}


  
  const [numero,setNumero] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);
  const [descricao,setDescricao] = useState('');
  const [marca, setMarca] = useState('');
  const [local,setLocal] = useState('');
  const [setor, setSetor] = useState('');
  const [responsavel, setResponsavel] = useState('');
  const [dataEntrega, setDataEntrega] = useState('');

  async function cadastrarPatrimonio(){
    const data = {
      numero: parseInt(numero),
      descricao,
      marca, 
      origem: local,
      setor: setor,
      responsavel: responsavel, 
      dataLocacao: dataEntrega,
    }

    try{
      let response = await api.post('patrimonios', data);
      alert(`Cadastro realizado com sucesso!`);
      setPatrimonios([...patrimonios, data]);
      fecharModal();
    }catch(e){
      switch(e.response.data.code){
        case 11000:
          alert(`Erro ao cadastrar Patrimônio: Já existe um patrimônio com esse número.`)
      }
      // alert(`Erro ao cadastrar o Patrimonio - ${e.response}`);
      // console.log(e.response.menssage);
      // console.log(e.response.data.code);
      // console.log(e.code);
    };    
  
  }


  return(
    <>
      <Button variant="info" title="Adicionar patrimônio" onClick={abrirModal}>
        <AiOutlinePlus/> Adicionar Patrimonio
      </Button>
      <Modal show={isOpen} onHide={fecharModal} size="xl">
        <Modal.Header closeButton>
          Adicionar Patrimônio
        </Modal.Header>
        <Modal.Body>
        <Container>
            <Row className="mb-3">
              <Col xs={4}>
                <label htmlFor="numero">Nº de Patrimônio</label>
                <input type="text" className="form-control" id="numero" onChange={(e) => setNumero(e.target.value)} required/>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col xs={8}>
                <label htmlFor="descricao">Descrição do Equipamento</label>
                <input type="text" className="form-control" id="descricao" onBlur={(e) => setDescricao(e.target.value)}/>
              </Col>
              <Col xs={4}>
                <label htmlFor="marca">Marca</label>
                <input type="text" className="form-control" id="marca" onBlur={(e) => setMarca(e.target.value)}/>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col className="mb-3" xs={12}>
                <label htmlFor="local">Local</label>
                <input type="text" className="form-control" id="local" onBlur={(e) => setLocal(e.target.value)}/>
              </Col>
              <Col xs={4}>
                <label htmlFor="setor">Setor</label>
                <input type="text" className="form-control" id="setor" onBlur={(e) => setSetor(e.target.value)}/>
              </Col>
              <Col xs={4}>
                <label htmlFor="responsavel">Responsável</label>
                <input type="text" className="form-control" id="responsavel" onBlur={(e) => setResponsavel(e.target.value)}/>
              </Col>
              <Col xs={4}>
                <label htmlFor="dataEntrega">Data de Entrega</label>
                <input type="date" className="form-control" id="dataEntrega" onBlur={(e) => setDataEntrega(e.target.value)}/>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
            <Button type="submit" variant="success" onClick={cadastrarPatrimonio}>Cadastrar Patrimônio</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default AdicionarPatrimonio;