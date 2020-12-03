import React, { useEffect, useState } from "react";
import {MDBDataTableV5, MDBTable, MDBTableBody, MDBTableHead} from "mdbreact";
import VerDetalhes from './VerDetalhes';
import api from '../../services/api';
const TabelaPatrimonios = () => {
  
  const [listaPatrimonio, setListaPatrimonio] = useState([]); 
  async function getPatrimonios(){
    let patrimonios = await api.get('patrimonios');
    setListaPatrimonio(patrimonios.data);
  }
  useEffect(()=>{
    getPatrimonios();
    
  },[]);

  let rowData = listaPatrimonio;
  rowData.forEach(data => {
    let detalhe = <VerDetalhes 
                    listaPatrimonios={listaPatrimonio}
                    setListaPatrimonio={setListaPatrimonio} 
                    patrimonio={data} 
                  />
    data.detalhes = detalhe;
  });
  console.log(rowData)
  
  const data = {
    columns: [
      {label: 'Nº Patrimônio', field: 'numero', sort:'asc'},  
      {label: 'Descrição', field: 'descricao', sort: 'asc'},  
      {label: 'Origem', field: 'origem', sort: 'asc'},  
      {label: 'Data Locação', field: 'dataLocacao', sort: 'disabled'},
      {label: 'Ver Detalhes', field: 'detalhes', sort: 'disabled'}, 
    ],
    rows: rowData
  }
  
  
  return <MDBDataTableV5 
    hover 
    entriesOptions={[5, 20, 25]} 
    entries={5} 
    pagesAmount={4} 
    data={data} 
    fullPagination 
  />
  

}

export default TabelaPatrimonios;