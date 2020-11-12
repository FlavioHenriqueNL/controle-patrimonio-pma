import React, { useEffect, useState } from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import  {Accordion, AccordionSummary, AccordionDetails, 
        Typography,Checkbox, FormControlLabel, 
        } from '@material-ui/core';
import {FaChevronDown} from 'react-icons/fa';

import api from '../../services/api';

const Movimentacoes = () => {

  const [movimentacoes, setMovimentacoes] = useState([]);

  async function getMovimentacoes(){
    try{
      let mov = await api.get('/movimentacoes');
      setMovimentacoes(mov.data);
    }catch(e){
      alert(`Não foi possível buscar as últimas movimentações: ${e.message}`);
    }
  }

  useEffect(()=>{
    getMovimentacoes();
  },[])

  return(
    <>
      <main>
        <Container>
          <Row>
            <div className="col-auto titulo">
              <h2>Últimas Movimentações</h2>
              <h1>Controle de patrimônio - SMS Arapiraca</h1>
            </div>
          </Row>
          {
            movimentacoes.map((movimento)=>(
              <Accordion key={movimento.id}>
                <AccordionSummary
                  expandIcon={<FaChevronDown />}
                  aria-label="Expand"
                  aria-controls="additional-actions1-content"
                  id="additional-actions1-header"
                >
                  <FormControlLabel
                    aria-label="Acknowledge"
                    onClick={(event) => event.stopPropagation()}
                    onFocus={(event) => event.stopPropagation()}
                    control={<Checkbox />}
                    label=""
                  />
                  {`Patrimonio: ${movimento.patrimonio_id} | Origem: ${movimento.origem} | Destino: ${movimento.destino} | Data: ${movimento.destino_dataLocacao}`}
                </AccordionSummary>
                <AccordionDetails>
                  <Typography color="textSecondary">
                    The click event of the nested action will propagate up and expand the accordion unless
                    you explicitly stop it.
                  </Typography>
                </AccordionDetails>
              </Accordion>
            ))
          }
        </Container>
      </main>
    </>
  )
}

export default Movimentacoes;