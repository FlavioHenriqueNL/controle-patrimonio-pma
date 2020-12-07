import React, { useEffect, useState } from "react";
import {MDBDataTableV5, MDBTable, MDBTableBody, MDBTableHead} from "mdbreact";
import VerDetalhes from './VerDetalhes';

const TabelaPatrimonios = ({dataPatrimonios, setListaPatrimonio}) => {

  let rowData = dataPatrimonios;

  rowData.forEach(data => {
    let detalhe = <VerDetalhes 
                    listaPatrimonios={rowData}
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