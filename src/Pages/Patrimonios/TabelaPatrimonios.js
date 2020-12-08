import React, {useContext} from "react";
import {MDBDataTableV5} from "mdbreact";
import VerDetalhes from './VerDetalhes';
import {Context} from './Context';
import { useEffect } from "react";
import PatrimonioContext from './Context';

const TabelaPatrimonios = () => {

  const [patrimonios, setPatrimonios] = useContext(Context);

   
    patrimonios.map(data => {
      let detalhe = <VerDetalhes patrimonio={data} patrimonios={patrimonios} setPatrimonios={setPatrimonios} />
      data.detalhes = detalhe;
    });
 
  


  
 
  
  const data = {
    columns: [
      {label: 'Nº Patrimônio', field: 'numero', sort:'asc'},  
      {label: 'Descrição', field: 'descricao', sort: 'asc'},  
      {label: 'Origem', field: 'origem', sort: 'asc'},  
      {label: 'Data Locação', field: 'dataLocacao', sort: 'disabled'},
      {label: 'Ver Detalhes', field: 'detalhes', sort: 'disabled'}, 
    ],
    rows: patrimonios
  }
  
  
  return <MDBDataTableV5 
    hover 
    entriesOptions={[10, 20, 25]} 
    entries={10} 
    pagesAmount={4} 
    data={data} 
    fullPagination
    searchTop
    searchBottom={false} 
  />
  

}

export default TabelaPatrimonios;